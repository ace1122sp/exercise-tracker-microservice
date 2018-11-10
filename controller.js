const model = require('./model');

module.exports = {
  createUser: (req, res) => {
    const username = req.body.username;
    model.createUser(username, (dbRes, code) => {
      res.status(code).send(dbRes);
    });
  },
  getAllUsers: (req, res) => {
    model.getAllUsers((dbRes, code) => {
      res.status(code).send(dbRes);
    });
  },
  addExercise: (req, res) => {
    const description = req.body.description || null;
    const duration = req.body.duration || null;
    const date = req.body.date || null;
    const userId = req.body.userId || null;

    // check validity of req.body
    if (!description || !duration || !userId) return res.status(200).send({ message: 'Invalid request' });
    if (typeof description != 'string' || typeof parseInt(duration) != 'number') return res.status(200).send({ message: 'Invalid data format' });
    if (date && typeof date != 'string') return res.status(200).send({ message: 'Invalid data format' });
    
    const exercise = { description, duration };
    if (date) exercise.date = Date.parse(date);

    model.addExercise(userId, exercise, (dbRes, code) => {
      res.status(code).send(dbRes);
    });
  },
  getUserLog: (req, res) => {
    const userId = req.query.userId.toString() || null;
    const from = Date.parse(req.query.from) || null;
    const to = Date.parse(req.query.to) || null;
    const limit = parseInt(req.query.limit) || null;

    const params = { userId, from, to, limit };
    
    model.getLog(params, (dbRes, code) => {      
      res.status(code).send(dbRes);
    });
  }
};

