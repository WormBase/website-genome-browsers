define([
           'dojo/_base/declare',
           'dojo/_base/Color',
           'JBrowse/View/FeatureGlyph/Box'
       ],
       function(
           declare,
           Color,
           BoxGlyph
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

_diaGlyph: function(context, viewInfo, feature, top, overallHeight, parentFeature, style) {
     //inlined code from Diamond.js--ugly but it works!
        var center_on_left = false;
        var minwidth = 8;
        var left  = viewInfo.block.bpToX( feature.get('start') );
        var width = viewInfo.block.bpToX( feature.get('end') ) - left;

        if (width < minwidth) {
            width = minwidth;
            center_on_left = true;
        }

        style = style || lang.hitch( this, 'getStyle' );

        var height = this._getFeatureHeight( viewInfo, feature );
        if( ! height )
            return;
        if( height != overallHeight )
            top += Math.round( (overallHeight - height)/2 );

        // background
        var bgcolor = style( feature, 'color' );
        if (center_on_left) {
            if (bgcolor) {
                context.fillStyle = bgcolor;
                context.beginPath();
                context.moveTo(left-width/2,top+height/2);
                context.lineTo(left,top);
                context.lineTo(left+width/2,top+height/2);
                context.lineTo(left,top+height);
                context.closePath();
                context.fill();
            }
            else {
                context.clearRect( left-width/2, top, left+width/2, height );
            }
        }
        else {
            if( bgcolor ) {
                context.fillStyle = bgcolor;
                context.beginPath();
                context.moveTo(left,top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top);
                context.lineTo(left+Math.max(minwidth,width),top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top+height);
                context.closePath();
                context.fill();
            }
            else {
                context.clearRect( left, top, Math.max(8,width), height );
            }
        }
        // foreground border
        var borderColor, lineWidth;
        if( (borderColor = style( feature, 'borderColor' )) && ( lineWidth = style( feature, 'borderWidth')) ) {
            if (center_on_left) {
                context.lineWidth = lineWidth;
                context.strokeStyle = borderColor;

                context.beginPath();
                context.moveTo(left-width/2,top+height/2);
                context.lineTo(left,top);
                context.lineTo(left+width/2,top+height/2);
                context.lineTo(left,top+height);
                context.closePath();
                context.stroke();
            }
            else {
                context.lineWidth = lineWidth;
                context.strokeStyle = borderColor;

                context.beginPath();
                context.moveTo(left,top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top);
                context.lineTo(left+Math.max(minwidth,width),top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top+height);
                context.closePath();
                context.stroke();
            }
        }
},

_dtGlyph: function(context, viewInfo, feature, top, overallHeight, parentFeature, style) {
        var minwidth = 8;
        var center_on_left = false;
        var left  = viewInfo.block.bpToX( feature.get('start') );
        var width = viewInfo.block.bpToX( feature.get('end') ) - left;

        if (width < minwidth) {
            width = minwidth;
            center_on_left = true;
        }

        style = style || lang.hitch( this, 'getStyle' );

        var height = this._getFeatureHeight( viewInfo, feature );
        if( ! height )
            return;
        if( height != overallHeight )
            top += Math.round( (overallHeight - height)/2 );

        // background
        var bgcolor = style( feature, 'color' );
        if (center_on_left) {
            if( bgcolor ) {
                context.fillStyle = bgcolor;
                context.beginPath();
                context.moveTo(left-minwidth/2,top);
                context.lineTo(left,top+height);
                context.lineTo(left + minwidth/2 ,top);
                context.closePath();
                context.fill();
            }
            else {
                context.clearRect( left-minwidth/2, top, left+minwidth/2, height );
            }
        }
        else {
            if( bgcolor ) {
                context.fillStyle = bgcolor;
                context.beginPath();
                context.moveTo(left,top);
                context.lineTo(left + Math.max(minwidth,width)/2,top+height);
                context.lineTo(left + Math.max(minwidth,width),top);
                context.closePath();
                context.fill();
            }
            else {
                context.clearRect( left, top, Math.max(8,width), height );
            }
        }

        var borderColor, lineWidth;
        if( (borderColor = style( feature, 'borderColor' )) && ( lineWidth = style( feature, 'borderWidth')) ) {
            if (center_on_left) {
                context.lineWidth = lineWidth;
                context.strokeStyle = borderColor;

                context.beginPath();
                context.moveTo(left - minwidth/2,top);
                context.lineTo(left ,top+height);
                context.lineTo(left + minwidth/2,top);
                context.closePath();
                context.stroke();
            }
            else {
                context.lineWidth = lineWidth;
                context.strokeStyle = borderColor;

                context.beginPath();
                context.moveTo(left,top);
                context.lineTo(left + Math.max(minwidth,width)/2,top+height);
                context.lineTo(left + Math.max(minwidth,width),top);
                context.closePath();
                context.stroke();
            }
       }
},


renderSegment(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc) {
    if (segmentFeature.get('type') == 'point_mutation' || 
        segmentFeature.get('type') == 'SNV' ||
        segmentFeature.get('type') == 'SNP') {
        this._diaGlyph(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc);
    }
    else if (segmentFeature.get('type').match('insertion')) {
        this._dtGlyph(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc);
    }
    else {
        this.renderBox(context, viewInfo, segmentFeature, topPx, heightPx, parentFeature, styleFunc);
    }
}



});
});
