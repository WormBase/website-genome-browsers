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

my $TRACK_CONFIGS    = "$Bin/../config/track_configs/";
my $RELEASE_CONFIGS  =  $TRACK_CONFIGS . "WS$RELEASE/";
my $ASSEMBLY_CONFIGS = "$Bin/../config/assembly_configs/";

my @assemblies;
my @tracks;

chdir $RELEASE_CONFIGS;

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

chdir $TRACK_CONFIGS;

my @synteny_tracks = <*synteny.json>;

for my $file (@synteny_tracks) {
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

my @text_searches;
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

    #create a text search config for this assembly
    $file =~ /(.*)_assembly.json/;
    my $assembly_name = $1;

    my $text_config;
    $$text_config{'type'} = 'JBrowse1TextSearchAdapter';
    $$text_config{'textSearchAdapterId'} = $assembly_name . '_generate-names-index';
    $$text_config{'namesIndexLocation'}{'uri'} = 'https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS' .  $RELEASE . '/' . $assembly_name . '/names/';
   
    my @assembly_list = ($assembly_name);
    $$text_config{'assemblyNames'} = \@assembly_list;

    push @text_searches, $text_config;  
}

$$json{'assemblies'} = \@assemblies;
$$json{'aggregateTextSearchAdapters'} = \@text_searches;

#now the rest of the config that doesn't change

##switching to umd plugins means we don't need this anymore
#$$json{'configuration'}{'rpc'}{'defaultDriver'} = "MainThreadRpcDriver";
#$$json{'configuration'}{'rpc'}{'drivers'}{'MainThreadRpcDriver'} = {};
#$$json{'configuration'}{'rpc'}{'drivers'}{'WebWorkerRpcDriver'}  = {};

$$json{'configuration'}{'logoPath'}{'locationType'} = "UriLocation";
$$json{'configuration'}{'logoPath'}{'uri'} = 'logo_wormbase_gradient-150px.png';

$$json{'configuration'}{'theme'}{'palette'}{'secondary'}{'main'} = '#29405F';
# this color is related to the light blue used on the rest of WB
# but darkened to improve contrast in some JB2 UI elements
$$json{'configuration'}{'theme'}{'palette'}{'tertiary'}{'main'}  = '#9da9b6';

#add config for sorting/collapsing categories
$$json{'configuration'}{'sort'}{'trackNames'} = 'true';
$$json{'configuration'}{'sort'}{'categories'} = 'true';
$$json{'configuration'}{'defaultCollapsed'}{'subCategories'} = 'true';
$$json{'configuration'}{'defaultCollapsed'}{'topLevelCategories'} = 'true';



my $plugin;
my $hex;
$$hex{'name'}          = "HexJexlPlugin";
$$hex{'umdLoc'}{'uri'} = "hex_plugin.js";
my $vColor;
$$vColor{'name'}       = "VariantColorPlugin";
$$vColor{'umdLoc'}{'uri'} = "variantColor_plugin.js";
my $help;
$$help{'name'}         = "JBrowseSiteSpecificHelp";
$$help{'umdLoc'}{'uri'}= "plugins/JBrowseSiteSpecificHelp/jbrowse-site-specific-help.umd.development.js";
my @plugins = ($hex, $vColor, $help);
$$json{'plugins'} = \@plugins;


#that might be all that's needed
#I dont think we need several of the things that are empty arrays 
#in the existing config






print JSON->new->pretty(1)->encode($json);

