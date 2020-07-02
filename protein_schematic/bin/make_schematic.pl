#!/usr/bin/perl
use strict;
use warnings;

use Getopt::Long;
use Config::Tiny;
use FindBin qw($Bin);
use File::Copy;
use File::Copy::Recursive qw(dircopy);
use Cwd;
use FileHandle;
use File::Basename;
use File::Path qw( make_path );
use File::Remove qw( remove );
use JSON;
use Data::Dumper;
use Log::Log4perl;
Log::Log4perl->init("log4perl.conf");
my $log = Log::Log4perl->get_logger('build.log');


my ($GFFFILE, $FASTAFILE, $CONFIG, $DATADIR, $USENICE,
    $JBROWSEDIR, $JBROWSEREPO, $FILEDIR,
    $QUIET, $SPECIES,
    $RELEASE, $BROWSER_DATA, $JBROWSESRC);
my %splitfiles;

GetOptions(
    'gfffile=s'   => \$GFFFILE,
    'species=s'   => \$SPECIES,
    'filedir=s'   => \$FILEDIR,
    'fastafile=s' => \$FASTAFILE,
    'config=s'    => \$CONFIG,
    'datadir=s'   => \$DATADIR,
    'usenice'     => \$USENICE,
    'jbrowsedir=s'=> \$JBROWSEDIR,
    'jbrowserepo=s'=>\$JBROWSEREPO,
    'jbrowsesrc=s'=> \$JBROWSESRC,
    'quiet'       => \$QUIET,
) or ( system( 'pod2text', $0 ), exit -1 );

my $Config = Config::Tiny->read($CONFIG) or die $!;

my @config_sections = grep {!/^_/} keys %{$Config};

$SPECIES  ||= 'c_elegans';
$FILEDIR  ||= $Config->{_}->{filedir} ||='/usr/local/ftp/pub/wormbase/releases/';
$RELEASE  ||= $Config->{_}->{release};
$JBROWSEREPO= $Config->{_}->{jbrowserepo};
$USENICE    = $Config->{_}->{usenice}    unless defined $USENICE;
$JBROWSESRC = $Config->{_}->{jbrowsesrc};
my $nice = $USENICE ? "nice" : '';
$JBROWSEDIR ||=  $Config->{_}->{jbrowsedir};;

$DATADIR  ||= "$JBROWSEDIR/data/$species";

#check of $JBROWSEDIR exists, and if not, create it and build jbrowse
if (!-e $JBROWSEDIR) {
    print "Building JBrowse from source...\n";
    -e $JBROWSESRC or die "JBROWSESRC isn't specified; can't continue";
    make_path( $JBROWSEDIR );
    copy($JBROWSESRC, "$JBROWSEDIR/..");
    chdir("$JBROWSEDIR/..");
    my @zipfile = <*.zip>;
    system("unzip", $zipfile[0]) == 0 or die "failed to unzip jbrowse src";
    remove($zipfile[0]);
    my @jbrowsesrc = <JB*>;
    move($jbrowsesrc[0], $JBROWSEDIR);
    chdir($JBROWSEDIR);
    system("./setup.sh") == 0 or die "failed to run setup.sh in $JBROWSEDIR";
}

chdir $JBROWSEDIR or die $!." $JBROWSEDIR\n";

#prepare refseqs

my ($GENUS,$species,$BIOPROJECT) = split('_', $SPECIES);
$FASTAFILE ||= $GENUS . "_" . "$species.$BIOPROJECT.WS$RELEASE.protein.fa.gz";
my $fasta_fullpath = $FILEDIR."WS$RELELASE/$SPECIES/$BIOPROJECT/$FASTAFILE";
my $command = "bin/prepare-refseqs.pl --fasta $fasta_fullpath --out $DATADIR";
system("$nice $command") == 0 or $log->error( $!);


#process GFF file
for my $section (@config_sections) {
    $log->warn( $section) unless $QUIET;
    my $type   = $Config->{$section}->{type};
    my $label  = $Config->{$section}->{label};

    $GFFFILE ||= $GENUS . "_" . "$species.$BIOPROJECT.WS$RELEASE.protein_annotation.gff3.gz";
    my $gff_fullpath = $FILEDIR."WS$RELELASE/$SPECIES/$BIOPROJECT/$GFFFILE";

    my $command =""bin/flatfile-to-json.pl --gff $gff_fullpath  --type \"$type\" --key \"$label\" --tracklabel \"$label\" --trackType CanvasFeatures --compress"
    $log->warn( $command) unless $QUIET;
    system("$nice $command") ==0 or $log->error( $!);
}

system("$nice bin/generate-names.pl --out $DATADIR --compress")

