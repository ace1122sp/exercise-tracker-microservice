const router = require('express').Router();

const controller = require('./controller');

router.post('/new-user', controller.createUser);
// router.get('/users', controller.getAllUsers);
// router.patch('/add', controller.addActivity);
// router.get('/log', controller.getUserActivities);

module.exports = router;