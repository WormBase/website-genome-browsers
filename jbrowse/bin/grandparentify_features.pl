#!/usr/bin/perl

use strict;
use warnings;

use Bio::GFF3::LowLevel qw/ gff3_parse_feature gff3_format_feature /;
use Storable qw/ dclone /;
use IO::Handle;
use Getopt::Long;
use FindBin qw($Bin);
use File::Copy;
#use Data::Dumper;

my $SORT = 0;
my $DISTANCE_CUTOFF = 50000;

GetOptions(
    'sort'   => \$SORT,
) or ( system( 'pod2text', $0 ), exit -1 );

my $FILEIN = $ARGV[0];
my $FILEOUT = "$FILEIN.out";

if ($SORT) {
    #do a simple unix sort on the ninth column first
    system("sort -k 9 $FILEIN > $FILEIN.sorted; mv $FILEIN.sorted $FILEIN");
}

#first run parentify and rename the input file
system("$Bin/parentify_features.pl", $FILEIN ) == 0 or die $!;
warn "finished parentification\n";
copy ("$FILEIN.out", $FILEIN);

#moving on to grandparentification
my $infh   = new IO::File "< $FILEIN";
my $outfh  = new IO::File "> $FILEOUT";


my %featurehash;
while (<$infh>) {
    next if /^#/;
    my $f = gff3_parse_feature($_);

    my $id     = @{$f->{attributes}->{ID}}[0];
    my $parent = @{$f->{attributes}->{Parent}}[0];
    #warn $$id[0];

    if ($parent) {
        my ($clone) = split(/ /,@{$f->{attributes}->{Target}}[0]);
#        warn "$clone before\n";
        if ($clone =~ /^(.*?)\.[53]$/) {
            $clone = $1;
#            warn "$clone after\n";
        }

        push(@{$featurehash{$clone}{$parent}{'children'}} , $f);
    }
    else {
        my $clone = @{$f->{attributes}->{clone}}[0];

        if ($clone =~ /^(.*?)\.[53]$/) {
            $clone = $1;
        }

        $featurehash{$clone}{$id}{'parent'} = $f;
    }
}

#warn Dumper($featurehash{'yk1181f08'});
#warn keys $featurehash{'yk1181f08'};

for my $clone (keys %featurehash) {
    my @parents = keys $featurehash{$clone};
    
    if (scalar @parents == 1) {
        #create grandparent
        my $grandparent = dclone $featurehash{$clone}{$parents[0]}{'parent'};
        $grandparent->{type} = 'experimental_feature';
        $grandparent->{attributes}->{ID} = $clone;
        $grandparent->{attributes}->{Name} = $clone;
        $grandparent->{attributes}->{'has_mate'} = 0;
        undef $grandparent->{attributes}->{clone};
        $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{Parent}  = $clone;
        $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{'has_mate'}= 0;

        print $outfh gff3_format_feature($grandparent);
    }
    elsif (scalar @parents == 2) {
        if (abs($featurehash{$clone}{$parents[0]}{'parent'}->{start} -
                     $featurehash{$clone}{$parents[1]}{'parent'}->{start})
                     <$DISTANCE_CUTOFF and 
            $featurehash{$clone}{$parents[0]}{'parent'}->{seq_id} eq
            $featurehash{$clone}{$parents[1]}{'parent'}->{seq_id} ) {
        #mates are close
            my $grandparent = dclone $featurehash{$clone}{$parents[0]}{'parent'};
            my $start = $grandparent->{start};
            my $end   = $grandparent->{end};
            if ($start > $featurehash{$clone}{$parents[1]}{'parent'}->{start}) {
                $grandparent->{start} = $featurehash{$clone}{$parents[1]}{'parent'}->{start};
            }
            if ($end   < $featurehash{$clone}{$parents[1]}{'parent'}->{end}) {
                $grandparent->{end}   = $featurehash{$clone}{$parents[1]}{'parent'}->{end};
            }
            $grandparent->{type} = 'experimental_feature';
            $grandparent->{attributes}->{ID} = $clone;
            $grandparent->{attributes}->{Name} = $clone; 
            $grandparent->{attributes}->{'has_mate'} =1;
            undef $grandparent->{attributes}->{clone};
       
            $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{Parent}  = $clone;
            $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{'has_mate'}= 1; 
            $featurehash{$clone}{$parents[1]}{'parent'}->{attributes}->{Parent}  = $clone;
            $featurehash{$clone}{$parents[1]}{'parent'}->{attributes}->{'has_mate'}= 1;

            print $outfh gff3_format_feature($grandparent);
        }
        else {
        #mates are not close; make seperate grandparents
            my $grandparent0 = dclone $featurehash{$clone}{$parents[0]}{'parent'};
            my $grandparent1 = dclone $featurehash{$clone}{$parents[1]}{'parent'};

            $grandparent0->{type} = 'experimental_feature';
            $grandparent0->{attributes}->{ID} = "$clone-0";
            $grandparent0->{attributes}->{Name} = $clone;
            $grandparent0->{attributes}->{'has_mate'} = 2;
            undef $grandparent0->{attributes}->{clone};
            $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{Parent}  = "$clone-0";
            $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{'has_mate'}= 2;

            my $start = $featurehash{$clone}{$parents[1]}{'parent'}->{'start'};
            my $end   = $featurehash{$clone}{$parents[1]}{'parent'}->{'end'};
            my $ref   = $featurehash{$clone}{$parents[1]}{'parent'}->{'seq_id'};

            $featurehash{$clone}{$parents[0]}{'parent'}->{attributes}->{'distant_mate'} = "$ref:$start..$end";

            $grandparent1->{type} = 'experimental_feature';
            $grandparent1->{attributes}->{ID} = "$clone-1";
            $grandparent1->{attributes}->{Name} = $clone;
            $grandparent1->{attributes}->{'has_mate'} = 2;
            undef $grandparent1->{attributes}->{clone};
            $featurehash{$clone}{$parents[1]}{'parent'}->{attributes}->{Parent}  = "$clone-1";
            $featurehash{$clone}{$parents[1]}{'parent'}->{attributes}->{'has_mate'}= 2;

            $start = $featurehash{$clone}{$parents[0]}{'parent'}->{'start'};
            $end   = $featurehash{$clone}{$parents[0]}{'parent'}->{'end'};
            $ref   = $featurehash{$clone}{$parents[0]}{'parent'}->{'seq_id'}; 

            $featurehash{$clone}{$parents[1]}{'parent'}->{attributes}->{'distant_mate'} = "$ref:$start..$end";

            print $outfh gff3_format_feature($grandparent0);
            print $outfh gff3_format_feature($grandparent1);

        }
    }
    else {
        warn "many parents: $clone\n";
        next;
    }

    for my $parent (@parents) {
        print $outfh gff3_format_feature($featurehash{$clone}{$parent}{'parent'});

        map {print $outfh gff3_format_feature($_);} @{$featurehash{$clone}{$parent}{'children'}};
    }

}


$infh->close;
$outfh->close;

exit(0);

