const router = require('express').Router();

const controller = require('./controller');

router.post('/new-user', controller.createUser);
router.get('/users', controller.getAllUsers);
router.post('/add', controller.addExercise);
router.get('/log', controller.getUserLog);

module.exports = router;