  export default [
   {
      "name" : "Curated Genes (protein coding)",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567"
            },
            "displayId" : "curated_genes_(protein_coding)-c_becei_PRJEB28243-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_becei_PRJEB28243"
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_becei_PRJEB28243_curated_genes_protein_coding",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_becei_PRJEB28243/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "trackId" : "c_becei_PRJEB28243_curated_genes",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_becei_PRJEB28243/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "type" : "FeatureTrack",
      "name" : "Curated Genes",
      "assemblyNames" : [
         "c_becei_PRJEB28243"
      ],
      "displays" : [
         {
            "displayId" : "curated_genes-c_becei_PRJEB28243-LinearBasicDisplay",
            "renderer" : {
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567"
            },
            "type" : "LinearBasicDisplay"
         }
      ]
   }
]
