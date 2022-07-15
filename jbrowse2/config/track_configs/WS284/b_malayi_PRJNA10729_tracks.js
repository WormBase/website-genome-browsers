  export default [
   {
      "displays" : [
         {
            "displayId" : "curated_genes-b_malayi_PRJNA10729-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "name" : "Curated Genes",
      "trackId" : "b_malayi_PRJNA10729_curated_genes",
      "type" : "FeatureTrack",
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes."
   },
   {
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "height" : 6,
               "color1" : "gray",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(pseudogenes)-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "trackId" : "b_malayi_PRJNA10729_curated_genes_pseudogenes",
      "name" : "Curated Genes (pseudogenes)",
      "type" : "FeatureTrack"
   },
   {
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "trackId" : "b_malayi_PRJNA10729_curated_genes_protein_coding",
      "name" : "Curated Genes (protein coding)",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567"
            },
            "displayId" : "curated_genes_(protein_coding)-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ]
   },
   {
      "name" : "Protein motifs",
      "type" : "FeatureTrack",
      "trackId" : "b_malayi_PRJNA10729_protein_motifs",
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 7,
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            },
            "displayId" : "protein_motifs-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "name" : "Trans-spliced acceptor",
      "type" : "FeatureTrack",
      "trackId" : "b_malayi_PRJNA10729_trans-spliced_acceptor",
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "trans-spliced_acceptor-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ]
   },
   {
      "name" : "Curated Genes (noncoding)",
      "trackId" : "b_malayi_PRJNA10729_curated_genes_noncoding",
      "type" : "FeatureTrack",
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "displays" : [
         {
            "displayId" : "curated_genes_(noncoding)-b_malayi_PRJNA10729-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 6,
               "color1" : "gray"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ]
   },
   {
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "name" : "Links and Superlinks",
      "type" : "FeatureTrack",
      "trackId" : "b_malayi_PRJNA10729_links_and_superlinks",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 4,
               "color1" : "black"
            },
            "displayId" : "links_and_superlinks-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "trackId" : "b_malayi_PRJNA10729_ests",
      "name" : "ESTs",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "ests-b_malayi_PRJNA10729-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ]
   },
   {
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "name" : "RNASeq Asymmetries",
      "trackId" : "b_malayi_PRJNA10729_rnaseq_asymmetries",
      "type" : "FeatureTrack",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "displayId" : "rnaseq_asymmetries-b_malayi_PRJNA10729-LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "displayMode" : "collapse",
               "height" : 24
            }
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ]
   },
   {
      "displays" : [
         {
            "renderer" : {
               "color1" : "green",
               "showDescriptions" : false,
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq_introns-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "type" : "FeatureTrack",
      "name" : "RNASeq introns",
      "trackId" : "b_malayi_PRJNA10729_rnaseq_introns",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display."
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "trackId" : "b_malayi_PRJNA10729_rnaseq_splice_junctions_(common)",
      "name" : "RNASeq Splice Junctions (common)",
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
         }
      },
      "displays" : [
         {
            "displayId" : "rnaseq_splice_junctions_(common)-b_malayi_PRJNA10729-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'score')>20000?(get(feature,'strand')>0?'#730073':'#007373'):get(feature,'strand')>0?'#'+hex(round(255-(140*(get(feature,'score')/20000))))+'00'+hex(round(255-(140*(get(feature,'score')/20000)))):'#00'+hex(round(255-(140*(get(feature,'score')/20000))))+hex(round(255-(140*(get(feature,'score')/20000))))",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ]
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_splice_junctions_(rare)-b_malayi_PRJNA10729-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            }
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "trackId" : "b_malayi_PRJNA10729_rnaseq_splice_junctions_(rare)",
      "name" : "RNASeq Splice Junctions (rare)",
      "type" : "FeatureTrack"
   },
   {
      "trackId" : "b_malayi_PRJNA10729_rnaseq",
      "name" : "RNASeq",
      "type" : "FeatureTrack",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "displays" : [
         {
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "displayMode" : "collapse",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ]
   }
]
