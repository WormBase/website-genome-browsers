#!/usr/bin/perl
use strict;
use warnings;

use Getopt::Long;
use Config::Tiny;
use Capture::Tiny 'capture';
use FindBin qw($Bin);
use File::Copy;
use File::Copy::Recursive qw(dircopy);
use Cwd;
use FileHandle;
use File::Basename;
use File::Path qw( make_path );
use File::Remove qw( remove );
use JSON;
#use Data::Dumper;
use Log::Log4perl;
Log::Log4perl->init("log4perl.conf");
my $log = Log::Log4perl->get_logger('build.log');

=head1 NAME

make_jbrowse.pl - Creates a JBrowse instance with input GFF and configuration

=head1 SYNOPSYS

  % make_jbrowse.pl --config <conf file> [options]

=head1 OPTIONS

 --config     Path to ini-style config file (required)
 --species    Name of species 
                  (should use same format as ALL_SPECIES.stats)
 --filedir    Path to parent directory where releases and files can be found
 --gfffile    Path to an input GFF file
 --fastafile  Path to an input FASTA file
 --datadir    Relative path (from jbrowse root) to jbrowse data dir
 --jbrowsedir Path to jbrowse directory
 --jbrowserepo Path to jbrowse git checkout
 --nosplit    Don't split GFF file by reference sequence
 --usenice    Run formatting commands with Unix nice 
 --skipfilesplit Don't split files or use grep to make subfiles
 --skipprepare Don't run prepare-refseqs.pl
 --allstats   Path to the ALLSPECIES.stats file
 --jbrowsesrc Path to the current JBrowse source zip file
 --skipname   Skip name indexing (the longest step)
 --simple     Make the C. elegans "simple" config for gene pages
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
 filedir   - Path to parent directory where releases and files can be found
 datadir   - Relative path (from the jbrowse root) to jbrowse data directory
 jbrowsedir- Path to JBrowse directory
 jbrowserepo - Path to git checkout of the jbrowse repo
 nosplit   - Don't split GFF file by reference sequence 
 usenice   - Run formatting commands with Unix nice
 skipfilesplit - Don't split files or use grep to make subfiles
 skipprepare - Don't run prepare-refseqs.pl
 allstats  - Path to the ALLSPECIES.stats file
 includes  - Path to the json includes file
 glyphs    - Path to custom JBrowse glyphs
 browser_data - Path to the browser_data directory where modencode files are
 jbrowsesrc- Path to the current jbrowse source zip file

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
$INITIALDIR = '' if $INITIALDIR == '/';
my $PRIMARY_SPECIES = "PRJNA13758";

my ($GFFFILE, $FASTAFILE, $CONFIG, $DATADIR, $NOSPLITGFF, $USENICE,
    $SKIPFILESPLIT, $JBROWSEDIR, $JBROWSEREPO, $SKIPPREPARE, $ALLSTATS, $FILEDIR,
    $QUIET, $INCLUDES, $FUNCTIONS, $ORGANISMS, $GLYPHS,$SPECIES, 
    $RELEASE, $BROWSER_DATA, $FTPHOST, $SIMPLE, $JBROWSESRC, $SKIPNAME,
    $FASTAMD5 );
my %splitfiles;

GetOptions(
    'gfffile=s'   => \$GFFFILE,
    'release=s'   => \$RELEASE,
    'species=s'   => \$SPECIES,
    'filedir=s'   => \$FILEDIR,
    'fastafile=s' => \$FASTAFILE,
    'config=s'    => \$CONFIG,
    'datadir=s'   => \$DATADIR,
    'nosplitgff'  => \$NOSPLITGFF,
    'usenice'     => \$USENICE,
    'skipfilesplit'=>\$SKIPFILESPLIT,
    'jbrowsedir=s'=> \$JBROWSEDIR,
    'jbrowserepo=s'=>\$JBROWSEREPO,
    'skipprepare' => \$SKIPPREPARE,
    'allstats=s'  => \$ALLSTATS,
    'jbrowsesrc=s'=> \$JBROWSESRC,
    'skipname'    => \$SKIPNAME,
    'simple'      => \$SIMPLE,
    'quiet'       => \$QUIET,
) or ( system( 'pod2text', $0 ), exit -1 );

