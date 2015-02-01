import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	description: DS.attr('string'),
	excerpt: DS.attr('string'),
	interval: DS.attr('string'),
	price: DS.attr('number'),
	hasTrial: DS.attr('boolean'),
	isActive: DS.attr('boolean'),
	isSystem: DS.attr('boolean'),
	ordinal: DS.attr('number'),
	colour: DS.attr('string'),
	installText: function() {
		return this.get('hasTrial') ? 'Try Free' : 'Free';
	}.property('hasTrial'),
	help: function() {
		return 'dashboard/apps/help/' + this.get('id');
	}.property('id'),
	icon: function() {
		return '/assets/imgs/apps/icons/' + this.get('id') + '.jpg';
	}.property('id')
});
