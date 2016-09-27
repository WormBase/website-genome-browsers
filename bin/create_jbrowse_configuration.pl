#!/usr/bin/perl

use FindBin qw/$Bin/;
use lib "$Bin/../../../lib";
use strict;
use WormBase::Update::Staging::CreateJBrowseConfigFiles;
use Getopt::Long;

my ($release,$help,$path);
GetOptions('release=s' => \$release,
	   'help'      => \$help,
	   'path'      => \$path,
);

if ($help || (!$release)) {
    die <<END;
    
Usage: $0 --release WSXXX --path PATH

Generate JBrowse configuration files for the new release. Config files
will be placed inside the PATH directory. This should be a jbrowse configuration
directory in checked out website source.

Files will be created in PATH/releases/\$release with symlinks created to them.

Options:

     --release  REQUIRED. Release to build.
     --path     REQUIRED (for now)

END
;
}

$release or die;
$path or die;

my $agent = WormBase::Update::Staging::CreateJBrowseConfigFiles->new({ release => $release,
								       path    => $path,
								     });
								       
$agent->execute();
