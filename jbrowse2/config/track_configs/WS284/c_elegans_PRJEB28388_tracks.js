  export default [
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "name" : "Curated Genes (pseudogenes)",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "trackId" : "c_elegans_PRJEB28388_curated_genes_pseudogenes",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(pseudogenes)-c_elegans_PRJEB28388-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            }
         }
      ]
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "name" : "Curated Genes",
      "trackId" : "c_elegans_PRJEB28388_curated_genes",
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "type" : "FeatureTrack",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'"
            },
            "displayId" : "curated_genes-c_elegans_PRJEB28388-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "Curated Genes (protein coding)",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "trackId" : "c_elegans_PRJEB28388_curated_genes_protein_coding",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(protein_coding)-c_elegans_PRJEB28388-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "trackId" : "c_elegans_PRJEB28388_curated_genes_noncoding",
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            },
            "displayId" : "curated_genes_(noncoding)-c_elegans_PRJEB28388-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Curated Genes (noncoding)",
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA."
   }
]
