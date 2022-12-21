const { expect } = require('chai');
let db;

describe('Redis', () => {
  before(() => {
    db = require('../dbClient');
  });

  it('should connect to Redis', () => {
    expect(db).to.not.equal(null);
  });
});
