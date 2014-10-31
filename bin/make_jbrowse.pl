#!/usr/bin/perl
use strict;
use warnings;

use Getopt::Long;
use Config::Tiny;
use FindBin qw($Bin);
use File::Copy;
use Cwd;
use FileHandle;
use JSON;
#use Data::Dumper;

=head1 NAME

make_jbrowse.pl - Creates a JBrowse instance with input GFF and configuration

=head1 SYNOPSYS

  % make_jbrowse.pl --config <conf file> [options]

=head1 OPTIONS

 --config     Path to ini-style config file (required)
 --gfffile    Path to an input GFF file
 --fastafile  Path to an input FASTA file
 --datadir    Relative path (from jbrowse root) to jbrowse data dir
 --jbrowsedir Path to jbrowse directory
 --nosplit    Don't split GFF file by reference sequence
 --usenice    Run formatting commands with Unix nice 
 --skipfilesplit Don't split files or use grep to make subfiles
 --skipprepare Don't run prepare-refseqs.pl
 --allstats   Path to the ALLSPECIES.stats file
 --quiet      Limit output to errors

=head1 DESCRIPTION

This script will take a GFF file for an organism and create the json
files for JBrowse to consume.

=head2 config

This script uses a fairly simple ini style script.  The options in main
section of the config (before the sections that start with square-bracketed
names) include:

 gfffile   - Path to the input GFF file
 fastafile - Path to the input FASTA file
 datadir   - Relative path (from the jbrowse root) to jbrowse data directory
 nosplit   - Don't split GFF file by reference sequence 
 usenice   - Run formatting commands with Unix nice
 skipfilesplit - Don't split files or use grep to make subfiles
 skipprepare - Don't run prepare-refseqs.pl
 allstats  - Path to the ALLSPECIES.stats file
 includes  - Path to the json includes file
 glyphs    - Path to custom JBrowse glyphs

Note that the options in the config file can be overridden with the command
line options.

Each stanza that starts with a section name enclosed in square brackets has
several options:

=over 

=item

origfile  - Set to 1 to use the original or split GFF file; this is overridden by the presense of the grep option

=item

grep      - A perl-style regular expression that can be used to create a small, track specific GFF file

=item

prefix    - The string that will be prepended to the original file name when created with the grep option

=item

type      - A comma-separated list of types with optional sources, written "type:source,type2:source2"

=item

label     - The jbrowse label and key for the track

=item

altfile   - The section name that contains the grep-created GFF file for this track (to allow a GFF file created for one track to be reused for another)

=item

postprocess - the name of a script that will perform some sort of post
processing on the created GFF file.  It takes the name of the GFF file
as input and creates a gff file with the same name as the input with
".out" appended.  The script should be in the same directory as this
script.

=item

index    - 0|1, whether or not to include this track when running generate_names to index the names for autocompletion.

=back
 
=head2 nosplit

Some of the formatting steps can take a very long time with large GFF
files, so one of the intermeditate steps the script will take is to
split the GFF file into multiple files based on the reference sequence.
This may be less desirable when the genome consists of 10,000 contigs
than when there are 6 chromosomes.

=head2 usenice

Run all of the commands with the Unix nice command to bump their priority
down in the command scheduler.

=head1 AUTHOR

Scott Cain E<lt>scott@scottcain.netE<gt>

Copyright (c) 2014

This script is free software; you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut


my $INITIALDIR = cwd();

my ($GFFFILE, $FASTAFILE, $CONFIG, $DATADIR, $NOSPLITGFF, $USENICE,
    $SKIPFILESPLIT, $JBROWSEDIR, $SKIPPREPARE, $ALLSTATS,
    $QUIET, $INCLUDES, $FUNCTIONS, $ORGANISMS, $GLYPHS);
my %splitfiles;

GetOptions(
    'gfffile=s'   => \$GFFFILE,
    'fastafile=s' => \$FASTAFILE,
    'config=s'    => \$CONFIG,
    'datadir=s'   => \$DATADIR,
    'nosplitgff'  => \$NOSPLITGFF,
    'usenice'     => \$USENICE,
    'skipfilesplit'=>\$SKIPFILESPLIT,
    'jbrowsedir=s'=> \$JBROWSEDIR,
    'skipprepare' => \$SKIPPREPARE,
    'allstats=s'  => \$ALLSTATS,
    'quiet'       => \$QUIET,
) or ( system( 'pod2text', $0 ), exit -1 );

