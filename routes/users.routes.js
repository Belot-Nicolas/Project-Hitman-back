const router = require('express').Router();
const User = require('../models/users.model')
const Joi = require('joi');


router.get('/', (req, res) => {
    User.findMany()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving users from database');
      });
  });

router.get('/:id', (req, res) => {
    User.findOne(req.params.id)
      .then((user) => {
        if (user) res.json(user);
        else res.status(404).send('User not found');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving user from database');
      });
  });

  router.post('/', (req, res) => {
    const { email } = req.body;
    let validationErrors = null;
    User.findByEmail(email)
      .then((existingUserWithEmail) => {
        if (existingUserWithEmail) return Promise.reject('DUPLICATE_EMAIL');
        validationErrors = User.validate(req.body);
        if (validationErrors) return Promise.reject('INVALID_DATA');
        return User.create(req.body);
      })
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch((err) => {
        console.error(err);
        if (err === 'DUPLICATE_EMAIL')
          res.status(409).json({ message: 'This email is already used' });
        else if (err === 'INVALID_DATA')
          res.status(422).json({ validationErrors });
        else res.status(500).send('Error saving the user');
      });
  });

  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

// router.post('/login',  (req, res) => {
//   // on reprend ici les verif de donnees utilisateur dans le formulaire
//   const { value, error } = userSchema.validate(req.body);

//   console.log(value)
  
//   if (error) {
//     return res.status(400).json(error);
//   }

//   const [[existingUser]] = User.findByEmail(value.email);

//   if (!existingUser) {
//     return res.status(403).json({
//       message: 'utilisateur no trouve ou le mot de passe ne correspond au compte'
//     })
//   }

//   const verified = User.verifyPassword(existingUser.password, value.password)

//   if (!verified) {
//     return res.status(403).json({
//       message: 'utilisateur non trouve ou le mot de passe ne correspond au compte'
//     })
//   }

//   const jwtKey = generateJwt(value.email, 'ROLE_USER');
//   return res.json({
//     credentials: jwtKey
//   })
// })

  // router.post("/login", (req, res) => {
  //   const { email, password } = req.body;

  //   console.log(email, password)

  //   User.findByEmail(email).then((user) => {
  //     if (!user) res.status(401).send("Invalid credentials");
  //     else {
  //       User.verifyPassword(password, user.hashedPassword).then(
  //         (passwordIsCorrect) => {
  //           if (passwordIsCorrect) {
  //             const token = calculateToken(email);
  //             User.update(user.id, { token: token })
  //             res.cookie('user_token', token)
  //             res.send()
  //           }
  //           else res.status(401).send('Invalid credentials');
              
  //         }
  //       )
  //   }
  //   });
  // });

  router.put('/:id', (req, res) => {
    let existingUser = null;
    let validationErrors = null;
    Promise.all([
      User.findOne(req.params.id),
      User.findByEmailWithDifferentId(req.body.email, req.params.id),
    ])
      .then(([user, otherUserWithEmail]) => {
        existingUser = user;
        if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
        if (otherUserWithEmail) return Promise.reject('DUPLICATE_EMAIL');
        validationErrors = User.validate(req.body, false);
        if (validationErrors) return Promise.reject('INVALID_DATA');
        return User.update(req.params.id, req.body);
      })
      .then(() => {
        res.status(200).json({ ...existingUser, ...req.body });
      })
      .catch((err) => {
        console.error(err);
        if (err === 'RECORD_NOT_FOUND')
          res.status(404).send(`User with id ${userId} not found.`);
        if (err === 'DUPLICATE_EMAIL')
          res.status(409).json({ message: 'This email is already used' });
        else if (err === 'INVALID_DATA')
          res.status(422).json({ validationErrors });
        else res.status(500).send('Error updating a user');
      });
  });

  router.delete('/:id', (req, res) => {
    User.destroy(req.params.id)
      .then((deleted) => {
        if (deleted) res.status(200).send('🎉 User deleted!');
        else res.status(404).send('User not found');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error deleting a user');
      });
  });


 module.exports = router;