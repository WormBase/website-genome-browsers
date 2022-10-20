#!/bin/bash

while getopts r: option
do
case "${option}"
in
r)
  RELEASE=${OPTARG}
  ;;
esac
done


../../../bin/make_tracks_config.pl --assembly  b_malayi_PRJNA10729 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_angaria_PRJNA51225 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_becei_PRJEB28243 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_bovis_PRJEB34497 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_brenneri_PRJNA20035 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_briggsae_PRJNA10731 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_elegans_PRJEB28388 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_elegans_PRJNA13758 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_elegans_PRJNA275000 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_inopinata_PRJDB5687 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_japonica_PRJNA12591 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_latens_PRJNA248912 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_nigoni_PRJNA384657 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_panamensis_PRJEB28259 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_parvicauda_PRJEB12595 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_quiockensis_PRJEB11354 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_remanei_PRJNA53967 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_remanei_PRJNA577507 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_sinica_PRJNA194557 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_sulstoni_PRJEB12601 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_tribulationis_PRJEB12608 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_tropicalis_PRJNA53597 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_uteleia_PRJEB12600 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_waitukubuli_PRJEB12602 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  c_zanzibari_PRJEB12596 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  o_tipulae_PRJEB15512 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  o_volvulus_PRJEB513 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  p_pacificus_PRJNA12644 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  p_redivivus_PRJNA186477 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  s_ratti_PRJEB125 --release $RELEASE
../../../bin/make_tracks_config.pl --assembly  t_muris_PRJEB126 --release $RELEASE
