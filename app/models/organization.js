import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	apps: DS.hasMany('apps', { async: true }),
	ctas: DS.hasMany('ctas', { async: true }),
	peopleInfo: DS.attr(),
	stripeCustomerToken: DS.attr('string', { defaultValue: '' }),
	stripeCardToken: DS.attr('string', { defaultValue: '' }),
	card: DS.attr(),
	hasCard: function() {
		return this.get('stripeCustomerToken') !== '' || this.get('stripeCardToken') !== '';
	}.property('stripeCustomerToken', 'stripeCardToken')
});
