<?php

	$success = isset($_REQUEST["api_key"]) && isset($_REQUEST["data"]);
	$debug = isset($_REQUEST['debug']);
	$api_key = $_REQUEST["api_key"];
	
	if ($debug) {
		ini_set("display_errors",1);
		ini_set("display_startup_errors",1);
		error_reporting(-1);
		print('<pre>');
	}
	
	if ($success) {
		if (strlen(trim($api_key)) > 0) {
			require_once 'helpers.php';
			require_once 'vendor/firebase/firebaseLib.php';
			require_once 'vendor/lightncandy/lightncandy.php';
			require_once 'vendor/PHPMailer/PHPMailerAutoload.php';

			date_default_timezone_set("UTC");
		
			$firebase = new Firebase('https://remetric.firebaseio.com', 'FAzzQMmLyeDHT78LZOG7BSkmK80lXXaHMK0MMSV0');
			
			$mail = new PHPMailer;
			$mail->isSMTP();
			$mail->Host = 'smtp.mandrillapp.com';
			$mail->SMTPAuth = true;
			$mail->Username = 'dallas@remetric.com';
			$mail->Password = 'jTcznvBPRAhYBA1Xzu_42w';
			$mail->SMTPSecure = 'tls';
			$mail->Port = 587;
			
			$data = json_decode( base64_decode($_REQUEST["data"]) );
		}
	}
	
	if ($debug) {
		if ($success) {
			print_r($data);
		} else {
			print_r(array(
				'error' => 'Missing required parameters: api_key, data.'
			));
		}
	} else {
		header('Content-Type: image/gif');
		echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');
		
		if (!$success) {	
			exit;
		}
	}

?>