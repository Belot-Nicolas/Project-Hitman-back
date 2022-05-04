const router = require('express').Router();
const charactersRouter = require('./characters.routes');
const missionsRouter = require ('./missions.routes');
const usersRouter = require ('./users.routes');
const authRouter = require('./auth.routes');
// const { route } = require('./users.routes');

router.use('/characters', charactersRouter);
router.use('/missions', missionsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;