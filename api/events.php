<?php
	
	header('Content-Type: image/gif');
	echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');

	$api_key = $_REQUEST["api_key"];
	$event = json_decode( base64_decode($_REQUEST["event"]) );

	if (strlen(trim($api_key)) > 0 && $event && property_exists($event, "id") && property_exists($event, "story")) {
		require_once 'vendor/firebase/firebaseLib.php';
		
		$firebase = new Firebase('https://remetric.firebaseio.com', 'FAzzQMmLyeDHT78LZOG7BSkmK80lXXaHMK0MMSV0');
		$person_id = preg_replace("/[^A-Za-z0-9 ]/", '', $event->id);

		unset($event->id);
		$firebase->push("events/$api_key/$person_id", $event);
		
		unset($event->story);
		$firebase->update("people/$api_key/$person_id/data", $event);
	}

?>