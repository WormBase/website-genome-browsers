package WormBase::Update::Staging::CreateJBrowseConfigFiles;

use Moose;
use IO::File;
use WormBase::FeatureFile;
use Data::Dumper;
extends qw/WormBase::Update::Staging::CreateGBrowseConfigFiles/;

# The symbolic name of this step
has 'step' => (
    is => 'ro',
    default => 'create JBrowse configuration files based on the content of GFF files',
    );

has 'core_config_file' => (
    is => 'ro',
    default => 'wormbase_core.conf', # override, create jbrowse core
    );

#sub _build_config_destination { #probably need to override this, but perhaps not
#    my $self = shift;
#    my $release = $self->release;
#    my $path  = join("/",$self->path,'releases',$release);
#    $self->_make_dir($path);
#    return $path;
#}



#has 'species_includes_directory' => ( #unclear if this will be needed
#    is => 'rw',
#    lazy_build => 1,
#    );

#sub _build_species_includes_directory {
#    my $self = shift;
#    my $path = $self->path;
#    return "$path/includes-species_specific";
#}




#sub _build_f2c {
#definitely inherit this method


# Definitely override
sub run {
    my $self = shift;

    my ($species) = $self->wormbase_managed_species;    
    my $release = $self->release;

    my $features = { };
    foreach my $name (sort { $a cmp $b } @$species) {
	my $species = WormBase->create('Species',{ symbolic_name => $name, release => $release });
#	next unless $name =~ /elegans/;
	$self->log->info(uc($name). ': start');	

	# Now, for each species, iterate over the bioproject IDs.
	# These are just strings.
	my $bioprojects = $species->bioprojects;
	foreach my $bioproject (@$bioprojects) {

	    my $id = $bioproject->bioproject_id;
	    my $gff= $bioproject->gff_file;       # this includes the full path.
	    
	    $features->{species}->{"${name}_$id"}->{gff_version} = '3';
	    $features->{species}->{"${name}_$id"}->{file}        = $gff;
	    $features->{species}->{"${name}_$id"}->{species}     = $name;
	    $self->log->info("   Processing bioproject: $id");	    

	    open FILE, "gunzip -c $gff |" or warn $! && next;
	    while (my $line = <FILE>) {
		next if $line =~ /^\#/;	
		my ($ref,$source,$method,@rest) = split(/\t/,$line);
		
		# Record features seen for each species.
		$features->{species}->{"${name}_$id"}->{features}->{"$method:$source"}++;	
		
		# ... and also in aggregate across all species.
		$features->{global}->{"$method:$source"}++;
	    }
	    close FILE;
	}	
	$self->log->info(uc($name). ': done'); 
    }
    $self->generate_config($features);
    $self->print_global_stats($features);
}


#may not need overriding, though the method it calls probably will
#sub symlink {
#    my ($self,$species) = @_;
#
#    my $release = $self->release;
#    
#    my $path = $self->path;
#    my $config_destination = $self->config_destination;
#    
#    chdir($path);
#    $self->update_symlink({target  => "releases/$release/$species.conf",
#			   symlink => "$species.conf"
#			  });
#    return;
#}


