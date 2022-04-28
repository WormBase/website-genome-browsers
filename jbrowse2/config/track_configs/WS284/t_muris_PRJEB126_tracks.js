  export default [
   {
      "type" : "FeatureTrack",
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Curated Genes",
      "displays" : [
         {
            "displayId" : "curated_genes-t_muris_PRJEB126-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               }
            }
         }
      ],
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "trackId" : "t_muris_PRJEB126_curated_genes"
   },
   {
      "displays" : [
         {
            "displayId" : "curated_genes_(noncoding)-t_muris_PRJEB126-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 6,
               "color1" : "gray"
            }
         }
      ],
      "trackId" : "t_muris_PRJEB126_curated_genes_noncoding",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (noncoding)",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA."
   },
   {
      "trackId" : "t_muris_PRJEB126_protein_motifs",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 7,
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "protein_motifs-t_muris_PRJEB126-LinearBasicDisplay"
         }
      ],
      "name" : "Protein motifs",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "type" : "FeatureTrack"
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "name" : "Curated Genes (protein coding)",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "trackId" : "t_muris_PRJEB126_curated_genes_protein_coding",
      "displays" : [
         {
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(protein_coding)-t_muris_PRJEB126-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "displays" : [
         {
            "displayId" : "links_and_superlinks-t_muris_PRJEB126-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "height" : 4
            }
         }
      ],
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "trackId" : "t_muris_PRJEB126_links_and_superlinks",
      "type" : "FeatureTrack",
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Links and Superlinks"
   },
   {
      "type" : "FeatureTrack",
      "name" : "RNASeq",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/RNASeq/{refseq}/trackData.jsonz"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "color1" : "black",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "displayMode" : "collapse"
            },
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq-t_muris_PRJEB126-LinearBasicDisplay"
         }
      ],
      "trackId" : "t_muris_PRJEB126_rnaseq",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ]
   },
   {
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "trackId" : "t_muris_PRJEB126_rnaseq_introns",
      "displays" : [
         {
            "renderer" : {
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "green",
               "showDescriptions" : false
            },
            "mouseover" : "jexl:get(feature,'score')+' reads",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_introns-t_muris_PRJEB126-LinearBasicDisplay"
         }
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq introns",
      "type" : "FeatureTrack"
   },
   {
      "type" : "FeatureTrack",
      "name" : "RNASeq Splice Junctions (common)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(common)-t_muris_PRJEB126-LinearBasicDisplay"
         }
      ],
      "trackId" : "t_muris_PRJEB126_rnaseq_splice_junctions_(common)",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ]
   },
   {
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "trackId" : "t_muris_PRJEB126_rnaseq_splice_junctions_(rare)",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(rare)-t_muris_PRJEB126-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "RNASeq Splice Junctions (rare)",
      "type" : "FeatureTrack"
   },
   {
      "type" : "FeatureTrack",
      "name" : "ESTs",
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'"
            },
            "displayId" : "ests-t_muris_PRJEB126-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "trackId" : "t_muris_PRJEB126_ests",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ]
   },
   {
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/t_muris_PRJEB126/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Asymmetries",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "t_muris_PRJEB126"
      ],
      "trackId" : "t_muris_PRJEB126_rnaseq_asymmetries",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "height" : 24,
               "displayMode" : "collapse"
            },
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_asymmetries-t_muris_PRJEB126-LinearBasicDisplay"
         }
      ]
   }
]
