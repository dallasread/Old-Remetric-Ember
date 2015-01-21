import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: window._RMDB,
  pathForType: function(type) {
		if (type !== "organization" && type !== "app") {
			// if (!window.LCSCB) {
			// 	window.LCSCB = this.container.lookup('session:main').get('chatbox.id');
			// }
			return Ember.String.pluralize(type) + "/FROM-TRACK-JS";
		} else {
			var camelized = Ember.String.camelize(type);
      return Ember.String.pluralize(camelized);
		}
  }
});