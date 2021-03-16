const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

const baseSpec = require('../base.spec');
baseSpec('weatherRoute', () => {
  describe('weatherRoute', () => {
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

    describe('checking the actions', () => {
      it('should allow calls by using POST, GET', () => {
        const actionsMock = {
          post(path, middleware) {},
        };
        const getSpy = sinon.spy(actionsMock, 'get');
        const postSpy = sinon.spy(actionsMock, 'post');

        const expressMock = {
          Router() {
            return actionsMock;
          }
        };
        mockery.registerMock('express', expressMock);
        mockery.registerMock('../config', {
          context: {
          }
        });

        const getMiddlewaresMock = function (middlewares) {
          return middlewares;
        };

        require('./weather-route');

        expect(getSpy.called).to.be.true;
        expect(getSpy.args[0][0]).to.be.equal('/forecast');
      });
    });
  });
});