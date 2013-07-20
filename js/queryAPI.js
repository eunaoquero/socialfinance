//main function
$(document).ready(function(e) {
	$('#mainQuery').submit(function(e) {
        console.log('Form is being submitted...');
		var query_text = $('#mainQueryInput').val();
		
		//show loading gif
		$('#resultListDivTwitter').html('<img src="/socialfinance/images/ajax-loader.gif"/>');
		
		//call twitter api function
		queryTwitterAPI(query_text);
		return false;
    });
});

function queryTwitterAPI(query_text){
	console.log('Query twitter API...');
	var listHTML = '';
	var twitterAPI = "/socialfinance/apiSearch.php";
	var twitterQuery = {
		query_text: query_text,
		query_action: 'twitter'
	}

	//call twitter api
	$.getJSON(twitterAPI,twitterQuery,processResults).fail(processError);

	//twitter api success callback
	function processResults(data){
		console.log('Processing results...');
		var tweetDate;
		listHTML = '<ul class="nav nav-list" id="resultList">';
		listHTML += '<li class="nav-header">Related Tweets</li>';

		$.each(data.statuses, function(result, tweet) {
			tweetDate = new Date(tweet.created_at);
			listHTML += '<li><a href="#">' + tweet.text + ' - <em>' + tweetDate.toLocaleString() + '</em></a></li>';
		});
		
		listHTML += '</ul>';	
		$('#resultListDivTwitter').html(listHTML);
	}
	
	//twitter api error callback
	function processError(){
		console.log('Error connecting to twitter API!');	
	}
	
}



