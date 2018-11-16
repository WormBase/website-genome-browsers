#!/usr/bin/perl
use strict;
use warnings;

use IO::Handle;
use FindBin qw($Bin);

my $SPECIES = $ARGV[0];
my $FILEIN = $ARGV[1];

system("$Bin/med_hi_scoring_introns.pl $SPECIES $FILEIN" ) ==0 or die;
system("$Bin/low_scoring_introns.pl    $SPECIES $FILEIN" ) ==0 or die;
