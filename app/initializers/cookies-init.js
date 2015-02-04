export default {
  name: 'cookies-init',
  after: ['cookie'],
 
  initialize: function(container, app) {
    app.inject('controller', 'cookie', 'cookie:main');
  }
};