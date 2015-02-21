import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	email: DS.attr('string'),
	isCreator: DS.attr('boolean'),
	isActive: DS.attr('boolean'),
	createdAt: DS.attr('timestamp', { defaultValue: new Date() })
});