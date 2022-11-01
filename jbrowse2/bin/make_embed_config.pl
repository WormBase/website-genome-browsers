#!/usr/bin/perl
use strict;
use warnings;

use JSON;
use FindBin qw($Bin);
use Getopt::Long;
use Data::Dumper;

my $RELEASE;

GetOptions(
     'release=s'   => \$RELEASE,
) or ( system( 'pod2text', $0 ), exit -1 );

$RELEASE  ||= '285';

#define config dirs

my $TRACKS_CONFIGS   = "$Bin/../config/track_configs/WS$RELEASE/";
my $ASSEMBLY_CONFIGS = "$Bin/../config/assembly_configs/";

my $OUTDIR = $TRACKS_CONFIGS;

my @assemblies;
my @tracks;

my $json;

chdir $ASSEMBLY_CONFIGS;

my @assembly_files = <*.json>;

for my $file (@assembly_files) {
    my $blob;
    {
        local $/ = undef;
        open (my $F, "<", $file) or die "$!";
        $blob = <$F>;
        close $F;
    }

    #should really be one per file, but the json doesn't know that
    my $assembly_list = JSON->new->decode($blob);

    my $filename = $TRACKS_CONFIGS . $$assembly_list{'assemblies'}[0]{'name'} . "_embed.json";

    my $track_file = $TRACKS_CONFIGS . $$assembly_list{'assemblies'}[0]{'name'} . '_tracks.json';

    {
        local $/ = undef;
        open (my $F, "<", $track_file) or die "$!: $track_file";
        $blob = <$F>;
        close $F;
    }

    my $track_list = JSON->new->decode($blob);

    my $json;
    $$json{'tracks'} = $$track_list{'tracks'};
    $$json{'assemblies'} = $$assembly_list{'assemblies'};

    open (my $JSON, ">", $filename) or die $!;    
    print $JSON JSON->new->pretty(1)->encode($json);
}


