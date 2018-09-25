#!/usr/bin/perl

use strict;
use warnings;

use JSON::XS;

my @files = (
      "includes/DNA.json",
      "includes/transposons.json",
      "includes/promoter_regions.json",
      "includes/genome_sequence_errors_corrected.json",
      "includes/protein_motifs.json",
      "includes/segmental_duplications.json",
      "includes/variations_rnai_other.json",
      "includes/histone_binding_sites.json",
      "includes/variations_change_of_function_polymorphisms.json",
      "includes/regulatory_regions.json",
      "includes/mrna_best.json",
      "includes/operons_deprecated.json",
      "includes/variations_high_throughput_alleles.json",
      "includes/variations_classical_alleles.json",
      "includes/historical_genes.json",
      "includes/variations_transposon_insertion_sites.json",
      "includes/transposon_genes.json",
      "includes/variations_rnai_best.json",
      "includes/mrna_other.json",
      "includes/operons.json",
      "includes/transcription_factor_binding_region.json",
      "includes/trans_spliced_acceptor.json",
      "includes/genes_protein_coding.json",
      "includes/binding_sites_predicted.json",
      "includes/variations_million_mutation_project.json",
      "includes/genes_noncoding.json",
      "includes/dnaseI_hypersensitive_site.json",
      "includes/polya_sites.json",
      "includes/genes_pseudogenes.json",
      "includes/transcription_end_site.json",
      "includes/genome_sequence_errors.json",
      "includes/binding_sites_curated.json",
      "includes/variations_change_of_function_alleles.json",
      "includes/transcription_factor_binding_site.json",
      "includes/genes.json",
      "includes/variations_polymorphisms.json",
      "includes/variations_balancers.json",
      "includes/clones.json",
      "includes/binding_regions.json",
      "includes/expression_chip_profiles.json",
      "includes/sage_tags.json",
      "includes/genomic_canonical.json",
      "includes/sequence_similarity_ovolvulus_proteins_blastx.json",
      "includes/rnaseq_splice.json",
      "includes/orfeome_pcr_products.json",
      "includes/sequence_similarity_hsapiens_proteins_blastx.json",
      "includes/sequence_similarity_cjaponica_proteins_blastx.json",
      "includes/est_other.json",
      "includes/sequence_similarity_celegans_proteins_blastx.json",
      "includes/repeats_tandem_and_inverted.json",
      "includes/sequence_similarity_trinity_rnaseq.json",
      "includes/pcr_products.json",
      "includes/rnaseq.json",
      "includes/sequence_similarity_cbrenneri_proteins_blastx.json",
      "includes/sequence_similarity_cremanei_proteins_blastx.json",
      "includes/prediction_genemarkhmm.json",
      "includes/sequence_similarity_cbriggsae_proteins_blastx.json",
      "includes/sequence_similarity_wormbase_core_ests_and_mrnas_best.json",
      "includes/genbank_entries.json",
      "includes/mass_spec_peptides.json",
      "includes/orfeome_sequence_tags.json",
      "includes/sequence_similarity_sratti_proteins_blastx.json",
      "includes/sequence_similarity_ppacificus_proteins_blastx.json",
      "includes/prediction_mgene.json",
      "includes/est_best.json",
      "includes/race_sequence_tags.json",
      "includes/links_and_superlinks.json",
      "includes/sequence_similarity_bmalayi_proteins_blastx.json",
      "includes/sequence_similarity_scerevisiae_proteins_blastx.json",
      "includes/genetic_limits.json",
      "includes/transcriptionally_active_region.json",
      "includes/sequence_similarity_dmelanogaster_proteins_blastx.json",
      "includes/expression_patterns.json",
      "includes/g4_motif.json",
      "includes/prediction_genefinder.json",
      "includes/repeats_dust.json",
      "includes/tecred_tags.json",
      "includes/rnaseq_asymmetries.json",
      "includes/sequence_similarity_uniprot_blastx.json",
      "includes/prediction_rnaz.json",
      "includes/polysomes.json",
      "includes/microarray_oligo_probes.json",
      "includes/sequence_similarity_wormbase_core_ests_and_mrnas_other.json",
      "includes/repeats_repeat_masker.json",
      "includes/c_elegans_cendr.json",
      "includes/c_elegans_crispr_predictions.json",
      "includes/c_elegans_landmarks.json",
      "includes/c_elegans_modencode2_henikoff2.json",
      "includes/c_elegans_modencode2_lieb.json",
      "includes/c_elegans_modencode2_lieb_cs_hismods.json",
      "includes/c_elegans_modencode2_lieb_hismods.json",
      "includes/c_elegans_modencode2_lieb_transcription.json",
      "includes/c_elegans_modencode2_snyder_gfp_tf.json",
      "includes/c_elegans_modencode2_snyder_gfp_tf_recall.json",
      "includes/c_elegans_modencode2_snyder_n2_tf.json",
      "includes/c_elegans_modencode2_snyder_pol2_tf.json",
      "includes/c_elegans_tss.json"
);

my $XS = JSON::XS->new;
my $json;
my @tracks;

for my $f (@files) {
    local $/ = undef;
    open (my $F, "<", $f) or die;
    my $data = <$F>;
    close $F;

    $json = $XS->decode($data);

    for my $a (@{$$json{'tracks'}}){
        push @tracks, $a;
        #warn %$a;
    }
#    warn @{$$json{'tracks'}};

}

print $XS->encode(\@tracks);



