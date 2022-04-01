const connection = require('../db-config');
const router = require('express').Router();

router.get("/", (req, res) => {
    connection.query("SELECT * FROM mission", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving mission from database");
      } else {
        res.json(result);
      }
    });
  });

  router.get('/:id', (req, res) =>{
    const missionId = req.params.id;
    connection.query(
        'SELECT * FROM mission WHERE id = ?',
        [missionId], 
        (err, results) =>{
            if(err){
                res.status(500).send('Error retrieving mission from database')
            } else{
                if(results.length) res.json(results[0])
                else res.status(404).send('mission not found');
            }
        }
    )
});

router.post('/', (req, res) => {
  const {name, location, image, description} = req.body
  connection.query(
    'INSERT INTO mission (name, location, image, description) VALUE (?, ?, ?, ?)',
    [name, location, image, description],
    (err, result) => {
      if(err){
        res.status(500).send('Error saving the mission')
     } else {
         const id= result.insertId;
         const createdMission = {id, name, location, image, description};
         res.status(201).json(createdMission);
    }
    }
  )
})

router.put('/:id', (req, res) => {
  connection.query(
    'UPDATE mission SET ? WHERE id = ?',
    [req.body,req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a mission');
      } else {
        if (result.affectedRows)
        {
          const updatedMission={
            id:req.params.id,
            name:req.body.name,
            location:req.body.location,
            image:req.body.image,
            description:req.body.description}
          res.status(200).json(updatedMission);
        } 
        else res.status(404).send('Mision not found.');
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM mission WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an mission');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Mission deleted!');
        else res.status(404).send('Mission not found.');
      }
    }
  );
});

  module.exports = router;