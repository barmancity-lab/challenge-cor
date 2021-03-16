module.exports = {
  name: process.env.NODE_CONTEXT_NAME || 'challenge-cor',
  port: process.env.NODE_CONTEXT_PORT || 3053,
  middlewares: {
    commons: process.env.NODE_CONTEXT_MIDDLEWARE_COMMONS || [
      'validate-soup-schema-middleware',
      'validate-rows-cols-middleware'
    ]
  },
  country: process.env.NODE_ENVIRONMENT_COUNTRY || 'ar',
  version: process.env.NODE_CONTEXT_VERSION || 'v1'
};
