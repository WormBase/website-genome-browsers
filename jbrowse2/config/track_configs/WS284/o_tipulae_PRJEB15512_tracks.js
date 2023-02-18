  export default [
   {
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "trackId" : "o_tipulae_PRJEB15512_curated_genes_protein_coding",
      "displays" : [
         {
            "displayId" : "curated_genes_(protein_coding)-o_tipulae_PRJEB15512-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "name" : "Curated Genes (protein coding)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_tipulae_PRJEB15512/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "o_tipulae_PRJEB15512"
      ],
      "type" : "FeatureTrack"
   },
   {
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567"
            },
            "displayId" : "curated_genes-o_tipulae_PRJEB15512-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "trackId" : "o_tipulae_PRJEB15512_curated_genes",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_tipulae_PRJEB15512"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_tipulae_PRJEB15512/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         }
      },
      "name" : "Curated Genes"
   }
]