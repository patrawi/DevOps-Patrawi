const { expect } = require('chai');
const userController = require('../controllers/user');
const db = require('../dbClient');

describe('User', () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  describe('Create', () => {
    it('create a new user', async () => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergeddi',
        lastname: 'Kudinov',
      };
      const result = await userController.create(user);
      expect(result).to.be.equal('Created');
    });

    it('passing wrong user parameters', async () => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov',
      };
      const result = await userController.create(user);
      expect(result.message).to.be.equal('Wrong user parameters in the input');
    });
    // TODO create this test
    // Warning: the user already exists
    it('avoid creating an existing user', async () => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov',
      };
      const result = await userController.create(user);

      expect(result).to.be.equal('Created');
      const testResult = await userController.create(user);

      expect(testResult.message).to.be.equal('Already Existed');
    });
  });

  // TODO Create test for the get method
  describe('Get', () => {
    it('get a user by username', async () => {
      const user = {
        username: 'dog123',
        firstname: 'Odoki',
        lastname: 'Arajan',
      };
      const result = await userController.create(user);
      expect(result).to.be.equal('Created');
      const getResult = await userController.get(user.username);
      expect(getResult).to.be.equal(`${user.firstname} ${user.lastname}`);
      // 1. First, create a user to make this unit test independent from the others
    });

    it('cannot get a user when it does not exist', async () => {
      // Chech with any invalid user
      const username = 'blackcat';
      const result = await userController.get(username);
      expect(result.message).to.be.equal('User Not Found');
    });
  });
});
