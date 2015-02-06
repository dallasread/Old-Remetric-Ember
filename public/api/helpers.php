<?php

	function array_flatten_with_pretty_keys($array, $parent = "") {
		$return = array();
	
		foreach ($array as $key => $value) {
			if ($parent == "") {
				$new_key = $key;
			} else {
				$new_key = ucfirst($parent) . " " . ucfirst($key);
			}
		
			if (is_object($value)) { $value = (array) $value; }
		
			if (is_array($value)){
				$return = array_merge($return, array_flatten_with_pretty_keys($value, $new_key));
			} else {
				$return[$new_key] = $value;
			}
		}
	
		return $return;
	}

	function array_flatten_with_type($array, $parent = "") {
		$return = array();
		
		foreach ($array as $key => $value) {
			if ($parent == "") {
				$new_key = $key;
			} else {
				$new_key = $parent . "@" . $key;
			}
			
			if (is_object($value)) { $value = (array) $value; }
			
			if (is_array($value)){
				$return = array_merge($return, array_flatten_with_type($value, $new_key));
			}
			
			if (!is_numeric($key) && $key != 'id') {
				$pretty_name = explode("@", $new_key);
				$pretty_name = array_map(function($word) { return ucfirst($word); }, $pretty_name);
				$type = 'string';
				if (strpos($key, 'At') !== false) { $type = 'date'; }
				if (substr($key, 0, 2) == 'is') { $type = 'boolean'; }
				
				$return[$new_key] = array(
					"name" => implode(" ", $pretty_name),
					"type" => $type
				);
			}
		}
		
		return $return;
	}
	
	function prepDataTableRow($field, $value, $row) {
		if (is_array($value)) {
			//$row .= prepDataTableRow($field, $value, $row);
		} else {
			$field = str_replace("Person ", "", $field);
			$value = filter_var($value, FILTER_SANITIZE_STRING);
			$row .= $field . ": " . $value . "\n";
		}
		
		return $row;
	}
	
	function prepDataTable($data) {
		$data_table = "";
		
		foreach (array_flatten_with_pretty_keys($data) as $field => $value)
		{
      if (strpos($field, "Cta") === false && strpos($field, "story") === false && strpos($field, "Page") === false && strpos($field, "Id") === false)
      {
				$data_table .= prepDataTableRow($field, $value, "");
      }
		}
		
		$data_table = rtrim($data_table, "\n");
		return $data_table;
	}
	
?>