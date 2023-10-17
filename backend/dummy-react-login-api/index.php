<?php
// Allow access from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific HTTP headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Create an associative array with the desired key-value pair
$data = array(
    "login" => "success"
);

// Encode the array into JSON format
$jsonOutput = json_encode($data);

// Print the JSON-encoded output
echo $jsonOutput;
?>