system( 'pod2text', $0 ) unless $CONFIG;

my $Config = Config::Tiny->read($CONFIG) or die $!;

my @config_sections = grep {!/^_/} keys %{$Config}; 

$GFFFILE  ||= $Config->{_}->{gfffile};
$FASTAFILE||= $Config->{_}->{fastafile};
$DATADIR  ||= $Config->{_}->{datadir};
$SKIPFILESPLIT ||= $Config->{_}->{skipfilesplit};
$NOSPLITGFF = $Config->{_}->{nosplitgff} unless defined $NOSPLITGFF;
$USENICE    = $Config->{_}->{usenice}    unless defined $USENICE;
$SKIPPREPARE= $Config->{_}->{skipprepare} unless defined $SKIPPREPARE;
$INCLUDES   = $Config->{_}->{includes};
$FUNCTIONS  = $Config->{_}->{functions};
$ORGANISMS  = $Config->{_}->{organisms};
$GLYPHS     = $Config->{_}->{glyphs};
$ALLSTATS ||= $Config->{_}->{allstats};
my $nice = $USENICE ? "nice" : '';
$JBROWSEDIR ||= "/usr/local/wormbase/website/scain/jbrowse-dev";

#this will be added to by every track
my @include = ("../functions.conf");

#parse all stats
die "allstats must be defined" unless (-e $ALLSTATS);

open AS, $ALLSTATS or die $!;
my $firstline = <AS>;
chomp $firstline;
my @columnnames = split /\t/, $firstline;
my %speciesdata;

#parse the rest of the file
while (my $line = <AS>) {
    chomp $line;
    my @la = split /\t/, $line;

    my $track;
    if($la[3] =~ /\((\S+?)\)$/ ) {
        $track = $1;
    }
    else {
        next;
    }

    for (my $i=0;$i<scalar(@la);$i++) {
        next unless $la[$i];
        $speciesdata{$columnnames[$i]}{$track} = $la[$i];
    }
}
close AS;

my $species = 'a_ceylanicum_PRJNA231479';
    #print $key,"\t",$speciesdata{$species}{$key},"\n";


#use grep to create type specific gff files
unless ($SKIPFILESPLIT) {
  for my $section (@config_sections) {

    next unless $speciesdata{$species}{$section};
    #next unless $Config->{$section}->{prefix};

    if ($Config->{$section}->{altfile}) {
        my $realgfffile = $Config->{$section}->{altfile} . "_$GFFFILE";
        if (-e $realgfffile) {
            next;
        }
        else {
            #naughty--changing the for loop variable in the loop!
            $section = $Config->{$section}->{altfile};    
        }
    }


    my $gffout      = $Config->{$section}->{prefix} . "_$GFFFILE";
    my $greppattern = $Config->{$section}->{grep};
    my $postprocess = $Config->{$section}->{postprocess};

    $greppattern or next;

    my $grepcommand = "grep -P \"$greppattern\" $GFFFILE > $gffout";
    warn $grepcommand unless $QUIET;
    system ("$nice $grepcommand") == 0 or warn $!;

    if ($postprocess) {
        system("$nice $Bin/$postprocess $gffout") == 0 or warn $!;
    }
  }
}

