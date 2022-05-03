  export default [
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "displays" : [
         {
            "displayId" : "curated_genes-c_sulstoni_PRJEB12601-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color3" : "#965567"
            }
         }
      ],
      "assemblyNames" : [
         "c_sulstoni_PRJEB12601"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_sulstoni_PRJEB12601/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         }
      },
      "type" : "FeatureTrack",
      "name" : "Curated Genes",
      "trackId" : "c_sulstoni_PRJEB12601_curated_genes"
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_sulstoni_PRJEB12601/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack",
      "name" : "Curated Genes (protein coding)",
      "trackId" : "c_sulstoni_PRJEB12601_curated_genes_protein_coding",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "displays" : [
         {
            "renderer" : {
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(protein_coding)-c_sulstoni_PRJEB12601-LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_sulstoni_PRJEB12601"
      ]
   }
]
