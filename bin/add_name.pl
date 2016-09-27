#!/usr/bin/perl
use strict;
use warnings;

=pod

So why add Name attributes? In order for the mouseover/tooltip popups to work,
JBrowse requires that the features have Name attributes (why is not exactly clear
to me, but whatever).  So that's what this script does in a fairly simple way.
If it starts failing, look at the hard coded list of attributes that the
script looks for to copy into the Name attribute.

=cut

use Bio::GFF3::LowLevel qw/ gff3_parse_feature gff3_format_feature /;
use IO::Handle;

my $FILEIN = $ARGV[0];
my $FILEOUT = "$FILEIN.out";

my $infh   = new IO::File "< $FILEIN";
my $outfh   = new IO::File "> $FILEOUT";

while (<$infh>) {
    next if /^#/;
    (print $outfh && next) if /Name=/;
    my $f = gff3_parse_feature($_);

    my $id = @{$f->{attributes}->{ID}}[0];
    $id    = @{$f->{attributes}->{public_name}}[0]  unless $id;
    $id    = @{$f->{attributes}->{variation}}[0]  unless $id;

    unless ($id) {
        my $target = @{$f->{attributes}->{Target}}[0];
        if ($target =~ /(\S+)\s/) {
            $id = $1; 
        }
    }

    warn "No id for $_" unless $id; 

    $f->{attributes}->{Name} = $id; 

    print $outfh gff3_format_feature($f);
}

