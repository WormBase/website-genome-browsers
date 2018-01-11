define("JBrowse/View/FeatureGlyph/miRNATranscript", [
           'dojo/_base/declare',
           'JBrowse/View/FeatureGlyph/ProcessedTranscript'
       ],  
       function(
           declare,
           ProcessedTranscript 
       ) { 

return declare( ProcessedTranscript, {

_defaultConfig: function() {
    return this._mergeConfigs(
        this.inherited(arguments),
        {   
            subParts: 'miRNA',
        }); 
}

});
});
