  export default [
   {
      "description" : "Regions within which there is experimental evidence for a promoter.",
      "displays" : [
         {
            "renderer" : {
               "color1" : "green",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "promoter_regions-c_elegans_PRJNA13758-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Promoter regions",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Promoter regions/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_promoter_regions",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ]
   },
   {
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "binding_sites_(predicted)-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='PicTar'?'blue':get(feature,'source')=='miRanda'?'red':'green'"
            }
         }
      ],
      "name" : "Binding sites (predicted)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Binding sites (predicted)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_binding_sites_predicted",
      "description" : "This track shows curated and predicted binding sites for microRNAs. Binding sites (indicated in green) are extracted from the cisRed database of computationally derived potential bind targets. miRanda predictions -- indicated in red -- are the predicted target sequences for microRNA genes, provided by Anton Enright's group using the miRanda program. PicTar predictions -- indicated in blue -- are the predicted target sequences for microRNA genes from Lall et al; A genome-wide map of conserved microRNA targets in C. elegans. Curr Biol. 2006 Mar 7;16(5):460-71."
   },
   {
      "description" : "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Protein motifs/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "c_elegans_PRJNA13758_protein_motifs",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "protein_motifs-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "height" : 7,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'"
            }
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Protein motifs"
   },
   {
      "description" : "DNase I hypersensitive sites from the 2009 paper by Shi et al.",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "dnasei_hypersensitive_site-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "color1" : "green",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "name" : "DNaseI hypersensitive site",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/DNaseI hypersensitive site/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_dnasei_hypersensitive_site",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ]
   },
   {
      "description" : "Regions within which there may be one or more binding sites of a non-TF, non-Histone molecule.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "green",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "binding_regions-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Binding regions",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Binding regions/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "c_elegans_PRJNA13758_binding_regions",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ]
   },
   {
      "description" : "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "gray",
               "type" : "SvgFeatureRenderer",
               "height" : 6
            },
            "displayId" : "curated_genes_(noncoding)-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (noncoding)",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_curated_genes_noncoding"
   },
   {
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_binding_sites_curated",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Binding sites (curated)/{refseq}/trackData.jsonz"
         }
      },
      "name" : "Binding sites (curated)",
      "displays" : [
         {
            "displayId" : "binding_sites_(curated)-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "green"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "description" : "Sites where there is experimental evidence of a non-TF, non-Histone molecule binding."
   },
   {
      "description" : "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "displays" : [
         {
            "displayId" : "curated_genes_(pseudogenes)-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "color1" : "gray",
               "type" : "SvgFeatureRenderer",
               "height" : 6
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes (pseudogenes)",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_curated_genes_pseudogenes",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ]
   },
   {
      "trackId" : "c_elegans_PRJNA13758_histone_binding_sites",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Histone binding sites/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "Histone binding sites",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "histone_binding_sites-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "green"
            }
         }
      ],
      "description" : "Regions within which there is experimental evidence for one or more binding sites of a histone."
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_curated_genes_protein_coding",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color3" : "#965567",
               "color1" : "jexl:get(feature,'strand')>0?'violet':'turquoise'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "curated_genes_(protein_coding)-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "name" : "Curated Genes (protein coding)",
      "description" : "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track."
   },
   {
      "description" : "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Curated_Genes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      },
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_curated_genes",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "labels" : {
                  "name" : "jexl:get(feature,'locus') || get(feature,'sequence_name')"
               },
               "color1" : "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
               "color3" : "#965567"
            },
            "displayId" : "curated_genes-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Curated Genes"
   },
   {
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Regulatory regions/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "c_elegans_PRJNA13758_regulatory_regions",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "green"
            },
            "displayId" : "regulatory_regions-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "name" : "Regulatory regions",
      "description" : "Assorted or unspecified regulatory elements with experimental evidence."
   },
   {
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'source')=='SL1'?'red':'green'"
            },
            "displayId" : "trans-spliced_acceptor-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "name" : "Trans-spliced acceptor",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_trans-spliced_acceptor",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "description" : "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction."
   },
   {
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "renderer" : {
               "color1" : "red",
               "height" : 6,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "genome_sequence_errors-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "name" : "Genome sequence errors",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Genome sequence errors/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_genome_sequence_errors",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "description" : "Positions within the reference genome sequence that have been identified as having a base call error. This error has not yet been corrected."
   },
   {
      "description" : "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Links and Superlinks/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_links_and_superlinks",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "links_and_superlinks-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 4,
               "color1" : "black"
            }
         }
      ],
      "type" : "FeatureTrack",
      "name" : "Links and Superlinks"
   },
   {
      "name" : "ESTs",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'",
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "ests-c_elegans_PRJNA13758-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_elegans_PRJNA13758_ests",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/ESTs (best)/{refseq}/trackData.jsonz"
         }
      },
      "description" : "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green."
   },
   {
      "description" : "This track contains Orfeome Project primer pairs and RACE tags.  These primers were used to amplify C. elegans cDNAs.  A positive amplification, shown in green, is evidence that the region between the two primers is transcribed.  Failure to amplify, shown in red, suggests either that the gene model is incorrect, or that the gene is expressed at very low levels. Detailed gene models derived from ORFeome sequencing will be added to this display in the future.  See <i>Reboul et al. Nat. Genet. 2003 Apr 7.</i> and <a href='http://worfdb.dfci.harvard.edu' target='_blank'>WORFdb</a> for further information.",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/ORFeome PCR Products/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_orfeome_pcr_products",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "orfeome_pcr_products-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "color1" : "jexl:get(feature,'amplified')==1?'green':'red'",
               "height" : 4,
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "name" : "ORFeome PCR Products"
   },
   {
      "name" : "Expression chip profiles",
      "displays" : [
         {
            "displayId" : "expression_chip_profiles-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "color1" : "orange",
               "height" : 5,
               "type" : "SvgFeatureRenderer"
            },
            "type" : "LinearBasicDisplay"
         }
      ],
      "type" : "FeatureTrack",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_expression_chip_profiles",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Expression chip profiles/{refseq}/trackData.jsonz"
         }
      },
      "description" : "This track indicates the location of PCR products that have been placed on expression chips produced by the C. elegans Microarray Consortium [ http://cmgm.stanford.edu/~kimlab/wmdirectorybig.html]. The genes corresponding to these products have been clustered by their expression patterns. Click on the profile to get more information about the expression profile of its corresponding gene."
   },
   {
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "renderer" : {
               "color1" : "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
               "displayMode" : "collapse",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "height" : 24
            },
            "displayId" : "rnaseq_asymmetries-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "name" : "RNASeq Asymmetries",
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "trackId" : "c_elegans_PRJNA13758_rnaseq_asymmetries",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "description" : "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature."
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. The number of reads spanning the introns is indicated by the thickness of the display.",
      "name" : "RNASeq introns",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "displayId" : "rnaseq_introns-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "height" : "jexl:get(feature,'score')>100?50:get(feature,'score')<8?4:floor(get(feature,'score')/2)",
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "showDescriptions" : false,
               "color1" : "green"
            },
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads"
         }
      ],
      "trackId" : "c_elegans_PRJNA13758_rnaseq_introns",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq introns/{refseq}/trackData.jsonz"
         }
      }
   },
   {
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "name" : "RNASeq Splice Junctions (common)",
      "displays" : [
         {
            "mouseover" : "jexl:get(feature,'score')+' reads'",
            "type" : "LinearBasicDisplay",
            "displayId" : "rnaseq_splice_junctions_(common)-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "showLabels" : false,
               "type" : "SvgFeatureRenderer",
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'"
            }
         }
      ],
      "type" : "FeatureTrack",
      "trackId" : "c_elegans_PRJNA13758_rnaseq_splice_junctions_(common)",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         },
         "type" : "NCListAdapter"
      }
   },
   {
      "trackId" : "c_elegans_PRJNA13758_rnaseq_splice_junctions_(rare)",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "adapter" : {
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
         },
         "type" : "NCListAdapter"
      },
      "name" : "RNASeq Splice Junctions (rare)",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "renderer" : {
               "color1" : "jexl:get(feature,'strand')>0?'#730073':'#007373'",
               "height" : "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
               "showLabels" : false,
               "type" : "SvgFeatureRenderer"
            },
            "displayId" : "rnaseq_splice_junctions_(rare)-c_elegans_PRJNA13758-LinearBasicDisplay",
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:get(feature,'score')+' reads'"
         }
      ],
      "description" : "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads."
   },
   {
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "displayId" : "polysomes-c_elegans_PRJNA13758-LinearBasicDisplay",
            "renderer" : {
               "color1" : "green",
               "type" : "SvgFeatureRenderer"
            }
         }
      ],
      "name" : "Polysomes",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Polysomes/{refseq}/trackData.jsonz"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_polysomes",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "description" : "This data is from the The Lamm et al. (2011) PMID: 21177965 paper finding regions bound by the polysome fraction of RNAs being actively translated."
   },
   {
      "type" : "FeatureTrack",
      "displays" : [
         {
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "height" : 4,
               "color1" : "black"
            },
            "displayId" : "microarray_oligo_probes-c_elegans_PRJNA13758-LinearBasicDisplay",
            "type" : "LinearBasicDisplay"
         }
      ],
      "name" : "Microarray oligo probes",
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Microarray oligo probes/{refseq}/trackData.jsonz",
            "locationType" : "UriLocation"
         }
      },
      "trackId" : "c_elegans_PRJNA13758_microarray_oligo_probes",
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "description" : "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets."
   },
   {
      "adapter" : {
         "type" : "NCListAdapter",
         "rootUrlTemplate" : {
            "locationType" : "UriLocation",
            "uri" : "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq/{refseq}/trackData.jsonz"
         }
      },
      "assemblyNames" : [
         "c_elegans_PRJNA13758"
      ],
      "trackId" : "c_elegans_PRJNA13758_rnaseq",
      "type" : "FeatureTrack",
      "displays" : [
         {
            "type" : "LinearBasicDisplay",
            "mouseover" : "jexl:'Score: '+get(feature,'score')",
            "renderer" : {
               "type" : "SvgFeatureRenderer",
               "showLabels" : false,
               "height" : "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
               "color1" : "black",
               "displayMode" : "collapse"
            },
            "displayId" : "rnaseq-c_elegans_PRJNA13758-LinearBasicDisplay"
         }
      ],
      "name" : "RNASeq",
      "description" : "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature."
   }
]
