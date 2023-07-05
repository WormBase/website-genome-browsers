;(function () {
  class Plugin {
    name = 'VariantColorPlugin'
    version = '1.0'

    install(pluginManager) {
      pluginManager.jexl.addFunction('variantColor', f => {
            if ('variant' in f && 'INFO' in f['variant'] && 'ANN' in f['variant']['INFO']) {
                var ann = f['variant']['INFO']['ANN'][0].split('|')
                var cons = ann[1]
                if (cons.indexOf('&') > -1) {
                    cons = cons.substring(0,cons.indexOf('&'))
                }
                var color = 'peachpuff'
                     if(cons == 'frameshift_variant')                 {return '#9400D3';}
                else if(cons == 'stop_lost')                          {return '#ff0000';}
                else if(cons == '5_prime_UTR_premature_start_codon_gain_variant') {return '#7ac5cd';}
                else if(cons == 'splice_acceptor_variant ')           {return '#FF581A';}
                else if(cons == 'protein_altering_variant')           {return '#FF0080';}
                else if(cons == 'coding_sequence_variant')            {return '#458b00';}
                else if(cons == 'stop_gained')                        {return '#ff0000';}
                else if(cons == 'incomplete_terminal_codon_variant')  {return '#ff00ff';}
                else if(cons == 'transcript_ablation')                {return '#ff0000';}
                else if(cons == 'start_lost')                         {return '#ffd700';}
                else if(cons == 'splice_donor_variant')               {return '#FF581A';}
                else if(cons == 'splice_region_variant')              {return '#ff7f50';}
                else if(cons == 'missense_variant')                   {return '#ffd700';}
                else if(cons == 'inframe_deletion')                   {return '#ff69b4';}
                else if(cons == 'inframer_insertion')                 {return '#ff69b4';}
                else if(cons == '3_prime_UTR_variant')                {return '#7ac5cd';}
                else if(cons == 'synonymous_variant')                 {return '#76ee00';}
                else if(cons == 'upstream_gene_variant')              {return '#a2b5cd';}
                else if(cons == 'downstream_gene_variant')            {return '#a2b5cd';}
                else if(cons == 'non_coding_transcript_exon_variant') {return '#32cd32';}
                else if(cons == 'intron_variant')                     {return '#02599c';}
                else if(cons == '5_prime_UTR_variant')                {return '#7ac5cd';}
                else if(cons == 'stop_retained_variant')              {return '#76ee00';}
                else if(cons == 'intergenic_variant')                 {return '#636363';}
                else if(cons == 'non_coding_transcript_variant')      {return '#32cd32';}
                else if(cons == 'non_coding_exon_variant')            {return '#7ac5cd';}
                return color;
            }
            else {
                return 'black'
            }
      })
    }

    configure(pluginManager) {}
  }

  // the plugin will be included in both the main thread and web worker, so
  // install plugin to either window or self (webworker global scope)
  ;(typeof self !== 'undefined' ? self : window).JBrowsePluginVariantColorPlugin =
    {
      default: Plugin,
    }
})()


/*
const Plugin = JBrowseExports['@jbrowse/core/Plugin']

export default class VariantColor extends Plugin {
    name = 'VariantColorPlugin'

    install(pluginManager) {
        pluginManager.jexl.addFunction('variantColor', (f) => {
            if (f['variant']['INFO']['ANN']) {
                var ann = f['variant']['INFO']['ANN'][0].split('|')
                var cons = ann[1]
                if (cons.indexOf('&') > -1) {
                    cons = cons.substring(0,cons.indexOf('&'))
                }
                var color = 'peachpuff'
                     if(cons == 'frameshift_variant')                 {return '#9400D3';}
                else if(cons == 'stop_lost')                          {return '#ff0000';}
                else if(cons == '5_prime_UTR_premature_start_codon_gain_variant') {return '#7ac5cd';}
                else if(cons == 'splice_acceptor_variant ')           {return '#FF581A';}
                else if(cons == 'protein_altering_variant')           {return '#FF0080';}
                else if(cons == 'coding_sequence_variant')            {return '#458b00';}
                else if(cons == 'stop_gained')                        {return '#ff0000';}
                else if(cons == 'incomplete_terminal_codon_variant')  {return '#ff00ff';}
                else if(cons == 'transcript_ablation')                {return '#ff0000';}
                else if(cons == 'start_lost')                         {return '#ffd700';}
                else if(cons == 'splice_donor_variant')               {return '#FF581A';}
                else if(cons == 'splice_region_variant')              {return '#ff7f50';}
                else if(cons == 'missense_variant')                   {return '#ffd700';}
                else if(cons == 'inframe_deletion')                   {return '#ff69b4';}
                else if(cons == 'inframer_insertion')                 {return '#ff69b4';}
                else if(cons == '3_prime_UTR_variant')                {return '#7ac5cd';}
                else if(cons == 'synonymous_variant')                 {return '#76ee00';}
                else if(cons == 'upstream_gene_variant')              {return '#a2b5cd';}
                else if(cons == 'downstream_gene_variant')            {return '#a2b5cd';}
                else if(cons == 'non_coding_transcript_exon_variant') {return '#32cd32';}
                else if(cons == 'intron_variant')                     {return '#02599c';}
                else if(cons == '5_prime_UTR_variant')                {return '#7ac5cd';}
                else if(cons == 'stop_retained_variant')              {return '#76ee00';}
                else if(cons == 'intergenic_variant')                 {return '#636363';}
                else if(cons == 'non_coding_transcript_variant')      {return '#32cd32';}
                else if(cons == 'non_coding_exon_variant')            {return '#7ac5cd';}
                return color; 
            }
            else {
                return 'black'
            }
        })
    }
}
*/

