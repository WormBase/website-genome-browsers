#!/usr/bin/perl
use strict;
use warnings;

use Getopt::Long;
use Config::Tiny;

my ($CONFIG, $MAKE_EXE);

GetOptions(
    'config=s'    => \$CONFIG,
    'make_exe=s'  => \$MAKE_EXE,
) or ( system( 'pod2text', $0 ), exit -1 );

my ($ALLSTATS, $JBROWSEDIR);

my $Config = Config::Tiny->read($CONFIG) or die $!;
$ALLSTATS  = $Config->{_}->{allstats};
$JBROWSEDIR= $Config->{_}->{jbrowsedir};

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
    print OUT "time $MAKE_EXE  --jbrowse $JBROWSEDIR --conf $CONFIG --species $species\n";
}
close OUT;

exit;

