  export default [
   {
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "name" : "Curated Genes (noncoding)",
      "trackId" : "s_ratti_PRJEB125_curated_genes_noncoding",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 6,
               "color1" : "gray"
            },
            "displayId" : "curated_genes_(noncoding)-s_ratti_PRJEB125-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "type" : "FeatureTrack"
   },
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "type" : "FeatureTrack",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "displayId" : "curated_genes-s_ratti_PRJEB125-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "trackId" : "s_ratti_PRJEB125_curated_genes",
      "name" : "Curated Genes"
   },
   {
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(protein_coding)-s_ratti_PRJEB125-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "s_ratti_PRJEB125_curated_genes_protein_coding",
      "name" : "Curated Genes (protein coding)",
      "type" : "FeatureTrack"
   },
   {
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "trackId" : "s_ratti_PRJEB125_protein_motifs",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "protein_motifs-s_ratti_PRJEB125-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'",
               "height" : 7,
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Protein motifs",
      "type" : "FeatureTrack"
   },
   {
      "type" : "FeatureTrack",
      "trackId" : "s_ratti_PRJEB125_trans-spliced_acceptor",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "trans-spliced_acceptor-s_ratti_PRJEB125-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Trans-spliced acceptor",
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ]
   },
   {
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "type" : "FeatureTrack",
      "name" : "RNASeq",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "displayMode" : "collapse",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "color1" : "black"
            },
            "displayId" : "rnaseq-s_ratti_PRJEB125-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "trackId" : "s_ratti_PRJEB125_rnaseq",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/RNASeq/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "type" : "FeatureTrack",
      "trackId" : "s_ratti_PRJEB125_ests",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "ests-s_ratti_PRJEB125-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/ESTs (best)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "ESTs"
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_introns-s_ratti_PRJEB125-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "renderer" : {
               "color1" : "green",
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "showLabels" : false,
               "showDescriptions" : false,
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "trackId" : "s_ratti_PRJEB125_rnaseq_introns",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/RNASeq introns/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq introns",
      "type" : "FeatureTrack",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ]
   },
   {
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(common)-s_ratti_PRJEB125-LinearBasicDisplay"
         }
      ],
      "trackId" : "s_ratti_PRJEB125_rnaseq_splice_junctions_(common)",
      "name" : "RNASeq Splice Junctions (common)",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads."
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "name" : "RNASeq Splice Junctions (rare)",
      "trackId" : "s_ratti_PRJEB125_rnaseq_splice_junctions_(rare)",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_splice_junctions_(rare)-s_ratti_PRJEB125-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "type" : "FeatureTrack"
   },
   {
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "type" : "FeatureTrack",
      "name" : "RNASeq Asymmetries",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "height" : 24,
               "displayMode" : "collapse",
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_asymmetries-s_ratti_PRJEB125-LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "trackId" : "s_ratti_PRJEB125_rnaseq_asymmetries"
   },
   {
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "assemblyNames" : [
         "s_ratti_PRJEB125"
      ],
      "name" : "Links and Superlinks",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/s_ratti_PRJEB125/tracks/Links and Superlinks/{refseq}/trackData.jsonz"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "black",
               "height" : 4
            },
            "displayId" : "links_and_superlinks-s_ratti_PRJEB125-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "trackId" : "s_ratti_PRJEB125_links_and_superlinks",
      "type" : "FeatureTrack"
   }
]
