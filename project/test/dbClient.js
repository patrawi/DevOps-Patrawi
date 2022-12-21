const { expect } = require('chai');
let db;

describe('Redis', () => {
  before(() => {
    db = require('../src/api/dbClient');
  });

  it('should connect to Redis', () => {
    expect(db).to.not.equal(null);
  });
});
