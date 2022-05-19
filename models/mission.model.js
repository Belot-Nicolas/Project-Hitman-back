const connection = require('../db-config');
const db = connection.promise();
const Joi = require('joi')

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      name: Joi.string().max(50).presence(presence),
      location: Joi.string().max(50).presence(presence),
      description: Joi.string().presence(presence),
    }).validate(data, { abortEarly: false }).error;
  };

const findMany = () => {
    return db
      .query('SELECT * FROM mission')
      .then(([results]) => results);
      
  };
const findOne = (id) => {
    return db
      .query('SELECT * FROM mission WHERE id = ?', [id])
      .then(([results]) => results[0]);
  };



  const create = ({ name, location, description }, image) => {
    return db
      .query(
        'INSERT INTO mission ( name, location, description, image) VALUES (?, ?, ?, ?)',
        [ name, location, description, image]
      )
      .then(([result]) => {
        const id = result.insertId;
        return { id,  name, location, image, description };
      });
  };

  const update = (id, newAttributes) => {
  return db.query('UPDATE mission SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM mission WHERE id = ?', [id])
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