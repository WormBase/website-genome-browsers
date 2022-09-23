#!/usr/bin/perl
use strict;
use warnings;

use FindBin qw($Bin);
my $dir = "$Bin/../config/track_configs";
my $configfile = "$dir/seq_sim_generic.json";
my $config;
{
    local $/ = undef;
    open (my $C, "<", $configfile) or die "$!:$config";
    $config = <$C>;
}

for my $species (<DATA>) {
    chomp $species;
    my $species_nospace = $species;
    $species_nospace =~ s/ /_/g;
    my $filenamepart = $species;
    $filenamepart =~ s/ //g;
    $filenamepart = lc $filenamepart;
    $species =~ s/ /. /g;

    my $ss_config = $config;

    $ss_config =~ s/\$NOSPACESPECIES/$species_nospace/g;
    $ss_config =~ s/\$SPECIES/$species/g;

    my $outfile = 'sequence_similarity_'.$filenamepart.'_proteins_blastx.json'; 

    open OUT, ">$dir/$outfile";
    print OUT $ss_config;
}

__DATA__
B malayi
C brenneri
C briggsae
C elegans
C japonica
C remanei
D melanogaster
H sapiens
O volvulus
P pacificus
S cerevisiae
S ratti
T muris
