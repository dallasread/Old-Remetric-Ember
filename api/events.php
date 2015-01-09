<?php
	
	header('Content-Type: image/gif');
	echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');

	$api_key = $_REQUEST["api_key"];
	$event = json_decode( base64_decode($_REQUEST["event"]) );

	if (strlen(trim($api_key)) > 0 && $event && property_exists($event, "id") && property_exists($event, "story")) {
		require_once 'helpers.php';
		require_once 'vendor/firebase/firebaseLib.php';

		$firebase = new Firebase('https://remetric.firebaseio.com', 'FAzzQMmLyeDHT78LZOG7BSkmK80lXXaHMK0MMSV0');
		$person_id = preg_replace("/[^A-Za-z0-9 ]/", '', $event->id);
		date_default_timezone_set("UTC");
		
		if (!property_exists($event, "createdAt")) {
			$event->createdAt = date('Y-m-d\TH:i:s\Z', time());
		}
		
		$event->lastSeenAt = $event->createdAt;
		
		if (!property_exists($event, "page") && isset($_SERVER["HTTP_REFERER"])) {
			$url = urldecode(urlencode($_SERVER["HTTP_REFERER"]));
			$event->page = (object) array(
				"url" => $url
			);
		}

		unset($event->id);
		$firebase->push("events/$api_key/$person_id", $event);
		
		if (property_exists($event, "page")) {
			$event->lastPage = array(
				"url" => $event->page->url,
				"title" => $event->page->title
			);
		}
		
		unset($event->story);
		unset($event->page);
		
		$firebase->update("people/$api_key/$person_id/data", $event);
		$firebase->update("organizations/$api_key/peopleData", array_flatten($event));
	}
	
?>