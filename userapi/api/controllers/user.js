const db = require('../../dbClient');

module.exports = {
  create: async (user) => {
    // Check parameters

    if (!user.username) {
      return new Error('Wrong user parameters in the input');
    }

    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    // Save to DB
    // TODO check if user already exists
    const existCheck = await db.exists(user.username);

    if (existCheck !== 0) {
      return new Error('Already Existed');
    }

    const result = await db.hset(user.username, userObj);
    if (result !== 2) return new Error('Internal Server Error');
    return 'Created';
  },
  get: async (username) => {
    // TODO create this method

    const existCheck = await db.exists(username);
    if (existCheck == 0) return new Error('User Not Found');
    const result = await db.hgetall(username);
    return `${result.firstname} ${result.lastname}`;
  },
};