system( 'pod2text', $0 ) unless $CONFIG;

my $Config = Config::Tiny->read($CONFIG) or die $!;

#print Dumper($Config);

my @config_sections = grep {!/^_/} keys %{$Config}; 

$SPECIES  ||= 'c_elegans';
$FILEDIR  ||= $Config->{_}->{filedir} ||='/usr/local/ftp/pub/wormbase/releases/';
$RELEASE  ||= $Config->{_}->{release};
$GFFFILE  ||= $Config->{_}->{gfffile};
$FASTAFILE||= $Config->{_}->{fastafile};
$DATADIR  ||= $Config->{_}->{datadir};
$SKIPFILESPLIT ||= $Config->{_}->{skipfilesplit};
$JBROWSEREPO= $Config->{_}->{jbrowserepo};
$NOSPLITGFF = $Config->{_}->{nosplitgff} unless defined $NOSPLITGFF;
$USENICE    = $Config->{_}->{usenice}    unless defined $USENICE;
$SKIPPREPARE= $Config->{_}->{skipprepare} unless defined $SKIPPREPARE;
$INCLUDES   = $Config->{_}->{includes}  || "$JBROWSEREPO/data/c_elegans/includes";
$FUNCTIONS  = $Config->{_}->{functions} || "$JBROWSEREPO/data/functions.conf";
$ORGANISMS  = $Config->{_}->{organisms} || "$JBROWSEREPO/data/organisms.conf" ;
$GLYPHS     = $Config->{_}->{glyphs}    || "$JBROWSEREPO/src/JBrowse/View/FeatureGlyph";
$BROWSER_DATA = $Config->{_}->{browser_data};
$ALLSTATS ||= $Config->{_}->{allstats};
    $ALLSTATS =~ s/\$RELEASE/$RELEASE/e;
$JBROWSESRC = $Config->{_}->{jbrowsesrc};
my $nice = $USENICE ? "nice" : '';
$JBROWSEDIR ||=  $Config->{_}->{jbrowsedir};;
$FTPHOST    = 'ftp://ftp.wormbase.org';
$FASTAMD5   = "$JBROWSEREPO/../conf/fasta_md5.txt";

if ($SPECIES eq 'c_elegans_simple') {
    $SIMPLE =1;
}

if ($SIMPLE) {
    $SPECIES = 'c_elegans_simple';
}

#this will be added to by every track
my @include = ("../functions.conf");

#location of the repo must be defined
die "JBROWSEREPO must be defined" unless (-e $JBROWSEREPO);

#parse all stats
#since fetching allstats from git, it doesnt need to be defined here
#die "allstats must be defined" unless (-e $ALLSTATS);

#system("wget https://raw.githubusercontent.com/WormBase/website-genome-browsers/$RELEASE-gbrowse/gbrowse/releases/WS$RELEASE/ALL_SPECIES.stats") == 0 or die;

#open AS, $ALLSTATS or die $!;
#open AS, 'ALL_SPECIES.stats' or die $!;
#my $firstline = <AS>;
#chomp $firstline;
#my @columnnames = split /\t/, $firstline;

#my @fullspecies_id = grep { /^$SPECIES/ } @columnnames;

#if (@fullspecies_id > 1) {
#    print STDERR <<END
#
#The species you specified on the command line has more than
#one data set associated with it. Please rerun the command
#and specify one of these:
#END
#;
#
#    print STDERR "  ".join("\n  ",@fullspecies_id)."\n\n";
#    exit(1);
#}
#my $species = $fullspecies_id[0];
my $species = $SPECIES;
$species    = 'c_elegans_simple' if $SIMPLE;
die "No matching species found: $SPECIES\n" unless $species;

$DATADIR  ||= "$JBROWSEDIR/data/$species";
my %speciesdata;

#parse the rest of the file
#while (my $line = <AS>) {
#    chomp $line;
#    my @la = split /\t/, $line;

