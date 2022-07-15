  export default [
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "Curated Genes (noncoding)",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "trackId" : "c_japonica_PRJNA12591_curated_genes_noncoding",
      "displays" : [
         {
            "displayId" : "curated_genes_(noncoding)-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "height" : 6,
               "type" : "SvgFeatureRenderer",
               "color1" : "gray"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA."
   },
   {
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_japonica_PRJNA12591_curated_genes_pseudogenes",
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "displays" : [
         {
            "displayId" : "curated_genes_(pseudogenes)-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "Curated Genes (pseudogenes)"
   },
   {
      "name" : "Trans-spliced acceptor",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "trans-spliced_acceptor-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "trackId" : "c_japonica_PRJNA12591_trans-spliced_acceptor"
   },
   {
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(protein_coding)-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567"
            }
         }
      ],
      "trackId" : "c_japonica_PRJNA12591_curated_genes_protein_coding",
      "name" : "Curated Genes (protein coding)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "trackId" : "c_japonica_PRJNA12591_protein_motifs",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "protein_motifs-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "height" : 7,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            }
         }
      ],
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "name" : "Protein motifs",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "name" : "Curated Genes",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "trackId" : "c_japonica_PRJNA12591_curated_genes",
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "displays" : [
         {
            "displayId" : "curated_genes-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               }
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ]
   },
   {
      "name" : "Microarray oligo probes",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Microarray oligo probes/{refseq}/trackData.jsonz"
         }
      },
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "height" : 4
            },
            "displayId" : "microarray_oligo_probes-c_japonica_PRJNA12591-LinearBasicDisplay"
         }
      ],
      "trackId" : "c_japonica_PRJNA12591_microarray_oligo_probes",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ]
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "ESTs",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_japonica_PRJNA12591_ests",
      "displays" : [
         {
            "displayId" : "ests-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green."
   },
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "trackId" : "c_japonica_PRJNA12591_rnaseq_asymmetries",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "renderer" : {
               "showLabels" : false,
               "height" : 24,
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "displayMode" : "collapse",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq_asymmetries-c_japonica_PRJNA12591-LinearBasicDisplay"
         }
      ],
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "name" : "RNASeq Asymmetries",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "displays" : [
         {
            "renderer" : {
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "displayMode" : "collapse",
               "color1" : "black"
            },
            "displayId" : "rnaseq-c_japonica_PRJNA12591-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "trackId" : "c_japonica_PRJNA12591_rnaseq",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/RNASeq/{refseq}/trackData.jsonz"
         }
      },
      "name" : "RNASeq"
   },
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "trackId" : "c_japonica_PRJNA12591_links_and_superlinks",
      "displays" : [
         {
            "renderer" : {
               "height" : 4,
               "type" : "SvgFeatureRenderer",
               "color1" : "black"
            },
            "displayId" : "links_and_superlinks-c_japonica_PRJNA12591-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Links and Superlinks"
   },
   {
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "displays" : [
         {
            "displayId" : "rnaseq_introns-c_japonica_PRJNA12591-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showDescriptions" : false,
               "color1" : "green",
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "showLabels" : false
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay"
         }
      ],
      "trackId" : "c_japonica_PRJNA12591_rnaseq_introns",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "RNASeq introns"
   },
   {
      "name" : "RNASeq Splice Junctions (common)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "trackId" : "c_japonica_PRJNA12591_rnaseq_splice_junctions_(common)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'score')>20000?(get(feature,'strand')>0?'#730073':'#007373'):get(feature,'strand')>0?'#'+hex(round(255-(140*(get(feature,'score')/20000))))+'00'+hex(round(255-(140*(get(feature,'score')/20000)))):'#00'+hex(round(255-(140*(get(feature,'score')/20000))))+hex(round(255-(140*(get(feature,'score')/20000))))"
            },
            "displayId" : "rnaseq_splice_junctions_(common)-c_japonica_PRJNA12591-LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "type" : "FeatureTrack"
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "displays" : [
         {
            "renderer" : {
               "showLabels" : false,
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq_splice_junctions_(rare)-c_japonica_PRJNA12591-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "trackId" : "c_japonica_PRJNA12591_rnaseq_splice_junctions_(rare)",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_japonica_PRJNA12591"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_japonica_PRJNA12591/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Splice Junctions (rare)"
   }
]
