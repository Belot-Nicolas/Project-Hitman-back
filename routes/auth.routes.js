const router = require("express").Router();
const User = require("../models/users.model.js");
const { calculateToken, calculateJWTToken } = require("../middlewares/checkJwt.js");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (!user) res.status(401).send("Invalid credentials");
    else {
      User.verifyPassword(password, user.hashedPassword).then(
        (passwordIsCorrect) => {
          if (passwordIsCorrect) {
            const calToken = calculateToken(email);
            User.update(user.id, { token: calToken }) 
            const Token = calculateJWTToken(user);
            res.cookie("user_token", Token);

            res.send();
          } else res.status(401).send("Invalid credentials");
        }
      );
    }
  });
});


module.exports = router;