/*
This file contains the main function that is called
on document load as well as supporting functions
that use the API proxy to retrieve the results
*/

//Global YAHOO variable for cross-domain typeahead call
var YAHOO = {
		Finance: {
     	SymbolSuggest: {}
  	}
};

//Global variable for typeahead
var resultListGlobal = [];

//main js function
$(document).ready(function(e) {

    //store previous search in local storage
	if (localStorage.pageData) {
		console.log("Getting html from local storage...");
		var pageData = localStorage.getItem('pageData');
		$('#resultListDivTweetCloud').show();
		$('#resultsDiv').hide().html(pageData).fadeIn('slow');
	}

    //input typeahead function
    $('#mainQueryInput').typeahead({
        source: function (query, process) {
            $.ajax({
                type: "GET",
                url: "http://d.yimg.com/autoc.finance.yahoo.com/autoc",
                data: {
                    query: query
                },
                dataType:"jsonp",
                jsonpCallback: "YAHOO.Finance.SymbolSuggest.ssCallback",
            });
            return resultListGlobal; //global typeahead variable
        },
        minLength: 1,
        matcher: function(item) {
            return true
        },
        updater: function (item) {
            return JSON.parse(item).value;
        },
        highlighter: function (item) {
            return JSON.parse(item).name;
        }
    });

    //submit event listener function
    $('#mainQuery').submit(function(e) {
        console.log('Form is being submitted...');
        var resultsDiv = $('#resultsDiv');
        var query_text = $('#mainQueryInput').val();
        var resultDiv = '<div class="span4 offset2 fade" id="leftDiv"><h3 id="list"><img src="images/twitter-icon.png"/>Twitter Results</h3><div class="well" style="padding: 8px 0;" id="resultListDivTwitter"><img style="display:block; margin:auto;" src="images/ajax-loader.gif"/></div></div><div class="span4 fade" id="rightDiv"><h3 id="list"><img src="images/tweetcloud-icon.png"/>Stock Info Cloud</h3><div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivTweetCloud"><img style="display:block; margin:auto;" src="images/ajax-loader.gif"/></div></div>';

        resultsDiv.html(''); //init results container div

        //empty search alert message
        var queryTextEmpty = '<div class="alert alert-error span4 offset4 fade" id="emptyAlert">Please enter a stock symbol <button type="button" class="close" data-dismiss="alert">&times;</button></div>';

        //show container div
        resultsDiv.html(resultDiv);
        $("#leftDiv").addClass("in");
        $("#rightDiv").addClass("in");

        //search call
        if (query_text != '') {

            //clean query text
            if (query_text.charAt(0) != '$')
                query_text = '$' + query_text;

            queryTwitterAPI(query_text); //call twitter api function

        } else {
            resultsDiv.html(queryTextEmpty); //show empty search alert
            $("#emptyAlert").addClass("in") //add fade in class
        }

        return false; //stop form normal execution
    });

    //add event listener to reset button
    $('#btnReset').click(function() {
        var resultsDiv = $('#resultsDiv');

        //fade out results div
        resultsDiv.fadeOut('slow', function() {
            resultsDiv.html('');
            resultsDiv.show();
        });

        //clear local storage
        console.log("Clearing local storage...");
        localStorage.clear();

    }); //btnReset click
	
}) //end document ready

//typeahead callback function
YAHOO.Finance.SymbolSuggest.ssCallback = function (data) {
    resultListGlobal = []; //reset global typeahead array
    $.each(data.ResultSet.Result, function (index, value) {
        resultListGlobal.push(JSON.stringify({ name: value.name, value: value.symbol}));
    });
    return resultListGlobal;
} //YAHOO.Finance.SymbolSuggest.ssCallback


//queries the Twitter API through the PHP proxy
function queryTwitterAPI(query_text){
	console.log('Query twitter API...');
	var listHTML = '';
	var twitterAPI = "apiSearch.php";
	var twitterQuery = {
		query_text: query_text,
		query_action: 'twitter'
	}
	
	$.getJSON(twitterAPI,twitterQuery,processResults).fail(processError); //call twitter api

	//twitter api success callback
	function processResults(data){
		console.log('Processing results...');
		//check if data is not empty
		if (!jQuery.isEmptyObject(data)){
			var resultLimit = 5;
			var tweetCloudText = '';
			var tweetCloudTextImgURL = '';
			var tweetDate;
			listHTML = '<ul class="nav nav-list" id="resultList">';
			listHTML += '<li class="nav-header">'+ query_text +' - Related Tweets</li>';
	
			//loop through tweets for twitter list, get all 20 tweets for tweetCloudText
			$.each(data.statuses, function(result, tweet) {
				if (result < resultLimit) {
					tweetDate = new Date(tweet.created_at);
					listHTML += '<li><a href="#"></a><p>' + urlify(tweet.text, "detect") + ' <span class="muted"><em>' + tweetDate.toLocaleString() + '</em></span></p></li>';
					tweetCloudText += urlify(tweet.text, "");
				} else
					tweetCloudText += urlify(tweet.text, "");
			});
			
			listHTML += '</ul>';
			$('#resultListDivTwitter').hide().html(listHTML).fadeIn('slow'); //show twitter list results
			
			queryWordCloudAPI(tweetCloudText.replace(new RegExp('\\' + query_text, 'g'), ''), query_text); //call word cloud API
			
		} else { //no tweets found
		
			$('#resultListDivTwitter').html('No related tweets found');
		}
	} //processResults
	
	//twitter api error callback
	function processError(){
		console.log('Error connecting to twitter API!');	
	}//processError
	
} //queryTwitterAPI

//Calls the MakeWordCloud API
function queryWordCloudAPI(tweet_string, query_text){
	console.log('Getting tweet cloud...');
    var resultListDivTweetCloud = $('#resultListDivTweetCloud');

    //clean query text
    if (query_text.charAt(0) == '$')
        query_text =  query_text.substr(1);

	$.ajax({ 
		type: "POST",
		url: "https://gatheringpoint-word-cloud-maker.p.mashape.com/index.php",
		beforeSend: function(xhr)
        {
        	xhr.setRequestHeader("X-Mashape-Authorization", "0I1nXBRnJcuolmDOf7D4qM397E4DZ7ph");
        },
		data: {
			textblock: tweet_string,
			height: '550',
			width:	'360'
		}, 
		success: function(item){
			//show tweet cloud image
            resultListDivTweetCloud.removeClass('well');
            resultListDivTweetCloud.hide().html('<img src="'+ 'http://chart.finance.yahoo.com/z?s='+ query_text +'&t=6m&q=l&l=on&z=s&p=m50,m200' +'" /><br /><img src="' + JSON.parse(item).url +'"/>').fadeIn('slow', addLocalStorage);
		}
	});
	
}

//detects links in tweet text using regex
function urlify(text, method) {
    var urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
 	 return text.replace(urlRegex, function(url) {
		 if (method == "detect")
			return '<a href="' + url + '" target="_blank">' + url + '</a>'; //return url
		else 
			return ''; //return blank
    });
} //urlify

//function adds API data to local storage
function addLocalStorage(){
	console.log("Saving to local storage...");
	var pageHTML = $('#resultsDiv').html();
	
	if(window.localStorage) {
		localStorage.setItem('pageData', pageHTML);
	} else {
   		console.log('Local storage not supported');
	}
} //addLocalStorage