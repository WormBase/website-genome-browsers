#!/usr/bin/perl

use strict;
use warnings;
use Data::Dumper;

use JSON;

my $FILEIN = $ARGV[0];
my $blob;
{
local $/ = undef;
open (my $F, "<", $FILEIN) or die "$!:$FILEIN";
$blob = <$F>;
close $F;
}

my @files;

my $json;
my @tracks;

my $trackList = JSON->new->decode($blob);

my @includes;
for my $i (@{$$trackList{'include'}}) {
    push @includes, $i unless $i =~ /function/; 
}


for my $f (@includes) {
    local $/ = undef;
    open (my $F, "<", $f) or die "$!:$f";
    my $data = <$F>;
    close $F;

    $json = JSON->new->decode($data);

    for my $a (@{$$json{'tracks'}}){
        $$a{'urlTemplate'} =~ s/\.\.\/tracks/tracks/g;
        push @tracks, $a;
        #warn %$a;
    }
#    warn @{$$json{'tracks'}};

}


$$trackList{'tracks'} = \@tracks;
$$trackList{'include'} = ['../functions.conf'];

print JSON->new->pretty(1)->encode($trackList);









