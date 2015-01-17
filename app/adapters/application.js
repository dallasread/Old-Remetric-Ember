/* globals Firebase */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://remetric.firebaseio.com"),
  pathForType: function(type) {
		if (type !== "organization" && type !== "app") {
			// if (!window.LCSCB) {
			// 	window.LCSCB = this.container.lookup('session:main').get('chatbox.id');
			// }
			return type + "/FROM-TRACK-JS";
		} else {
			var camelized = Ember.String.camelize(type);
      return Ember.String.pluralize(camelized);
		}
  }
});