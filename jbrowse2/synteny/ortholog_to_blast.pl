#!/usr/bin/perl
use strict;
use warnings;


my $query_gene;
my @target_genes;
my $first_line = 0;
while (<>) {
    if (/=/) {
        #print results, reset
        for my $gene (@target_genes) {
            print join("\t",($query_gene,$gene,100,200,0,0,1,200,1,200,0,950,100.0)),"\n";
        }  
        @target_genes = ();
        $first_line = 1;
    } elsif ($first_line) {
        $first_line = 0;
        ($query_gene) = split("\t"); 
    } else {
        my @la = split("\t");
        next unless @la>1;
        next unless ($la[1] =~/WBGene/);
        push @target_genes, $la[1]; 
    }
    
}
