const router = require('express').Router();
const Mission = require('../models/mission.model.js');
const multer = require('multer');

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
    
  destination: (req, file, callback) => {
    callback(null, "uploads/imgMission/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

router.get('/', (req, res) => {
  Mission.findMany()
    .then((mission) => {
      res.json(mission);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving mission from database');
    });
});


router.get('/:id', (req, res) => {
  Mission.findOne(req.params.id)
    .then((mission) => {
      if (mission) {
        res.json(mission);
      } else {
        res.status(404).send('Mission not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving mission from database');
    });
});


router.post('/', multer({ storage }).single("image"), (req, res) => {
  const error = Mission.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    Mission.create(req.body, req.file.path)
      .then((createdMission) => {
        res.status(201).json(createdMission);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the mission');
      });
    }
  });


router.put('/:id', (req, res) => {
  let existingMission = null;
  let validationErrors = null;
  Mission.findOne(req.params.id)
    .then((mission) => {
      existingMission = mission;
      if (!existingMission) return Promise.reject('RECORD_NOT_FOUND');
      validationErrors = Mission.validate(req.body, false);
      if (validationErrors) return Promise.reject('INVALID_DATA');
      return Mission.update(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingMission, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Mission with id ${req.params.id} not found.`);
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors: validationErrors.details });
      else res.status(500).send('Error updating a mission.');
    });
});

router.delete('/:id', (req, res) => {
  Mission.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send('🎉 mission deleted!');
      else res.status(404).send('Mission not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a mission');
    });
});


  module.exports = router;