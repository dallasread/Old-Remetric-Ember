/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'remetric',
    environment: environment,
    baseURL: '/',
    locationType: 'none',
    EmberENV: {
      FEATURES: {}
    },
    APP: {}
  };

  if (environment === 'development') {
		ENV.stripePublishableKey = 'pk_test_KHbiAmJXtsnNVu4uKJ7SMpGi';
		ENV.remetric = {
			api_key: 'remetric',
			domain: 'http://localhost:8888/remetric'
		};
    ENV.assetsBaseURL = 'http://localhost:4200';
    ENV.stylesheetURL = ENV.assetsBaseURL + '/assets/remetric.css';
  }

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    //ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
		ENV.stripePublishableKey = 'pk_live_4gmuwGKc2vyB07nkEG4Zms7O';
		ENV.remetric = {
			api_key: 'remetric',
			domain: 'https://remetric.com'
		};
    ENV.assetsBaseURL = 'https://remetric.com';
    ENV.stylesheetURL = ENV.assetsBaseURL + '/rm.css';
  }

  return ENV;
};
