<?php

	header('Content-Type: image/gif');
	echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');

	$api_key = $_REQUEST["api_key"];
	$event = json_decode( base64_decode($_REQUEST["event"]) );
	print_r($event);

	if (strlen(trim($api_key)) > 0 && $event && property_exists($event, "id") && property_exists($event, "story")) {
		require_once 'helpers.php';
		require_once 'vendor/firebase/firebaseLib.php';

		$firebase = new Firebase('https://remetric.firebaseio.com', 'FAzzQMmLyeDHT78LZOG7BSkmK80lXXaHMK0MMSV0');
		date_default_timezone_set("UTC");
		
		$person_id = preg_replace("/[^A-Za-z0-9 ]/", '', $event->id);
		$contact = $event->contact;
		unset($event->id);
		
		if (!property_exists($event, "createdAt")) {
			$event->createdAt = date('Y-m-d\TH:i:s.000\Z', time());
		}
		
		$createdAt = $event->createdAt;
		unset($event->createdAt);
		
		$story = $event->story;
		unset($event->story);
		
		if (property_exists($event, "page")) {
			$event->lastPage = array(
				"url" => $event->page->url,
				"title" => $event->page->title
			);
		} else if (isset($_SERVER["HTTP_REFERER"])) {
			$url = urldecode(urlencode($_SERVER["HTTP_REFERER"]));
			$event->page = (object) array(
				"url" => $url
			);
		}
		
		$event = (object) array(
			"createdAt" => $createdAt,
			"person" => $person_id,
			"story" => $story,
			"info" => $event
		);

		$firebase->push("events/$api_key", $event);
		$firebase->update("people/$api_key/$person_id/info", $contact);
		$firebase->set("people/$api_key/$person_id/lastSeenAt", $event->createdAt);
		$firebase->update("organizations/$api_key/peopleInfo", array_flatten($contact));
	}
	
?>