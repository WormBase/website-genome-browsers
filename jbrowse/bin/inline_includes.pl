#!/usr/bin/perl

use strict;
use warnings;
use Getopt::Long;
use Data::Dumper;
use File::Copy;
use JSON;
use FindBin qw($Bin);

=head1 NAME

inline_includes.pl - takes a trackList.json and subs in full json for includes 

=head1 SYNOPSYS

  % inline_includes.pl --bioproject <proj> --release <rel> --file <path> [options]

=head1 OPTIONS

=over

bioproject - The "full" bioproject (ie, species plus bioproject, like "c_elegans_PRJNA13758"). Required.

=back

=over

release - The WormBase release, without the leading "WS". Required.

=back

=over

file - The path to the trackList.json; usually something like "c_elegans_PRJNA13758/trackList.json". Required.

=back

=over

update - An option to update a trackList.json file. It fetches the "old" trackList.json (the one with the includes) 
and redoes the inlining. The reason to have this is for when include files have changed but the data
hasn't.

=back

=over

pretty - An option to make the json generated human-readable. Generally this option should not be used,
since it adds unnecessary size to the resulting file.

=back

=head1 DESCRIPTION


=head1 AUTHOR

Scott Cain E<lt>scott@scottcain.netE<gt>

Copyright (c) 2021

This script is free software; you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut


my ($BIOPROJECT, $RELEASE, $FILE, $PRETTY, $UPDATE);

GetOptions(
    'bioproject=s'   => \$BIOPROJECT,
    'release=s'      => \$RELEASE,
    'file=s'         => \$FILE,
    'update'         => \$UPDATE,
    'pretty=s'       => \$PRETTY,
) or ( system( 'pod2text', $0 ), exit -1 );

( system( 'pod2text', $0 ), exit -1 ) unless $BIOPROJECT && $RELEASE && $FILE;

#The idea is that the 'simple' config will just be using the N2 data
if ($BIOPROJECT =~ /simple/) {
    $BIOPROJECT = 'c_elegans_PRJNA13758';
}

my $S3URL = "https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase/WS$RELEASE/$BIOPROJECT";

my $FILEIN = $FILE;

#fetch the old trackList.json from S3 and place it where it will get inlined
fetch_old_trackList() if ($UPDATE);

copy($FILEIN, "$FILEIN.old");

my $blob;
{
local $/ = undef;
open (my $F, "<", $FILEIN) or die "$!:$FILEIN";
$blob = <$F>;
close $F;
}

my @files;

my $json;
my @tracks;

my $trackList = JSON->new->decode($blob);

my @includes;
for my $i (@{$$trackList{'include'}}) {
    push @includes, $i unless $i =~ /functions.conf/; 
}

my $includedir = "$Bin/../jbrowse/data/c_elegans";

for my $f (@includes) {
    if ($f eq 'includes/rnaseq_splice.json') {
         $f = 'includes/' . $BIOPROJECT .'_rnaseq_splice.json';
         warn $f;
    }
    if ($f eq 'includes/operons.json') {
         $f = 'includes/' .$BIOPROJECT .'_operons.json';
         warn $f;
    }
    local $/ = undef;
    open (my $F, "<", "$includedir/$f") or die "$!:$f";
    my $data = <$F>;
    close $F;

    #warn $f;
    $json = JSON->new->decode($data);

    for my $a (@{$$json{'tracks'}}){
        $$a{'urlTemplate'} =~ s/\.\.\/tracks/$S3URL\/tracks/;
        push @tracks, $a;
        #warn %$a;
    }
#    warn @{$$json{'tracks'}};

}


$$trackList{'tracks'} = \@tracks;
$$trackList{'include'} = ['../functions.conf'];
$$trackList{'names'}{'url'} =~ s/names/$S3URL\/names/;

if (defined $PRETTY && $PRETTY) {
    print JSON->new->pretty(1)->encode($trackList);
}
else {
    print JSON->new->encode($trackList);
}

exit(0);

sub fetch_old_trackList {
    my $old_tL_url = "$S3URL/trackList.json.old";

    copy("$BIOPROJECT/trackList.json", "$BIOPROJECT/trackList.json.orig");

    system("wget -O $BIOPROJECT/trackList.json $old_tL_url");  
}







