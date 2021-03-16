const setResponseWithError = require('../util/common-response')
  .setResponseWithError;

module.exports.validateRowsColsMiddleware = (req, res, next) => {
  const rows = req.body.rows;
  const columns = req.body.columns;
  const soup = req.body.soup;
  const total = rows * columns;
  // eslint-disable-next-line
  if (soup.length !== total) {
    return setResponseWithError(res, 400, `soup field must have ${total} characters`);
  }
  return next();
};
