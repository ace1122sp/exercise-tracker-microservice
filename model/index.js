const User = require('./User');

module.exports = (() => {
  _errorHandler = (err, cb) => {
    console.error(err);
    cb({ error: 'Internal server error' }, 500);
  }

  const createUser = (username, cb) => {
    User.findOne({ username })
      .then(rec => {
        if (rec) return cb({ message: 'Username already taken' }, 200);

        // Create new user if username available
        User.create({ username })
          .then(rec => {
            const response = { username: rec.username, _id: rec._id };

            console.log(`created User: ${JSON.stringify(response)}`);
            return cb(response, 201);
          })
          .catch(err => _errorHandler(err, cb)); 
      })
      .catch(err => _errorHandler(err, cb));
  }
  const getAllUsers = cb => {}
  const addExercise = (userId, exercise, cb) => {}
  const getLog = (params, cb) => {
    const { userId, from, to, limit } = params;
  }

  return {
    createUser,
    getAllUsers,
    addExercise,
    getLog
  }
})();