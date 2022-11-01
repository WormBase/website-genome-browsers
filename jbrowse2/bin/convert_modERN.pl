#!/usr/bin/perl 

# this is a one-off script for converting the JBrowse 1 config for the the modERN tracks to
# the JBrowse 2 config format. I'm keeping it around for future reference.

use strict;
use warnings;

use JSON;

my $file = '/Users/cain/git/website-genome-browsers/jbrowse/jbrowse/data/c_elegans/includes/c_elegans_PRJNA13758_modERN.json';

my $blob;
{
    local $/ = undef;
    open (my $F, "<", $file) or die "$!";
    $blob = <$F>;
    close $F;
}

my @newtracks;

my $tracks = JSON->new->decode($blob);

for my $track (@$tracks) {
    my $newtrack;
    my $label = $$track{'key'}; # yeah, I know
    $$newtrack{'name'} = $label;
    $$newtrack{'adapter'}{'bigBedLocation'}{'uri'} = $$track{'urlTemplate'};
    $$newtrack{'type'} = 'FeatureTrack';
    @{$$newtrack{'assemblyNames'}} = ('c_elegans_PRJNA13758');
    $$newtrack{'adapter'}{'type'} = 'BigBedAdapter';
    $$newtrack{'adapter'}{'bigBedLocation'}{'locationType'} = 'UriLocation';
    my $display;
    $$display{'type'} = 'LinearBasicDisplay';
    $$display{'renderer'}{'type'} = 'SvgFeatureRenderer';
    $$display{'renderer'}{'color1'} = 'blue';
    $$display{'renderer'}{'height'} = 6;
    

# now for some parsing
    my $subcat;
    $$track{'category'} =~ /modERN\/(.*)/;
    $subcat = $1;
    @{$$newtrack{'category'}}[0] = 'modERN';
    @{$$newtrack{'category'}}[1] = $1;

    my $key = $$track{'label'}; #yeah, I know.
    $$display{'displayId'} = $key.'-LinearBasicDisplay';   

    $$newtrack{'trackId'} = 'c_elegans_PRJNA13758_'.$key;

    my $shortInfo = $$track{'metadata'}{'shortInfo'};
    my $trackurl;
    my $experimenturl;
    $shortInfo =~ /for this track, see \<a href=\'(.*?)\'.*experiment, see \<a href=\'(.*)\'/;
    $trackurl = $1;
    $experimenturl = $2;

    $$newtrack{'description'} = "Data from the modERN project hosted at the https://www.encodeproject.org/. Data for $label was generated at the Kevin White, UChicago lab. For more information on the data specifically for this track, see $trackurl and for more information on this $label experiment, see $experimenturl.";

    push @{$$newtrack{'displays'}},  $display;
    push @newtracks, $newtrack;
}

print JSON->new->pretty(1)->encode(\@newtracks);


__DATA__
    {
      "adapter": {
        "type": "BigBedAdapter",
        "bigBedLocation": {
          "locationType": "UriLocation",
          "uri": "$URI"
        }
      },
      "displays": [
        {
          "type": "LinearBasicDisplay",
          "displayId": "$KEY-LinearBasicDisplay",
          "renderer": {
            "type": "SvgFeatureRenderer",
            "color1": "blue",
            "height": 6
          }
        }
      ]
    }
