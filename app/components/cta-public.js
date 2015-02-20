/* globals _RMO, _RMI */

import Ember from 'ember';
import jQuery from 'jquery';

export default Ember.Component.extend({
	isSubmitted: false,
	isClosed: false,
	isMinimized: false,
	sortSocialBy: ['ordinal'],
	sortedSocialNetworks: Ember.computed.sort('cta.social', 'sortSocialBy'),
	ctaCSS: function() {
		if (this.get('cta.type') === 'topbar') {
			return 'background: ' + this.get('cta.css.header.background') + '; color: ' + this.get('cta.css.header.text') + '; ';
		} else {
			return '';
		}
	}.property('cta.css.general', 'cta.type'),
	ctaCSSGeneralBackground: function() {
		if (this.get('cta.type') === 'topbar') {
			return '';
		} else {
			return 'background: ' + this.get('cta.css.general.background') + '; color: ' + this.get('cta.css.general.text') + '; ';
		}
	}.property('cta.css.general'),
	ctaCSSGeneralText: function() {
		if (this.get('cta.type') === 'topbar') {
			return 'color: ' + this.get('cta.css.header.text') + '; ';
		} else {
			return 'color: ' + this.get('cta.css.general.text') + '; ';
		}
	}.property('cta.css.general.text'),
	ctaCSSHeaderBackground: function() {
		if (this.get('cta.type') === 'topbar') {
			return '';
		} else {
			return 'background: ' + this.get('cta.css.header.background') + '; ';
		}
	}.property('cta.css.header.background', 'cta.type'),
	ctaCSSHeaderText: function() {
		return 'color: ' + this.get('cta.css.header.text') + '; ';
	}.property('cta.css.header.text', 'cta.type'),
	ctaCSSButton: function() {
		return 'background: ' + this.get('cta.css.button.background') + '; color: ' + this.get('cta.css.button.text') + '; ';
	}.property('cta.css.button'),
	didInsertElement: function() {
		if (this.get('cta')) {
			this.set('isMinimized', this.get('cta.isMinimized'));
		}
	},
	actions: {
		submitCTA: function(cta) {
			var e = this;
			var form = jQuery('.remetric_cta_' + cta.get('id') + ' form:first');
			var success = true;
			
			form.find('[required]').each(function() {
				if (!jQuery(this).val().length) {
					success = false;
				}
			});
			
			if (success) {
				var event = form.serializeObject();
				event.story = "{{person.name}} submitted {{cta.name}}";
				event.person = event.person || {};
				event.person.id = e.get('session.person.id');
				event.cta = { name: cta.get('name'), id: cta.get('id') };
				_RMO.track(event);

				cta.get('notifications').forEach(function(notification) {
					_RMI.notify(event, cta.get('id'), notification.get('id'));
				});
				
				if (cta.get('spark.recurrance') !== -1) {
					jQuery.cookie( cta.get('cookie'), true, { expires: cta.get('spark.recurrance'), path: '/' } );
				}
				
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

				if (this.get('cta.isMinimizable')) {
					this.toggleProperty('isMinimized');
				}
			}
		},
		openCTA: function() {
			this.set('isMinimized', false);
			this.set('isClosed', false);
		}
	}
});
