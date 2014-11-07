#!/usr/bin/perl
use strict;
use warnings;

my $ALLSTATS = $ARGV[0];

open AS, $ALLSTATS or die $!;
my $firstline = <AS>;
chomp $firstline;
my @columnnames = split /\t/, $firstline;

shift @columnnames;
shift @columnnames;
shift @columnnames;
shift @columnnames;

open OUT, ">make_all_jbrowse.sh" or die;
print OUT "#!/bin/sh\n";
for my $species (@columnnames) {
    print OUT "time ../bin/make_jbrowse.pl --jbrowse /home/scain/scain/jbrowse-test --conf c_briggs.jbrowse.conf --species $species\n";
}
close OUT;

exit;

