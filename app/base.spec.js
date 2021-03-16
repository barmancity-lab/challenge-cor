const mockery = require('mockery');


// Base function for tests.
// Includes common configurations and mocks
module.exports = function (name, test) {

  describe(name, () => {

    beforeEach(function () {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });

      let logger = {
        info: () => {},
        debug: () => {},
        warn: () => {},
        error: () => {},
        fatal: () => {}
      }

      let mockLogger = {
        Logger: { getLogger: () => logger }
      }
      mockery.registerMock('fif-common-node-logger', mockLogger);

      // config mock with local config
      const config = require('./config/config.local')
      // config mock with default context
      const context = require('../context/definitions/default');
      mockery.registerMock('../config', { config, context });

    });

    afterEach(function () {
      mockery.disable();
      mockery.deregisterAll();
    });

    // execute tests
    test();

  });

}
