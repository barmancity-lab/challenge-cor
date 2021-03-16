module.exports = function (config) {
  config.set({
    mutator: {
      name: 'javascript',
      excludedMutations: [
        'StringLiteral',
        'ObjectLiteral'
      ]
    },
    thresholds: { high: 80, low: 65, break: 59 },
    packageManager: 'npm',
    reporters: ['clear-text', 'progress'],
    testRunner: 'mocha',
    testFramework: 'mocha',
    transpilers: [],
    coverageAnalysis: 'all',
    mutate: ['app/**/*.js', '!**/*spec.js'],
    mochaOptions: {
      files: ['app/**/*.spec.js'],
      timeout: 5000
    }
  });
};
