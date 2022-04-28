  export default [
   {
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_protein_motifs",
      "name" : "Protein motifs",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "renderer" : {
               "height" : 7,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            },
            "displayId" : "protein_motifs-c_remanei_PRJNA53967-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(protein_coding)-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_remanei_PRJNA53967_curated_genes_protein_coding",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (protein coding)"
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            },
            "displayId" : "curated_genes_(noncoding)-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "trackId" : "c_remanei_PRJNA53967_curated_genes_noncoding",
      "name" : "Curated Genes (noncoding)",
      "type" : "FeatureTrack"
   },
   {
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "trackId" : "c_remanei_PRJNA53967_curated_genes",
      "name" : "Curated Genes",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'"
            },
            "displayId" : "curated_genes-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated_Genes/{refseq}/trackData.jsonz"
         }
      }
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "gray",
               "height" : 6
            },
            "displayId" : "curated_genes_(pseudogenes)-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (pseudogenes)",
      "trackId" : "c_remanei_PRJNA53967_curated_genes_pseudogenes",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes."
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         }
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'"
            },
            "displayId" : "trans-spliced_acceptor-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Trans-spliced acceptor",
      "trackId" : "c_remanei_PRJNA53967_trans-spliced_acceptor",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction."
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "renderer" : {
               "showDescriptions" : false,
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "color1" : "green",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq_introns-c_remanei_PRJNA53967-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads",
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "RNASeq introns",
      "trackId" : "c_remanei_PRJNA53967_rnaseq_introns",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display."
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "displayId" : "rnaseq_splice_junctions_(common)-c_remanei_PRJNA53967-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "c_remanei_PRJNA53967_rnaseq_splice_junctions_(common)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "type" : "FeatureTrack",
      "name" : "RNASeq Splice Junctions (common)"
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(rare)-c_remanei_PRJNA53967-LinearBasicDisplay",
            "renderer" : {
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "RNASeq Splice Junctions (rare)",
      "trackId" : "c_remanei_PRJNA53967_rnaseq_splice_junctions_(rare)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ]
   },
   {
      "trackId" : "c_remanei_PRJNA53967_links_and_superlinks",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "type" : "FeatureTrack",
      "name" : "Links and Superlinks",
      "displays" : [
         {
            "renderer" : {
               "height" : 4,
               "color1" : "black",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "links_and_superlinks-c_remanei_PRJNA53967-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Links and Superlinks/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "renderer" : {
               "displayMode" : "collapse",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "height" : 24
            },
            "displayId" : "rnaseq_asymmetries-c_remanei_PRJNA53967-LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "RNASeq Asymmetries",
      "type" : "FeatureTrack",
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_rnaseq_asymmetries"
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Microarray oligo probes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "microarray_oligo_probes-c_remanei_PRJNA53967-LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "height" : 4
            }
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Microarray oligo probes",
      "trackId" : "c_remanei_PRJNA53967_microarray_oligo_probes",
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ]
   },
   {
      "trackId" : "c_remanei_PRJNA53967_ests",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "type" : "FeatureTrack",
      "name" : "ESTs",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "ests-c_remanei_PRJNA53967-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "trackId" : "c_remanei_PRJNA53967_rnaseq",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "type" : "FeatureTrack",
      "name" : "RNASeq",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "displayId" : "rnaseq-c_remanei_PRJNA53967-LinearBasicDisplay",
            "renderer" : {
               "displayMode" : "collapse",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "black",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4"
            }
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   }
]
