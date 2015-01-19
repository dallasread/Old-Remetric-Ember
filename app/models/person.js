/* global Firebase */
import DS from 'ember-data';

export default DS.Model.extend({
  info: DS.attr(),
	createdAt: DS.attr('timestamp'),
	lastSeenAt: DS.attr('timestamp'),
	events: DS.hasMany('event', { async: true })
});
