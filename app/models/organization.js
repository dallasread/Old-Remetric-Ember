import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	description: DS.attr('string'),
	interval: DS.attr('string'),
	price: DS.attr('number'),
	hasTrial: DS.attr('boolean'),
	apps: DS.hasMany('apps', { async: true })
});
