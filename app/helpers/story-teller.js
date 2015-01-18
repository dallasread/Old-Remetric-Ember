/* globals Handlebars */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(event, person) {
	var realStory = Handlebars.compile(event.get('story'));
	var data = event.get('info');
	data.person = person;

	for (var attr in data.person) {
		data.person[attr] = new Handlebars.SafeString("<a href=\"/#/dashboard/people/" + event.get('person.id') + "\">" + data.person[attr] + "</a>");
	}

  return new Handlebars.SafeString(realStory(data));
});
