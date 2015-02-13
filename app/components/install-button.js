/* globals _RMI */

import Ember from 'ember';

export default Ember.Component.extend({
	installed: function(){
		var e = this;
		return this.get('organization.apps').filter(function(app) {
			return app.get('name') === e.get('app.name');
		});
	}.property('organization.apps', 'app'),
	isInstalled: function() {
		return this.get('installed.length') !== 0;
	}.property('installed.length'),
	actions: {
		install: function(app) {
			var event = {
				person: { id: this.get('session.person.id') },
				product: { name: 'Remetric' },
				app: { name: app.get('name') },
				organization: { id: this.get('session.organization_id') }
			};
			
			if (this.get('isInstalled')) {
				event.story = '{{person.name}} uninstalled {{app.name}} ({{organization.id}}).';
				this.get('organization.apps').removeObject(app);
				this.get('organization').save();
			} else {
				event.story = '{{person.name}} installed {{app.name}} ({{organization.id}}).';
				this.get('organization.apps').addObject(app);
				this.get('organization').save();
			}

			_RMI.track(event);
		}
	}
});
