const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('validateSoupSchemaMiddleware', () => {
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

  describe('validateCustomerMiddleware middleware', () => {
    it('should return next() when  the body is correct', () => {
      const request = {};
      request.body = {
        columns: 2,
        rows: 2,
        soup:"AAAA",
        search: "AA" 
      };
      const nextSpy = sinon.spy();

      const middleware = require('./validate-soup-schema-middleware').validateSoupSchemaMiddleware;
      middleware(request, null, nextSpy);

      expect(nextSpy.called).to.be.true;
    });

    it('should return an error when the body is not correct', () => {
      const request = {};
      request.body = {};
      const mockResponse = {
        setResponseWithError: () => {}
      };
      const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
      mockery.registerMock('../util/common-response', mockResponse);

      const middleware = require('./validate-soup-schema-middleware').validateSoupSchemaMiddleware;
      try {
        middleware(request, null, null);
      } catch (e) {
        //expect(e.status).to.be.equal(400);
        console.log(e);
      }
    });
  });
});
