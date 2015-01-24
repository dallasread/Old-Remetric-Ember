/* globals Handlebars */	
import Ember from 'ember';

function applyURLToObject(obj, url) {
	for (var k in obj) {
		if (typeof obj[k] === "object") {
			applyURLToObject(obj[k], url);
		} else if (typeof obj[k] === 'string') {
			obj[k] = new Handlebars.SafeString("<a href=\"" + url + "\">" + obj[k] + "</a>");
		}
	}
}

export default Ember.Component.extend({
	realStory: function() {
		var story = Handlebars.compile( this.get('event_story').toString() );
		var data = Ember.$.extend(true, {}, this.get('event_info'));
		
		applyURLToObject(data, "/#/dashboard/activity/events/" + this.get('event_id'));
		data.person = Ember.$.extend(true, {}, this.get('person_info'));
		applyURLToObject(data.person, "/#/dashboard/people/" + this.get('person_id'));

	  return new Handlebars.SafeString( story(data) );
	}.property('event_story', 'event_info', 'person_id', 'person_info')
});
