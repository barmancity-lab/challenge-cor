const mockery = require('mockery');

const chai = require('chai');

const expect = chai.expect;

process.env.NODE_ENV = 'local';

describe('index config', () => {
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

  describe('getConfiguration function', () => {
    it('should throw an exception when then config folder does not exist', () => {
      const fsMock = {
        existsSync: () => {
          return false;
        }
      };
      mockery.registerMock('fs', fsMock);
      expect(() => { require('./index').config; }).to.throw(Error);
    });

    it('should return the local configuration ', () => {
      const fsMock = {
        existsSync: () => {
          return true;
        }
      };
      mockery.registerMock('fs', fsMock);
      process.env.NODE_ENV = 'local';
      const config = require('./index').config;
      expect(config).to.be.an('object');
    });
  });

  describe('getContext function', () => {

    it('should return the context configuration ', () => {
      mockery.registerMock('../../context', {});
      const config = require('./index').context;
      expect(config).to.be.an('object');
    });
  });

});
