  export default [
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_curated_genes",
      "name": "Curated Genes",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/$ASSEMBLY/tracks/Curated_Genes/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'type')!='CDS'?'gray':get(feature,'strand')>0?'violet':'turquoise'",
            "color3": "#965567",
            "labels": {
              "name": "jexl:get(feature,'locus') || get(feature,'sequence_name')"
            }
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_operons",
      "name": "Operons",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "These are operons published by Blumenthal et al, Nature 417: 851-854 (2002).",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Operons/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "operons-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_trans-spliced_acceptor",
      "name": "Trans-spliced acceptor",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "trans-spliced_acceptor-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'source')=='SL1'?'red':'green'"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_curated_genes_protein_coding",
      "name": "Curated Genes (protein coding)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes_(protein_coding)-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'strand')>0?'violet':'turquoise'",
            "color3": "#965567"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_curated_genes_noncoding",
      "name": "Curated Genes (noncoding)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes_(noncoding)-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "gray",
            "height": 6
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_curated_genes_pseudogenes",
      "name": "Curated Genes (pseudogenes)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes_(pseudogenes)-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "gray",
            "height": 6
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_ests",
      "name": "ESTs",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/ESTs (best)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "ests-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_binding_regions",
      "name": "Binding regions",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Regions within which there may be one or more binding sites of a non-TF, non-Histone molecule.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Binding regions/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "binding_regions-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_yacs_fosmids_cosmids",
      "name": "YACs, Fosmids, & Cosmids",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track shows the locations of the cosmids, fosmids, and YACs used for the physical mapping and sequencing of the C. elegans genome.  The clone termini do not necessarily correspond to the termini of submitted GenBank/EMBL entries. In some cases the exact termini of the clones is not known.  For example, YACs were sequenced using PCR amplification across gaps in the cosmid maps.  When a clone end is not known, it is shown as an arrow extending to the end of the display.  Such data is to be treated with caution.  The Vancouver fosmids can be ordered directly from <a href='http://www.geneservice.co.uk/products/clones/Celegans_Fos.jsp'>GeneService</a>.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/YACs, Fosmids, & Cosmids/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "yacs,_fosmids,_&_cosmids-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "black",
            "height": 3
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_binding_sites_curated",
      "name": "Binding sites (curated)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Sites where there is experimental evidence of a non-TF, non-Histone molecule binding.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Binding sites (curated)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "binding_sites_(curated)-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_binding_sites_predicted",
      "name": "Binding sites (predicted)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track shows curated and predicted binding sites for microRNAs. Binding sites (indicated in green) are extracted from the cisRed database of computationally derived potential bind targets. miRanda predictions -- indicated in red -- are the predicted target sequences for microRNA genes, provided by Anton Enright's group using the miRanda program. PicTar predictions -- indicated in blue -- are the predicted target sequences for microRNA genes from Lall et al; A genome-wide map of conserved microRNA targets in C. elegans. Curr Biol. 2006 Mar 7;16(5):460-71.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/c_elegans_PRJNA13758/tracks/Binding sites (predicted)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "binding_sites_(predicted)-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'source')=='PicTar'?'blue':get(feature,'source')=='miRanda'?'red':'green'"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_dnasei_hypersensitive_site",
      "name": "DNaseI hypersensitive site",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "DNase I hypersensitive sites from the 2009 paper by Shi et al.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/DNaseI hypersensitive site/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "dnasei_hypersensitive_site-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_expression_chip_profiles",
      "name": "Expression chip profiles",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track indicates the location of PCR products that have been placed on expression chips produced by the C. elegans Microarray Consortium [ http://cmgm.stanford.edu/~kimlab/wmdirectorybig.html]. The genes corresponding to these products have been clustered by their expression patterns. Click on the profile to get more information about the expression profile of its corresponding gene.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Expression chip profiles/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "expression_chip_profiles-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "orange",
            "height": 5
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_genome_sequence_errors",
      "name": "Genome sequence errors",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Positions within the reference genome sequence that have been identified as having a base call error. This error has not yet been corrected.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Genome sequence errors/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "genome_sequence_errors-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "red",
            "height": 6
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_contig_submissions",
      "name": "Contig submissions",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track shows the location and coordinates of contigs (mostly cosmids) submitted to GenBank/EMBL.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Contig submissions/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "contig_submissions-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "sienna",
            "height": 7
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_histone_binding_sites",
      "name": "Histone binding sites",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Regions within which there is experimental evidence for one or more binding sites of a histone.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Histone binding sites/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "histone_binding_sites-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_links_and_superlinks",
      "name": "Links and Superlinks",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track shows the location and coordinates of contigs created during the assembly of the C. elegans genome.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Links and Superlinks/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "links_and_superlinks-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "black",
            "height": 4
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_microarray_oligo_probes",
      "name": "Microarray oligo probes",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track contains Affymetrix GeneChip and Washington University GSC microarray probe sets.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Microarray oligo probes/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "microarray_oligo_probes-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "black",
            "height": 4
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_mrnas/ncrnas",
      "name": "mRNAs/ncRNAs",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Native (same species) full length cDNAs and ncRNAs aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each cDNA.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/mRNAs_ncRNAs (best)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "mrnas/ncrnas-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'source')=='BLAT_mRNA_BEST'?'yellow':'gray'",
            "height": 6
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_orfeome_pcr_products",
      "name": "ORFeome PCR Products",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track contains Orfeome Project primer pairs and RACE tags.  These primers were used to amplify C. elegans cDNAs.  A positive amplification, shown in green, is evidence that the region between the two primers is transcribed.  Failure to amplify, shown in red, suggests either that the gene model is incorrect, or that the gene is expressed at very low levels. Detailed gene models derived from ORFeome sequencing will be added to this display in the future.  See <i>Reboul et al. Nat. Genet. 2003 Apr 7.</i> and <a href='http://worfdb.dfci.harvard.edu' target='_blank'>WORFdb</a> for further information.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/ORFeome PCR Products/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "orfeome_pcr_products-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'amplified')==1?'green':'red'",
            "height": 4
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_pcr_assays",
      "name": "PCR Assays",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track indicates the location of primer pairs that have been created by a number of groups.  Click on the element to obtain the left and right oligo sequences, information about the amplification information, and ordering information (if available).",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/PCR Assays/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "pcr_assays-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "violet",
            "height": 4
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_polysomes",
      "name": "Polysomes",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This data is from the The Lamm et al. (2011) PMID: 21177965 paper finding regions bound by the polysome fraction of RNAs being actively translated.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Polysomes/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "polysomes-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_promoter_regions",
      "name": "Promoter regions",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Regions within which there is experimental evidence for a promoter.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Promoter regions/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "promoter_regions-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_protein_motifs",
      "name": "Protein motifs",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "This track shows the extent of predicted protein motifs. Note these spans correspond to amino acid coordinates interpolated onto the physical map.  Included are signal peptide (signalp), coiled coil (ncoils) and transmembrane (tmhmm) domains, regions of low complexity (seg), and Pfam annotated motif homologies.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Protein motifs/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "protein_motifs-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:parent(feature)=='undefined'?'purple':get(parent(feature),'predictiontype')=='tmhmm'?'magenta':get(parent(feature),'predictiontype')=='seg'?'lightseagreen':get(parent(feature),'predictiontype')=='signalp'?'aquamarine':get(parent(feature),'predictiontype')=='ncoils'?'chartreuse':\nget(parent(feature),'predictiontype')=='pfam'?'lightsalmon':'purple'",
            "height": 7
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_regulatory_regions",
      "name": "Regulatory regions",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Assorted or unspecified regulatory elements with experimental evidence.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/Regulatory regions/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "regulatory_regions-$ASSEMBLY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_rnaseq_asymmetries",
      "name": "RNASeq Asymmetries",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "Red boxes indicate regions where there are more than 2 times as many forward sense RNASeq reads aligned to the genome as reverse sense reads. This asymmetrical signal has been found empirically to be a sensitive marker for the ends of transcripts. Green boxes indicate regions where there are more than 2 times as many reverse sense RNASeq reads aligned to the genome as forward sense reads. This asymmetrical signal has been found empirically to be sensitive marker for the ends of transcripts. The height of all boxes indicates the relative score of the feature.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq Asymmetries/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "rnaseq_asymmetries-$ASSEMBLY-LinearBasicDisplay",
          "mouseover": "jexl:'Score: '+get(feature,'score')",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'source')=='RNASeq_R_asymmetry'?'red': get(feature,'source')=='RNASeq_F_asymmetry'?'green':'black'",
            "height": 24,
            "showLabels": false,
            "displayMode": "collapse"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_rnaseq_splice_junctions_(common)",
      "name": "RNASeq Splice Junctions (common)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'common' in that there are more than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq Splice Junctions (common)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "rnaseq_splice_junctions_(common)-$ASSEMBLY-LinearBasicDisplay",
          "mouseover": "jexl:get(feature,'score')",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'strand')>0?'#730073':'#007373'",
            "showLabels": false
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_rnaseq_splice_junctions_(rare)",
      "name": "RNASeq Splice Junctions (rare)",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "These are introns formed by aligned RNASeq reads spanning a region of the genome. Alignments of short read sequences from all available RNASeq projects were used. These junctions are considered 'rare' in that there are fewer than 500 reads confirming their existence. The number of reads spanning the introns is indicated by the darkness of the color (shades of cyan for reverse, shades of violet for forward).  Darker is more reads.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq Splice Junctions (rare)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "rnaseq_splice_junctions_(rare)-$ASSEMBLY-LinearBasicDisplay",
          "mouseover": "jexl:get(feature,'score')+' reads'",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'strand')>0?'#730073':'#007373'",
            "height": "jexl:get(feature,'logscore')<4?4:get(feature,'logscore')>100?50:floor(get(feature,'logscore'))",
            "showLabels": false,
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "$ASSEMBLY_rnaseq",
      "name": "RNASeq",
      "assemblyNames": [
        "$ASSEMBLY"
      ],
      "description": "These boxes indicate alignments of short read sequences from all available RNASeq projects. The number of reads has been normalised by averaging over the number of libraries. The height of all boxes indicates the relative score of the feature.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS284/c_elegans_PRJNA13758/tracks/RNASeq/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "rnaseq-$ASSEMBLY-LinearBasicDisplay",
          "mouseover": "jexl:'Score: '+get(feature,'score')",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "black",
            "height": "jexl:get(feature,'score')>100?50:floor(get(feature,'score')/2)>4?floor(get(feature,'score')/2):4",
            "showLabels": false,
            "displayMode": "collapse"
          }
        }
      ]
    }
  ]
