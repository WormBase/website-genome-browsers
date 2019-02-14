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


         var browser = this.browser;
         if( browser.config.show_menu && browser.config.show_nav ) {
            JBrowse.afterMilestone('completely initialized', function() {
                var url    = location.href;
  console.log(url);
                var mod_str ='';
                var wb_logo = '';
                if (url.match('PRJNA13758')) {
                    mod_str =  '<a href="/tools/genome/jbrowse-simple/full.html?data=data%2Fold-modencode">Looking for older modENCODE data?</a>';
                }
                if (url.match('full.html')) {
                    wb_logo = '<a href="/"><img src="https://wormbase.org/img/logo/logo_wormbase_gradient.svg" width="200px"></a> <br/>';
                }
                var parent = document.getElementById('dijit_layout_ContentPane_2');
                //console.log('parent is '+parent.innerHTML);
                //parent.innerHTML = wb_logo + mod_str + parent.innerHTML;
                dojo.place(wb_logo + mod_str, parent, "first");
            });
          }

        }
    });
});