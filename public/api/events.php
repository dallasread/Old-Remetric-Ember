<?php

	require_once "require.php";
	$event = $data;

	if (property_exists($event, "person") && property_exists($event->person, "id") && property_exists($event, "story")) {
		$person_id = preg_replace("/[^A-Za-z0-9 ]/", '', $event->person->id);
		$person = $event->person;
		
		if (!property_exists($event, "createdAt")) {
			$event->createdAt = date('Y-m-d\TH:i:s.000\Z', time());
		}
		
		$createdAt = $event->createdAt;
		unset($event->createdAt);
		
		$story = $event->story;
		unset($event->story);
		
		if (!property_exists($event, "page") && isset($_SERVER["HTTP_REFERER"])) {
			$url = urldecode(urlencode($_SERVER["HTTP_REFERER"]));
			$event->page = (object) array(
				"url" => $url
			);
		}
		
		if (property_exists($event, "page")) {
			$person->lastPage = array(
				"url" => $event->page->url
			);
			
			if (property_exists($event->page, "title")) {
				$person->lastPage->title = $event->page->title;
			}
		}
		
		$event = (object) array(
			"createdAt" => $createdAt,
			"person" => $person_id,
			"story" => $story,
			"info" => $event
		);

		$new_event = $firebase->push("$api_key/events", $event);
		$firebase->update("$api_key/people/$person_id/info", $person);
		$firebase->set("$api_key/people/$person_id/lastSeenAt", $event->createdAt);
		$firebase->update("$api_key/settings/peopleInfo", array_flatten_with_type($person));
		$firebase->push("$api_key/people/$person_id/events/" . json_decode($new_event)->name, true);
	}
	
?>