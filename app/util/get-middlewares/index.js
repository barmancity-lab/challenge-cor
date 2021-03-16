const camelCase = require('lodash/camelCase');
const includes = require('lodash/includes');
const isString = require('lodash/isString');
const split = require('lodash/split');
const appRoot = require('app-root-path');
const fs = require('fs');
const pathLib = require('path');

const DEFAULT_MIDDLEWARE_PATH = process.env.DEFAULT_MIDDLEWARE_PATH || `${appRoot}/app/middlewares/`;
const DEFAULT_MIDDLEWARE_EXTENSION = process.env.DEFAULT_MIDDLEWARE_EXTENSION || '.js';
const SLASH = '/';

function getInfoMiddleware(value, localMiddlewarePath) {
  let parts = [];
  const response = {};
  if (includes(value, '(im)')) {
    parts = split(value, '(im)', 2);
    response.type = '(im)';
    const [path, middleware] = split(parts[1], '__', 2);
    response.path = `${localMiddlewarePath}${path}`;
    if (middleware) {
      response.middleware = middleware;
    } else {
      response.middleware = camelCase(path);
    }
    return response;
  }
  if (includes(value, '(tpm)')) {
    const [, middleware] = split(value, '(tpm)', 2);
    response.type = '(tpm)';
    response.middleware = middleware;
    return response;
  }
  if (includes(value, '(tpmf)')) {
    const [, middleware] = split(value, '(tpmf)', 2);
    response.type = '(tpmf)';
    response.middleware = middleware;
    return response;
  }
  response.type = '(dm)';
  response.path = `${localMiddlewarePath}${value}`;
  response.middleware = camelCase(value);
  return response;
}


const searchRecursive = (dir, pattern) => {
  let result = '';

  fs.readdirSync(dir).forEach((dirInner) => {
    const dirMdw = pathLib.resolve(dir, dirInner);

    const stat = fs.statSync(dirMdw);

    if (stat.isDirectory()) {
      result = result.concat(searchRecursive(dirMdw, pattern));
    }
    if (stat.isFile() && dirMdw.endsWith(SLASH + pattern + DEFAULT_MIDDLEWARE_EXTENSION)) {
      result = dirMdw;
    }
  });
  return result;
};

function getMiddlewares(middlewareNames, localPath = DEFAULT_MIDDLEWARE_PATH) {
  const arrayOfMiddleware = [];
  try {
    if (isString(middlewareNames)) {
      middlewareNames = JSON.parse(middlewareNames); // eslint-disable-line
    }
    middlewareNames.forEach((name) => {
      const info = getInfoMiddleware(name, localPath);
      switch (info.type) {
        case '(im)': {
            const middleware = require(info.path)[info.middleware]; // eslint-disable-line
          arrayOfMiddleware.push(middleware);
          break;
        }
        case '(tpm)': {
            const middleware = require(info.middleware) // eslint-disable-line
          arrayOfMiddleware.push(middleware);
          break;
        }
        case '(tpmf)': {
            const middleware = require(info.middleware); // eslint-disable-line
          arrayOfMiddleware.push(middleware());
          break;
        }
        default : {
          const mdwPath = searchRecursive(localPath, name);
            const middleware = require(mdwPath)[info.middleware]; // eslint-disable-line
          arrayOfMiddleware.push(middleware);
          break;
        }
      }
    });
    return arrayOfMiddleware;
  } catch (e) {
    throw e;
  }
}

module.exports = getMiddlewares;