#override
sub generate_config {
    my ($self,$features) = @_;

    my $release = $self->release;
    my $f2c = $self->f2c();
    
    foreach my $species ( sort keys %{$features->{species}} ) {

	# Get the core config.
	my $base_config = WormBase::FeatureFile->new(-file => join('/',$self->path,$self->core_config_file));
	
	my $fh  = IO::File->new("> " . $self->config_destination . "/$species.stats")
	    or $self->log->logdie("Couldn't open the species stats file: $!");
	
	print $fh "gff_version: " . $features->{species}->{$species}->{gff_version} . "\n"; 
	print $fh "file: " . $features->{species}->{$species}->{file} . "\n";
	print $fh join("\t",qw/feature children source method track count/) . "\n";

	foreach my $feature (sort { $a cmp $b } keys %{$features->{species}->{$species}->{features}}) {

	    # Is there a suitable include for this feature?
	    my $include = $f2c->{$feature}->{include};
	    
	    my ($method,$source) = split(":",$feature);
	           
	    if ($include) {

		# This species has a feature that requires a new stanza. Merge it into the main config
		$base_config = $self->merge_to_base_config($base_config,
							   join('/',$self->includes_directory,$include. '.track'));
				
		# Get the key (as a human readable name) for this track.
		my $key = $base_config->setting(uc($include),'key');
		unless ($key) {
		    warn "I couldnt find a key for $include !!!\n\n";
		}

		# Record stats on a per-species basis.
		print $fh join("\t",
			       $feature,
			       "",
			       $source,
			       $method,
			       "$key ($include)",
			       $features->{species}->{$species}->{features}->{$feature}
		    )
		    . "\n"; 	       

		# Record that we have config for this feature.
		$features->{$feature}->{config} = "$key ($include)";

		# Iterate through children of this feature (if there are any)
		# I do this simply to create a nice accounting of features.
		# (I could also fetch these through the config although not all children are listed)
		my @children = eval { @{$f2c->{$feature}->{children}} };
		foreach my $child (@children) {
		    next if $child eq $feature;  # may have already seen.
		    my ($child_method,$child_source) = split(":",$child);
		    my $count =  $features->{species}->{$species}->{features}->{$child};
		    $count ||= 0;
		    print $fh join("\t",
				   "",
				   $child,					     
				   $child_source,
				   $child_method,
				   "$key ($include)",
				   $count,
			) . "\n"; 		   
		    $features->{$child}->{config} = "$key ($include)";
		}
	    } else { 		
		# No config found. We are either 
		#   a) a child/sibling/non-primary feature that will be picked up later or
		#   b) a parent feature for which no configuration exists. We should take note of these.
		next;
	    }	    	   
	}
	undef $fh;

	# Is there an overrides file for this species?
	# This file will also contain any other extra stanzas that we may need.
	my $species_overrides = join('/',$self->species_includes_directory,$species) . '.conf';
	if ( -e $species_overrides) {
	    # This species has a feature that requires a new stanza. Merge it into the main config
	    $base_config = $self->merge_to_base_config($base_config,$species_overrides);
	}
	
	# Build the database stanza for this species. We do it programmatically
	# to include the release number then merge to the base_config.
	my $db_stanza = $self->_create_database_stanza($species);
	$base_config = $self->merge_to_base_config($base_config,$db_stanza);

	$self->dump_configuration($species,$base_config);
	$self->symlink($species);
    }
}




#probably either override or omit all together
sub merge_to_base_config {
    my ($self,$base_config,$incoming_config) = @_;
    
    my $new_config;
    # Is this an external file or a stanza we have built
    if ($incoming_config =~ /[conf|track]$/) {
	$new_config = WormBase::FeatureFile->new(-file => $incoming_config);
    } else {
	$new_config = WormBase::FeatureFile->new(-text => $incoming_config);
    }
    foreach my $stanza ($new_config->setting()) {
	foreach my $option ($new_config->setting($stanza)) {
	    my $value = $new_config->setting($stanza => $option);
	    $base_config->set($stanza,$option => $value);
	}
    }
    return $base_config;
}    


#override
# Dump the complete config to a new file.
sub dump_configuration {
    my ($self,$species,$config) = @_;
#    print Dumper($config);
    
    my $fh = IO::File->new("> " . $self->config_destination . "/$species.conf") 
	or $self->log->logdie("Couldn't open the species config file: $!");
    
    print $fh <<END
#####################################################
#
# NOTE! This configuration file was programmatically
# generated.  You can edit this in-place for testing
# purposes but all changes will
# need to be moved to CreateGBrowseConfigFiles.pm
#
#####################################################
END
;

    my @stanzas = $config->setting();
    foreach my $stanza (sort { $a cmp $b } @stanzas) {
	print $fh "[$stanza]\n";
	foreach my $option ($config->setting($stanza)) {	   
	    my $value = $config->setting($stanza => $option);
	    print $fh "$option = " . $value . "\n";
	}
	print $fh "\n\n";
    }
    undef $fh;
}


1;

