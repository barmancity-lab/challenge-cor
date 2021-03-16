const mockery = require('mockery');
const chai = require('chai');

const expect = chai.expect;
const body = {};
const responseRP = {statusCode: 200, body: {}}
describe('Check Weather', () => {
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
    it('should return response from get location', async () => {

      mockery.registerMock('../services/get-location', function() {
        this.get = () => {
          return 'ARG';
        };
      });
      mockery.registerMock('request-promise', function () {
        return Promise.resolve({ code: 200, message: 'ok',body:{} });
      });

      const Controller = require('./check-weather');
      controllerObj = new Controller();

      const request = {};
      request.body = body;
      request.timeout = 5000;
      request.route = {};
      request.route.path = '/current'
      request.params = {}
      request.params.city = 'arg'

      const response = await controllerObj.resolve(request);
      expect(response).to.haveOwnProperty('status_code');
      expect(response).to.haveOwnProperty('message');
    });
  });
});
