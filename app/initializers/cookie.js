export default {
  name: 'init-cookies',
  after: ['cookie'],
 
  initialize: function(container, app) {
    app.inject('controller', 'cookie', 'cookie:main');
  }
}