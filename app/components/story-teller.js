/* globals Handlebars */	
import Ember from 'ember';

export default Ember.Component.extend({
	realStory: function() {
		var story = Handlebars.compile( this.get('event_story') );
		var data = this.get('event_info');
		data.person = this.get('person_info');

		for (var attr in data.person) {
			data.person[attr] = new Handlebars.SafeString("<a href=\"/#/dashboard/people/" + this.get('person_id') + "\">" + data.person[attr] + "</a>");
		}

	  return new Handlebars.SafeString( story(data) );
	}.property('event_story', 'event_info', 'person_id', 'person_info')
});
