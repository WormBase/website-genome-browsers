#!/usr/bin/perl
use strict;
use warnings;

#This script is really intended as a one off to parse the bam and bigwig information
#from WormBase GBrowse configuration files for modENCODE information and generate
#JBrowse track configuration JSON.  Since the modENCODE data doesnt' change anymore,
#this should only have to happen once.

#Usage:

#   perl parse_modencode_bigwig_bam.pl <gbrowse_config_file>  > <c_elegans_json_config_file>




use JSON;

my %trackdata;
my %databasedata;
my $currentstanza;

while (<>) {
    if (/\[(.*?):database]/) {
        $currentstanza = $1;
    }
    elsif (/\-bam\s+(\S+)\s/) {
        $databasedata{$currentstanza}{bam}    = $1;
    }
    elsif (/\-bigwig\s*\=\>\s*\'(.*)\'/) {
        $databasedata{$currentstanza}{bigwig} = $1;
    }
    elsif (/\-fasta.*\'(.*)\'/) {
        $databasedata{$currentstanza}{fasta}  = $1;
    }

    elsif (/\[(.*?)\]/) {
        #any other stanza
        $currentstanza = $1;
    }
    elsif (/^key\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{key} = $1;
    }
    elsif (/^category\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{category} = $1;
    }
    elsif (/^citation\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{citation} = $1;
    }
    elsif (/^database\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{database} = $1;
    }
    elsif (/^feature\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{feature}  = $1;
    }
    elsif (/^track source\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{track_source} = $1;
    }
    elsif (/^data source\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{data_source} = $1;
    }
    elsif (/^select\s*=\s*(.*)$/) {
        $trackdata{$currentstanza}{select} = $1;
    }
}

for my $key (keys %databasedata) {

    if ($key =~ /^(.*)_bam$/) {
        my $bw = "$1_bw";
        $databasedata{$key}{fasta} = $databasedata{$bw}{fasta};
    }

#    print "$key\n";
#    print "  ".($databasedata{$key}{bam}   ?$databasedata{$key}{bam}   :'--')."\n";
#    print "  ".($databasedata{$key}{bigwig}?$databasedata{$key}{bigwig}:'--')."\n";
#    print "  ".($databasedata{$key}{fasta} ?$databasedata{$key}{fasta} :'--')."\n\n";
}

my @tracks;
for my $key (keys %trackdata) {
    next unless $trackdata{$key}{database};
    next if ($key eq 'general');
    next if ($trackdata{$key}{database} eq 'modencode_snyder');
    next if ($trackdata{$key}{database} eq 'quantitative_data_tss_sites');
    next if ($trackdata{$key}{database} eq 'modencode_waterston');
    next if ($trackdata{$key}{database} eq 'modencode_lieb');
    next if ($trackdata{$key}{database} eq 'modencode_henikoff');
    next if ($trackdata{$key}{database} eq 'modencode_piano');


    my $type;
    my $urltemplate;
    my $storeclass;
    my $citation;
    my $category;
    if ($key =~ /^(.*):2000$/) {
        my $bamkey = $1;
        $trackdata{$key}{key} = $trackdata{$bamkey}{key}." (bigwig)";
        $type = "JBrowse/View/Track/Wiggle/XYPlot";
        $urltemplate = $databasedata{ $trackdata{$key}{database} }{bigwig};
        $storeclass = "BigWig";
        $citation = $trackdata{$bamkey}{citation};
        $category = $trackdata{$bamkey}{category};
    }
    else {
        $type = "Alignments2";
        $urltemplate = $databasedata{ $trackdata{$key}{database} }{bam};
        $storeclass = "JBrowse/Store/SeqFeature/BAM";
        $citation = $trackdata{$key}{citation};
        $category = $trackdata{$key}{category};
    }

    $citation ||= '';
    $citation =~ tr/"/'/;



    my $struct = {
         "category" => $category ,
         "label"    => $trackdata{$key}{key},
         "key"      => $trackdata{$key}{key},
         "storeClass" => $storeclass,
         "type"       => $type,
         "autoscale"  => "local",
         "urlTemplate"=> $urltemplate,
         "metadata" => { "citation" => $citation }
    }; 

    push @tracks, $struct;  

#    print "$key\n";
#    print "  ".($trackdata{$key}{key}     ?$trackdata{$key}{key}     :'--')."\n";
#    print "  ".($trackdata{$key}{category}?$trackdata{$key}{category}:'--')."\n";
#    print "  ".($trackdata{$key}{citation}?$trackdata{$key}{citation}:'--')."\n";
#    print "  ".($trackdata{$key}{database}?$trackdata{$key}{database}:'--')."\n";
#    print "  ".($trackdata{$key}{feature}?$trackdata{$key}{feature}:'--')."\n";
#    print "  ".($trackdata{$key}{track_source}?$trackdata{$key}{track_source}:'--')."\n";
#    print "  ".($trackdata{$key}{data_source}?$trackdata{$key}{data_source}:'--')."\n";
#    print "  ".($trackdata{$key}{select}?$trackdata{$key}{select}:'--')."\n\n";

}

my $json = JSON->new->pretty(1)->encode({tracks => \@tracks});

print $json;
