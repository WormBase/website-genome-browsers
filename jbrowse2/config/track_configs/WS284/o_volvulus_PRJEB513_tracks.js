  export default [
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "curated_genes_(noncoding)-o_volvulus_PRJEB513-LinearBasicDisplay",
            "renderer" : {
               "color1" : "gray",
               "type" : "SvgFeatureRenderer",
               "height" : 6
            }
         }
      ],
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "trackId" : "o_volvulus_PRJEB513_curated_genes_noncoding",
      "name" : "Curated Genes (noncoding)"
   },
   {
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "type" : "FeatureTrack",
      "trackId" : "o_volvulus_PRJEB513_curated_genes_pseudogenes",
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "displays" : [
         {
            "displayId" : "curated_genes_(pseudogenes)-o_volvulus_PRJEB513-LinearBasicDisplay",
            "renderer" : {
               "color1" : "gray",
               "type" : "SvgFeatureRenderer",
               "height" : 6
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes (pseudogenes)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      }
   },
   {
      "trackId" : "o_volvulus_PRJEB513_curated_genes",
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "displays" : [
         {
            "displayId" : "curated_genes-o_volvulus_PRJEB513-LinearBasicDisplay",
            "renderer" : {
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "type" : "FeatureTrack"
   },
   {
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "type" : "FeatureTrack",
      "name" : "Trans-spliced acceptor",
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "trans-spliced_acceptor-o_volvulus_PRJEB513-LinearBasicDisplay"
         }
      ],
      "trackId" : "o_volvulus_PRJEB513_trans-spliced_acceptor",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Protein motifs/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "o_volvulus_PRJEB513_protein_motifs",
      "displays" : [
         {
            "renderer" : {
               "height" : 7,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            },
            "displayId" : "protein_motifs-o_volvulus_PRJEB513-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "name" : "Protein motifs"
   },
   {
      "trackId" : "o_volvulus_PRJEB513_curated_genes_protein_coding",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567"
            },
            "displayId" : "curated_genes_(protein_coding)-o_volvulus_PRJEB513-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "name" : "Curated Genes (protein coding)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "type" : "FeatureTrack"
   },
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/RNASeq/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "RNASeq",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "displays" : [
         {
            "displayId" : "rnaseq-o_volvulus_PRJEB513-LinearBasicDisplay",
            "renderer" : {
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "showLabels" : false,
               "color1" : "black",
               "type" : "SvgFeatureRenderer",
               "displayMode" : "collapse"
            },
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "trackId" : "o_volvulus_PRJEB513_rnaseq"
   },
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/RNASeq introns/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "displays" : [
         {
            "renderer" : {
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "green",
               "showDescriptions" : false
            },
            "displayId" : "rnaseq_introns-o_volvulus_PRJEB513-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "trackId" : "o_volvulus_PRJEB513_rnaseq_introns",
      "name" : "RNASeq introns"
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "RNASeq Splice Junctions (common)",
      "trackId" : "o_volvulus_PRJEB513_rnaseq_splice_junctions_(common)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "displayId" : "rnaseq_splice_junctions_(common)-o_volvulus_PRJEB513-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "color1" : "jexl:get(feature,'score')>20000?(get(feature,'strand')>0?'#730073':'#007373'):get(feature,'strand')>0?'#'+hex(round(255-(140*(get(feature,'score')/20000))))+'00'+hex(round(255-(140*(get(feature,'score')/20000)))):'#00'+hex(round(255-(140*(get(feature,'score')/20000))))+hex(round(255-(140*(get(feature,'score')/20000))))"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ]
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Splice Junctions (rare)",
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))"
            },
            "displayId" : "rnaseq_splice_junctions_(rare)-o_volvulus_PRJEB513-LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "trackId" : "o_volvulus_PRJEB513_rnaseq_splice_junctions_(rare)",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ]
   },
   {
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "type" : "FeatureTrack",
      "name" : "Links and Superlinks",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "links_and_superlinks-o_volvulus_PRJEB513-LinearBasicDisplay",
            "renderer" : {
               "height" : 4,
               "type" : "SvgFeatureRenderer",
               "color1" : "black"
            }
         }
      ],
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "trackId" : "o_volvulus_PRJEB513_links_and_superlinks",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/ESTs (best)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "name" : "ESTs",
      "trackId" : "o_volvulus_PRJEB513_ests",
      "displays" : [
         {
            "displayId" : "ests-o_volvulus_PRJEB513-LinearBasicDisplay",
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
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/o_volvulus_PRJEB513/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         }
      },
      "name" : "RNASeq Asymmetries",
      "trackId" : "o_volvulus_PRJEB513_rnaseq_asymmetries",
      "displays" : [
         {
            "renderer" : {
               "height" : 24,
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "displayMode" : "collapse"
            },
            "displayId" : "rnaseq_asymmetries-o_volvulus_PRJEB513-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')"
         }
      ],
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "o_volvulus_PRJEB513"
      ]
   }
]
