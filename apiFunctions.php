<?php

define('CONSUMER_KEY', 'fho2tcvraAIMGqL6umqQ');
define('CONSUMER_SECRET', 'z25NFM3fHHD8xW3LwyxDQK76ZPraxglpMfZG3oK7Sw');

function get_twitter_token(){
	$encoded_consumer_key = urlencode(CONSUMER_KEY);
	$encoded_consumer_secret = urlencode(CONSUMER_SECRET);
	$bearer_token = $encoded_consumer_key.':'.$encoded_consumer_secret;
	$base64_encoded_bearer_token = base64_encode($bearer_token);
	$url = "https://api.twitter.com/oauth2/token";
	$headers = array( 
		"POST /oauth2/token HTTP/1.1", 
		"Host: api.twitter.com", 
		"User-Agent: SocialFinanceUGA",
		"Authorization: Basic ".$base64_encoded_bearer_token."",
		"Content-Type: application/x-www-form-urlencoded;charset=UTF-8", 
		"Content-Length: 29"
	); 

	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
	curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials"); 
	$header = curl_setopt($ch, CURLOPT_HEADER, 1); 
	$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	$response = curl_exec ($ch);
	curl_close($ch);
	$output = explode("\n", $response);
	$bearer_token = '';
	foreach($output as $line)
	{
		if($line === false)
		{
		}else{
			$bearer_token = $line;
		}
	}
	$bearer_token = json_decode($bearer_token);
	return $bearer_token->{'access_token'};
}

function twitter_search($token, $query){
	$url = "https://api.twitter.com/1.1/search/tweets.json";
	$q = urlencode(trim($query));
	$formed_url ='?q='.$q;
	//limit search to lang English, US lower 48 geocode and exclude RTs
	$formed_url = $formed_url.'+exclude:retweets&lang=en&geocode=39.8,-95.583068847656,2500km';
	//search result_type mixed and count 30
	$formed_url = $formed_url.'&result_type=mixed&count=30';
	//include entities
	$formed_url = $formed_url.'&include_entities=true'; 
	$headers = array( 
		"GET /1.1/search/tweets.json".$formed_url." HTTP/1.1", 
		"Host: api.twitter.com", 
		"User-Agent: SocialFinanceUGA",
		"Authorization: Bearer ".$token."",
	);
	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL,$url.$formed_url); 
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
	$response = curl_exec ($ch); 
	curl_close($ch);
	return $response;
}


?>