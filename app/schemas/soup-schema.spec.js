const mockery = require('mockery');
const Joi = require('joi');
const chai = require('chai');

const expect = chai.expect;

const body = {
  columns: 2,
  rows: 2,
  soup:"AAAA",
  search: "AA" 
};

describe('client', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('soup schema', () => {
    it('should not return an error', () => {
      const schema = require('./soup-schema');
      const result = Joi.validate(body, schema);
      console.info(result.error);
      expect(result.error).to.be.null;
    });

    it('should return an error', () => {
      const schema = require('./soup-schema');
      const result = Joi.validate({ ...body, informacion_contacto: null }, schema);
      expect(result.error).to.be.not.null;
    });
  });
});
