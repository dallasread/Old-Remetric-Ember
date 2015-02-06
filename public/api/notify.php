<?php
	require_once "require.php";
	
	if (property_exists($data, "event") && property_exists($data->event, "person") && property_exists($data->event->person, "id") && property_exists($data, "notification")) {
		$person_id = $data->event->person->id;
		$person = json_decode($firebase->get("$api_key/people/$person_id"), true);
		unset($person->events);
	
		$data = json_decode(json_encode($data), true);
		$notification = $data["notification"];
	
		if (!isset($person["info"]["name"])) {
			$person["info"]["name"] = $person["info"]["firstName"] . " " . $person["info"]["lastName"];
		}
	
		$data["event"]["person"] = $person["info"];
		$data["event"]["data"] = prepDataTable($data["event"]);
	
		foreach ($notification as $part => $v) {
			$notification[$part] = LightnCandy::compile($notification[$part]);
			$notification[$part] = LightnCandy::prepare($notification[$part]);
			$notification[$part] = $notification[$part]($data["event"]);
		}
	
		$mail->setFrom('no-reply@remetric.com', 'Remetric');
		$mail->Subject = $notification["subject"];
		$mail->Body = $notification["message"];
	
		if ($notification["replyTo"] != "") {
			$replyto = explode("<", $notification["replyTo"]);
		
			if (count($replyto) == 1) {
				$mail->addReplyTo( trim($notification["replyTo"]) );
			} else {
				$mail->addReplyTo( trim(str_replace(">", "", $replyto[1])), trim($replyto[0]) );
			}
		}
	
		foreach (explode(",", $notification["to"]) as $to) {
			$parts = explode("<", $to);
		
			if (count($parts) == 1) {
				if (strpos($to, "@") !== false) {
					$mail->addAddress( trim($to) );
				}
			} else {
				$address = trim(str_replace(">", "", $parts[1]));
			
				if (strpos($address, "@") !== false) {
					$mail->addAddress( $address, trim($parts[0]) );
				}
			}
		
			if ($debug) {
				if(!$mail->send()) {
					print_r(array("error" => $mail->ErrorInfo));
				} else {
			    print_r(array(
						"success" => 'Notification is sent.',
						'notification' => $mail
					));
				}
			} else {
				$mail->send();
			}
		
			$mail->ClearAddresses();
		}
	} else {
		if ($debug) {
			print_r(array(
				'error' => 'Please supply a notification and person id.'
			));
		}
	}
	
?>