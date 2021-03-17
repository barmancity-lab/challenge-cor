const mockery = require('mockery');
const chai = require('chai');

const expect = chai.expect;
const body = {};
const responseRP = {statusCode: 200, body: {}}
describe('Aphabet soup', () => {
  beforeEach(() => {
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
    mockery.registerMock('../util/common-response', {
      setResponseWithOk: (res, code, message, status_code) => ({
        status_code,
        message
      }),
      setResponseWithError: (res, code, message) => ({
        status: 'error',
        message
      })
    });
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('resolve method', () => {
    it('should return response soup result', async () => {

      const Controller = require('./alphabet-soup');
      controllerObj = new Controller();

      const request = {};
      request.body = { columns:5,
                       rows:5,
                       search:'OIE',
                       soup:'EAEAEAIIIAEIOIEAIIIAEAEA'
                      };
      request.timeout = 5000;


      const response = await controllerObj.resolve(request);
      expect(response).to.haveOwnProperty('status_code');
      expect(response).to.haveOwnProperty('message');
    });
  });
});
