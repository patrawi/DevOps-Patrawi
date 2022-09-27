const db = require('../dbClient')

module.exports = {
  create: async (user, callback) => {
   
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.exists(user.username, (err, res) => {
      if(err) {
        return callback(err);
      }
      if(res === 1) {
        return callback(new Error("already existed"),null)
      }
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })
    })

  },
  get: (username, callback) => {
    if(!username) {
      return callback(new Error("Please enter username correctly"),null);
    }
    db.hgetall(username, (err, res) => {
      if(err) return callback(err,null)
      console.log(res);
      callback(null,res)
    })
  }
}
