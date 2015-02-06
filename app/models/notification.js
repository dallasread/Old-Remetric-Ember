import DS from 'ember-data';

export default DS.Model.extend({
	to: DS.attr('string'),
	subject: DS.attr('string'),
	message: DS.attr('string'),
	replyTo: DS.attr('string')
});
