/*
This file contains the main function that is called
on document load as well as supporting functions
that use the API proxy to retrieve the results
*/

//main js function
$(document).ready(function(e) {
	$('#mainQuery').submit(function(e) {
        console.log('Form is being submitted...');
		var query_text = $('#mainQueryInput').val();
		$('#resultsDiv').html(''); //init results container div
		
		var resultDiv = '<div class="span4 offset2 fade" id="leftDiv"><h3 id="list">Twitter Results</h3><div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivTwitter"><img src="/socialfinance/images/ajax-loader.gif"/></div></div><div class="span4 fade" id="rightDiv"><h3 id="list">Instagram Results</h3><div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivInsta"></div></div>';
		
		//empty search alert message
		var queryTextEmpty = '<div class="alert alert-error span4 offset4 fade" id="emptyAlert">Please enter stock symbol <button type="button" class="close" data-dismiss="alert">&times;</button></div>';
		
		//show container div
		$('#resultsDiv').html(resultDiv);
		$("#leftDiv").addClass("in");
		$("#rightDiv").addClass("in");
		
		//search call
		if (query_text != '') {
			
			//clean query text
			if (query_text.charAt(0) != '$')
				query_text = '$' + query_text;
				
			queryTwitterAPI(query_text); //call twitter api function
			
		} else {
			$('#resultsDiv').html(queryTextEmpty); //show empty search alert
			$("#emptyAlert").addClass("in") //add fade in class
		}
			
		return false; //stop form normal execution
    });
	
	//add event listener to reset button
	$('#btnReset').click(function() {
  		//fade out results div
		$('#resultsDiv').fadeOut('slow', function() {
			$('#resultsDiv').html('');
			$('#resultsDiv').show();
  		});
	});
	
});

//queries the Twitter API through the PHP proxy
function queryTwitterAPI(query_text){
	console.log('Query twitter API...');
	var listHTML = '';
	var twitterAPI = "/socialfinance/apiSearch.php";
	var twitterQuery = {
		query_text: query_text,
		query_action: 'twitter'
	}
	
	$.getJSON(twitterAPI,twitterQuery,processResults).fail(processError); //call twitter api

	//twitter api success callback
	function processResults(data){
		console.log('Processing results...');
		var resultLimit = 5;
		var tweetDate;
		listHTML = '<ul class="nav nav-list" id="resultList">';
		listHTML += '<li class="nav-header">Related Tweets</li>';

		$.each(data.statuses, function(result, tweet) {
			if (result < 5) {
				tweetDate = new Date(tweet.created_at);
				listHTML += '<li><a href="#">' + tweet.text + ' - <em>' + tweetDate.toLocaleString() + '</em></a></li>';
			}
		});
		
		listHTML += '</ul>';	
		$('#resultListDivTwitter').html(listHTML); //show results
	}
	
	//twitter api error callback
	function processError(){
		console.log('Error connecting to twitter API!');	
	}
	
}