<?php

	function array_flatten($array, $parent = "") {
		$return = array();
		
		foreach ($array as $key => $value) {
			if ($parent == "") {
				$new_key = $key;
			} else {
				$new_key = $parent . "@" . $key;
			}
			
			if (is_object($value)) { $value = (array) $value; }
			
			if (is_array($value)){
				$return = array_merge($return, array_flatten($value, $new_key));
			}
			
			if (!is_numeric($key)) {
				$pretty_name = explode("@", $new_key);
				$pretty_name = array_map(function($word) { return ucfirst($word); }, $pretty_name);
				$return[$new_key] = implode(" ", $pretty_name);
			}
		}
		
		return $return;
	}
	
?>