import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: window._RMDB,
	_getRef: function(model, id) {
		if (model.toString().indexOf('orga') !== -1) {
			var ref = this._ref;
      ref = ref.child(this.pathForType(model.typeKey));
			return ref;
		} else {
			return this._super(model, id);
		}
	},
  pathForType: function(model) {
		// if (!window.LCSCB) {
		// 	window.LCSCB = this.container.lookup('session:main').get('chatbox.id');
		// }
		
		if (model === 'app') {
			var camelized = Ember.String.camelize(model);
      return Ember.String.pluralize(camelized);
		} else if (model === 'organization') {
			return 'FROM-TRACK-JS/settings';
		} else if (model === 'cta') {
			return 'FROM-TRACK-JS/ctas';
		} else {
			return 'FROM-TRACK-JS/' + Ember.String.pluralize(model);
		}
  }
});