#split the primary GFF file by seq_id if desired.
if (!$NOSPLITGFF) {
    open GFFIN, "<", $GFFFILE or die "couldn't open $GFFFILE for reading: $!";

    while (<GFFIN>) {
        last if (/^##FASTA/);

        if (/^##sequence-region\s+(\w+)\s/) {
            my $filename = $1.".".$GFFFILE;            
            unless ( defined $splitfiles{ $filename } ) {
                $splitfiles{ $filename } = new FileHandle $filename, "w";
            }
            $splitfiles{ $filename }->print( $_ );
            next;
        }

        my @la = split /\t/;

        (warn "ignored gff line: $_" && next) if (scalar @la != 9);

        my $filename = $la[0].".".$GFFFILE;
        unless ( defined $splitfiles{ $filename } ) {
            $splitfiles{ $filename } = new FileHandle $filename, "w";
        }
        $splitfiles{ $filename }->print( $_ );
    }

    for my $key (keys %splitfiles) {
        $splitfiles{$key}->close;
    }
}
else {
    $splitfiles{$GFFFILE} = 1;
}

chdir $JBROWSEDIR or die $!." $JBROWSEDIR\n";

#check to see if the seq directory is present; if not prepare-refseqs
if (!-e $DATADIR."/seq" and !$SKIPPREPARE) {
    my $command = "bin/prepare-refseqs.pl --fasta $INITIALDIR"."/"."$FASTAFILE --out $DATADIR";
    system("$nice $command") == 0 or warn $!;
}
push @include, "includes/DNA.json";

#make a symlink to the organisms include file
unless (-e "$DATADIR/../organisms.conf") {
    symlink $ORGANISMS, "$DATADIR/../organisms.conf" or warn $!;
}

#use original or split gff for many tracks
for my $section (@config_sections) {
    next unless $Config->{$section}->{origfile};

    warn $section unless $QUIET;
    my $type   = $Config->{$section}->{type};
    my $label  = $Config->{$section}->{label};

    for my $file (keys %splitfiles) {
        my $gfffile = $INITIALDIR ."/". $file;
        my $command = "$nice bin/flatfile-to-json.pl --gff $gfffile --out $DATADIR --type \"$type\" --trackLabel \"$label\"  --trackType CanvasFeatures --key \"$label\" --maxLookback 1000000";
        warn $command unless $QUIET;
        system($command) ==0 or warn $!;
    }

    push @include, "includes/$section.json";
}


#use grep-created files for specific tracks
#first process tracks that will be name indexed
for my $section (@config_sections) {
    next unless $Config->{$section}->{index} == 1;
    next unless $speciesdata{$species}{$section};
    process_grep_track($Config, $section);
}

#run indexing
system("$nice bin/generate-names.pl --out $DATADIR --compress");

#process the rest of the tracks
for my $section (@config_sections) {
    next if $Config->{$section}->{index} == 1;
    next unless $speciesdata{$species}{$section};
    process_grep_track($Config, $section);
}


#create trackList data structure:
my $struct = {
    "tracks" => [],
    "names" => { "url" => "names/", "type" => "Hash" },
    "include" => \@include,
    "dataset_id" => "c_elegans",
    "formatVersion" => 1
};
my $json = JSON->new->pretty(1)->encode($struct);

#print out trackList.json
if (-e "$DATADIR/trackList.json") {
    move("$DATADIR/trackList.json","$DATADIR/trackList.json.old");
}

#make a symlink to the includes dir
unless (-e "$DATADIR/includes") {
    symlink $INCLUDES, "$DATADIR/includes" or warn $!;
}
#make a symlink to the functions
unless (-e "$DATADIR/../functions.conf") {
    symlink $FUNCTIONS, "$DATADIR/../functions.conf" or warn $!; 
}



open TL, ">$DATADIR/trackList.json" or die $!;
print TL $json; 
close TL;


#make symlinks for custom glyphs
chdir $GLYPHS;
my @files = glob("*.js");
foreach my $file (@files) {
    unless (-e "$JBROWSEDIR/src/JBrowse/View/FeatureGlyph/$file") {
        symlink "$GLYPHS/$file", "$JBROWSEDIR/src/JBrowse/View/FeatureGlyph/$file" or warn $!;
    }
}

exit(0);


sub process_grep_track {
    my $config = shift;
    my $section= shift;

    my $postprocess = $config->{$section}->{postprocess};
    next if $config->{$section}->{origfile};

    my $gffout;
    if ($config->{$section}->{altfile}) {
        my $altsection = $config->{$section}->{altfile};
        $gffout = $INITIALDIR ."/". $config->{$altsection}->{prefix} . "_$GFFFILE";
    }
    else {
        $gffout = $INITIALDIR ."/". $config->{$section}->{prefix} . "_$GFFFILE";
    }

    if ($postprocess) {
        $gffout = $gffout.".out";
    }

    my $type   = $config->{$section}->{type};
    my $label  = $config->{$section}->{label};
    my $command= "$nice bin/flatfile-to-json.pl --gff $gffout --out $DATADIR --type \"$type\" --trackLabel \"$label\"  --trackType CanvasFeatures --key \"$label\"";
    warn $command unless $QUIET;

    system($command)==0 or warn $! ;
    push @include, "includes/$section.json";

    return;
}




#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:WormBase --trackLabel gene_from_gff --trackType CanvasFeatures --key genes_from_gff --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:WormBase --trackLabel gene_from_gff --trackType CanvasFeatures --key genes_from_gff --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:WormBase --trackLabel gene_from_gff --trackType CanvasFeatures --key genes_from_gff --maxLookback 100000 --sortMem 2000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:WormBase --trackLabel gene_from_gff --trackType CanvasFeatures --key genes_from_gff --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:WormBase --trackLabel gene_from_gff --trackType CanvasFeatures --key genes_from_gff --maxLookback 100000 --sortMem 2000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:WormBase --trackLabel gene_from_gff --trackType CanvasFeatures --key genes_from_gff --maxLookback 1000000

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele_Polymorphism,substitution:Variation_project_Polymorphism,deletion:Variation_project_Polymorphism,SNP:Variation_project_Polymorphism,insertion_site:Variation_project_Polymorphism,complex_substitution:Variation_project_Polymorphism,sequence_alteration:Variation_project_Polymorphism,deletion:Allele_Polymorphism --trackLabel Polymorphisms --trackType CanvasFeatures --key Polymorphisms --maxLookback 500000 --sortMem 3000000000

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:Allele,insertion_site:Allele,substitution:Allele,complex_substitution:Allele,point_mutation:Allele,transposable_element_insertion_site:Allele --trackLabel "Classical alleles" --trackType CanvasFeatures --key "Classical alleles" --maxLookback 500000 --sortMem 3000000000

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/intron_RNASeq_splice.gff --out data/c_elegans --type intron:RNASeq_splice --trackLabel "RNASeq introns"  --trackType CanvasFeatures --key "RNASeq introns" 
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/RNASeq_asymmetry.gff --out data/c_elegans --type transcript_region:RNASeq_F_asymmetry,transcript_region:RNASeq_R_asymmetry --trackLabel "RNASeq Asymmetries"  --trackType CanvasFeatures --key "RNASeq Asymmetries"


#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type miRNA:WormBase,ncRNA:WormBase,rRNA:WormBase,scRNA:WormBase,snoRNA:WormBase,tRNA:WormBase,piRNA:WormBase,lincRNA:WormBase,antisense_RNA --trackLabel "Curated Genes (noncoding)" --trackType CanvasFeatures --key "Curated Genes (noncoding)" --maxLookback 1000000

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type mRNA:WormBase --trackLabel "Curated Genes (protein coding)" --trackType CanvasFeatures --key "Curated Genes (protein coding)" --maxLookback 1000000

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000 
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000 
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000 
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000 
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000 
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type pseudogenic_transcript:WormBase --trackLabel "Curated Genes (pseudogenes)" --trackType CanvasFeatures --key "Curated Genes (pseudogenes)" --maxLookback 1000000 

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/history.gff --out data/c_elegans --type pseudogenic_transcript:history,transposable_element:history,protein_coding_primary_transcript:history,primary_transcript:history,nc_primary_transcript:history --trackLabel "Gene Models (historical)" --trackType CanvasFeatures --key "Gene Models (historical)" 

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type gene:interpolated_pmap_position,gene:absolute_pmap_position --trackLabel "Genetic limits" --trackType CanvasFeatures --key "Genetic limits" --maxLookback 1000000 --subfeatureClasses '{'exon' : 'transcript-CDS' }'

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/operons.gff --out data/c_elegans --type operon:operon --trackLabel "Operons" --trackType CanvasFeatures --key "Operons" 

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/transposons.gff --out data/c_elegans --type transposable_element:WormBase_transposon --trackLabel "Transposons" --trackType CanvasFeatures --key "Transposons"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/deprecated_operon.gff --out data/c_elegans --type operon:deprecated_operon --trackLabel "Deprecated operons" --trackType CanvasFeatures --key "Deprecated operons"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/change_of_function_alleles.gff --out data/c_elegans --type complex_substitution:PCoF_Allele,deletion:PCoF_Allele,insertion_site:PCoF_Allele,substitution:PCoF_Allele,point_mutation:PCoF_Allele,transposable_element_insertion_site:PCoF_Allele,deletion:PCoF_CGH_allele,complex_substitution:PCoF_KO_consortium,deletion:PCoF_KO_consortium,point_mutation:PCoF_KO_consortium,point_mutation:PCoF_Million_mutation,deletion:PCoF_Million_mutation,insertion_site:PCoF_Million_mutation,complex_substitution:PCoF_Million_mutation,sequence_alteration:PCoF_Million_mutation,deletion:PCoF_Variation_project,point_mutation:PCoF_Variation_project,complex_substitution:PCoF_NBP_knockout,deletion:PCoF_NBP_knockout,transposable_element_insertion_site:PCoF_NemaGENETAG_consortium --trackLabel "Change-of-function alleles" --trackType CanvasFeatures --key "Change-of-function alleles"

###
#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/change_of_function_alleles.gff --out data/c_elegans --type deletion:PCoF_CGH_allele_Polymorphism,deletion:PCoF_Variation_project_Polymorphism,insertion_site:PCoF_Variation_project_Polymorphism,SNP:PCoF_Variation_project_Polymorphism,substitution:PCoF_Variation_project_Polymorphism,complex_substitution:PCoF_Variation_project_Polymorphism,sequence_alteration:PCoF_Variation_project_Polymorphism --trackLabel "Change-of-function polymorphisms" --trackType CanvasFeatures --key "Change-of-function polymorphisms"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/Million_mutation.gff --out data/c_elegans --type point_mutation:Million_mutation,complex_substitution:Million_mutation,deletion:Million_mutation,insertion_site:Million_mutation,sequence_alteration:Million_mutation --trackLabel "Million Mutation Project" --trackType CanvasFeatures --key "Million Mutation Project"


#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/I.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 
#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/II.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 
#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/III.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 
#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/IV.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 
#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/V.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 
#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/X.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 
#time nice bin/flatfile-to-json.pl --maxLookback 1000000 --gff ../c_elegans_gff/MtDNA.c_elegans.PRJNA13758.WS243.annotations.gff3.out.gff3 --out data/c_elegans --type deletion:CGH_allele,complex_substitution:KO_consortium,deletion:KO_consortium,point_mutation:KO_consortium,deletion:Variation_project,insertion_site:Variation_project,point_mutation:Variation_project,complex_substitution:NBP_knockout,deletion:NBP_knockout,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "High-throughput alleles" --trackType CanvasFeatures --key "High-throughput alleles" 

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/transposable_element_insertion_site.gff --out data/c_elegans --type transposable_element_insertion_site:Mos_insertion_allele,transposable_element_insertion_site:Allele,transposable_element_insertion_site:NemaGENETAG_consortium --trackLabel "Transposon insert sites" --trackType CanvasFeatures --key "Transposon insert sites"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/rnai_variations.gff --out data/c_elegans --type RNAi_reagent:RNAi_primary,experimental_result_region:cDNA_for_RNAi --trackLabel "RNAi experiments (primary targets)" --trackType CanvasFeatures --key "RNAi experiments (primary targets)"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/rnai_variations.gff --out data/c_elegans --type RNAi_reagent:RNAi_secondary --trackLabel "RNAi experiments (secondary targets)" --trackType CanvasFeatures --key "RNAi experiments (secondary targets)"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/sage_tag.gff --out data/c_elegans --type SAGE_tag:SAGE_tag  --trackLabel "SAGE tags" --trackType CanvasFeatures --key "SAGE tags"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/Polysome_profiling.gff --out data/c_elegans --type mRNA_region:Polysome_profiling --trackLabel "Polysomes" --trackType CanvasFeatures --key "Polysomes"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/RNASeq_reads.gff --out data/c_elegans --type transcript_region:RNASeq_reads --trackLabel "RNASeq" --trackType CanvasFeatures --key "RNASeq"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/Expr_profile.gff --out data/c_elegans --type experimental_result_region:Expr_profile --trackLabel "Expression chip profiles" --trackType CanvasFeatures --key "Expression chip profiles"

#time nice bin/flatfile-to-json.pl --gff ../c_elegans_gff/Expr_pattern.gff --out data/c_elegans --type reagent:Expr_pattern --trackLabel "Expression patterns" --trackType CanvasFeatures --key "Expression patterns"

