const mockery = require('mockery');
const Joi = require('joi');
const chai = require('chai');

const expect = chai.expect;

const body = {
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

describe('client', () => {
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

  describe('client schema', () => {
    it('should not return an error', () => {
      const schema = require('./customer');
      const result = Joi.validate(body, schema);
      console.info(result.error);
      expect(result.error).to.be.null;
    });

    it('should return an error', () => {
      const schema = require('./customer');
      const result = Joi.validate({ ...body, informacion_contacto: null }, schema);
      expect(result.error).to.be.not.null;
    });
  });
});
