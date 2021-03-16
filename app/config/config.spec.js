const mockery = require('mockery');

const chai = require('chai');

const expect = chai.expect;

describe('config', () => {
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

  describe('config all environments', () => {
    it('should have the same number of fields', () => {
      const envs = ['local', 'test', 'qa', 'production'];
      envs.forEach((env) => {
        let config = require(`./config.${env}`);
        
        expect(config.check_weather).to.have.property('timeout');
        expect(config.check_weather).to.have.property('endpoint');
        expect(config.check_weather).to.have.property('key');

        expect(config.location_service).to.have.property('timeout');
        expect(config.location_service).to.have.property('endpoint');
        config = null;
      });
    });
  });
});
