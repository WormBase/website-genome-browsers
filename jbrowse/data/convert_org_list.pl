#!/usr/bin/perl
use strict;
use warnings;

open LIST, "organism.list" or die $!;
open CONF, ">organisms.conf" or die $!;

while (<LIST>) {
    chomp;
    my $organism = $_;
    my $nice_org = $organism;
    $nice_org =~ s/(\S)_(\w+?)\..*/\U$1. $2/;
   
    print CONF "[datasets.$organism]\n";
    print CONF "name   = $nice_org\n";
    print CONF "url    = ?data=data/$organism\n\n";
 
}

close LIST;
close CONF;