#    my $track;
#    if($la[3] =~ /\((\S+?)\)$/ ) {
#        $track = $1;
#    }
#    else {
        #if there's no config for this track, goto next line
          #current exceptions: gene:landmark, since that's handled diff in gb
          #lincRNA:WBPaper00056245 since there is currently not a gb track
#        if ($la[1] =~ /landmark/) {
#            $track = 'landmarks';
#        }
#        elsif ($la[1] =~ /WBPaper00056245/) {
#            $track = 'alper_lincrna';
#        } 
#        elsif ($la[1] eq 'BLAT_Caen_Nanopore_BEST') {
#            $track = 'sequence_similarity_nanopore_best';
#        }
#        elsif ($la[1] eq 'BLAT_Nanopore_BEST') {
#            $track = 'sequence_similarity_nanopore_best';
#            #warn "getting BLAT_Nanopore_BEST";
#        }
#        elsif ($la[1] eq 'BLAT_IsoSeq_BEST') {
#            $track = 'sequence_similarity_other_isoseq_best';
#            #warn 'getting BLAT_IsoSeq_BEST';
#        }
#        elsif ($la[1] eq 'minimap') {
#            $track = 'minimap';
#        }
#        elsif ($la[1] eq 'not_lifted_over') {
#            $track = 'not_lifted_over';
#        }
#        else {
#            next;
#        }
#    }

#    for (my $i=0;$i<scalar(@la);$i++) {
#        next unless $la[$i];
#        $speciesdata{$columnnames[$i]}{$track} = $la[$i];
#    }
#}
#close AS;

print "Processing $species ...\n";


process_data_files($Config) unless $SIMPLE;

chdir $JBROWSEDIR or die $!." $JBROWSEDIR\n";

if ($SIMPLE) {
    mkdir $DATADIR unless -e $DATADIR;
    #make a bunch of symlinks to the main elegans site
    symlink "../c_elegans_$PRIMARY_SPECIES/includes"   , "$DATADIR/includes";
    symlink "../c_elegans_$PRIMARY_SPECIES/names"      , "$DATADIR/names";
    symlink "../c_elegans_$PRIMARY_SPECIES/seq"        , "$DATADIR/seq";
    symlink "../c_elegans_$PRIMARY_SPECIES/tracks"     , "$DATADIR/tracks";
    symlink "../c_elegans_$PRIMARY_SPECIES/tracks.conf", "$DATADIR/tracks.conf";
}

#Don't check any more--we should be aware of when new assemblies come along!
#check to see if the seq directory is present; if not prepare-refseqs
## skip this and use S3 sequences

#if (new_fasta_md5() ) {
# the fasta changed from the last release, so update it
#    warn "Doing local update of seq for $SPECIES";
#    if (!-e $DATADIR."/seq" and !$SKIPPREPARE) {
#        my $command = "bin/prepare-refseqs.pl --fasta $INITIALDIR"."/"."$FASTAFILE --out $DATADIR";
#        system("$nice $command") == 0 or $log->error( $!);
#        unlink $FASTAFILE;
#    }
#    push @include, "includes/DNA.json";
#}
#else {
# fasta didn't change, just make a link to the seq dir.
    if (!-e 'data') {
        mkdir 'data';
    }
    if (!-e "data/$SPECIES") {
        mkdir "data/$SPECIES";
    }
    symlink "$JBROWSEREPO/data/$SPECIES/seq", "data/$SPECIES/seq";
#    push @include, 'includes/'.$SPECIES.'_DNA.json';
#}

#make a symlink to the organisms include file
#unless (-e "$DATADIR/../organisms.conf") {
#    copy( $ORGANISMS, "$DATADIR/../organisms.conf") or $log->error( $!);
#}
#unless (-e "$DATADIR/../old-modencode") {
#    symlink "$JBROWSEREPO/data/old-modencode", "old-modencode" or $log->error($!);
#}
#unless (-e "browser_data") {
#    symlink $BROWSER_DATA, "browser_data" or $log->error( $!);
#}

