import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: window._RMDB,
	_getRef: function(model, id) {
		if ((model + "").indexOf('organization') !== -1 || id === 'settings') {
			var ref = this._ref;
      ref = ref.child(this.pathForType('organization'));
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
		} else {
			return window._RMOID + '/' + Ember.String.pluralize(model);
		}
  }
});