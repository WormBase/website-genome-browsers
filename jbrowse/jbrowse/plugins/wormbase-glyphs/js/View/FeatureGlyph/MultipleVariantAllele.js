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

_boxGlyph: function() {
    return this.__boxGlyph || ( this.__boxGlyph = new BoxGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},
_diaGlyph: function() {
    return this.__diaGlyph || ( this.__diaGlyph = new DiamondGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},
_dtGlyph: function() {
    return this.__dtGlyph || ( this.__dtGlyph = new DownTriangleGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},

_getFeatureRectangle: function( viewArgs, feature ) {

    // lay out rects for each of the subfeatures
    var subArgs = lang.mixin( {}, viewArgs );
    subArgs.showDescriptions = subArgs.showLabels = false;
    var subfeatures = feature.children();

    // get the rects for the children
    var padding = 1;
    var fRect = {
        l: 0,
        h: 0,
        r: 0,
        w: 0,
        subRects: [],
        viewInfo: viewArgs,
        f: feature,
        glyph: this
    };
    if( subfeatures && subfeatures.length ) {
        // sort the children by name
        subfeatures.sort( function( a, b ) { return (a.get('name') || '').localeCompare( b.get('name')||'' ); } );

        fRect.l = Infinity;
        fRect.r = -Infinity;

        var transcriptType; // will be an array even if most of the time there will be only one element
        var transcriptTypeStr = this.getConfForFeature( 'transcriptType', feature );
        transcriptType = transcriptTypeStr.split(',');

        for( var i = 0; i < subfeatures.length; i++ ) {
            var diaType = false;
            var dtType = false;
            var subRect;
            if (subfeatures[i].get('type') == 'point_mutation' ||
                subfeatures[i].get('type') == 'SNV')                 {diaType = true;}
            else if (subfeatures[i].get('type') == 'insertion')      {dtType  = true;}

            if (diaType) {
                subRect = this._diaGlyph()._getFeatureRectangle( subArgs, subfeatures[i] );
            }
            else if (dtType) {
                subRect = this._dtGlyph()._getFeatureRectangle( subArgs, subfeatures[i] );
            }
            else {
                subRect = this._boxGlyph()._getFeatureRectangle( subArgs, subfeatures[i] );
            }

            padding = i == subfeatures.length-1 ? 0 : 1;
            subRect.t = subRect.rect.t = fRect.h && viewArgs.displayMode != 'collapsed' ? fRect.h+padding : 0;

            if( viewArgs.showLabels && this.getConfForFeature( 'labelTranscripts', subfeatures[i] ) ) {
                var transcriptLabel = this.makeSideLabel(
                    this.getFeatureLabel(subfeatures[i]),
                    this.getStyle( subfeatures[i], 'transcriptLabelFont'),
                    subRect
                );
                if( transcriptLabel ) {
                    transcriptLabel.fill = this.getStyle( subfeatures[i], 'transcriptLabelColor' );
                    subRect.label = transcriptLabel;
                    subRect.l -= transcriptLabel.w;
                    subRect.w += transcriptLabel.w;
                    if( transcriptLabel.h > subRect.h )
                        subRect.h = transcriptLabel.h;
                    transcriptLabel.yOffset = Math.floor(subRect.h/2);
                    transcriptLabel.xOffset = 0;
                }
            }

            fRect.subRects.push( subRect );
            fRect.r = Math.max( fRect.r, subRect.l+subRect.w-1 );
            fRect.l = Math.min( fRect.l, subRect.l );
            fRect.h = subRect.t+subRect.h+padding;
        } // closes subfeature for loop
   } //closes if subfeatures block

    // calculate the width
    fRect.w = Math.max( fRect.r - fRect.l + 1, 2 );
    delete fRect.r;
    fRect.rect = { l: fRect.l, h: fRect.h, w: fRect.w };
    if( viewArgs.displayMode != 'compact' )
        fRect.h += this.getStyle( feature, 'marginBottom' ) || 0;

    // no labels or descriptions if displayMode is collapsed, so stop here
    if( viewArgs.displayMode == "collapsed")
        return fRect;

    // expand the fRect to accommodate labels if necessary
    this._expandRectangleWithLabels( viewArgs, feature, fRect );
    this._addMasksToRect( viewArgs, feature, fRect );

    return fRect;
},

layoutFeature: function( viewInfo, layout, feature ) {
    var fRect = this.inherited( arguments );
    if( fRect )
        array.forEach( fRect.subRects, function( subrect ) {
                           subrect.t += fRect.t;
                           subrect.rect.t += fRect.t;
                       });
    return fRect;
},

/* look more closely from here to end */
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