#use grep-created files for specific tracks
#first process tracks that will be name indexed
for my $section (keys %{$Config}) {
    next unless (defined $Config->{$section}->{index} and $Config->{$section}->{index} == 1);
    #just process all of them
    #next if (!$speciesdata{$species}{$section} and !$Config->{$section}->{suffix});
    process_grep_track($Config, $section);
    $speciesdata{$species}{$section} = -1;
}

#die "quitting before name generation";

#run indexing
system("$nice bin/generate-names.pl --out $DATADIR --compress")
    unless $SKIPNAME;

#process the rest of the tracks

for my $section (@config_sections) {
    next if (defined $Config->{$section}->{index} and $Config->{$section}->{index} == 1);
    #just process all of them
    #next if (!$speciesdata{$species}{$section} and !$Config->{$section}->{suffix});
    process_grep_track($Config, $section);
    $speciesdata{$species}{$section} = -1;
}

#check for species-specific include files
my $only_species_name;
my $bioproject;
if ($species =~ /^(\w_[a-z]+)_(\w+)/) {
    $only_species_name = $1;
    $bioproject = $2;
    $only_species_name = 'simple' if $SIMPLE;
}
if ($only_species_name and $bioproject) {
    my @species_specific = glob("$INCLUDES/$only_species_name"."_$bioproject"."*");
    for (@species_specific) {
        #ack, in place edit of array elements
        $_ = "includes/".basename($_);
    }
    push @include, @species_specific;
}
if ($SIMPLE) {
    my @simple_includes = glob("$INCLUDES/simple*");
    for (@simple_includes) {
        $_ = "includes/".basename($_);
    }
    push @include, @simple_includes;
}

#create trackList data structure:
my $struct = {
    "plugins" => {"FeatureSequence" => {"location" => "./plugins/FeatureSequence" }  },
    "tracks" => [],
    "names" => { "url" => "names/", "type" => "Hash" },
    "include" => \@include,
    "dataset_id" => "$species",
    "formatVersion" => 1,
    "plugins" => { "FeatureSequence" => {"location" => "./plugins/FeatureSequence"  }  }
};
my $json = JSON->new->pretty(1)->encode($struct);

#print out trackList.json
if (-e "$DATADIR/trackList.json") {
    move("$DATADIR/trackList.json","$DATADIR/trackList.json.old");
}

#make a symlink to the includes dir
unless (-e "$DATADIR/includes") {
    symlink $INCLUDES, "$JBROWSEREPO/includes" or $log->error( $!);
}
#make a symlink to the functions
unless (-e "$DATADIR/../functions.conf") {
    copy( $FUNCTIONS, "$DATADIR/../functions.conf") or $log->error( $!); 
}



open TL, ">$DATADIR/trackList.json" or die $!;
print TL $json; 
close TL;

#clean up temporary gff files
chdir $INITIALDIR;

#stopping this clean up while tabix is being worked on
#my @tmp_gffs = glob("*_$GFFFILE*") if $GFFFILE;
#foreach my $file (@tmp_gffs) {unlink $file;} 

#check for tracks that have data but didn't get processed
for my $key (keys %{ $speciesdata{$species} }) {
    next if $speciesdata{$species}{$key} == -1;
    $log->error( "\n\nWARNING: TRACK WITH DATA BUT NO CONFIG: $key\n\n");
}

exit(0);


