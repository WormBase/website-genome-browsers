# JBrowse 2

FROM gmod/jbrowse-buildenv:latest as build

ARG RELEASE=286

# JBrowse source
RUN npm install -g @jbrowse/cli
RUN apt-get install -y libjson-perl

#UN touch /something.txt

RUN git clone --single-branch --branch jb2-284 https://github.com/WormBase/website-genome-browsers.git

RUN mkdir -p /usr/share/nginx/html/tools/genome
WORKDIR /usr/share/nginx/html/tools/genome/
RUN jbrowse create jbrowse2
#RUN sleep 10
RUN ls /usr/share/nginx/html/tools/genome/jbrowse2/

RUN rm /usr/share/nginx/html/index.html && \
    rm /usr/share/nginx/html/50x.html && \
    cp /website-genome-browsers/jbrowse2/config/variantColor_plugin.js /usr/share/nginx/html/tools/genome/jbrowse2/variantColor_plugin.js && \
    cp /website-genome-browsers/jbrowse2/config/hex_plugin.js /usr/share/nginx/html/tools/genome/jbrowse2/hex_plugin.js 

WORKDIR /usr/share/nginx/html/tools/genome

RUN mkdir -p /website-genome-browsers/jbrowse2/config/track_configs/WS$RELEASE

WORKDIR /website-genome-browsers/jbrowse2/config/track_configs/WS$RELEASE

RUN cp /website-genome-browsers/jbrowse2/bin/make_tracks.sh .

RUN bash make_tracks.sh -r $RELEASE

RUN ../../../bin/make_embed_config.pl --release $RELEASE

RUN ../../../bin/make_global_config.pl --release $RELEASE > config.json

RUN cp config.json /usr/share/nginx/html/tools/genome/jbrowse2/config.json





VOLUME /data
COPY docker-entrypoint.sh /
CMD ["/docker-entrypoint.sh"]
