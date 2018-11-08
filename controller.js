const model = require('./model');

module.exports = {
  createUser: (req, res) => {
    const username = req.body.username;
    model.createUser(username, (dbRes, code) => {
      res.status(code).send(dbRes);
    });
  },
  // getAllUsers: (req, res) => {},
  // addExercise: (req, res) => {},
  // getUserLog: (req, res) => {}
};

