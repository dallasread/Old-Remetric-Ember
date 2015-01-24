import Ember from 'ember';

export default Ember.ArrayController.extend({
	peopleInfoArray: function() {
		var peopleInfoArray = [];
		var peopleInfo = this.get('session.organization.peopleInfo');
		
		for (var key in peopleInfo) {
			if (peopleInfo[key].type == 'string') {
				var info = {
					key: key,
					name: peopleInfo[key].name,
					type: peopleInfo[key].type
				};
			
				peopleInfoArray.push(info);
			}
		}
		
		return peopleInfoArray;
	}.property('session.organization.peopleInfo')
});