#!/bin/bash

RELEASE=277
while getopts r: option
do
case "${option}"
in
r) RELEASE=${OPTARG};;
esac
done

LOCALPATH1="/home/scain/scain/"
LOCALPATH2="_build/jbrowse_build/jbrowse/tools/genome/jbrowse/data"
LOCALPATH="$LOCALPATH1$RELEASE$LOCALPATH2"

REMOTEPATH="docker/WS$RELEASE"

/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/b_malayi_PRJNA10729/" --remote "$REMOTEPATH/b_malayi_PRJNA10729"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_angaria_PRJNA51225/" --remote "$REMOTEPATH/c_angaria_PRJNA51225"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_brenneri_PRJNA20035/" --remote "$REMOTEPATH/c_brenneri_PRJNA20035"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_briggsae_PRJNA10731/" --remote "$REMOTEPATH/c_briggsae_PRJNA10731"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_elegans_PRJEB28388/" --remote "$REMOTEPATH/c_elegans_PRJEB28388"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_elegans_PRJNA13758/" --remote "$REMOTEPATH/c_elegans_PRJNA13758"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_elegans_PRJNA275000/" --remote "$REMOTEPATH/c_elegans_PRJNA275000"
#skip simple upload--it's just the N2 data again
#./upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_elegans_simple/ --remote "$REMOTEPATH/c_elegans_simple
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_inopinata_PRJDB5687/" --remote "$REMOTEPATH/c_inopinata_PRJDB5687"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_japonica_PRJNA12591/" --remote "$REMOTEPATH/c_japonica_PRJNA12591"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_latens_PRJNA248912/" --remote "$REMOTEPATH/c_latens_PRJNA248912"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_nigoni_PRJNA384657/" --remote "$REMOTEPATH/c_nigoni_PRJNA384657"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_remanei_PRJNA248909/" --remote "$REMOTEPATH/c_remanei_PRJNA248909"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_remanei_PRJNA248911/" --remote "$REMOTEPATH/c_remanei_PRJNA248911"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_remanei_PRJNA53967/" --remote "$REMOTEPATH/c_remanei_PRJNA53967"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_sinica_PRJNA194557/" --remote "$REMOTEPATH/c_sinica_PRJNA194557"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/c_tropicalis_PRJNA53597/" --remote "$REMOTEPATH/c_tropicalis_PRJNA53597"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/o_tipulae_PRJEB15512/" --remote "$REMOTEPATH/o_tipulae_PRJEB15512"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/o_volvulus_PRJEB513/" --remote "$REMOTEPATH/o_volvulus_PRJEB513"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/p_pacificus_PRJNA12644/" --remote "$REMOTEPATH/p_pacificus_PRJNA12644"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/p_redivivus_PRJNA186477/" --remote "$REMOTEPATH/p_redivivus_PRJNA186477"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/s_ratti_PRJEB125/" --remote "$REMOTEPATH/s_ratti_PRJEB125"
/home/scain/scain/jbrowse-config/jbrowse-config/scripts/upload_to_S3.pl --profile wormbase --bucket wormbase-modencode --local "$LOCALPATH/t_muris_PRJEB126/" --remote "$REMOTEPATH/t_muris_PRJEB126"
