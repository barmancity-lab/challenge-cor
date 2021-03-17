const Joi = require('joi');

const soup = {
  columns: Joi.number().integer().required(),
  rows: Joi.number().integer().required(),
  search: Joi.string().required(),
  soup: Joi.string().required()
};

module.exports = soup;
