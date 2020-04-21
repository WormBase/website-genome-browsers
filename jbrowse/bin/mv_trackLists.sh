#!/bin/bash

RELEASE=276
while getopts r: option
do
case "${option}"
in
r) RELEASE=${OPTARG};;
esac
done

PATH1="/home/scain/scain/"
PATH2="_build/jbrowse_build/website-genome-browsers/jbrowse/jbrowse/data"

PATH="$PATH1$RELEASE$PATH2"

mv b_malayi_PRJNA10729_trackList.json     "$PATH/b_malayi_PRJNA10729/trackList.json"
mv c_angaria_PRJNA51225_trackList.json    "$PATH/c_angaria_PRJNA51225/trackList.json"
mv c_brenneri_PRJNA20035_trackList.json   "$PATH/c_brenneri_PRJNA20035/trackList.json"
mv c_briggsae_PRJNA10731_trackList.json   "$PATH/c_briggsae_PRJNA10731/trackList.json"
mv c_elegans_PRJEB28388_trackList.json    "$PATH/c_elegans_PRJEB28388/trackList.json"
mv c_elegans_PRJNA13758_trackList.json    "$PATH/c_elegans_PRJNA13758/trackList.json"
mv c_elegans_PRJNA275000_trackList.json   "$PATH/c_elegans_PRJNA275000/trackList.json"
mv c_elegans_simple_trackList.json        "$PATH/c_elegans_simple/trackList.json"
mv c_inopinata_PRJDB5687_trackList.json   "$PATH/c_inopinata_PRJDB5687/trackList.json"
mv c_japonica_PRJNA12591_trackList.json   "$PATH/c_japonica_PRJNA12591/trackList.json"
mv c_latens_PRJNA248912_trackList.json    "$PATH/c_latens_PRJNA248912/trackList.json"
mv c_nigoni_PRJNA384657_trackList.json    "$PATH/c_nigoni_PRJNA384657/trackList.json"
mv c_remanei_PRJNA248909_trackList.json   "$PATH/c_remanei_PRJNA248909/trackList.json"
mv c_remanei_PRJNA248911_trackList.json   "$PATH/c_remanei_PRJNA248911/trackList.json"
mv c_remanei_PRJNA53967_trackList.json    "$PATH/c_remanei_PRJNA53967/trackList.json"
mv c_sinica_PRJNA194557_trackList.json    "$PATH/c_sinica_PRJNA194557/trackList.json"
mv c_tropicalis_PRJNA53597_trackList.json "$PATH/c_tropicalis_PRJNA53597/trackList.json"
mv o_tipulae_PRJEB15512_trackList.json    "$PATH/o_tipulae_PRJEB15512/trackList.json"
mv o_volvulus_PRJEB513_trackList.json     "$PATH/o_volvulus_PRJEB513/trackList.json"
mv p_pacificus_PRJNA12644_trackList.json  "$PATH/p_pacificus_PRJNA12644/trackList.json"
mv p_redivivus_PRJNA186477_trackList.json "$PATH/p_redivivus_PRJNA186477/trackList.json"
mv s_ratti_PRJEB125_trackList.json        "$PATH/s_ratti_PRJEB125/trackList.json"
mv t_muris_PRJEB126_trackList.json        "$PATH/data/t_muris_PRJEB126/trackList.json"

