//main js function
$(document).ready(function(e) {
	$('#mainQuery').submit(function(e) {
        console.log('Form is being submitted...');
		var query_text = $('#mainQueryInput').val();
		
		//init results container div
		$('#resultsDiv').html('');
		var resultDiv = '<div class="span4 offset2 fade" id="leftDiv"><h3 id="list">Twitter Results</h3><div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivTwitter"><img src="/socialfinance/images/ajax-loader.gif"/></div></div><div class="span4 fade" id="rightDiv"><h3 id="list">Instagram Results</h3><div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivInsta"></div></div>';
		
		//empty text message
		var queryTextEmpty = '<div class="alert alert-error span4 offset4 fade" id="emptyAlert">Please enter stock symbol <button type="button" class="close" data-dismiss="alert">&times;</button></div>';
		
		//show container div
		$('#resultsDiv').html(resultDiv);
		$("#leftDiv").addClass("in");
		$("#rightDiv").addClass("in");
		
		if (query_text != '') {
			//clean query text
			
			//call twitter api function
			queryTwitterAPI(query_text);
		} else {
			$('#resultsDiv').html(queryTextEmpty);
			$("#emptyAlert").addClass("in")
		}
		
		//stop form normal execution
		return false;
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



