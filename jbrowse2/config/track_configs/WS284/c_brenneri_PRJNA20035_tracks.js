  export default [
   {
      "name" : "Curated Genes (pseudogenes)",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_curated_genes_pseudogenes",
      "displays" : [
         {
            "displayId" : "curated_genes_(pseudogenes)-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 6,
               "color1" : "gray"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes."
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Curated Genes",
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               }
            },
            "displayId" : "curated_genes-c_brenneri_PRJNA20035-LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_curated_genes"
   },
   {
      "name" : "Protein motifs",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "displays" : [
         {
            "displayId" : "protein_motifs-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 7,
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "trackId" : "c_brenneri_PRJNA20035_protein_motifs",
      "type" : "FeatureTrack"
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Curated Genes (protein coding)",
      "trackId" : "c_brenneri_PRJNA20035_curated_genes_protein_coding",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(protein_coding)-c_brenneri_PRJNA20035-LinearBasicDisplay"
         }
      ]
   },
   {
      "name" : "Curated Genes (noncoding)",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(noncoding)-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "renderer" : {
               "height" : 6,
               "color1" : "gray",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_curated_genes_noncoding"
   },
   {
      "trackId" : "c_brenneri_PRJNA20035_trans-spliced_acceptor",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "trans-spliced_acceptor-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Trans-spliced acceptor"
   },
   {
      "name" : "Microarray oligo probes",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Microarray oligo probes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_microarray_oligo_probes",
      "displays" : [
         {
            "displayId" : "microarray_oligo_probes-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 4,
               "color1" : "black"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets."
   },
   {
      "displays" : [
         {
            "renderer" : {
               "color1" : "black",
               "height" : 4,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "links_and_superlinks-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "trackId" : "c_brenneri_PRJNA20035_links_and_superlinks",
      "type" : "FeatureTrack",
      "name" : "Links and Superlinks",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_rnaseq_asymmetries",
      "displays" : [
         {
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "displayMode" : "collapse",
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "height" : 24,
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "displayId" : "rnaseq_asymmetries-c_brenneri_PRJNA20035-LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "name" : "RNASeq Asymmetries",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/RNASeq/{refseq}/trackData.jsonz"
         }
      },
      "name" : "RNASeq",
      "displays" : [
         {
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "renderer" : {
               "color1" : "black",
               "displayMode" : "collapse",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false
            },
            "displayId" : "rnaseq-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "trackId" : "c_brenneri_PRJNA20035_rnaseq",
      "type" : "FeatureTrack"
   },
   {
      "name" : "ESTs",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "displays" : [
         {
            "displayId" : "ests-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_ests"
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq introns",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "showDescriptions" : false,
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "color1" : "green"
            },
            "displayId" : "rnaseq_introns-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "trackId" : "c_brenneri_PRJNA20035_rnaseq_introns",
      "type" : "FeatureTrack"
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_splice_junctions_(common)-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'score')>20000?(get(feature,'strand')>0?'#730073':'#007373'):get(feature,'strand')>0?'#'+hex(round(255-(140*(get(feature,'score')/20000))))+'00'+hex(round(255-(140*(get(feature,'score')/20000)))):'#00'+hex(round(255-(140*(get(feature,'score')/20000))))+hex(round(255-(140*(get(feature,'score')/20000))))"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "trackId" : "c_brenneri_PRJNA20035_rnaseq_splice_junctions_(common)",
      "type" : "FeatureTrack",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Splice Junctions (common)"
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_brenneri_PRJNA20035/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Splice Junctions (rare)",
      "type" : "FeatureTrack",
      "trackId" : "c_brenneri_PRJNA20035_rnaseq_splice_junctions_(rare)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "assemblyNames" : [
         "c_brenneri_PRJNA20035"
      ],
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))"
            },
            "displayId" : "rnaseq_splice_junctions_(rare)-c_brenneri_PRJNA20035-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ]
   }
]
