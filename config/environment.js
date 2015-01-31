/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'remetric',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
				'ember-htmlbars': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
		ENV.stripePublishableKey = 'pk_test_KHbiAmJXtsnNVu4uKJ7SMpGi';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
		ENV.stripePublishableKey = 'pk_live_4gmuwGKc2vyB07nkEG4Zms7O';
  }

  return ENV;
};
