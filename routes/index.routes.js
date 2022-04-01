const router = require('express').Router();
const charactersRouter = require('./characters.routes');
const missionsRouter = require ('./missions.routes');
const usersRouter = require ('./users.routes');

router.use('/characters', charactersRouter);
router.use('/missions', missionsRouter);
router.use('/users', usersRouter);
 
module.exports = router;