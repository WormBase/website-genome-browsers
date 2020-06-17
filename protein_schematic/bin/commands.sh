bin/prepare-refseqs.pl --fasta ../build/all.fa --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --nameAttributes "wormbase_geneid,wormbase_genename,wormbase_protein" --type CDS --key "Exon boundaries" --trackLabel "Exon boundaries" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type compositionally_biased_region_of_peptide --key "seg" --tracklabel "seg" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type coiled_coil --key "ncoils" --tracklabel "ncoils" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type transmembrane_helix --key "tmhmm" --tracklabel "tmhmm" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type signal_peptide --key "signalp" --tracklabel "signalp" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type motif --key "Motifs" --tracklabel "Motifs" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type match:Mass_spec_peptide --key "Mass spec peptides" --trackLabel "Mass spec peptides" --trackType CanvasFeatures --compress
#bin/flatfile-to-json.pl --gff ../build/all.gff --type match --key "Selected BLASTP Homologies" --tracklabel "Selected BLASTP Homologies" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type catalytic_residue --key "Catalytic residue" --tracklabel "Catalytic residue" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type metal_binding_site --key "Metal binding site" --tracklabel "Metal binding site" --trackType CanvasFeatures --compress
bin/flatfile-to-json.pl --gff ../build/all.gff --type post_translationally_modified_region --key "Post transcriptionally modified site" --tracklabel "Post transcriptionally modified site" --trackType CanvasFeatures --compress

nice bin/generate-names.pl --compress
