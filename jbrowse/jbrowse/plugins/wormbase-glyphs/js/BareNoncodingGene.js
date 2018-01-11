define("plugins/wormbase-glyphs/js/NoncodingGene", [
           'dojo/_base/declare',
           'plugins/wormbase-glyphs/js/ExonTranscript',
           'JBrowse/View/FeatureGlyph/Gene'
       ],
       function(
           declare,
           Gene
       ) {

return declare( Gene, {

_defaultConfig: function() {
    return this._mergeConfigs(
        this.inherited(arguments),
        {
            transcriptType: 'pseudogenic_transcript',
        });
},

_ptGlyph: function() {
    return this.__ptGlyph || ( this.__ptGlyph = new ExonTranscriptGlyph({ track: this.track, browser: this.browser, config: this.config }) );
}

});
});
