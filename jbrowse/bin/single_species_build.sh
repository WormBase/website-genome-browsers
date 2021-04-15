#!/bin/sh

set -e

RELEASE=280
while getopts r:s:a:k: option
do
case "${option}"
in
r) 
  RELEASE=${OPTARG}
  ;;
s) 
  SPECIES=${OPTARG}
  ;;
a)
  AWSACCESS=${OPTARG}
  ;;
k)
  AWSSECRET=${OPTARG}
  ;;
esac
done

if [ -z "$RELEASE" ]
then
    RELEASE=${WB_RELEASE}
fi

if [ -z "$SPECIES" ]
then
    SPECIES=${WB_SPECIES}
fi

if [ -z "$AWSACCESS" ]
then
    AWSACCESS=${AWS_ACCESS_KEY}
fi

if [ -z "$AWSSECRET" ]
then
    AWSSECRET=${AWS_SECRET_KEY}
fi

if [ -z "$AWSBUCKET" ]
then
    if [ -z "${AWS_S3_BUCKET}" ]
    then
        AWSBUCKET=${AWS_S3_BUCKET}
    else
        AWSBUCKET="agrjbrowse"
    fi
fi



MAKEPATH=/website-genome-browsers/jbrowse/bin/make_jbrowse.pl

CONFPATH=/website-genome-browsers/jbrowse/conf/c_elegans.jbrowse.conf

LOGFILE=$SPECIES
LOGFILE+=".log"

$MAKEPATH --conf $CONFPATH --quiet --species $SPECIES 2>1 | grep -v "Deep recursion"; mv 1 $LOGFILE

INLINEINCLUDEPATH=/website-genome-browsers/jbrowse/bin/inline_includes.pl

DATADIR=/jbrowse/data

cd $DATADIR

cp $SPECIES/trackList.json $SPECIES/trackList.json.orig
$INLINEINCLUDEPATH --bio $SPECIES --rel "WS$RELEASE" --file $SPECIES/trackList.json > $SPECIES/trackList.json.new
cp $SPECIES/trackList.json.new $SPECIES/trackList.json

UPLOADTOS3PATH=/agr_jbrowse_config/scripts/upload_to_S3.pl

REMOTEPATH="test/WS$RELEASE/$SPECIES"

$UPLOADTOS3PATH --bucket $AWSBUCKET --local "$SPECIES/" --remote $REMOTEPATH --AWSACCESS $AWSACCESS --AWSSECRET $AWSSECRET
 


