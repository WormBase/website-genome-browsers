#!/usr/bin/perl

use strict;
use warnings;

use Bio::GFF3::LowLevel qw/ gff3_parse_feature gff3_format_feature /;
use Storable qw/ dclone /;
use IO::Handle;
use Getopt::Long;

my $SORT = 0;

GetOptions(
    'sort'   => \$SORT,
) or ( system( 'pod2text', $0 ), exit -1 );

my $FILEIN = $ARGV[0];
my $FILEOUT = "$FILEIN.out";

if ($SORT) {
    #do a simple unix sort on the ninth column first
    system("sort -k 9 $FILEIN > $FILEIN.sorted; mv $FILEIN.sorted $FILEIN");
}

my $infh   = new IO::File "< $FILEIN";
my $outfh   = new IO::File "> $FILEOUT";


my $oldid;
my $oldseq_id;
my %featurehash;
my @featurearray;
my %idlessfeature;
my $oldtargetname = '';
while (<$infh>) {
    next if /^#/;
    my $f = gff3_parse_feature($_);
    my $seq_id = $f->{seq_id};

    my $id = @{$f->{attributes}->{ID}}[0];
    #warn $$id[0];

    if (!$id) { #create IDs for features that don't have them
        #if there isn't an ID, there better be a Target
        my $target = @{$f->{attributes}->{Target}}[0];
        my $targetname;
        if ($target =~ /^(\S+)\s/) {
            $targetname = $1;
        }
        die "no ID and no Target; I don't know what to do" unless $targetname;

        if (($targetname ne $oldtargetname) or ($oldseq_id ne $seq_id) ) {
            $idlessfeature{$targetname}++;
            $oldtargetname = $targetname; 
        }

        $id = "$targetname.$idlessfeature{$targetname}";
        $f->{attributes}->{ID} = [$id];
    }

    if (($oldid && ($oldid ne $id)) or ($oldseq_id &&($oldseq_id ne $seq_id))) {

        print_feature();
        @featurearray = ();
        %featurehash  = ();
    }

    if (!$featurehash{start} || $f->{start} < $featurehash{start}) {
        $featurehash{start} = $f->{start};
    }
    if (!$featurehash{end}   || $f->{end} > $featurehash{end}){
        $featurehash{end} = $f->{end}; 
    }

    push @featurearray, $f;

    $oldid = $id;
    $oldseq_id = $seq_id;
}

print_feature();


$infh->close;
$outfh->close;

exit(0);


sub print_feature {
    #build parent feature
    my $parent = dclone $featurearray[0]; #start with one of the children

    $parent->{start} = $featurehash{start};
    $parent->{end}   = $featurehash{end};
    $parent->{score} = '.';
    
    my $type = $parent->{type};

    for my $key (keys %{ $parent->{attributes} }) {
        if ($key eq 'ID') {
            my $id = @{ $parent->{attributes}->{ID}}[0];
            $parent->{attributes}->{Name} = $id unless $parent->{type} =~ /[UR]ST_match/;
           
            if ($id =~ s/(\.\d+)$// and $type ne 'CDS') {
                $parent->{attributes}->{clone} = $id; #only create the clone attribute if it matches and pulls off the ".number" at the end
            }
            next;
        }
        if ($key eq 'Family') {
            $parent->{attributes}->{family} = $parent->{attributes}->{Family};
            undef $parent->{attributes}->{Family};
            next;
        }
        next if $key eq 'Name';
        next if $key eq 'clone';
        next if $key eq 'species';
        next if $key eq 'Note';
        next if $key eq 'exons';
        next if $key eq 'predictiontype';
        next if $key eq 'range';
        next if $key eq 'protein';
        next if $key eq 'cds';

        undef $parent->{attributes}->{$key};
    }

    if ($type eq 'CDS') {
        $parent->{type} = 'mRNA';
    }

    print $outfh gff3_format_feature($parent);    
    $outfh->flush;
     
    for my $child (@featurearray) {
        $child->{type} = 'match_part' if ($child->{type} =~ /match/);
     #yes I know polypeptide_motif_part is a valid SO term :-/
        $child->{type} = 'polypeptide_motif_part' if ($child->{type} =~ /polypeptide_motif/);
        $child->{attributes}->{Parent} = $child->{attributes}->{ID};
        undef $child->{attributes}->{ID};
        print $outfh gff3_format_feature($child);
    }
  
}
