const router = require('express').Router();
const characters = require('../models/characters.model.js');
const multer = require('multer');

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
    
  destination: (req, file, callback) => {
    callback(null, "uploads/imgCharacters/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});


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


router.post('/', multer({storage}).single('image'), (req, res) => {
  const error = characters.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    characters.create(req.body, req.file.path)
      .then((createdCharacter) => {
        res.status(201).json(createdCharacter);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the character');
      });
    }
  });


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
        res.status(404).send(`Characters with id ${req.params.id} not found.`);
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors: validationErrors.details });
      else res.status(500).send('Error updating a character.');
    });
});

router.delete('/:id', (req, res) => {
  characters.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send('🎉 Character deleted!');
      else res.status(404).send('Character not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a character');
    });
});

  module.exports = router;