#!/usr/bin/perl
use strict;
use warnings;

use JSON;
use Getopt::Long;
use FindBin qw($Bin);
use Data::Dumper;

my ($RELEASE, $ASSEMBLY);

GetOptions(
    'release=s'   => \$RELEASE,
) or ( system( 'pod2text', $0 ), exit -1 );

$RELEASE  ||= '285';

my $TRACKS_CONFIGS = "$Bin/../config/track_configs/WS$RELEASE/";

chdir $TRACKS_CONFIGS;

my @track_files = <*.json>;

my @assemblies = <DATA>;
my $all_tracks;
for my $assembly (@assemblies) {
    chomp $assembly;
    my $json_file =$TRACKS_CONFIGS . $assembly . '_tracks.json';

    my $blob;
    {
        local $/ = undef;
        open (my $F, "<", $json_file) or die "$!";
        $blob = <$F>;
        close $F; 
    }

    my $tracks = JSON->new->decode($blob);

    $$all_tracks{$assembly}{'tracks'} = $$tracks{'tracks'};
}

print JSON->new->pretty(1)->encode($all_tracks);


__DATA__
b_malayi_PRJNA10729
c_angaria_PRJNA51225
c_becei_PRJEB28243
c_bovis_PRJEB34497
c_brenneri_PRJNA20035
c_briggsae_PRJNA10731
c_elegans_PRJEB28388
c_elegans_PRJNA13758
c_elegans_PRJNA275000
c_inopinata_PRJDB5687
c_japonica_PRJNA12591
c_latens_PRJNA248912
c_nigoni_PRJNA384657
c_panamensis_PRJEB28259
c_parvicauda_PRJEB12595
c_quiockensis_PRJEB11354
c_remanei_PRJNA53967
c_remanei_PRJNA577507
c_sinica_PRJNA194557
c_sulstoni_PRJEB12601
c_tribulationis_PRJEB12608
c_tropicalis_PRJNA53597
c_uteleia_PRJEB12600
c_waitukubuli_PRJEB12602
c_zanzibari_PRJEB12596
o_tipulae_PRJEB15512
o_volvulus_PRJEB513
p_pacificus_PRJNA12644
p_redivivus_PRJNA186477
s_ratti_PRJEB125
t_muris_PRJEB126
