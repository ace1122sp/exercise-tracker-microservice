const User = require('./User');

module.exports = (() => {
  _errorHandler = (err, cb) => {
    console.error(err.message);
    cb({ error: 'Bad request' }, 400);
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
  const getAllUsers = cb => {
    User.find()
      .then(rec => {
        const response = [];
        
        rec.forEach(user => {
          response.push({ username: user.username, _id: user._id });
        });
        cb(response, 200);
      })
      .catch(err => _errorHandler(err, cb));
  }
  const addExercise = (userId, exercise, cb) => {
    
    // find user
    User.findById(userId)
      .then(rec => {
        if (rec) {       

          // update log
          rec.log.push(exercise);
          rec.save()
            .then(rec => {
              const lastExercise = rec.log.pop();
              const response = { username: rec.username, _id: rec._id, description: lastExercise.description, duration: lastExercise.duration, date: lastExercise.date.toDateString() };
              
              cb(response, 200);
            })
            .catch(err => _errorHandler(err, cb));          
        } else { 

          // if user with given ID does not exist
          cb({ message: 'Invalid user ID' }, 200);
        }
      })
      .catch(err => _errorHandler(err, cb));
  }
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