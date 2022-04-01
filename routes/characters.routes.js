const connection = require('../db-config');
const router = require('express').Router();
const characters = require('../models/characters.model')



router.get('/', (req, res) => {
  characters.findMany()
    .then((character) => {
      res.json(character);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving character from database');
    });
});


router.get('/:id', (req, res) => {
  characters.findOne(req.params.id)
    .then((character) => {
      if (character) {
        res.json(character);
      } else {
        res.status(404).send('Character not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving character from database');
    });
});


router.post('/', (req, res) => {
  const error = characters.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    characters.create(req.body)
      .then((createdCharacter) => {
        res.status(201).json(createdCharacter);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the character');
      });
    }
  });

// router.put('/:id', (req, res) => {
//   connection.query(
//     'UPDATE characters SET ? WHERE id = ?',
//     [req.body,req.params.id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Error updating a character');
//       } else {
//         if (result.affectedRows)
//         {
//           const updatedCharacter={
//             id:req.params.id,
//             name:req.body.name,
//             age:req.body.age,
//             image:req.body.image,
//             description:req.body.description}
//           res.status(200).json(updatedCharacter);
//         } 
//         else res.status(404).send('Character not found.');
//       }
//     }
//   );
// });

router.put('/:id', (req, res) => {
  let existingCharacter = null;
  let validationErrors = null;
  characters.findOne(req.params.id)
    .then((character) => {
      existingCharacter = character;
      if (!existingCharacter) return Promise.reject('RECORD_NOT_FOUND');
      validationErrors = characters.validate(req.body, false);
      if (validationErrors) return Promise.reject('INVALID_DATA');
      return characters.update(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingCharacter, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Movie with id ${req.params.id} not found.`);
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors: validationErrors.details });
      else res.status(500).send('Error updating a movie.');
    });
});

router.delete('/:id', (req, res) => {
  characters.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send('🎉 Movie deleted!');
      else res.status(404).send('Movie not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a movie');
    });
});

  module.exports = router;