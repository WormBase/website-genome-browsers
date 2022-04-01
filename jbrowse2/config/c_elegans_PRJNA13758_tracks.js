  export default [
    {
      "type": "FeatureTrack",
      "trackId": "curated_genes-1645387763069",
      "name": "Curated Genes",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "Protein-coding gene structures result from the integration of a variety of prediction methods and data sources followed by manual review and revison by WormBase curators. tRNAs are predicted by tRNAscan, and other non-coding RNA transcripts are taken from a variety of literature sources. The purple and blue colors indicate transcripts on the forward and reverse strands respectively. Dark purple areas represent 5' and 3' UTRs of protein-coding transcripts, assigned automatically using the extents of overlapping ESTs and full-length cDNAs. The UTR predictions have not been reviewed by WormBase curators, and some are known to contain artifacts. Grey transcripts represent either non-coding transcripts of protein coding genes or transcripts of non-coding genes.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Curated_Genes/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes-1645387763069-LinearBasicDisplay",
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
      "trackId": "operons-1645468358464",
      "name": "Operons",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "These are operons published by Blumenthal et al, Nature 417: 851-854 (2002).",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Operons/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "operons-1645468358464-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "trans-spliced_acceptor-1645468834426",
      "name": "Trans-spliced acceptor",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "This track contains SL1 and SL2 trans-spliced acceptors from a variety of sources: SL1 and SL2 trans-spliced acceptors published by Blumenthal et al, Nature (2002), Trans-Spliced Exon Coupled RNA End Determination (TEC-RED) Hwang et al, PNAS (2004), EST/mRNA sequence data, RNASeq read data from ENA. SL1 acceptors are show in red, SL2 in green. Direction of transcription is indicated by arrow direction.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Trans-spliced acceptor/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "trans-spliced_acceptor-1645468834426-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'source')=='SL1'?'red':'green'"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "curated_genes_(protein_coding)-1646768713520",
      "name": "Curated Genes (protein coding)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "A subset of the full Curated Genes set limited to protein-coding genes only. Only the CDS is represented. Full models (with UTRs) can be seen on the 'Curated Genes' track.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Curated Genes (protein coding)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes_(protein_coding)-1646768713520-LinearBasicDisplay",
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
      "trackId": "curated_genes_(noncoding)-1646768882496",
      "name": "Curated Genes (noncoding)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "Non-coding curated gene models, including ncRNA, tRNA, miRNA, snRNA, snoRNA, piRNA, lincRNA and antisense RNA.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Curated Genes (noncoding)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes_(noncoding)-1646768882496-LinearBasicDisplay",
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
      "trackId": "curated_genes_(pseudogenes)-1646771868646",
      "name": "Curated Genes (pseudogenes)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "A subset of the full Curated Genes set limited to pseudogenes only. Pseudogenes of tRNA are lighter gray and pseudogenes of rRNA are darker gray than pseudogenes of protein coding genes.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Curated Genes (pseudogenes)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "curated_genes_(pseudogenes)-1646771868646-LinearBasicDisplay",
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
      "trackId": "ests-1646772288252",
      "name": "ESTs",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "Native (same-species) Expressed Sequence Tags (ESTs), aligned to the genome using <a href='http://genome.cse.ucsc.edu/cgi-bin/hgBlat'>BLAT</a>. This track shows the best unique location for each EST. The paired 5' and 3' ESTs from the same cDNA clone are connected by a dashed line and a colored light green. ESTs with no mate are yellow, and ESTs with a mate that is 'far away' are dark green.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/ESTs (best)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "ests-1646772288252-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:parent(feature)=='undefined'?'red':get(parent(feature),'has_mate')==1?'limegreen':get(parent(feature),'has_mate')==2?'green':get(parent(feature),'has_mate')==0?'gold':'black'"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "binding_regions-1646772651112",
      "name": "Binding regions",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "Regions within which there may be one or more binding sites of a non-TF, non-Histone molecule.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Binding regions/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "binding_regions-1646772651112-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "yacs,_fosmids,_&_cosmids-1646772875564",
      "name": "YACs, Fosmids, & Cosmids",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "This track shows the locations of the cosmids, fosmids, and YACs used for the physical mapping and sequencing of the C. elegans genome.  The clone termini do not necessarily correspond to the termini of submitted GenBank/EMBL entries. In some cases the exact termini of the clones is not known.  For example, YACs were sequenced using PCR amplification across gaps in the cosmid maps.  When a clone end is not known, it is shown as an arrow extending to the end of the display.  Such data is to be treated with caution.  The Vancouver fosmids can be ordered directly from <a href='http://www.geneservice.co.uk/products/clones/Celegans_Fos.jsp'>GeneService</a>.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/YACs, Fosmids, & Cosmids/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "yacs,_fosmids,_&_cosmids-1646772875564-LinearBasicDisplay",
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
      "trackId": "binding_sites_(curated)-1646786066250",
      "name": "Binding sites (curated)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "Sites where there is experimental evidence of a non-TF, non-Histone molecule binding.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Binding sites (curated)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "binding_sites_(curated)-1646786066250-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "binding_sites_(predicted)-1646786178751",
      "name": "Binding sites (predicted)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
      ],
      "description": "This track shows curated and predicted binding sites for microRNAs. Binding sites (indicated in green) are extracted from the cisRed database of computationally derived potential bind targets. miRanda predictions -- indicated in red -- are the predicted target sequences for microRNA genes, provided by Anton Enright's group using the miRanda program. PicTar predictions -- indicated in blue -- are the predicted target sequences for microRNA genes from Lall et al; A genome-wide map of conserved microRNA targets in C. elegans. Curr Biol. 2006 Mar 7;16(5):460-71.",
      "adapter": {
        "type": "NCListAdapter",
        "rootUrlTemplate": {
          "locationType": "UriLocation",
          "uri": "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS283/c_elegans_PRJNA13758/tracks/Binding sites (predicted)/{refseq}/trackData.jsonz"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "binding_sites_(predicted)-1646786178751-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "jexl:get(feature,'source')=='PicTar'?'blue':get(feature,'source')=='miRanda'?'red':'green'"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "dnasei_hypersensitive_site-1646852694859",
      "name": "DNaseI hypersensitive site",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "dnasei_hypersensitive_site-1646852694859-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "expression_chip_profiles-1646852915258",
      "name": "Expression chip profiles",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "expression_chip_profiles-1646852915258-LinearBasicDisplay",
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
      "trackId": "genome_sequence_errors-1646853105670",
      "name": "Genome sequence errors",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "genome_sequence_errors-1646853105670-LinearBasicDisplay",
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
      "trackId": "contig_submissions-1646853302490",
      "name": "Contig submissions",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "contig_submissions-1646853302490-LinearBasicDisplay",
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
      "trackId": "histone_binding_sites-1646853447501",
      "name": "Histone binding sites",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "histone_binding_sites-1646853447501-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "links_and_superlinks-1646853631136",
      "name": "Links and Superlinks",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "links_and_superlinks-1646853631136-LinearBasicDisplay",
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
      "trackId": "microarray_oligo_probes-1646856711050",
      "name": "Microarray oligo probes",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "microarray_oligo_probes-1646856711050-LinearBasicDisplay",
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
      "trackId": "mrnas/ncrnas-1646857087883",
      "name": "mRNAs/ncRNAs",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "mrnas/ncrnas-1646857087883-LinearBasicDisplay",
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
      "trackId": "orfeome_pcr_products-1646857922559",
      "name": "ORFeome PCR Products",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "orfeome_pcr_products-1646857922559-LinearBasicDisplay",
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
      "trackId": "pcr_assays-1646858227449",
      "name": "PCR Assays",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "pcr_assays-1646858227449-LinearBasicDisplay",
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
      "trackId": "polysomes-1646858382777",
      "name": "Polysomes",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "polysomes-1646858382777-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "promoter_regions-1646858571045",
      "name": "Promoter regions",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "promoter_regions-1646858571045-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "protein_motifs-1646858824893",
      "name": "Protein motifs",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "protein_motifs-1646858824893-LinearBasicDisplay",
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
      "trackId": "regulatory_regions-1646859709346",
      "name": "Regulatory regions",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "regulatory_regions-1646859709346-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "green"
          }
        }
      ]
    },
    {
      "type": "FeatureTrack",
      "trackId": "rnaseq_asymmetries-1646947435566",
      "name": "RNASeq Asymmetries",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "rnaseq_asymmetries-1646947435566-LinearBasicDisplay",
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
      "trackId": "rnaseq_splice_junctions_(common)-1647020009494",
      "name": "RNASeq Splice Junctions (common)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "rnaseq_splice_junctions_(common)-1647020009494-LinearBasicDisplay",
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
      "trackId": "rnaseq_splice_junctions_(rare)-1647271824500",
      "name": "RNASeq Splice Junctions (rare)",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "rnaseq_splice_junctions_(rare)-1647271824500-LinearBasicDisplay",
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
      "trackId": "rnaseq-1647300891588",
      "name": "RNASeq",
      "assemblyNames": [
        "c_elegans_PRJNA13758"
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
          "displayId": "rnaseq-1647300891588-LinearBasicDisplay",
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
