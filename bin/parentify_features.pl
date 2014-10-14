#!perl

use strict;
use warnings;

use Bio::GFF3::LowLevel qw/ gff3_parse_feature gff3_format_feature /;
use Storable qw/ dclone /;
use IO::Handle;

my $FILEIN = $ARGV[0];
my $infh   = new IO::File "< $FILEIN";

my $FILEOUT = "$FILEIN.out";
my $outfh   = new IO::File "> $FILEOUT";

my $oldid;
my %featurehash;
my @featurearray;
my %idlessfeature;
while (<$infh>) {
    next if /^#/;
    my $f = gff3_parse_feature($_);

    my $id = @{$f->{attributes}->{ID}}[0];
    #warn $$id[0];

    if (!$id) { #create IDs for features that don't have them
        #if there isn't an ID, there better be a Target
        my $target = @{$f->{attributes}->{Target}}[0];
        my $targetname;
        if ($target =~ /^(\S+)\s/) {
            $targetname = $1;
        }
        $idlessfeature{$targetname}++;
        $id = "$targetname.$idlessfeature{$targetname}";
        $f->{attributes}->{ID} = [$id];
    }

    if ($oldid && ($oldid ne $id)) {
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

    for my $key (keys ($parent->{attributes})) {
        if ($key eq 'ID') {
            my $id = @{ $parent->{attributes}->{ID}}[0];
            $parent->{attributes}->{Name} = $id;
           
            if ($id =~ s/(\.\d+)$// and $type ne 'CDS') {
                $parent->{attributes}->{clone} = $id; #only create the clone attribute if it matches and pulls off the ".number" at the end
            }
            next;
        }
        next if $key eq 'Name';
        next if $key eq 'clone';
        next if $key eq 'species';

        undef $parent->{attributes}->{$key};
    }

    if ($type eq 'CDS') {
        $parent->{type} = 'mRNA';
    }

    print $outfh gff3_format_feature($parent);    
    $outfh->flush;
     
    for my $child (@featurearray) {
        $child->{type} = 'match_part' if ($child->{type} =~ /match/);
        $child->{attributes}->{Parent} = $child->{attributes}->{ID};
        undef $child->{attributes}->{ID};
        print $outfh gff3_format_feature($child);
    }
  
}
