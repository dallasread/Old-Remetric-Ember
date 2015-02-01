import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	email: DS.attr('string'),
	creator: DS.attr('boolean'),
	active: DS.attr('boolean'),
	createdAt: DS.attr('timestamp', { defaultValue: new Date() })
});