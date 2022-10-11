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

$RELEASE  ||= '284';

#define config dirs

my $TRACKS_CONFIGS   = "$Bin/../config/track_configs/WS$RELEASE/";
my $ASSEMBLY_CONFIGS = "$Bin/../config/assembly_configs/";

my @assemblies;
my @tracks;

chdir $TRACKS_CONFIGS;

my @track_files = <*tracks.json>;

for my $file (@track_files) {
    my $blob;
    {
        local $/ = undef;
        open (my $F, "<", $file) or die "$!";
        $blob = <$F>;
        close $F;
    }

    my $trackList = JSON->new->decode($blob);

    for my $tracks (@$trackList{tracks}) {
	for my $track (@$tracks) {
            push @tracks, $track;
        }
    }
}

my $json;
$$json{'tracks'} = \@tracks;

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

    my $assembly_list = JSON->new->decode($blob);

    for my $assemblies ( @$assembly_list{assemblies} ) {
        for my $assembly ( @$assemblies ) {
            push @assemblies, $assembly;
	}
    }
}

$$json{'assemblies'} = \@assemblies;

#now the rest of the config that doesn't change

$$json{'configuration'}{'rpc'}{'defaultDriver'} = "MainThreadRpcDriver";
$$json{'configuration'}{'rpc'}{'drivers'}{'MainThreadRpcDriver'} = {};
$$json{'configuration'}{'rpc'}{'drivers'}{'WebWorkerRpcDriver'}  = {};

$$json{'configuration'}{'logoPath'}{'locationType'} = "UriLocation";
$$json{'configuration'}{'logoPath'}{'uri'} = '';

my $plugin;
$$plugin{'esmUrl'} = "hex_plugin.js";
my $plugin2;
$$plugin2{'esmUrl'} = "variantColor_plugin.js";
my @plugins = ($plugin, $plugin2);
$$json{'plugins'} = \@plugins;

#that might be all that's needed
#I dont think we need several of the things that are empty arrays 
#in the existing config






print JSON->new->pretty(1)->encode($json);

