const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('validateCustomerMiddleware', () => {
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
        persona: {
          apellido_materno: 'foo',
          apellido_paterno: 'foo',
          nombres: 'bar',
          documento_identidad: {
            tipo_documento: '01',
            numero_documento: '2000000k'
          }
        },
        informacion_contacto: {
          telefono: {
            numero_telefono: '1414141414'
          },
          correo_electronico: {
            direccion_correo_electronico: 'asdb@gmail.com'
          }
        },
        fecha_registro: '1991-29-01'
      };
      const nextSpy = sinon.spy();

      const middleware = require('./validate-customer-middleware').validateCustomerMiddleware;
      middleware(request, null, nextSpy);

      expect(nextSpy.called).to.be.true;
    });

    it('should return an error when the body(mail) is not correct', () => {
      const request = {};
      request.body = {
        persona: {
          apellido_materno: 'foo',
          apellido_paterno: 'foo',
          nombres: 'bar',
          documento_identidad: {
            tipo_documento: '01',
            numero_documento: '2000000k'
          }
        },
        informacion_contacto: {
          telefono: {
            numero_telefono: 1414141414
          },
          correo_electronico: {
            direccion_correo_electronico: 'asdb.com'
          }
        },
        fecha_registro: '1991-29-01'
      };
      const mockResponse = {
        setResponseWithError: () => {}
      };
      const responseSpy = sinon.spy(mockResponse, 'setResponseWithError');
      mockery.registerMock('../util/common-response', mockResponse);

      const middleware = require('./validate-customer-middleware').validateCustomerMiddleware;
      try {
        middleware(request, null, null);
      } catch (e) {
        expect(e.status).to.be.equal(400);
        expect(e.code).to.be.equal('Customer schema is wrong');
      }
    });
  });
});
