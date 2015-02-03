import Ember from 'ember';

export default Ember.Component.extend({
	store: null,
	selectedTab: 0,
	currentCTA: Ember.computed.alias('session.cta'),
	type: function() {
		return this.get('prettyName').toLowerCase().replace(/\s|\bwidget\b|\bform\b|\bbox\b/g, '');
	}.property('prettyName'),
	ctas: Ember.computed.filter('session.ctas', function(cta) {
		return cta.get('type') === this.get('type');
	}).property('session.ctas', 'type'),
	didInsertElement: function() {
		this.set('currentCTA', null);
	},
	actions: {
		editCTA: function(cta) {
			this.set('selectedTab', 0);
			this.set('currentCTA', cta);
		},
		newCTA: function() {
			var e = this;
			
			var cta = this.get('store').createRecord('cta', {
				name: this.get('prettyName') + ' #' + (this.get('ctas.length') + 1),
				type: this.get('type'),
				isActive: false
			});
			
			var name = this.get('store').createRecord('field', {
				label: 'What is your name?',
				permalink: 'name',
				isRequired: true,
				ordinal: 0
			});
			
			var email = this.get('store').createRecord('field', {
				label: 'What is your email?',
				permalink: 'email',
				isRequired: true,
				ordinal: 1
			});
			
			cta.get('fields').addObject(name);
			cta.get('fields').addObject(email);
			
			cta.save().then(function() {
				e.set('currentCTA', cta);
			});
		},
		saveCTA: function() {
			this.get('currentCTA').save();
		},
		activateCTA: function() {
			this.toggleProperty('currentCTA.isActive');
			this.get('currentCTA').save();
		},
		deleteCTA: function() {
			if (confirm("Are you sure you want to delete this " + this.get('prettyName') + "?")) {
				var e = this;
				this.get('currentCTA').destroyRecord().then(function() {
					e.set('currentCTA', null);
				});
			}
		},
		duplicateCTA: function() {
			var e = this;
			var dup = this.get('store').createRecord('cta', this.get('currentCTA').toJSON());
			
			dup.set('name', dup.get('name') + ' (Duplicate)');
			dup.save().then(function(cta) {
				e.set('currentCTA', cta);
			});
		},
		resetCTA: function() {
			this.get('currentCTA').rollback();
		},
		addField: function() {
			var field = this.get('store').createRecord('field', {});
			this.get('currentCTA.fields').addObject(field);
		},
		deleteField: function(field) {
			this.get('currentCTA.fields').removeObject(field);
		}
	}
});
