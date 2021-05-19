/*
DownloadFastaButton JBrowse plugin 
*/
/*
    Created on : 
    Author     :
*/

define([
            'dojo/_base/declare',
            'dojo/_base/lang',
            'dojo/Deferred',
            'dojo/dom-construct',
            'dijit/form/Button',
            'dojo/fx',
            'dojo/dom',
            'dojo/dom-style',
            'dojo/on',
            'dojo/query',
            'dojo/dom-geometry',
            'JBrowse/Plugin'
       ],
       function(
           declare,
           lang,
           Deferred,
           domConstruct,
           dijitButton,
           coreFx,
           dom,
           style,
           on,
           query,
           domGeom,
           JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
        console.log("plugin DownloadFastaButton constructor");

        var thisB = this;

        // create the download button after genome view initialization
        this.browser.afterMilestone( 'initView', function() {

            var navBox = dojo.byId("navbox");

            thisB.browser.downloadFastaButton = new dijitButton(
            {
                title: "Download FASTA",
                id: "downloadfasta-btn",
                width: "24px",
                onClick: dojo.hitch( thisB, function(event) {
                    thisB.openDownloadFastaDialog();

                    //why do this?
                    dojo.stopEvent(event);
                    //
                })
            }, dojo.create('button', {}, navBox));

        });
    },

    openDownloadFastaDialog: function() {
       var refseqStore = this.browser.getStore('refseqs');
       console.log(refseqStore);
       var seq = refseqStore.getReferenceSequence();
       console.log(seq);
        
    }

});
});

