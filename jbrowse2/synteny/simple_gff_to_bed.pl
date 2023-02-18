#!/usr/bin/perl
use strict;
use warnings;

while (<>) {
    chomp;
    my @la = split("\t");

    my $id;
    if ($la[8] =~ /(WBGene\d+)/) {
        $id = $1;
    } else {
        die "no id @la";
    }

    print join("\t",($la[0],$la[3],$la[4],$id)),"\n"; 
}
