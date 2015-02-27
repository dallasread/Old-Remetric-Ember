import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string', { defaultValue: function() {
		return window.location.host; 
	}}),
	domain: DS.attr('string', { defaultValue: function() {
		return window.location.host; 
	}}),
	apps: DS.hasMany('apps', { async: true }),
	peopleInfo: DS.attr({ defaultValue: {} }),
	stripeCustomerToken: DS.attr('string', { defaultValue: '' }),
	stripeCardToken: DS.attr('string', { defaultValue: '' }),
	card: DS.attr({ defaultValue: {} }),
    createdAt: DS.attr('timestamp', { defaultValue: new Date() }),
	hasCard: function() {
		return this.get('stripeCustomerToken') !== '' || this.get('stripeCardToken') !== '';
	}.property('stripeCustomerToken', 'stripeCardToken')
});
