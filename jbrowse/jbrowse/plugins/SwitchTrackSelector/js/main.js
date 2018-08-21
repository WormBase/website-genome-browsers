define([
           'dojo/_base/declare',
           'dojo/query',
   	   'dijit/form/Button',
           'JBrowse/Plugin'
       ],
       function(
           declare,
           query,
	   dijitButton,
           JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
		
		var thisBrowser = this.browser;

                if (thisBrowser.config.show_menu && thisBrowser.config.show_nav) {
       		  var switchSelector = this.makeSelectorButton();
		

		  thisBrowser.afterMilestone('initView', function() {
	
			var myMenu = thisBrowser.menuBar;
			
        		console.log( "switcher plugin starting" );

			myMenu.appendChild(switchSelector);
		
		  })
                }
        
		console.log( "switcher plugin added" );
	},

    makeSelectorButton: function () {
	
	var switchSelector = function(){
		var ele = document.getElementById("GenomeBrowser");
		var doc = document;
	
		console.log("entering switcher");

                var url;
                var fullurl = document.location;

		if (String(fullurl).match('jbrowse-simple')) {
			if (String(fullurl).match('full.html')) {
				url = '/tools/genome/jbrowse/full.html';
			}
			else {
				url = '/tools/genome/jbrowse/';
			}
                }
		else {
			if (String(fullurl).match('full.html')) {
				url = '/tools/genome/jbrowse-simple/full.html';
			}
			else {
				url = '/tools/genome/jbrowse-simple/';
			}
		}

                var get = document.location.search;
                var get2 = get.replace(/nav=0/,'nav=1');
                var get3 = get2.replace(/overview=0/, 'overview=1');
                var get4 = get3.replace(/tracklist=0/, 'tracklist=1');
                var get5 = get4.replace(/c_elegans_simple/, 'c_elegans_PRJNA13758');
                var newWindow = window.open(url+get5, "WormBase JBrowse");

	};

	var selectSelectorButton = new dijitButton({
		className :"switcher-button",
		innerHTML:"Track selector",
		title: "Switch to a different track selector",
		onClick : function(){
	
			switchSelector();
		
		}
	});

	return selectSelectorButton.domNode;
    }
}); 
});
