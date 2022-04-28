  export default [
   {
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "name" : "Curated Genes (pseudogenes)",
      "displays" : [
         {
            "renderer" : {
               "height" : 6,
               "type" : "SvgFeatureRenderer",
               "color1" : "gray"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(pseudogenes)-c_elegans_PRJEB28388-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_elegans_PRJEB28388_curated_genes_pseudogenes"
   },
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'"
            },
            "displayId" : "curated_genes-c_elegans_PRJEB28388-LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_elegans_PRJEB28388_curated_genes"
   },
   {
      "displays" : [
         {
            "displayId" : "curated_genes_(protein_coding)-c_elegans_PRJEB28388-LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes (protein coding)",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "type" : "FeatureTrack",
      "trackId" : "c_elegans_PRJEB28388_curated_genes_protein_coding",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ]
   },
   {
      "name" : "Curated Genes (noncoding)",
      "displays" : [
         {
            "displayId" : "curated_genes_(noncoding)-c_elegans_PRJEB28388-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "height" : 6,
               "color1" : "gray",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "trackId" : "c_elegans_PRJEB28388_curated_genes_noncoding",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_elegans_PRJEB28388"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJEB28388/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   }
]
