const chai   = require('chai');
const expect = chai.expect;
const mockery = require('mockery');
const appRoot = require('app-root-path');
const defautMiddleWaresPath = `${appRoot}/app/middlewares/`

describe('getMiddleware', () => {

  beforeEach(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
  });defautMiddleWaresPath

  afterEach(function () {
    client = null;
    redisConnection = null;
    state = null;
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('getMiddlewares function', () => {

    it("should return a default local middleware", function () {
      mockery.registerMock(`${defautMiddleWaresPath}my-middleware`, {
        myMiddleware: () => {
        }
      });
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["my-middleware"]);
      expect(result[0].name).to.be.equal("myMiddleware")
    });

    it("should return a default local middleware from different path", function () {
      mockery.registerMock('./../middlewares-another-path/my-middleware', {
        myMiddleware: () => {
        }
      });
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["my-middleware"], './../middlewares-another-path/');
      expect(result[0].name).to.be.equal("myMiddleware")
    });

    it("should return a local middleware", function () {
      mockery.registerMock(`${defautMiddleWaresPath}my-middleware`, {
        myMiddleware: () => {
        }
      });
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["(im)my-middleware__myMiddleware"]);
      expect(result[0].name).to.be.equal("myMiddleware")
    })

    it("should return a local middleware from different path", function () {
      mockery.registerMock('./../middlewares-another-path/my-middleware', {
        myMiddleware: () => {
        }
      });
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["(im)my-middleware__myMiddleware"], './../middlewares-another-path/');
      expect(result[0].name).to.be.equal("myMiddleware")
    })

    it("should return a local middleware with custom name", function () {
      mockery.registerMock(`${defautMiddleWaresPath}my-middleware`, {
        myMiddlewareCustomName: () => {
        }
      });
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["(im)my-middleware__myMiddlewareCustomName"]);
      expect(result[0].name).to.be.equal("myMiddlewareCustomName")
    })

    it("should return a local middleware with custom name from different path", function () {
      mockery.registerMock('./../middlewares-another-path/my-middleware', {
        myMiddlewareCustomName: () => {
        }
      });
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["(im)my-middleware__myMiddlewareCustomName"], './../middlewares-another-path/');
      expect(result[0].name).to.be.equal("myMiddlewareCustomName")
    })

    it("should return a third party middleware", function () {
      mockery.registerMock('my-middleware', {});
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["(tpm)my-middleware"]);
      expect(result[0]).to.be.not.null
    })

    it("should return a third party middleware function", function () {
      mockery.registerMock('my-middleware',function middleware(){});
      const getMiddlewares = require("./index");
      const result = getMiddlewares(["(tpmf)my-middleware"]);

      expect(result[0]).to.be.not.null
    })

    it("should return an error when the middleware does not exist", function () {

      const getMiddlewares = require("./index");
      try{
        getMiddlewares(["my-middleware-not-exist"]);
      } catch (e) {
        expect(e.message).to.contains(`Cannot find module '${defautMiddleWaresPath}my-middleware-not-exist'`)
      }

    });

  });

});
