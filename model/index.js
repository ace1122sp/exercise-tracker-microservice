const User = require('./User');

module.exports = (() => {
  const _errorHandler = (err, cb) => {
    console.error(err.message);
    cb({ error: 'Bad request' }, 400);
  }

  const _userNotFound = cb => {
    cb({ message: 'Invalid user ID' }, 404);
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
    User.find({}, 'username _id')
      .then(rec => {
        cb(rec, 200);
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
              const response = { username: rec.username, _id: rec._id, description: lastExercise.description, duration: lastExercise.duration, date: new Date(lastExercise.date).toDateString() };
              
              cb(response, 200);
            })
            .catch(err => _errorHandler(err, cb));          
        } else { 
          _userNotFound(cb);
        }
      })
      .catch(err => _errorHandler(err, cb));
  }
  const getLog = (params, cb) => {
    const { userId, from, to, limit } = params;

    // try to find user
    User.findById(userId, 'username _id log')
      .then(rec => {
        if (rec) {

          // filter log
          let filteredLog = [...rec.log];

          if (from) filteredLog = filteredLog.filter(exercise => exercise.date > from);
          if (to) filteredLog = filteredLog.filter(exercise => exercise.date < to);
          if (limit) filteredLog = filteredLog.slice(0, limit);

          // convert date to human-readable format
          filteredLog = filteredLog.map(exercise => {
            const formatedDate = new Date(exercise.date).toDateString();
            const { description, duration } = exercise;
            return { description, duration, date: formatedDate };            
          });
                  
          const count = rec.log.length;
          const response = Object.assign({}, { username: rec.username, _id: rec._id , log: filteredLog, count });
          
          cb(response, 200);
        } else {
          _userNotFound(cb);
        }
      })
      .catch(err => _errorHandler(err, cb));
  }

  return {
    createUser,
    getAllUsers,
    addExercise,
    getLog

  }
})();