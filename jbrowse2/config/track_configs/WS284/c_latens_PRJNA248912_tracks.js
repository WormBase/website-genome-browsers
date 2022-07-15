  export default [
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_latens_PRJNA248912/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "c_latens_PRJNA248912_curated_genes_protein_coding",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_latens_PRJNA248912"
      ],
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "displays" : [
         {
            "displayId" : "curated_genes_(protein_coding)-c_latens_PRJNA248912-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'"
            }
         }
      ],
      "name" : "Curated Genes (protein coding)"
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_latens_PRJNA248912/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "type" : "FeatureTrack",
      "trackId" : "c_latens_PRJNA248912_curated_genes",
      "assemblyNames" : [
         "c_latens_PRJNA248912"
      ],
      "name" : "Curated Genes",
      "displays" : [
         {
            "renderer" : {
               "color3" : "#965567",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes-c_latens_PRJNA248912-LinearBasicDisplay"
         }
      ],
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes."
   }
]
