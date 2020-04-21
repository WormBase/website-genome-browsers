#!/bin/bash

RELEASE=277
while getopts r: option
do
case "${option}"
in
r) RELEASE=${OPTARG};;
esac
done

PATH1="/home/scain/scain/"
PATH2="_build/jbrowse_build/website-genome-browsers/jbrowse/bin/make_jbrowse.pl"
MAKEPATH="$PATH1$RELEASE$PATH2"

CONFPATH1="/home/scain/scain/"
CONFPATH2="_build/jbrowse_build/website-genome-browsers/jbrowse/conf/$CONFPATH"
CONFPATH="$CONFPATH1$RELEASE$CONFPATH2"

$MAKEPATH --conf $CONFPATH --quiet --species t_muris_PRJEB126 2>1 | grep -v "Deep recursion"; mv 1 t_muris_PRJEB126.log
$MAKEPATH --conf $CONFPATH --quiet --species c_nigoni_PRJNA384657 2>1 | grep -v "Deep recursion"; mv 1 c_nigoni_PRJNA384657.log
$MAKEPATH --conf $CONFPATH --quiet --species b_malayi_PRJNA10729 2>1 | grep -v "Deep recursion"; mv 1 b_malayi_PRJNA10729.log
$MAKEPATH --conf $CONFPATH --quiet --species c_angaria_PRJNA51225 2>1 | grep -v "Deep recursion"; mv 1 c_angaria_PRJNA51225.log
$MAKEPATH --conf $CONFPATH --quiet --species c_brenneri_PRJNA20035 2>1 | grep -v "Deep recursion"; mv 1 c_brenneri_PRJNA20035.log
$MAKEPATH --conf $CONFPATH --quiet --species c_briggsae_PRJNA10731 2>1 | grep -v "Deep recursion"; mv 1 c_briggsae_PRJNA10731.log
$MAKEPATH --conf $CONFPATH --quiet --species c_elegans_PRJNA13758 2>1 | grep -v "Deep recursion"; mv 1 c_elegans_PRJNA13758.log
$MAKEPATH --conf $CONFPATH --quiet --species c_elegans_PRJNA275000 2>1 | grep -v "Deep recursion"; mv 1 c_elegans_PRJNA275000.log
$MAKEPATH --conf $CONFPATH --quiet --species c_japonica_PRJNA12591 2>1 | grep -v "Deep recursion"; mv 1 c_japonica_PRJNA12591.log
$MAKEPATH --conf $CONFPATH --quiet --species c_remanei_PRJNA248909 2>1 | grep -v "Deep recursion"; mv 1 c_remanei_PRJNA248909.log
$MAKEPATH --conf $CONFPATH --quiet --species c_remanei_PRJNA53967 2>1 | grep -v "Deep recursion"; mv 1 c_remanei_PRJNA53967.log
$MAKEPATH --conf $CONFPATH --quiet --species c_sinica_PRJNA194557 2>1 | grep -v "Deep recursion"; mv 1 c_sinica_PRJNA194557.log
$MAKEPATH --conf $CONFPATH --quiet --species c_tropicalis_PRJNA53597 2>1 | grep -v "Deep recursion"; mv 1 c_tropicalis_PRJNA53597.log
$MAKEPATH --conf $CONFPATH --quiet --species o_volvulus_PRJEB513 2>1 | grep -v "Deep recursion"; mv 1 o_volvulus_PRJEB513.log
$MAKEPATH --conf $CONFPATH --quiet --species p_pacificus_PRJNA12644 2>1 | grep -v "Deep recursion"; mv 1 p_pacificus_PRJNA12644.log
$MAKEPATH --conf $CONFPATH --quiet --species p_redivivus_PRJNA186477 2>1 | grep -v "Deep recursion"; mv 1 p_redivivus_PRJNA186477.log
$MAKEPATH --conf $CONFPATH --quiet --species s_ratti_PRJEB125 2>1 | grep -v "Deep recursion"; mv 1 s_ratti_PRJEB125.log
$MAKEPATH --conf $CONFPATH --quiet --simple 2>1 | grep -v "Deep recursion"
$MAKEPATH --conf $CONFPATH --quiet --species c_elegans_PRJEB28388 2>1 | grep -v "Deep recursion"; mv 1 c_elegans_PRJEB28388.log
$MAKEPATH --conf $CONFPATH --quiet --species c_inopinata_PRJDB5687 2>1 | grep -v "Deep recursion"; mv 1 c_inopinata_PRJDB5687.log
$MAKEPATH --conf $CONFPATH --quiet --species c_latens_PRJNA248912 2>1 | grep -v "Deep recursion"; mv 1 c_latens_PRJNA248912.log
$MAKEPATH --conf $CONFPATH --quiet --species o_tipulae_PRJEB15512 2>1 | grep -v "Deep recursion"; mv 1 o_tipulae_PRJEB15512.log
$MAKEPATH --conf $CONFPATH --quiet --species c_remanei_PRJNA248911 2>1 | grep -v "Deep recursion"; mv 1 c_remanei_PRJNA248911.log
