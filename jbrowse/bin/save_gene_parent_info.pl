#!/usr/bin/perl
use strict;
use warnings;

=pod

In the Curated Genes (subtype) tracks, the parental gene information
gets lost (first noticed in protein coding, but happens in noncoding too).
This tool copies the value in the Parent attribute in the transcript
feature to another attribute that isn't "magic" and won't get lost
like Parent does.

=cut

use Bio::GFF3::LowLevel qw/ gff3_parse_feature gff3_format_feature /;
use IO::Handle;

my $FILEIN = $ARGV[0];
my $FILEOUT = "$FILEIN.out";

my $infh   = new IO::File "< $FILEIN";
my $outfh  = new IO::File "> $FILEOUT";

while (<$infh>) {
    next if /^#/;

    #fix bad "Family" attributes on transposon genes
    $_ =~ s/Family=/family=/;

    if ($_ !~ /\t(mRNA|miRNA_primary_transcript|miRNA|ncRNA|rRNA|scRNA|snoRNA|tRNA|piRNA|lincRNA|antisense_RNA)\t/) { 
        print $outfh $_; 
        next;
    }
    my $f = gff3_parse_feature($_);

    my $parent = @{$f->{attributes}->{Parent}}[0];

    warn "No parent for $_" unless $parent; 

    $f->{attributes}->{jbrowse_parent} = $parent; 

    print $outfh gff3_format_feature($f);
}

