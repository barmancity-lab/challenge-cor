const Joi = require('joi');

const soup = {
  columns: Joi.number().integer(),
  rows: Joi.number().integer(),
  search: Joi.string(),
  soup: Joi.string()
};

module.exports = soup;
