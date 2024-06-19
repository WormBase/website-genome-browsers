#!/usr/bin/perl
use strict;
use warnings;

use JSON;
use Getopt::Long;
use FindBin qw($Bin);
#use Log::Log4perl;
#Log::Log4perl->init("log4perl.conf");
#my $log = Log::Log4perl->get_logger('build.log');

# process args:
#	assembly
#	release
#	jbrowse1 data location (to get trackList.json)
#	possible boolean for placing finished tracks.js in S3

my ($RELEASE, $ASSEMBLY, $S3URL);

GetOptions(
     'release=s'   => \$RELEASE,
     'assembly=s'  => \$ASSEMBLY,
     's3url=s'     => \$S3URL,
) or ( system( 'pod2text', $0 ), exit -1 );

$RELEASE  ||= '284';
$ASSEMBLY ||= 'c_elegans_PRJNA13758';
$S3URL    ||= 'https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase';

my $SEQUENCE = $ASSEMBLY;
$SEQUENCE =~ s/_P/.P/;

#fetch trackList.json, parse into JSON object
# the ".old" json file is the one that has the includes list
# rather than the trackList.json that is used for JB 1, where
# the includes have been inlined
my $trackListLoc = "$S3URL/WS$RELEASE/$ASSEMBLY/trackList.json.old";

system("curl -O $trackListLoc") == 0 or die "failed fetching $trackListLoc: $!";

my $trackListFile = 'trackList.json.old';
my $blob;
{
    local $/ = undef;
    open (my $F, "<", $trackListFile) or die "$!";
    $blob = <$F>;
    close $F;
}

my @tracks;

my $trackList = JSON->new->decode($blob);

#create list of track configs to include
my @includes;
my @blast_tracks;
for my $i (@{$$trackList{'include'}}) {
    $i =~ s/includes\///;
    if ($i eq 'operons.json') {
        #$i = $ASSEMBLY . '_operons.json';
        # explicitly skip this since the species specific config will get picked up
        next;
    }
    if ($i eq 'rnaseq_splice.json') {
        #$i = $ASSEMBLY . '_rnaseq_splice.json';
        # explicitly skip this since the species specific config will get picked up
        next;
    }
    push @includes, $i unless ($i =~ /functions.conf/
                            or $i =~ /PR.*DNA.json/
                            or $i =~ /alphafold/
                            or $i =~ /expression_patterns/);

    if ($i eq 'genes.json') {
        push @blast_tracks, $ASSEMBLY . "_curated_genes";
    }
    elsif ($i eq 'protein_motifs.json') {
        push @blast_tracks, $ASSEMBLY . "_protein_motifs";
    }
    elsif ($i eq 'variations_classical_alleles.json') {
        push @blast_tracks, $ASSEMBLY . "_classical_alleles";
    }
    elsif ($i eq 'genblastg.json') {
        push @blast_tracks, $ASSEMBLY . "_genblastg_cds_predictions";
    }
}

my $includedir = "$Bin/../config/track_configs";

for my $f (@includes) {
    local $/ = undef;
    if (!-e "$includedir/$f") {
        warn "$includedir/$f not found\n";
	next;
    }
    open (my $F, "<", "$includedir/$f") or die "$!:$f";
    my $data = <$F>;
    close $F;

    #warn $f;

    #do the substitutions, then json-ify
    $data =~ s/\$RELEASE/$RELEASE/g;
    $data =~ s/\$ASSEMBLY/$ASSEMBLY/g;
    $data =~ s/\$SEQUENCE/$SEQUENCE/g;
    my $json = JSON->new->decode($data);

    push @tracks, @{$json->{tracks}};
}

#create tracks.js
my $outputjson;
$$outputjson{tracks} = \@tracks;



#print JSON->new->pretty(1)->encode($outputjson);

open (my $BLAST, ">>", '/blast_tracks.txt') or die "couldn't open blast_tracks.txt: $!";

warn join(',',@blast_tracks);
if (scalar @blast_tracks > 0) {
     warn "$ASSEMBLY\t" . join(',',@blast_tracks) . "\n";
     print $BLAST "$ASSEMBLY\t" . join(',',@blast_tracks) . "\n"; 
}
close $BLAST;

# create a 'tracks' section for a server instance
open (my $trackout, ">", $ASSEMBLY."_tracks.json") or die "$!";
print $trackout JSON->new->pretty(1)->encode($outputjson);
close $trackout;

# create a tracks.js for an embedded instance
open (my $embedtrackout, ">", $ASSEMBLY."_tracks.js") or die "$!";
print $embedtrackout "  export default ";
print $embedtrackout JSON->new->pretty(1)->encode(\@tracks);
close $embedtrackout;

#optionally place it in s3 bucket
