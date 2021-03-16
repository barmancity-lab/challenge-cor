module.exports = {
  name: process.env.NODE_CONTEXT_NAME || 'challenge',
  port: process.env.NODE_CONTEXT_PORT || 3053,
  middlewares: {
    commons: process.env.NODE_CONTEXT_MIDDLEWARE_COMMONS || [
      'check-country-middleware'
    ],
    weather: process.env.NODE_CONTEXT_MIDDLEWARE_COMMONS || [
      'check-country-middleware'
    ]
  },
  country: process.env.NODE_ENVIRONMENT_COUNTRY || 'ar',
  version: process.env.NODE_CONTEXT_VERSION || 'v1'
};
