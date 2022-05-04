const connection = require('../db-config');
const Joi = require('joi');
const argon2 = require('argon2');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      lastname: Joi.string().max(255).presence(presence),
      firstname: Joi.string().max(255).presence(presence),
      email: Joi.string().email().max(255).presence(presence),
      password: Joi.string().min(3).max(50).presence(presence),
    }).validate(data, { abortEarly: false }).error;
  };

  const findMany = () => {
    return db
      .query('SELECT * FROM users')
      .then(([results]) => results);
      
  };
const findOne = (id) => {
    return db
      .query('SELECT * FROM users WHERE id = ?', [id])
      .then(([results]) => results[0]);
  };

  const findByToken = (token) => {
    return db
      .query('SELECT * FROM users WHERE token = ?', [token])
      .then(([results]) => results[0]);
  };

  const findByEmail = (email) => {
    return db
      .query('SELECT * FROM users WHERE email = ?', [email])
      .then(([results]) => results[0]);
  };
  
  const findByEmailWithDifferentId = (email, id) => {
    return db
      .query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, id])
      .then(([results]) => results[0]);
  };
  
  const create = ({ firstname, lastname, email, password }) => {
    return hashPassword(password).then((hashedPassword) => {
      return db
        .query('INSERT INTO users SET ?', {
          firstname,
          lastname,
          email,
          hashedPassword,
        })
        .then(([result]) => {
          const id = result.insertId;
          return {id, firstname, lastname, email };
        });
    });
  };

  const update = (id, newAttributes) => {
  return db.query('UPDATE users SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM users WHERE id = ?', [id])
    .then(([result]) => result.affectedRows !== 0);
};

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  
  const hashPassword = (plainPassword) => {
    return argon2.hash(plainPassword, hashingOptions);
  };
  
  const verifyPassword = (plainPassword, hashedPassword) => {
    return argon2.verify(hashedPassword, plainPassword,   hashingOptions);
  };

  module.exports = {
    findMany,
    findOne,
    validate,
    findByToken,
    create,
    update,
    destroy,
    findByEmail,
    findByEmailWithDifferentId,
    hashPassword,
    verifyPassword,
  };