#!/usr/bin/perl
use warnings;
use strict;

use Bio::DB::SeqFeature::Store;

my $db = Bio::DB::SeqFeature::Store->new( -adaptor => 'DBI::mysql',
                                          -dsn     => 'dbi:mysql:modencode2_snyder',
                                          -user    => 'wormbase',
                                          -pass    => 'sea3l3ganz' );

my @features = $db->get_features_by_type($ARGV[0]);

print $features[0]->get_tag_values('wigfile'), "\n";

exit(0);
