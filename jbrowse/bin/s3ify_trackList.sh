#!/bin/bash

RELEASE=277
while getopts r: option
do
case "${option}"
in
r) RELEASE=${OPTARG};;
esac
done

PATH1="/usr/local/wormbase/website/scain/"
PATH2="_build/jbrowse_build/website-genome-browsers/jbrowse/bin/inline_includes.pl"

INLINE="$PATH1$RELEASE$PATH2"



$INLINE --bio b_malayi_PRJNA10729 --rel "WS$RELEASE" --file b_malayi_PRJNA10729/trackList.json > b_malayi_PRJNA10729_trackList.json
$INLINE --bio c_angaria_PRJNA51225 --rel "WS$RELEASE" --file c_angaria_PRJNA51225/trackList.json > c_angaria_PRJNA51225_trackList.json
$INLINE --bio c_brenneri_PRJNA20035 --rel "WS$RELEASE" --file c_brenneri_PRJNA20035/trackList.json > c_brenneri_PRJNA20035_trackList.json
$INLINE --bio c_briggsae_PRJNA10731 --rel "WS$RELEASE" --file c_briggsae_PRJNA10731/trackList.json > c_briggsae_PRJNA10731_trackList.json
$INLINE --bio c_elegans_PRJEB28388 --rel "WS$RELEASE" --file c_elegans_PRJEB28388/trackList.json > c_elegans_PRJEB28388_trackList.json
$INLINE --bio c_elegans_PRJNA13758 --rel "WS$RELEASE" --file c_elegans_PRJNA13758/trackList.json > c_elegans_PRJNA13758_trackList.json
$INLINE --bio c_elegans_PRJNA275000 --rel "WS$RELEASE" --file c_elegans_PRJNA275000/trackList.json > c_elegans_PRJNA275000_trackList.json
$INLINE --bio c_elegans_simple --rel "WS$RELEASE" --file c_elegans_simple/trackList.json > c_elegans_simple_trackList.json
$INLINE --bio c_inopinata_PRJDB5687 --rel "WS$RELEASE" --file c_inopinata_PRJDB5687/trackList.json > c_inopinata_PRJDB5687_trackList.json
$INLINE --bio c_japonica_PRJNA12591 --rel "WS$RELEASE" --file c_japonica_PRJNA12591/trackList.json > c_japonica_PRJNA12591_trackList.json
$INLINE --bio c_latens_PRJNA248912 --rel "WS$RELEASE" --file c_latens_PRJNA248912/trackList.json > c_latens_PRJNA248912_trackList.json
$INLINE --bio c_nigoni_PRJNA384657 --rel "WS$RELEASE" --file c_nigoni_PRJNA384657/trackList.json > c_nigoni_PRJNA384657_trackList.json
$INLINE --bio c_remanei_PRJNA248909 --rel "WS$RELEASE" --file c_remanei_PRJNA248909/trackList.json > c_remanei_PRJNA248909_trackList.json
$INLINE --bio c_remanei_PRJNA248911 --rel "WS$RELEASE" --file c_remanei_PRJNA248911/trackList.json > c_remanei_PRJNA248911_trackList.json
$INLINE --bio c_remanei_PRJNA53967 --rel "WS$RELEASE" --file c_remanei_PRJNA53967/trackList.json > c_remanei_PRJNA53967_trackList.json
$INLINE --bio c_sinica_PRJNA194557 --rel "WS$RELEASE" --file c_sinica_PRJNA194557/trackList.json > c_sinica_PRJNA194557_trackList.json
$INLINE --bio c_tropicalis_PRJNA53597 --rel "WS$RELEASE" --file c_tropicalis_PRJNA53597/trackList.json > c_tropicalis_PRJNA53597_trackList.json
$INLINE --bio o_tipulae_PRJEB15512 --rel "WS$RELEASE" --file o_tipulae_PRJEB15512/trackList.json > o_tipulae_PRJEB15512_trackList.json
$INLINE --bio o_volvulus_PRJEB513 --rel "WS$RELEASE" --file o_volvulus_PRJEB513/trackList.json > o_volvulus_PRJEB513_trackList.json
$INLINE --bio p_pacificus_PRJNA12644 --rel "WS$RELEASE" --file p_pacificus_PRJNA12644/trackList.json > p_pacificus_PRJNA12644_trackList.json
$INLINE --bio p_redivivus_PRJNA186477 --rel "WS$RELEASE" --file p_redivivus_PRJNA186477/trackList.json > p_redivivus_PRJNA186477_trackList.json
$INLINE --bio s_ratti_PRJEB125 --rel "WS$RELEASE" --file s_ratti_PRJEB125/trackList.json > s_ratti_PRJEB125_trackList.json
$INLINE --bio t_muris_PRJEB126 --rel "WS$RELEASE" --file t_muris_PRJEB126/trackList.json > t_muris_PRJEB126_trackList.json
