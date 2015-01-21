import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route("dashboard", function() {
		this.route("people", function() {
			this.route("segments/:segment_id");
			this.route("new");
			this.route("person", { path: "/:person_id" }); // DIALOG ACCESSIBLE FROM ANYWHERE
		});
	
		this.route("messages", function() {
			this.route("new");
		});
	
		this.route("activity", function() {
			this.route(":description");
		});
	
		this.route("apps", function() {
			this.route("store", function() {
				this.route("app", { path: "/:app_id" });
			});
			
			this.route("forms");
			this.route("social");
			this.route("chat");
			
			this.route("app", { path: "/:app_id" });
		});

		this.route("account", function() {
			this.route("profile");
			this.route("purchases");
			this.route("billing");
		});
	});
	
	this.route("public", function() {
		this.route("chat");
		this.route("surveys");
	});

	this.route("activate");
	this.route("signin");
});

export default Router;
