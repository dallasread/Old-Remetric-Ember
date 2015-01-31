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
		if (model === 'app') {
      return 'apps';
		} else if (model === 'organization') {
			return window._RMOID + '/settings';
		} else if (model === 'cta') {
			return window._RMOID + '/ctas';
		} else {
			return window._RMOID + '/' + Ember.String.pluralize(model);
		}
  }
});