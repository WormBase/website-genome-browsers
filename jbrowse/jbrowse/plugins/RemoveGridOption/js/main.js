
define([
           'dojo/_base/declare',
           'dojo/_base/lang',
           'dijit/MenuItem',
           'JBrowse/Plugin'
       ],
       function(
           declare,
           lang,
           dijitMenuItem,
           JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {

        this.browser.afterMilestone('initView', function() {
            this.browser.addGlobalMenuItem( 'view', new dijitMenuItem(
                                           {
                                               label: 'Toggle grid lines',
                                               iconClass: 'dijitIconBookmark',
                                               onClick: lang.hitch(this, 'toggleGridLines')
                                           }));
        }, this );
        console.log('RemoveGridOption starting');
    },

    toggleGridLines: function() {
        dojo.toggleClass(this.browser.config.containerID, 'removegrid');
    }
});
});
