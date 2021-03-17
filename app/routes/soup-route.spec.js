const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

const baseSpec = require('../base.spec');
baseSpec('soupRoute', () => {
  describe('soupRoute', () => {
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
      it('should allow calls by using POST', () => {
        const actionsMock = {
          post(path, middleware) {},
        };
        const postSpy = sinon.spy(actionsMock, 'post');

        const expressMock = {
          Router() {
            return actionsMock;
          }
        };
        
        
        mockery.registerMock('express', expressMock);
        mockery.registerMock('../config', {
          context: {
            middlewares: {commons: [ ]
            }
          }
        });
      
        
        const getMiddlewaresMock = function (middlewares) {
          return middlewares;
        };

        require('./soup-route');

        expect(postSpy.called).to.be.true;
        expect(postSpy.args[0][0]).to.be.equal('/soup');
      });
    });
  });
});