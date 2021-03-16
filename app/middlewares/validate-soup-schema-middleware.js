const schema = require('../schemas/soup-schema');
const Joi = require('joi');
const setResponseWithError = require('../util/common-response').setResponseWithError;

module.exports.validateSoupSchemaMiddleware = (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    const errs = result.error.details;
    let errsMsj = '';
    // eslint-disable-next-line
    errs.forEach(element => { 
      errsMsj = element.message.replace('"', '').replace('"', '');
    });
    // eslint-disable-next-line
    return setResponseWithError(res, 400, errsMsj, 400);
  }
  return next();
};
