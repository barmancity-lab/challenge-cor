const mockery = require("mockery");
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

describe("validateRowsColsMiddleware", () => {
  beforeEach(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
  });

  afterEach(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

  describe("validate cols rows middleware", () => {
    it("should return next() when the cols and rows are correct ", function() {
      let request = {};

      request.body = {
        columns: 2,
        rows: 2,
        soup:"AAAA",
        search: "AA" 
      };
      const nextSpy = sinon.spy();

      let middleware = require("./validate-rows-cols-middleware").validateRowsColsMiddleware;
      middleware(request, null, nextSpy);

      expect(nextSpy.called).to.be.true;
    });

    it("should return an error when the cols and rows are not correct ", function() {
      let request = {};

      request.body = {
        columns: 2,
        rows: 2,
        soup:"AAA",
        search: "AA" 
      };
      let mockResponse = {
        setResponseWithError: () => {}
      };
      const responseSpy = sinon.spy(mockResponse, "setResponseWithError");
      mockery.registerMock("../util/common-response", mockResponse);

      let middleware = require("./validate-rows-cols-middleware").validateRowsColsMiddleware;
      middleware(request, null, null);

      expect(responseSpy.called).to.be.true;
      expect(responseSpy.args[0][0]).to.be.null;
      expect(responseSpy.args[0][1]).to.be.equal(400);
      expect(responseSpy.args[0][2]).to.be.equal("soup field must have 4 characters");
    });
  });
});
