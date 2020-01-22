#!/usr/bin/perl

use strict;
use warnings;
use Getopt::Long;
use Data::Dumper;
use JSON;

my ($BIOPROJECT, $RELEASE, $FILE, $PRETTY);

GetOptions(
    'bioproject=s'   => \$BIOPROJECT,
    'release=s'      => \$RELEASE,
    'file=s'         => \$FILE,
    'pretty=s'       => \$PRETTY,
) or ( system( 'pod2text', $0 ), exit -1 );

die unless $BIOPROJECT && $RELEASE && $FILE;

my $S3URL = "https://s3.amazonaws.com/wormbase-modencode/docker/$RELEASE/$BIOPROJECT";

my $FILEIN = $FILE;
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

    warn $f;
    $json = JSON->new->decode($data);

    for my $a (@{$$json{'tracks'}}){
        $$a{'urlTemplate'} =~ s/\.\.\/tracks/$S3URL\/tracks/;
        push @tracks, $a;
        #warn %$a;
    }
#    warn @{$$json{'tracks'}};

}


$$trackList{'tracks'} = \@tracks;
$$trackList{'include'} = ['../functions.conf'];
$$trackList{'names'}{'url'} =~ s/names/$S3URL\/names/;

if (defined $PRETTY && $PRETTY) {
    print JSON->new->pretty(1)->encode($trackList);
}
else {
    print JSON->new->encode($trackList);
}









