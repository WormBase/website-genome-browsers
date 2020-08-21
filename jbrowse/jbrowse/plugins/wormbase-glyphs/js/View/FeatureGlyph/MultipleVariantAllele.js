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
},

renderConnector: function( context, fRect ) {
    // connector
    var connectorColor = this.getStyle( fRect.f, 'connectorColor' );
    if( connectorColor ) {
        context.fillStyle = connectorColor;
        var connectorThickness = this.getStyle( fRect.f, 'connectorThickness' );
        context.setLineDash([7,12]);
        context.fillRect(
            fRect.rect.l, // left
            Math.round(fRect.rect.t+(fRect.rect.h-connectorThickness)/2), // top
            fRect.rect.w, // width
            connectorThickness
        );
        context.setLineDash([]);
    }
},

renderSegments( context, fRect ) {
    let subparts = this._getSubparts( fRect.f );
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

renderSegment(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc) {
    // this is where the decision for what shape to use will have to happen
    this.renderBox(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc);
},

_getSubparts( feature ) {
    let children = feature.children() || [];
    return children;
}

});
});
