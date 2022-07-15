  export default [
   {
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_protein_motifs",
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'",
               "type" : "SvgFeatureRenderer",
               "height" : 7
            },
            "displayId" : "protein_motifs-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Protein motifs/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Protein motifs",
      "type" : "FeatureTrack"
   },
   {
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'"
            },
            "displayId" : "curated_genes_(protein_coding)-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "trackId" : "c_remanei_PRJNA53967_curated_genes_protein_coding",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (protein coding)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      }
   },
   {
      "name" : "Curated Genes (noncoding)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_curated_genes_noncoding",
      "displays" : [
         {
            "displayId" : "curated_genes_(noncoding)-c_remanei_PRJNA53967-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "gray",
               "type" : "SvgFeatureRenderer",
               "height" : 6
            }
         }
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA."
   },
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "displays" : [
         {
            "renderer" : {
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_curated_genes",
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Curated Genes"
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
            "displayId" : "curated_genes_(pseudogenes)-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "trackId" : "c_remanei_PRJNA53967_curated_genes_pseudogenes",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (pseudogenes)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "name" : "Trans-spliced acceptor",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack",
      "trackId" : "c_remanei_PRJNA53967_trans-spliced_acceptor",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "displays" : [
         {
            "displayId" : "trans-spliced_acceptor-c_remanei_PRJNA53967-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction."
   },
   {
      "name" : "RNASeq introns",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq introns/{refseq}/trackData.jsonz"
         }
      },
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_rnaseq_introns",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "green",
               "showDescriptions" : false,
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_introns-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ]
   },
   {
      "trackId" : "c_remanei_PRJNA53967_rnaseq_splice_junctions_(common)",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'score')>20000?(get(feature,'strand')>0?'#730073':'#007373'):get(feature,'strand')>0?'#'+hex(round(255-(140*(get(feature,'score')/20000))))+'00'+hex(round(255-(140*(get(feature,'score')/20000)))):'#00'+hex(round(255-(140*(get(feature,'score')/20000))))+hex(round(255-(140*(get(feature,'score')/20000))))"
            },
            "displayId" : "rnaseq_splice_junctions_(common)-c_remanei_PRJNA53967-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "name" : "RNASeq Splice Junctions (common)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
         }
      },
      "type" : "FeatureTrack"
   },
   {
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_splice_junctions_(rare)-c_remanei_PRJNA53967-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_rnaseq_splice_junctions_(rare)",
      "type" : "FeatureTrack",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Splice Junctions (rare)"
   },
   {
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "displays" : [
         {
            "displayId" : "links_and_superlinks-c_remanei_PRJNA53967-LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "height" : 4
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_links_and_superlinks",
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Links and Superlinks"
   },
   {
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_rnaseq_asymmetries",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "height" : 24,
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "displayMode" : "collapse"
            },
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "displayId" : "rnaseq_asymmetries-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "name" : "RNASeq Asymmetries",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack"
   },
   {
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/Microarray oligo probes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Microarray oligo probes",
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets.",
      "displays" : [
         {
            "renderer" : {
               "height" : 4,
               "type" : "SvgFeatureRenderer",
               "color1" : "black"
            },
            "type" : "LinearBasicDisplay",
            "displayId" : "microarray_oligo_probes-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_microarray_oligo_probes"
   },
   {
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "displays" : [
         {
            "displayId" : "ests-c_remanei_PRJNA53967-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'"
            }
         }
      ],
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "trackId" : "c_remanei_PRJNA53967_ests",
      "type" : "FeatureTrack",
      "name" : "ESTs",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/ESTs (best)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "displayMode" : "collapse",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "displayId" : "rnaseq-c_remanei_PRJNA53967-LinearBasicDisplay"
         }
      ],
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "trackId" : "c_remanei_PRJNA53967_rnaseq",
      "assemblyNames" : [
         "c_remanei_PRJNA53967"
      ],
      "type" : "FeatureTrack",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_remanei_PRJNA53967/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq"
   }
]
