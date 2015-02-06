/* globals _RMO, _RMI */

import Ember from 'ember';

export default Ember.Component.extend({
	isSubmitted: false,
	isClosed: false,
	isMinimized: false,
	sortSocialBy: ['ordinal'],
	sortedSocialNetworks: Ember.computed.sort('cta.social', 'sortSocialBy'),
	didInsertElement: function() {
		if (this.get('cta')) {
			this.set('isMinimized', this.get('cta.isMinimized'));
		}
	},
	actions: {
		submitCTA: function(cta) {
			var e = this;
			var form = cta.get('domId').find('form');
			var success = true;
			
			form.find('[required]').each(function() {
				if (!Ember.$(this).val().length) {
					success = false;
				}
			});
			
			if (success) {
				var event = form.serializeObject();
				event.story = "{{person.name}} submitted {{cta.name}}";
				event.person = event.person || {};
				event.person.id = 'simplelogin49';
				event.cta = { name: cta.get('name'), id: cta.get('id') };
				_RMO.track(event);
				
				cta.get('notifications').forEach(function(notification) {
					_RMI.notify(event, notification.toJSON(), form.serializeObject());
				});
				
				if (cta.get('thankYou.isRedirect') && cta.get('thankYou.url.length')) {
					window.location.href = cta.get('thankYou.url');
				}
		
				e.set('isSubmitted', true);
			} else {
				alert('Please fill in all the required fields.');
			}
		},
		closeCTA: function() {
			this.set('isMinimized', false);
			this.set('isClosed', true);			
		},
		minimizeCTA: function() {
			this.set('isMinimized', true);
			this.set('isClosed', false);
		},
		maxOrMinimizeCTA: function() {
			if (this.get('isSubmitted') || (!this.get('isMinimized') && this.get('cta.isClosable'))) {
				this.set('isClosed', true);
				this.set('isMinimized', true);
			} else {
				this.set('isClosed', false);
				this.toggleProperty('isMinimized');
			}
		},
		openCTA: function() {
			this.set('isMinimized', false);
			this.set('isClosed', false);
		}
	}
});
