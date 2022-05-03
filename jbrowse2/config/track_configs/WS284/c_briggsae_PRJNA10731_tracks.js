  export default [
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_curated_genes",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "color3" : "#965567",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               }
            },
            "displayId" : "curated_genes-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes"
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Genome sequence errors/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "description" : "Positions within the reference genome sequence that have been identified as having a base call error. This error has not yet been corrected.",
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "genome_sequence_errors-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "height" : 6,
               "type" : "SvgFeatureRenderer",
               "color1" : "red"
            }
         }
      ],
      "name" : "Genome sequence errors",
      "trackId" : "c_briggsae_PRJNA10731_genome_sequence_errors",
      "type" : "FeatureTrack"
   },
   {
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Protein motifs/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "displayId" : "protein_motifs-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'",
               "type" : "SvgFeatureRenderer",
               "height" : 7
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Protein motifs",
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_protein_motifs"
   },
   {
      "trackId" : "c_briggsae_PRJNA10731_curated_genes_pseudogenes",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 6,
               "color1" : "gray"
            },
            "displayId" : "curated_genes_(pseudogenes)-c_briggsae_PRJNA10731-LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes (pseudogenes)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ]
   },
   {
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(protein_coding)-c_briggsae_PRJNA10731-LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes (protein coding)",
      "trackId" : "c_briggsae_PRJNA10731_curated_genes_protein_coding",
      "type" : "FeatureTrack"
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'"
            },
            "displayId" : "trans-spliced_acceptor-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Trans-spliced acceptor",
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_trans-spliced_acceptor"
   },
   {
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
         }
      },
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_curated_genes_noncoding",
      "name" : "Curated Genes (noncoding)",
      "displays" : [
         {
            "renderer" : {
               "color1" : "gray",
               "type" : "SvgFeatureRenderer",
               "height" : 6
            },
            "displayId" : "curated_genes_(noncoding)-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_rnaseq",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "displayId" : "rnaseq-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "displayMode" : "collapse",
               "showLabels" : false
            }
         }
      ],
      "name" : "RNASeq",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature."
   },
   {
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/ESTs (best)/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_briggsae_PRJNA10731_ests",
      "type" : "FeatureTrack",
      "name" : "ESTs",
      "displays" : [
         {
            "displayId" : "ests-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "trackId" : "c_briggsae_PRJNA10731_rnaseq_asymmetries",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 24,
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "showLabels" : false,
               "displayMode" : "collapse"
            },
            "displayId" : "rnaseq_asymmetries-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "name" : "RNASeq Asymmetries",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         }
      },
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ]
   },
   {
      "name" : "Microarray oligo probes",
      "displays" : [
         {
            "displayId" : "microarray_oligo_probes-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "height" : 4,
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_microarray_oligo_probes",
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Microarray oligo probes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_rnaseq_introns",
      "name" : "RNASeq introns",
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_introns-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "showDescriptions" : false,
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "type" : "SvgFeatureRenderer",
               "color1" : "green"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/RNASeq introns/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_rnaseq_splice_junctions_(common)",
      "name" : "RNASeq Splice Junctions (common)",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            },
            "displayId" : "rnaseq_splice_junctions_(common)-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_rnaseq_splice_junctions_(rare)",
      "name" : "RNASeq Splice Junctions (rare)",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_splice_junctions_(rare)-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "assemblyNames" : [
         "c_briggsae_PRJNA10731"
      ],
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_briggsae_PRJNA10731/tracks/Links and Superlinks/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack",
      "trackId" : "c_briggsae_PRJNA10731_links_and_superlinks",
      "name" : "Links and Superlinks",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "links_and_superlinks-c_briggsae_PRJNA10731-LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "height" : 4
            }
         }
      ]
   }
]
