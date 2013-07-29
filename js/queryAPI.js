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

//Global Indexes;
var mainIndex = 1;
var processIndex = 1;
var cloudQueryIndex = 1;
var cloudSaveIndex = 1;

//Update Index
function updateIndex(index){
	if(index == 1){
	return 2;

	} else if(index == 2 ){
	return 3;

	} else if(index == 3 ){
	return 1;
	}
}
//main js function
$(document).ready(function(e) {

    //store previous search in local storage
	if (localStorage.pageData1 || localStorage.pageData2 || localStorage.pageData3) {
        var stockTabsHolder = $('#stockTabsHolder');

		console.log("Getting html from local storage...");
        var tabData= localStorage.getItem('tabData');
		var pageData1= localStorage.getItem('pageData1');
		var pageData2= localStorage.getItem('pageData2');
		var pageData3= localStorage.getItem('pageData3');

        stockTabsHolder.html(tabData).fadeIn('slow');//show ul for tabs

        $('#resultListDivTweetCloud1').show();
        $('#resultListDivTweetCloud2').show();
        $('#resultListDivTweetCloud3').show();
        $('#resultsDiv01').hide().html(pageData1).fadeIn('slow');
        $('#resultsDiv02').hide().html(pageData2).fadeIn('slow');
        $('#resultsDiv03').hide().html(pageData3).fadeIn('slow');
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
        console.log(mainIndex);

        e.preventDefault();

        var query_text = $('#mainQueryInput').val();
        var stockTabs = $('#stockTabs');
        var stockTabsHolder = $('#stockTabsHolder');

        //search call
        if (query_text != '') {

            console.log("StockTabs: " + stockTabsHolder.length);

            stockTabsHolder.fadeIn('slow');//show ul for tabs

            if(mainIndex == 1){
                var resultsDiv = $('#resultsDiv01');
                $('#listOne').remove();
                stockTabs.append('<li id="listOne" class="active"><a href="#resultsDiv01" data-toggle="tab">'+ query_text +'</a></li>');
                $('#resultsDiv01').addClass("active");
                $('#resultsDiv02').removeClass("active");
                $('#resultsDiv03').removeClass("active");
                $('#listTwo').removeClass("active");
                $('#listThree').removeClass("active");

            } else if(mainIndex == 2 ){
                var resultsDiv = $('#resultsDiv02');
                $('#listTwo').remove();
                stockTabs.append('<li id="listTwo" class="active"><a href="#resultsDiv02" data-toggle="tab">'+ query_text +'</a></li>');
                $('#resultsDiv02').addClass("active");
                $('#resultsDiv01').removeClass("active");
                $('#resultsDiv03').removeClass("active");
                $('#listOne').removeClass("active");
                $('#listThree').removeClass("active");

            } else if(mainIndex == 3 ){
                var resultsDiv = $('#resultsDiv03');
                $('#listThree').remove();
                stockTabs.append('<li id="listThree" class="active"><a href="#resultsDiv03" data-toggle="tab">'+ query_text +'</a></li>');
                $('#resultsDiv03').addClass("active");
                $('#resultsDiv01').removeClass("active");
                $('#resultsDiv02').removeClass("active");
                $('#listOne').removeClass("active");
                $('#listTwo').removeClass("active");
            }

            var resultDiv = '<div class="span4 offset2 fade" id="leftDiv'+mainIndex+'"><h3 id="list"><img src="images/twitter-icon.png"/>Twitter Results</h3><div class="well" style="padding: 8px 0;" id="resultListDivTwitter'+mainIndex+'"><img style="display:block; margin:auto;" src="images/ajax-loader.gif"/></div></div><div class="span4 fade" id="rightDiv'+mainIndex+'"><h3 id="list"><img src="images/tweetcloud-icon.png"/>Stock Info Cloud</h3><div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivTweetCloud'+mainIndex+'"><img style="display:block; margin:auto;" src="images/ajax-loader.gif"/></div></div>';
            resultsDiv.html(''); //init results container div

            //show container div
            resultsDiv.html(resultDiv);
            $("#leftDiv"+mainIndex).addClass("in");
            $("#rightDiv"+mainIndex).addClass("in");

            //clean query text
            if (query_text.charAt(0) != '$')
                query_text = '$' + query_text;

            queryTwitterAPI(query_text); //call twitter api function

            //Update mainIndex
            mainIndex = updateIndex(mainIndex);

        } else {
            var errorDiv = $('#errorHolder');

            //empty search alert message
            var queryTextEmpty = '<div class="alert alert-error span4 offset4 fade" id="emptyAlert">Please enter a stock symbol <button type="button" class="close" data-dismiss="alert">&times;</button></div>';

            errorDiv.html(queryTextEmpty).fadeIn('slow'); //show empty search alert
            $("#emptyAlert").addClass("in") //add fade in class

        } //end check for empty input

        return false; //stop form normal execution
    });

    //add event listener to reset button
    $('#btnReset').click(function() {

        $('#stockTabs').empty(); //clear tabs
        $('#stockTabsHolder').hide(); //hide tab holder
        //reset global indexes
        mainIndex = 1;
        processIndex = 1;
        cloudQueryIndex = 1;
        cloudSaveIndex = 1;

        for (i = 1; i<=3 ; i++){
           var resultsDiv = $("#resultsDiv0"+i);
            resultsDiv.empty();
        }

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
function queryTwitterAPI(query_text ){
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
			$("#resultListDivTwitter"+processIndex).hide().html(listHTML).fadeIn('slow'); //show twitter list results
			
			queryWordCloudAPI(tweetCloudText.replace(new RegExp('\\' + query_text, 'g'), ''), query_text); //call word cloud API
			
		} else { //no tweets found
		
			$('#resultListDivTwitter'+processIndex).html('No related tweets found');
		}


		//Update Process Index
        	processIndex = updateIndex(processIndex);

	} //processResults
	
	//twitter api error callback
	function processError(){
		console.log('Error connecting to twitter API!');	
	}//processError
	
} //queryTwitterAPI

//Calls the MakeWordCloud API
function queryWordCloudAPI(tweet_string, query_text){
	console.log('Getting tweet cloud...');
    var resultListDivTweetCloud = $("#resultListDivTweetCloud"+cloudQueryIndex);

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
            resultListDivTweetCloud.hide().html('<img src="'+ 'http://chart.finance.yahoo.com/z?s='+ query_text +'&t=6m&q=l&l=on&z=s&p=m50,m200' +'" /><br /><img src="' + JSON.parse(item).url +'"/>').fadeIn('slow')//addLocalStorage;
		}
	});

	//update query cloud index
        cloudQueryIndex = updateIndex(cloudQueryIndex);

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
    var stockTabsHolder = $('#stockTabsHolder').html();
	var pageHTML = $("#resultsDiv0"+cloudSaveIndex).html();
	
	if(window.localStorage) {
        localStorage.setItem("tabData", stockTabsHolder);
		localStorage.setItem("pageData"+cloudSaveIndex, pageHTML);
	} else {
   		console.log('Local storage not supported');
	}

	//update Cloud Index
        cloudSaveIndex = updateIndex(cloudSaveIndex);

} //addLocalStorage