sub process_grep_track {
    my $config = shift;
    my $section= shift;

    return if $config->{$section}->{origfile};

    my $gffout;
    my $postprocess;
    my $altsection = $config->{$section}->{altfile};
    if ($altsection) {
        $gffout = $INITIALDIR ."/". $config->{$altsection}->{prefix} . "_$GFFFILE";
        $postprocess = $config->{$altsection}->{postprocess};
    }
    else {
        $gffout = $INITIALDIR ."/". $config->{$section}->{prefix} . "_$GFFFILE";
        $postprocess = $config->{$section}->{postprocess};
    }

    if ($postprocess and !$config->{$section}->{altlabel}) {
        my $suffix = "out";
        if ($config->{$section}->{suffix}) {
            $suffix = $config->{$section}->{suffix}; 
        }
        $gffout = $gffout.".".$suffix;
    }
  
    return unless -e $gffout;
    return if -z $gffout;

    my $type   = $config->{$section}->{type};
    my @label;
    $label[0]  = $config->{$section}->{label};
    push @label, split(/,/,$config->{$section}->{altlabel})
                        if $config->{$section}->{altlabel};
    my @file;
    $file[0]  = $gffout;
    if ($config->{$section}->{altsuffix}) {
        for my $suffix (split(/,/,$config->{$section}->{altsuffix})) {
            push @file, "$gffout.$suffix";
        }
    }

    my %empty_result;

    for (my $i=0; $i<(scalar @label); $i++) {
        my $command= "$nice bin/flatfile-to-json.pl --nameAttributes \"name,alias,id,other_name,variation,public_name\" --compress --gff $file[$i] --out $DATADIR --type \"$type\" --trackLabel \"$label[$i]\"  --trackType CanvasFeatures --key \"$label[$i]\"";
        $log->warn( $command) unless $QUIET;

        my ($stdout, $stderr, @result) = capture{
            system($command)
        } ;

        if ($stderr =~ /No matching features/) {
            $empty_result{$section}=1;
            next;
        }

        #add tabix indexing here (since this is where 
        #individual files are getting processed)

        next if -e "$file[$i].tidy.gz";
        (warn $file[$i] && next) if !-e "$file[$i]";

        #first sort with genometools
        #system("/usr/bin/gt gff3 -tidy -sortlines -retainids -force -o $file[$i].tidy $file[$i]") == 0
        #    or $log->warn( "genometools failed $file[$i]: $!" ) and die; 
        #
        #    Bug in genometools means fall back on gnu sort for now
        system("sort -k1,1 -k4,4n -k5,5n $file[$i] > $file[$i].tidy")
            or $log->warn( "sort failed $file[$i]: $!") and die;

        #then bgzip
        system("bgzip $file[$i].tidy") == 0
            or $log->warn( "bgzip failed $file[$i].tidy: $!" ) and die;

        #finally tabix
        system("tabix $file[$i].tidy.gz") == 0
            or $log->warn( "tabix failed $file[$i].tidy.gz: $! " ) and die;

        mkdir "$DATADIR/gff-tabix" unless -e "$DATADIR/gff-tabix";

        #then move them to the out dir so they'll get picked up for transfer
        system("mv $file[$i].tidy.gz     $DATADIR/gff-tabix") == 0
            or die "mv failed $file[$i].tidy.gz: $!";
        system("mv $file[$i].tidy.gz.tbi $DATADIR/gff-tabix") == 0
            or die "mv failed $file[$i].tidy.gz.tbi: $!";

    }
    if (!-e "$INCLUDES/$section.json") {
        $log->error( "\nMISSING INCLUDE FILE: $section.json\n\n");
    }
    push @include, "includes/$section.json" unless ($empty_result{$section} or $config->{$section}->{no_config});

    return;
}

