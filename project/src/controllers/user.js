const db = require('../dbClient');

module.exports = {
  create: async (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error('Wrong user parameters in the input'), null);
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    // Save to DB
    // TODO check if user already exists
    db.exists(user.username, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      if (res === 1) {
        return callback(new Error('already existed'), null);
      }
      db.hset(
        user.username,
        'firstname',
        userObj.firstname,
        'lastname',
        userObj.lastname,
        (err, res) => {
          if (err) return callback(err, null);
          callback(null, res);
        }
      );
    });
  },
  get: (username, callback) => {
    // TODO create this method
    db.exists(username, (err, res) => {
      if (err) return callback(err, null);
      if (res === 0)
        return callback(new Error("this user doesn't exist"), null);
      db.hmget(username, ['firstname', 'lastname'], (err, res) => {
        if (err) return callback(err, null);
        callback(null, res);
      });
    });
  },
};