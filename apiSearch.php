<?php

require_once('apiFunctions.php');

if (isset($_GET['query_text']) && isset($_GET['query_action'])){

	$query_text = htmlspecialchars(urlencode($_GET['query_text']));
	$query_action = htmlspecialchars(urlencode($_GET['query_action']));
	$query_response = '';

	switch($query_action){
		case 'twitter':
			//$token = get_twitter_token();
			$token = 'AAAAAAAAAAAAAAAAAAAAAL9ISQAAAAAAmdirhad1L%2Fs09RA7teH7xvq7sVg%3DM9oPH3vlYQ8KeceQqPgpsN0Z8ety7LaBHII490x6O9A';
			$query_response = twitter_search($token, $query_text);
		break;
	}

	echo $query_response;

}