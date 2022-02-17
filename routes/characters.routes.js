const connection = require('../db-config');
const router = require('express').Router();

router.get("/", (req, res) => {
    connection.query("SELECT * FROM characters", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving characters from database");
      } else {
        res.json(result);
      }
    });
  });

  router.get('/:id', (req, res) =>{
    const characterId = req.params.id;
    connection.query(
        'SELECT * FROM characters WHERE id = ?',
        [characterId], 
        (err, results) =>{
            if(err){
                res.status(500).send('Error retrieving character from database')
            } else{
                if(results.length) res.json(results[0])
                else res.status(404).send('character not found');
            }
        }
    )
});

router.post('/', (req, res) => {
  const {name, age, image, description} = req.body
  connection.query(
    'INSERT INTO characters (name, age, image, description) VALUE (?, ?, ?, ?)',
    [name, age, image, description],
    (err, result) => {
      if(err){
        res.status(500).send('Error saving the chracter')
     } else {
         const id= result.insertId;
         const createdCharacter = {id, name, age, image, description};
         res.status(201).json(createdCharacter);
    }
    }
  )
})

router.put('/:id', (req, res) => {
  connection.query(
    'UPDATE characters SET ? WHERE id = ?',
    [req.body,req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a character');
      } else {
        if (result.affectedRows)
        {
          const updatedCharacter={
            id:req.params.id,
            name:req.body.name,
            age:req.body.age,
            image:req.body.image,
            description:req.body.description}
          res.status(200).json(updatedCharacter);
        } 
        else res.status(404).send('Character not found.');
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM characters WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an character');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Character deleted!');
        else res.status(404).send('Character not found.');
      }
    }
  );
});

  module.exports = router;