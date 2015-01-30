import Ember from 'ember';

export default Ember.Component.extend({
	installed: function(){
		var e = this;
		return this.get('organization.apps').filter(function(app) {
			return app.get('name') === e.get('app.name');
		})
	}.property('organization.apps', 'app'),
	isInstalled: function() {
		return this.get('installed.length') !== 0;
	}.property('installed.length'),
	actions: {
		install: function(app) {
			if (this.get('isInstalled')) {
				this.get('organization.apps').removeObject(app);
				this.get('organization').save();
			} else {
				this.get('organization.apps').addObject(app);
				this.get('organization').save();
			}
		}
	}
});
