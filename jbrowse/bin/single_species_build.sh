#!/bin/bash

set -e

RELEASE=280
while getopts r:s: option
do
case "${option}"
in
r) 
  RELEASE=${OPTARG}
  ;;
s) 
  SPECIES=${OPTARG}
  ;;
esac
done

MAKEPATH=/home/scain/scain/281_build/jbrowse_build/website-genome-browsers/jbrowse/bin/make_jbrowse.pl

CONFPATH=/home/scain/scain/281_build/jbrowse_build/website-genome-browsers/jbrowse/conf/c_elegans.jbrowse.conf

LOGFILE=$SPECIES
LOGFILE+=".log"

$MAKEPATH --conf $CONFPATH --quiet --species $SPECIES 2>1 | grep -v "Deep recursion"; mv 1 $LOGFILE

INLINEINCLUDEPATH=/home/scain/scain/281_build/jbrowse_build/website-genome-browsers/jbrowse/bin/inline_includes.pl

DATADIR=/home/scain/scain/281_build/jbrowse_build/jbrowse/tools/genome/jbrowse/data

cd $DATADIR

cp $SPECIES/trackList.json $SPECIES/trackList.json.orig
$INLINEINCLUDEPATH --bio $SPECIES --rel "WS$RELEASE" --file $SPECIES/trackList.json > $SPECIES/trackList.json.new
cp $SPECIES/trackList.json.new $SPECIES/trackList.json

UPLOADTOS3PATH=/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl

REMOTEPATH="test/WS$RELEASE/$SPECIES"

$UPLOADTOS3PATH --bucket agrjbrowse --local "$SPECIES/" --remote $REMOTEPATH
 


