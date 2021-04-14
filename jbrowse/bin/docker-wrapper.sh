#!/bin/bash

RELEASE=$1
SPECIES=$2
AWSACCESS=$3
AWSSECRET=$4

/website-genome-browsers/jbrowse/bin/single_species_build.sh -r $RELEASE -s $SPECIES -a $AWSACCESS -k $AWSSECRET

