#!/bin/bash

#fetches trackList.json and seq/refSeqs.json from s3
# (they are put there during the GFF processing)

RELEASE='WS281'
while getopts r: option
do
case "${option}"
in
r) RELEASE=${OPTARG};;
esac
done

SPECIESLIST=(
't_muris_PRJEB126'
'c_nigoni_PRJNA384657'
'b_malayi_PRJNA10729'
'c_angaria_PRJNA51225'
'c_brenneri_PRJNA20035'
'c_briggsae_PRJNA10731'
'c_elegans_PRJNA13758'
'c_elegans_PRJNA275000'
'c_japonica_PRJNA12591'
'c_remanei_PRJNA53967'
'c_sinica_PRJNA194557'
'c_tropicalis_PRJNA53597'
'o_volvulus_PRJEB513'
'p_pacificus_PRJNA12644'
'p_redivivus_PRJNA186477'
's_ratti_PRJEB125'
'c_elegans_PRJEB28388'
'c_inopinata_PRJDB5687'
'c_latens_PRJNA248912'
'o_tipulae_PRJEB15512'
'c_remanei_PRJNA577507'
'c_becei_PRJEB28243'
'c_bovis_PRJEB34497'
'c_panamensis_PRJEB28259'
'c_parvicauda_PRJEB12595'
'c_quiockensis_PRJEB11354'
'c_sulstoni_PRJEB12601'
'c_tribulationis_PRJEB12608'
'c_uteleia_PRJEB12600'
'c_waitukubuli_PRJEB12602'
'c_zanzibari_PRJEB12596'
)

URLBIT='https://s3.amazonaws.com/agrjbrowse/MOD-jbrowses/WormBase'

for SPECIES in "${SPECIESLIST[@]}" ; do
    echo "getting $SPECIES trackList"
    wget -O "$SPECIES/trackList.json" "$URLBIT/$RELEASE/protein/$SPECIES/trackList.json"
done

for SPECIES in "${SPECIESLIST[@]}" ; do
    echo "getting $SPECIES refSeqs"
    wget -O "$SPECIES/seq/refSeqs.json" "$URLBIT/$RELEASE/protein/$SPECIES/seq/refSeqs.json"
done


