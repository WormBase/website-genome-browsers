#!/usr/bin/perl 

#this is a one-off script like the one for modERN to convert a bunch of
#similar tracks from JBrowse 1 to JBrowse 2. This one is a little more
#complicated but not too bad

use strict;
use warnings;

use JSON;
use Data::Dumper;

my $file = '/Users/cain/git/website-genome-browsers/jbrowse/jbrowse/data/c_elegans/includes/c_elegans_PRJNA13758_modencode2_with_peaks.json';

my $blob;
{
    local $/ = undef;
    open (my $F, "<", $file) or die "$!";
    $blob = <$F>;
    close $F;
}

my @newtracks;

my $tracks = JSON->new->decode($blob);

for my $track (@{$$tracks{'tracks'}}) {
    my $newtrack;
    my $label = $$track{'key'}; # yeah, I know
    $$newtrack{'name'} = $label;
    $$newtrack{'adapter'}{'bigWigLocation'}{'uri'} = $$track{'urlTemplate'};
    $$newtrack{'type'} = 'QuantitativeTrack';
    @{$$newtrack{'assemblyNames'}} = ('c_elegans_PRJNA13758');
    $$newtrack{'adapter'}{'type'} = 'BigWigAdapter';
    $$newtrack{'adapter'}{'bigWigLocation'}{'locationType'} = 'UriLocation';
    my $display;
    $$display{'type'} = 'LinearWiggleDisplay';
    $$display{'minScore'} = 1.0*$$track{'min_score'} if defined $$track{'min_score'};
    $$display{'maxScore'} = 1.0*$$track{'max_score'} if defined $$track{'max_score'};
    

# now for some parsing
    my $subcat;
    if ($$track{'category'} =~ /modENCODE data \(2014\)\/(.*)/) {
      $subcat = $1;
    } else {
      die $$track{'category'};
    }
    @{$$newtrack{'category'}}[0] = 'modENCODE data (2014)';
    (@{$$newtrack{'category'}}[1], @{$$newtrack{'category'}}[2]) = split('/', $subcat);

    my $key = $$track{'label'}; #yeah, I know.
    $$display{'displayId'} = $key.'_'.@{$$newtrack{'category'}}[1].'_'.@{$$newtrack{'category'}}[2].'-LinearWiggleDisplay';   

    $$newtrack{'trackId'} = 'c_elegans_PRJNA13758_'.'_'.@{$$newtrack{'category'}}[1].'_'.@{$$newtrack{'category'}}[2].'_'.$key;

    $$newtrack{'description'} = $$track{'metadata'}{'shortInfo'};

    push @{$$newtrack{'displays'}},  $display;
    push @newtracks, $newtrack;

    if (defined $$track{'bigbed'}) {
        push @newtracks, createBigBed($track, $newtrack);
    }
}

print JSON->new->pretty(1)->encode(\@newtracks);


sub createBigBed {
    my $track = shift;
    my $bwtrack = shift;
    my $newbbtrack;

    my $label = $$track{'key'};
    $$newbbtrack{'adapter'}{'bigBedLocation'}{'uri'} = $$track{'bigbed'}{'urlTemplate'}; 
    $$newbbtrack{'type'} = 'FeatureTrack';
    @{$$newbbtrack{'assemblyNames'}} = ('c_elegans_PRJNA13758');
    $$newbbtrack{'adapter'}{'type'} = 'BigBedAdapter';
    $$newbbtrack{'adapter'}{'bigBedLocation'}{'locationType'} = 'UriLocation';
    @{$$newbbtrack{'category'}}[0] = @{$$bwtrack{'category'}}[0] ;
    @{$$newbbtrack{'category'}}[1] = @{$$bwtrack{'category'}}[1] ;
    @{$$newbbtrack{'category'}}[2] = @{$$bwtrack{'category'}}[2] ;

    $$newbbtrack{'description'} = "Peak calls for $label";

    $$newbbtrack{'name'} = "__$$bwtrack{'name'}";
    $$newbbtrack{'name'} =~ s/w peaks/peaks/;   

    $$newbbtrack{'trackId'} = $$bwtrack{'trackId'}.'_'.'bigbed_peaks';

    my $display;
    $$display{'type'} = 'LinearBasicDisplay';
    $$display{'renderer'}{'type'} = 'SvgFeatureRenderer';
    $$display{'renderer'}{'color1'} = 'deeppink';
    $$display{'renderer'}{'height'} = 6;
    $$display{'renderer'}{'showLabels'} = JSON::false;
    $$display{'renderer'}{'showDescriptions'} = JSON::false;

    my $key = $$track{'label'};
    $$display{'displayId'} = $key.'_'.@{$$bwtrack{'category'}}[1].'_'.@{$$bwtrack{'category'}}[2].'_bigbed_peaks';

    push @{$$newbbtrack{'displays'}},  $display; 

    return $newbbtrack;
}

