define([
           'dojo/_base/declare',
           'dojo/_base/Color',
           'JBrowse/View/FeatureGlyph/Box',
           'wormbase-glyphs/View/FeatureGlyph/Diamond',
           'wormbase-glyphs/View/FeatureGlyph/DownTriangle'
       ],
       function(
           declare,
           Color,
           BoxGlyph,
           DiamondGlyph,
           DownTriangleGlyph
       ) {


return declare( BoxGlyph, {
_defaultConfig: function() {
    return this._mergeConfigs(
        this.inherited(arguments),
        {
            style: {
                connectorColor: '#333',
                connectorThickness: 1,
                borderColor: 'rgba( 0, 0, 0, 0.3 )'
            },
            subParts: () => true, // accept all subparts by default
        });
},

renderFeature: function( context, fRect ) {
    if( this.track.displayMode != 'collapsed' )
        context.clearRect( Math.floor(fRect.l), fRect.t, Math.ceil(fRect.w), fRect.h );

    this.renderConnector( context,  fRect );
    this.renderSegments( context, fRect );
    this.renderLabel( context, fRect );
    this.renderDescription( context, fRect );
    this.renderArrowhead( context, fRect );
},

renderConnector: function( context, fRect ) {
    // connector
    var connectorColor = this.getStyle( fRect.f, 'connectorColor' );
    if( connectorColor ) {
        context.fillStyle = connectorColor;
        var connectorThickness = this.getStyle( fRect.f, 'connectorThickness' );

        var viewInfo = fRect.viewInfo;
        var top = fRect.t;
        var overallHeight = fRect.rect.h;

        var height = overallHeight / 2 -1;
        var left = fRect.l;
        var width = Math.ceil(fRect.w);

        context.beginPath();
        context.setLineDash([7,12]);
        context.moveTo(left,top+height);
        context.lineTo(left+width,top+height);
        context.lineWidth = 1;
        context.strokeStyle = '#202020';
        context.stroke();

        context.setLineDash([]);
    }
},

renderSegments( context, fRect ) {
    let subparts = fRect.f.children();
    if (!subparts.length) return;

    let parentFeature = fRect.f;
    let styleFunc = (feature, stylename) => {
        if (stylename === 'height')
            return this._getFeatureHeight( fRect.viewInfo, feature );

        return this.getStyle(feature, stylename) || this.getStyle(parentFeature, stylename);
    }

    for(let i = 0; i < subparts.length; ++i) {
        this.renderSegment(context, fRect.viewInfo, subparts[i], fRect.t, fRect.rect.h, fRect.f, styleFunc);
    }
},


_diaGlyph: function() {
    console.log('in dia');
    console.log(this.track);
    console.log(this.browser);
    console.log(this.config);
    return this.__diaGlyph || ( this.__diaGlyph = new DiamondGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},

_dtGlyph: function() {
    return this.__dtGlyph || ( this.__dtGlyph = new DownTriangleGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},

renderSegment(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc) {
    if (true ) {
        this._diaGlyph();
    }
    else if (false) {
        this._dtGlyph();
    }
    else {
        this.renderBox(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc);
    }
}

});
});
