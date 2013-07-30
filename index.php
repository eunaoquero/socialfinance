<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="no-store" />
<title>SocialFinance</title>

<!-- jQuery -->
<script src="js/jquery.min.js"></script>
<!-- Twitter Bootstrap -->
<script src="js/bootstrap.min.js"></script>
<link href="css/bootstrap.min.css" rel="stylesheet">
<!-- Additional CSS before responsive CSS kicks in -->
<style type="text/css">
    body {
        padding-top: 90px;
    }
</style>
<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
<!-- Query API functions -->
<script src="js/queryAPI.js"></script>

</head>

<body id="top">
<div class="navbar navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container">
           <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
           </a>
           <a class="brand" href="index.php">SocialFinance</a>
           <div class="nav-collapse collapse" id="main-menu">
            <ul class="nav" id="main-menu-left">
              <li><a href="#modalAbout" data-toggle="modal">About</a></li>
              <li><a href="#">Help</a></li>
            </ul>
            </div>
		</div> <!-- container -->
	</div> <!-- navbar inner -->
</div> <!-- navbar -->

<div class="container">
	<div class="row-fluid">
    	<div class="span8 offset2"><h3>Check your investments</h3></div>
    </div>
        
	<div class="row-fluid">
		<div class="span8 offset2">
	    <form class="well form-search" id="mainQuery">
	      <input type="text" class="input-large search-query" id="mainQueryInput" placeholder="Enter stock symbol..." data-provide="typeahead" autocomplete="off">
	      <button type="submit" class="btn btn-success" id="btnSearch"><i class="icon-search icon-white"></i> Go!</button>
          <button type="reset" class="btn" id="btnReset">Reset</button>
	    </form>
        </div>
	</div>

    <div class="row-fluid">
        <div class="span8 offset2" id="errorHolder"></div>
    </div>

    <div class="row-fluid">
        <div class="span8 offset2" id="stockTabsHolder" style="display:none">
            <ul class="nav nav-tabs" id="stockTabs" data-tabs="tabs"></ul>
        </div>
    </div>

    <div class="row-fluid">
        <div class="tab-content" id="resultsHolder">
            <div class="row-fluid tab-pane" id="resultsDiv01">
            </div>
            <div class="row-fluid tab-pane" id="resultsDiv02">
            </div>
            <div class="row-fluid tab-pane" id="resultsDiv03">
            </div>
        </div>
    </div>

</div> <!-- container -->

<div class="container">
	<div class="navbar navbar-static-bottom">
        <div class="row-fluid">
    		<div class="span8 offset2">	
                <hr>
                <p class="pull-right"><a href="#top">Back to top</a></p>
            	<p><small><strong>SocialFinance</strong> an MIST 7571 project</small><br/>
                <small>Davis | Lord | Pacis | Silva</small><br/>
                <a href="http://bootswatch.com/flatly/" target="_blank"><small>Flatly</small></a> <small>with</small> <a href="http://twitter.github.io/bootstrap/" target="_blank"><small>Bootstrap</small></a>
                </p>
			</div>
		</div>
	</div>
</div>

<div id="modalAbout" class="modal hide fade">
	<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>About</h3>
  	</div>
  	<div class="modal-body">
    	<p><strong>SocialFinance</strong> is an MIST 7571 project for Summer 2013 by Team 4.</p>
        <p>Team 4 is comprised of:
        	<ul>
            	<li>Davis Buckheister</li>
            	<li>Brian Lord</li>
                <li>Rodney Pacis</li>
                <li>Rafael Silva</li>
            </ul>
        </p>
  	</div>
  	<div class="modal-footer">
    	<a href="#" class="btn" data-dismiss="modal">Close</a>
  	</div>
</div> <!-- modalAbout -->
  
</body>
</html>
