const router = require('express').Router();
const charactersRouter = require('./characters.routes');
const missionsRouter = require ('./missions.routes');

router.use('/characters', charactersRouter);
router.use('/missions', missionsRouter);
 
module.exports = router;