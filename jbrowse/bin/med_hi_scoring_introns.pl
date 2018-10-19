#!/usr/bin/perl
use strict;
use warnings;

use Bio::GFF3::LowLevel qw/ gff3_parse_feature gff3_format_feature /;
use Storable qw/ dclone /;
use IO::Handle;
use Getopt::Long;

my $SORT = 0;
my $CUTOFF;

GetOptions(
    'sort'   => \$SORT,
    'cutoff=s' => \$CUTOFF,
) or ( system( 'pod2text', $0 ), exit -1 );

#die "cutoff required" unless $CUTOFF;

my $SPECIES = $ARGV[0];
my $FILEIN = $ARGV[1];
my $FILEOUT = "$FILEIN.high";

unless ($CUTOFF) {
    $CUTOFF = 20;
    if ($SPECIES =~ /elegans/) {
        $CUTOFF = 500;
    }
}

if ($SORT) {
    #do a simple unix sort on the ninth column first
    system("sort -k 9 $FILEIN > $FILEIN.sorted; mv $FILEIN.sorted $FILEIN");
}

my $infh   = new IO::File "< $FILEIN";
my $outfh   = new IO::File "> $FILEOUT";

while(<$infh>) {
    next if /^#/;
    my $f = gff3_parse_feature($_);

    my $score = $f->{score};
   
    next if $score <$CUTOFF;

    my $logscore = log($score);

    $f->{attributes}->{logscore} = $logscore;
    print $outfh gff3_format_feature($f);     
}

