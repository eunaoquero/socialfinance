<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SocialFinance</title>

<!-- jQuery -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<!-- Twitter Bootstrap -->
<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
<link href="//netdna.bootstrapcdn.com/bootswatch/2.3.2/flatly/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
<!-- Query API functions -->
<script src="js/queryAPI.js"></script>

</head>

<body>
<div class="navbar navbar-static-top">
	<div class="navbar-inner">
		<div class="container">
           <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
           </a>
           <a class="brand" href="../socialfinance">SocialFinance</a>
           <div class="nav-collapse collapse" id="main-menu">
            <ul class="nav" id="main-menu-left">
              <li><a href="#">About</a></li>
              <li><a href="#">Help</a></li>
            </ul>
            </div>
		</div> <!-- container -->
	</div> <!-- navbar inner -->
</div> <!-- navbar -->

<div class="container">
	<div class="row-fluid">
    	<div class="span12"></div>
    </div>
    <div class="row-fluid">
    	<div class="span12 offset2"><h3>Add to dashboard</h3></div>
    </div>
	<div class="row-fluid">
		<div class="span8 offset2">
	    <form class="well form-search" id="mainQuery">
	      <input type="text" class="input-large search-query" id="mainQueryInput" placeholder="Seach for symbol or name...">
	      <button type="submit" class="btn" id="btnSearch">Go!</button>
	    </form>
        </div>
	</div>
    
<div class="row-fluid">
    <div class="span4 offset2"> 
      <h3 id="list">Twitter Results</h3>
          <div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivTwitter"></div>
    </div>
      
	<div class="span4"> 
      <h3 id="list">Instagram Results</h3>
          <div class="well pagination-centered" style="padding: 8px 0;" id="resultListDivInsta"></div>
    </div>
</div>

</div>

  
</body>
</html>
