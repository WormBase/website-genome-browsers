  export default [
   {
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "name" : "Protein motifs",
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/Protein motifs/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "trackId" : "p_pacificus_PRJNA12644_protein_motifs",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'",
               "height" : 7,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "protein_motifs-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(protein_coding)-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "trackId" : "p_pacificus_PRJNA12644_curated_genes_protein_coding",
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "type" : "FeatureTrack",
      "name" : "Curated Genes (protein coding)",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track."
   },
   {
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "gray",
               "height" : 6,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(pseudogenes)-p_pacificus_PRJNA12644-LinearBasicDisplay"
         }
      ],
      "trackId" : "p_pacificus_PRJNA12644_curated_genes_pseudogenes",
      "type" : "FeatureTrack",
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "name" : "Curated Genes (pseudogenes)",
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "trackId" : "p_pacificus_PRJNA12644_curated_genes",
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
            "displayId" : "curated_genes-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "Curated Genes",
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "type" : "FeatureTrack"
   },
   {
      "displays" : [
         {
            "displayId" : "rnaseq_introns-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "color1" : "green",
               "showDescriptions" : false,
               "type" : "SvgFeatureRenderer"
            },
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay"
         }
      ],
      "trackId" : "p_pacificus_PRJNA12644_rnaseq_introns",
      "type" : "FeatureTrack",
      "name" : "RNASeq introns",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/RNASeq introns/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ]
   },
   {
      "type" : "FeatureTrack",
      "name" : "RNASeq Splice Junctions (common)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "displays" : [
         {
            "renderer" : {
               "showLabels" : false,
               "color1" : "jexl:get(feature,'score')>20000?(get(feature,'strand')>0?'#730073':'#007373'):get(feature,'strand')>0?'#'+hex(round(255-(140*(get(feature,'score')/20000))))+'00'+hex(round(255-(140*(get(feature,'score')/20000)))):'#00'+hex(round(255-(140*(get(feature,'score')/20000))))+hex(round(255-(140*(get(feature,'score')/20000))))",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq_splice_junctions_(common)-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "trackId" : "p_pacificus_PRJNA12644_rnaseq_splice_junctions_(common)"
   },
   {
      "type" : "FeatureTrack",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "name" : "RNASeq Splice Junctions (rare)",
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "trackId" : "p_pacificus_PRJNA12644_rnaseq_splice_junctions_(rare)",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "showLabels" : false,
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            },
            "displayId" : "rnaseq_splice_junctions_(rare)-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay"
         }
      ]
   },
   {
      "type" : "FeatureTrack",
      "name" : "Links and Superlinks",
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/Links and Superlinks/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "p_pacificus_PRJNA12644_links_and_superlinks",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "links_and_superlinks-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "renderer" : {
               "color1" : "black",
               "height" : 4,
               "type" : "SvgFeatureRenderer"
            }
         }
      ]
   },
   {
      "name" : "RNASeq Asymmetries",
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "p_pacificus_PRJNA12644_rnaseq_asymmetries",
      "displays" : [
         {
            "displayId" : "rnaseq_asymmetries-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "height" : 24,
               "showLabels" : false,
               "displayMode" : "collapse",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ]
   },
   {
      "name" : "Microarray oligo probes",
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets.",
      "type" : "FeatureTrack",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/Microarray oligo probes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "trackId" : "p_pacificus_PRJNA12644_microarray_oligo_probes",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "black",
               "height" : 4
            },
            "displayId" : "microarray_oligo_probes-p_pacificus_PRJNA12644-LinearBasicDisplay"
         }
      ]
   },
   {
      "trackId" : "p_pacificus_PRJNA12644_ests",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "ests-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "name" : "ESTs",
      "type" : "FeatureTrack"
   },
   {
      "type" : "FeatureTrack",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "name" : "RNASeq",
      "assemblyNames" : [
         "p_pacificus_PRJNA12644"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/p_pacificus_PRJNA12644/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq-p_pacificus_PRJNA12644-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "displayMode" : "collapse",
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "showLabels" : false,
               "color1" : "black"
            }
         }
      ],
      "trackId" : "p_pacificus_PRJNA12644_rnaseq"
   }
]