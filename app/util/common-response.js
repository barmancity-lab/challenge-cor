const errors = {
  ETIMEDOUT: ['service timeout', 408]
};

// eslint-disable-next-line
function setResponseWithError(res, status, err, status_code) {
  if (err instanceof Error) {
    const code = (errors[err.code] && errors[err.code][1]) || 500;
    const message = (errors[err.code] && errors[err.code][0]) || 'internal server error';
    return res.status(status).send({ status_code: code, message });
  }
  return res.status(status).send({ status_code, message: err });
}

// eslint-disable-next-line
function setResponseWithOk(res, status, message, status_code = 201, result = null) {
  if (!result) {
    return res.status(status).send({ status_code, message });
  }
  return res.status(status).send({ status_code, message, result });
}

function setResponseRaw(res, status, message) {
  return res.status(status).send(message);
}

module.exports.setResponseWithError = setResponseWithError;
module.exports.setResponseWithOk = setResponseWithOk;
module.exports.setResponseRaw = setResponseRaw;
