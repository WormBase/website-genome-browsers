  export default [
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "type" : "FeatureTrack",
      "name" : "Curated Genes",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "trackId" : "b_malayi_PRJNA10729_curated_genes"
   },
   {
      "name" : "Curated Genes (pseudogenes)",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(pseudogenes)-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "b_malayi_PRJNA10729_curated_genes_pseudogenes",
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "type" : "FeatureTrack"
   },
   {
      "name" : "Curated Genes (protein coding)",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "displays" : [
         {
            "displayId" : "curated_genes_(protein_coding)-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "b_malayi_PRJNA10729_curated_genes_protein_coding",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "type" : "FeatureTrack"
   },
   {
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "type" : "FeatureTrack",
      "name" : "Protein motifs",
      "trackId" : "b_malayi_PRJNA10729_protein_motifs",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Protein motifs/{refseq}/trackData.jsonz"
         }
      },
      "displays" : [
         {
            "displayId" : "protein_motifs-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 7,
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            }
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ]
   },
   {
      "type" : "FeatureTrack",
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "displays" : [
         {
            "displayId" : "trans-spliced_acceptor-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "b_malayi_PRJNA10729_trans-spliced_acceptor",
      "name" : "Trans-spliced acceptor"
   },
   {
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "type" : "FeatureTrack",
      "name" : "Curated Genes (noncoding)",
      "displays" : [
         {
            "displayId" : "curated_genes_(noncoding)-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            }
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "b_malayi_PRJNA10729_curated_genes_noncoding"
   },
   {
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "type" : "FeatureTrack",
      "name" : "Links and Superlinks",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/Links and Superlinks/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "renderer" : {
               "color1" : "black",
               "height" : 4,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "links_and_superlinks-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "trackId" : "b_malayi_PRJNA10729_links_and_superlinks"
   },
   {
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "type" : "FeatureTrack",
      "name" : "ESTs",
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "displays" : [
         {
            "displayId" : "ests-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "b_malayi_PRJNA10729_ests"
   },
   {
      "type" : "FeatureTrack",
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "displays" : [
         {
            "displayId" : "rnaseq_asymmetries-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "displayMode" : "collapse",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "height" : 24,
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'"
            },
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "trackId" : "b_malayi_PRJNA10729_rnaseq_asymmetries",
      "name" : "RNASeq Asymmetries"
   },
   {
      "type" : "FeatureTrack",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "displays" : [
         {
            "renderer" : {
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "color1" : "green",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "showDescriptions" : false
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_introns-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "b_malayi_PRJNA10729_rnaseq_introns",
      "name" : "RNASeq introns"
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "type" : "FeatureTrack",
      "name" : "RNASeq Splice Junctions (common)",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(common)-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "trackId" : "b_malayi_PRJNA10729_rnaseq_splice_junctions_(common)"
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "type" : "FeatureTrack",
      "name" : "RNASeq Splice Junctions (rare)",
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(rare)-b_malayi_PRJNA10729-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "trackId" : "b_malayi_PRJNA10729_rnaseq_splice_junctions_(rare)"
   },
   {
      "name" : "RNASeq",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/b_malayi_PRJNA10729/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "renderer" : {
               "color1" : "black",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "displayMode" : "collapse"
            },
            "displayId" : "rnaseq-b_malayi_PRJNA10729-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "b_malayi_PRJNA10729"
      ],
      "trackId" : "b_malayi_PRJNA10729_rnaseq",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "type" : "FeatureTrack"
   }
]