sub process_data_files {
my $config=shift;

#fetch the GFF and fasta files
$species =~ /(\w_\w+?)_(\w+)$/;
my $speciesdir = $1;
my $projectdir = $2;

#switch to using the ftp site to make docker builds easier
##my $datapath = $FILEDIR . 'WS' . $RELEASE . '/species/' . $speciesdir . '/' . $projectdir;
$GFFFILE   = "$speciesdir.$projectdir.WS$RELEASE.annotations.gff3";
###$FASTAFILE = "$speciesdir.$projectdir.WS$RELEASE.genomic.fa";

my $copyfailed = 1;
#copy("$datapath/$GFFFILE.gz", '.') or $copyfailed = 1;
#copy("$datapath/$FASTAFILE.gz", '.') or $copyfailed = 1;

if ($copyfailed == 1 and !$SIMPLE) {
##    die "local copying of data files failed";
    #use ftp to fetch them

    my $ftpgffpath = "/pub/wormbase/releases/WS$RELEASE/species/$speciesdir/$projectdir";

    my $gff = "$ftpgffpath/$GFFFILE.gz";
##    my $fasta = "$ftpgffpath/$FASTAFILE.gz";

    my $quiet = $QUIET ? '-q' : '';
    system("wget $quiet $FTPHOST$gff");
##    system("wget $quiet $FTPHOST$fasta");
}

system("gunzip -f $GFFFILE.gz");
#system("gunzip -f $FASTAFILE.gz");

(-e $GFFFILE)   or die "No GFF file: $GFFFILE";
#(-e $FASTAFILE) or die "No FASTA file: $FASTAFILE";

#use grep to create type specific gff files
unless ($SKIPFILESPLIT) {
  for my $section (keys %{$config}) {
    next if $section eq '_';

    $log->debug($section);
    if ($section =~ /RNASeq/i) {
        $log->debug($section);
        $log->debug("species data ",$speciesdata{$species}{$section});
    }

    my $alt = $Config->{$section}->{altfile};
    my $key = $alt ? $alt : $section;

    if (!$Config->{$key}->{prefix}) {
        $log->warn("tracking down single undef warning: section:$section, alt:$alt, key:$key");
    }
    my $gffout      ||= $Config->{$key}->{prefix} . "_$GFFFILE";
    my $greppattern ||= $Config->{$key}->{grep};
    my $postprocess ||= $Config->{$key}->{postprocess};
    my $suffix      ||= $Config->{$section}->{suffix};

    if ($suffix and -e $gffout) {
        $postprocess ||= $Config->{$section}->{postprocess};
        undef $greppattern;
    }
    elsif ($suffix and !-e $gffout) {
        warn       "Suffix is defined but gffout doesn't exist! $gffout";
        $log->warn("Suffix is defined but gffout doesn't exist! $gffout");
        next;
    }
#  I don't think this is necessary now
#    elsif (!$speciesdata{$species}{$section}) {
#        next;
#    }

    if ($postprocess) {
        my @args = split / /, $postprocess;
        my $command = $args[0];
        my $arg   ||= $args[1];
        if ($arg && $arg eq 'species') {
            $arg = $SPECIES;
        }

# I'm pretty sure this is wrong and causing problems
#        if ($suffix) {
#            $gffout = "$gffout.$suffix";
#        }

        $postprocess = $arg ? "$command $arg" : $command;
        $log->debug( $postprocess );
    }

    next if (-e $gffout);

    if ($greppattern) {
        my $grepcommand = "grep -P \"$greppattern\" $GFFFILE > $gffout";
        $log->warn( $grepcommand) unless $QUIET;
        system ("$nice $grepcommand") == 0 or $log->error( "$GFFFILE: $!");
    }

    next if (-z $gffout);

    if ($postprocess) {
        system("$nice $Bin/$postprocess $gffout") == 0 or $log->error( "postpressing $gffout: $!");
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

        ($log->warn( "ignored gff line: $_") && next) if (scalar @la != 9);

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

return;
}

sub new_fasta_md5 {
    $species =~ /(\w_\w+?)_(\w+)$/;
    my $speciesdir = $1;
    my $projectdir = $2;
    my @line = `grep $projectdir $FASTAMD5`; 
    #warn @line;
    if (scalar @line == 0) {
        $log->warn( "$SPECIES isn't in the MD5 file.  Is it new?");
        return 1;
    }
    else {
        my ($oldmd5) = split / /, $line[0];

	#calc the md5 sum on the gz fasta file
        my $datapath = $FILEDIR . 'WS' . $RELEASE . '/species/' . $speciesdir . '/' . $projectdir;
        $FASTAFILE = "$speciesdir.$projectdir.WS$RELEASE.genomic.fa";

        my ($newmd5) = `md5sum $datapath/$FASTAFILE.gz`;
        ($newmd5) = split / /, $newmd5;
        #chomp $newmd5;

        if ($oldmd5 eq $newmd5) {
            $log->debug("same md5");
            return 0;
        }
        $log->warn ("old md5 **$oldmd5**");
        $log->warn ("new md5 **$newmd5**");
        copy("$datapath/$FASTAFILE.gz", '.') or warn "fetching $datapath/$FASTAFILE.gz failed";        
        system("gunzip -f $FASTAFILE.gz");
    }

    die;
    return 1;
}
