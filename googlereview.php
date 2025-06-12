<?php
$apiKey = 'AIzaSyDYVS1aCAfaaNKjHfpIEvHuOFVbTw95ev0';
$placeId = 'ChIJV-TumfRmUjoRB-eWdGd-P00';

// Google Places API URL
$url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=$placeId&fields=review&key=$apiKey";

// cURL request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Decode and return as JSON
$data = json_decode($response, true);
$reviews = array_slice($data['result']['reviews'] ?? [], 0, 5);
header('Content-Type: application/json');
echo json_encode($reviews);
?>