const chai = require('chai');

const expect = chai.expect;

class MockedError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

describe('common-response', () => {
  describe('setResponseWithError function', () => {
    it('should send an error ', (done) => {
      const func = require('./common-response').setResponseWithError;
      const responseMock = {
        status: (status) => {
          return {
            send: (data) => {
              expect(status).to.be.equal(500);
              expect(data.status_code).to.be.equal(410);
              expect(data.message).to.be.equal('error message');
              done();
            }
          };
        }
      };

      func(responseMock, 500, 'error message', 410);
    });
    it('should send an error from error instance with generic messages', (done) => {
      const func = require('./common-response').setResponseWithError;
      const responseMock = {
        status: (status) => {
          return {
            send: (data) => {
              expect(status).to.be.equal(500);
              expect(data.status_code).to.be.equal(500);
              expect(data.message).to.be.equal('internal server error');
              done();
            }
          };
        }
      };
      const err = new MockedError('error message', 'ENOTVALIDREQUEST');
      func(responseMock, 500, err);
    });
    it('should send an error from error instance', (done) => {
      const func = require('./common-response').setResponseWithError;
      const responseMock = {
        status: (status) => {
          return {
            send: (data) => {
              expect(status).to.be.equal(500);
              expect(data.status_code).to.be.equal(408);
              expect(data.message).to.be.equal('service timeout');
              done();
            }
          };
        }
      };
      const err = new MockedError('error message', 'ETIMEDOUT');
      func(responseMock, 500, err);
    });
  });
  describe('setResponseWithOk function', () => {
    it('should send an  Ok message ', (done) => {
      const func = require('./common-response').setResponseWithOk;
      const responseMock = {
        status: (status) => {
          return {
            send: (data) => {
              expect(status).to.be.equal(200);
              expect(data.status_code).to.be.equal(201);
              expect(data.message).to.be.equal('ok message');
              done();
            }
          };
        }
      };
      func(responseMock, 200, 'ok message');
    });
    it('should send an  Ok message with result ', (done) => {
      const func = require('./common-response').setResponseWithOk;
      const responseMock = {
        status: (status) => {
          return {
            send: (data) => {
              expect(data.result).to.be.a('object');
              expect(data.result.foo).to.be.equal('bar');
              done();
            }
          };
        }
      };
      func(responseMock, 200, 'ok message', 201, { foo: 'bar' });
    });
    it('should throw ', (done) => {
      const func = require('./common-response').setResponseWithOk;
      const responseMock = {
        status: () => ({
          send: () => {
            done();
          }
        })
      };
      try {
        func(responseMock);
      } catch (err) {
        console.log.err;
        expect(err);
      }
    });
  });

  describe('setResposetResponseRawnseWithOk function', () => {
    it('should send a raw message ', (done) => {
      const func = require('./common-response').setResponseRaw;
      const responseMock = {
        status: (status) => {
          return {
            send: (data) => {
              expect(status).to.be.equal(200);
              expect(data).to.be.equal('ok message');
              done();
            }
          };
        }
      };
      func(responseMock, 200, 'ok message');
    });
  });
});
