module.exports = {
  name:  'challenge-cor',
  port:  3053,
  middlewares: {
    commons: [
      'validate-soup-schema-middleware',
      'validate-rows-cols-middleware'
    ]
  },
  country:  'ar',
  version:  'v1'
};
