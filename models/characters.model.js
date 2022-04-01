const connection = require('../db-config');
const db = connection.promise();
const Joi = require('joi')

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      name: Joi.string().max(50).presence(presence),
      age: Joi.number().presence(presence),
      image: Joi.string().max(255).presence(presence),
      description: Joi.string().presence(presence),
    }).validate(data, { abortEarly: false }).error;
  };

const findMany = () => {
    return db
      .query('SELECT * FROM characters')
      .then(([results]) => results);
      
  };
const findOne = (id) => {
    return db
      .query('SELECT * FROM characters WHERE id = ?', [id])
      .then(([results]) => results[0]);
  };
  
  const create = ({ name, age, image, description }) => {
    return db
      .query(
        'INSERT INTO characters ( name, age, image, description) VALUES (?, ?, ?, ?)',
        [ name, age, image, description]
      )
      .then(([result]) => {
        const id = result.insertId;
        return { id,  name, age, image, description };
      });
  };

  const update = (id, newAttributes) => {
  return db.query('UPDATE characters SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM characters WHERE id = ?', [id])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
    findMany,
    findOne,
    create,
    update,
    destroy,
    validate,
  };