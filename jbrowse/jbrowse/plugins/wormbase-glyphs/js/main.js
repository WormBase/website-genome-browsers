define([
    'dojo/_base/declare',
    'JBrowse/Plugin'
],
function (
    declare,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function (/* args*/) {
            console.log('wormbase-glyphs plugin starting');

//            setTimeout(function() {
//                var parent = document.getElementById('dijit_layout_ContentPane_2');
//                console.log('parent is '+parent.innerHTML);
//                parent.innerHTML = '<a href="/"><img src="https://wormbase.org/img/logo/logo_wormbase_gradient.svg" width="200px"></a>' + parent.innerHTML;
//               
//            }, 25000);


            JBrowse.afterMilestone('completely initialized', function() {
                var parent = document.getElementById('dijit_layout_ContentPane_2');
                //console.log('parent is '+parent.innerHTML);
                parent.innerHTML = '<a href="/"><img src="https://wormbase.org/img/logo/logo_wormbase_gradient.svg" width="200px"></a> <br/><a href="/tools/genome/jbrowse-simple/full.html?data=data%2Fold-modencode">Looking for older modENCODE data?</a>' + parent.innerHTML;
                
            });
        }
    });
});
