# JBrowse

#this docker file uses a build arg to indicate the release version, so the typical command to build is

#   docker build --no-cache -t wb_jbrowse  WormBase/ --build-arg RELEASE=275

# and it uses multistage builds, so after the build is done, the first image can be deleted and the second, usually much
# smaller (200MB or so) can be used for production

FROM gmod/jbrowse-buildenv:latest as build

ARG RELEASE=293
RUN apt-get --allow-releaseinfo-change -qq --fix-missing update
RUN apt-get --no-install-recommends -y install rsync

# JBrowse source
RUN git clone --single-branch --branch dev https://github.com/GMOD/jbrowse.git

#this pulls in several things:
#  * the config files for all of the species
#  * two include files (one with functions and one that contains the species locations for jbrowse.conf
#  * the jbrowse.conf files for both jbrowse and jbrowse-simple
#  * Three plugins:
#    * SwitchTrackSelector - provides a button to switch between faceted and hierarchical selectors
#    * RemoveGridOption    - provides a menu item to remove the background grid lines
#    * wormbase-glyphs     - provides some glyphs and places a logo in the page


#RUN git clone --single-branch --branch jbrowse-${RELEASE} https://github.com/WormBase/website-genome-browsers.git
RUN git clone --single-branch --branch jbrowse-291  https://github.com/WormBase/website-genome-browsers.git

# Provides the PWM motif search plugin
RUN git clone --single-branch --branch 1.0 https://github.com/scottcain/MotifSearch.git

# Provides the all on/off checkboxes in the hierarchical selector
RUN git clone https://github.com/bhofmei/jbplugin-hierarchicalcheckbox.git HierarchicalCheckboxPlugin

# Provides the phantomJS powered screenshot plugin
RUN git clone https://github.com/WormBase/jbplugin-screenshot.git ScreenShotPlugin

# Provides the "usage by frame" plugin with WB specific colors
RUN git clone https://github.com/scottcain/colorbycds.git ColorByCDS

# Provides the vistaplot-like glyph that takes a bigbed file to highlight peak calls in a BigWig
RUN git clone https://github.com/cmdcolin/wigglehighlighter.git WiggleHighlighter

# Provides the View Sequence right click menu option
RUN git clone https://github.com/twsaari/FeatureSequence.git

#gc content plugin from Elsik Lab
RUN git clone https://github.com/elsiklab/gccontent.git GCContent

RUN mkdir -p /usr/share/nginx/html/tools/genome/jbrowse
RUN mkdir /usr/share/nginx/html/tools/genome/jbrowse-simple

RUN rm /usr/share/nginx/html/index.html && rm /usr/share/nginx/html/50x.html && \
    rsync -rLp --exclude '.git' /website-genome-browsers/jbrowse/jbrowse/data/ /jbrowse/data/ && \
    rsync -rLp --exclude '.git' /website-genome-browsers/jbrowse/jbrowse/plugins/RemoveGridOption /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /website-genome-browsers/jbrowse/jbrowse/plugins/SwitchTrackSelector /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /website-genome-browsers/jbrowse/jbrowse/plugins/wormbase-glyphs /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /GCContent /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /MotifSearch /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /HierarchicalCheckboxPlugin /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /ScreenShotPlugin /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /ColorByCDS /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /WiggleHighlighter /jbrowse/plugins && \
    rsync -rLp --exclude '.git' /FeatureSequence /jbrowse/plugins && \
    cp -r /jbrowse/* /usr/share/nginx/html/tools/genome/jbrowse && \
    cp -r /jbrowse/.htaccess /usr/share/nginx/html/tools/genome/jbrowse/.htaccess && \
    ln -s /usr/share/nginx/html/tools/genome/jbrowse/index.html /usr/share/nginx/html/tools/genome/jbrowse/full.html && \
    cp /website-genome-browsers/jbrowse/jbrowse/jbrowse-simple.conf /usr/share/nginx/html/tools/genome/jbrowse-simple/jbrowse.conf && \
    cp /website-genome-browsers/jbrowse/jbrowse/jbrowse.conf /usr/share/nginx/html/tools/genome/jbrowse/jbrowse.conf && \
    cp /website-genome-browsers/jbrowse/insert-ga.sh /
    
WORKDIR /usr/share/nginx/html/tools/genome/jbrowse

RUN cp /website-genome-browsers/jbrowse/bin/fetch_trackList.sh .

RUN ./fetch_trackList.sh -r WS${RELEASE}

#RUN npm install yarn
#RUN ./node_modules/.bin/yarn
#RUN JBROWSE_BUILD_MIN=1 ./node_modules/.bin/yarn build

RUN ./setup.sh -f

RUN /insert-ga.sh

FROM nginx:latest as production
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/dist /usr/share/nginx/html/tools/genome/jbrowse/dist
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/browser /usr/share/nginx/html/tools/genome/jbrowse/browser
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/css /usr/share/nginx/html/tools/genome/jbrowse/css
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/data /usr/share/nginx/html/tools/genome/jbrowse/data
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/full.html /usr/share/nginx/html/tools/genome/jbrowse/full.html
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/img /usr/share/nginx/html/tools/genome/jbrowse/img
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/index.html /usr/share/nginx/html/tools/genome/jbrowse/index.html
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/jbrowse_conf.json /usr/share/nginx/html/tools/genome/jbrowse/jbrowse_conf.json
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/jbrowse.conf /usr/share/nginx/html/tools/genome/jbrowse/jbrowse.conf
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/LICENSE /usr/share/nginx/html/tools/genome/jbrowse/LICENSE
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/plugins /usr/share/nginx/html/tools/genome/jbrowse/plugins
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/site.webmanifest /usr/share/nginx/html/tools/genome/jbrowse/site.webmanifest
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse/.htaccess /usr/share/nginx/html/tools/genome/jbrowse/.htaccess
COPY --from=build /usr/share/nginx/html/tools/genome/jbrowse-simple/jbrowse.conf /usr/share/nginx/html/tools/genome/jbrowse-simple/jbrowse.conf

#the "jbrowse-simple" stuff is required to make the SwitchTrackSelector plugin work
RUN cp -r /usr/share/nginx/html/tools/genome/jbrowse/dist /usr/share/nginx/html/tools/genome/jbrowse-simple/dist && \
    cp -r /usr/share/nginx/html/tools/genome/jbrowse/browser /usr/share/nginx/html/tools/genome/jbrowse-simple/browser && \
    cp -r /usr/share/nginx/html/tools/genome/jbrowse/css /usr/share/nginx/html/tools/genome/jbrowse-simple/css && \
    cp -r /usr/share/nginx/html/tools/genome/jbrowse/data /usr/share/nginx/html/tools/genome/jbrowse-simple/data && \
    cp    /usr/share/nginx/html/tools/genome/jbrowse/full.html /usr/share/nginx/html/tools/genome/jbrowse-simple/full.html && \
    cp -r /usr/share/nginx/html/tools/genome/jbrowse/img /usr/share/nginx/html/tools/genome/jbrowse-simple/img && \
    cp    /usr/share/nginx/html/tools/genome/jbrowse/index.html /usr/share/nginx/html/tools/genome/jbrowse-simple/index.html && \
    cp    /usr/share/nginx/html/tools/genome/jbrowse/jbrowse_conf.json /usr/share/nginx/html/tools/genome/jbrowse-simple/jbrowse_conf.json && \
    cp    /usr/share/nginx/html/tools/genome/jbrowse/LICENSE /usr/share/nginx/html/tools/genome/jbrowse-simple/LICENSE && \
    cp -r /usr/share/nginx/html/tools/genome/jbrowse/plugins /usr/share/nginx/html/tools/genome/jbrowse-simple/plugins && \
    cp    /usr/share/nginx/html/tools/genome/jbrowse/site.webmanifest /usr/share/nginx/html/tools/genome/jbrowse-simple/site.webmanifest && \
    cp    /usr/share/nginx/html/tools/genome/jbrowse/.htaccess /usr/share/nginx/html/tools/genome/jbrowse-simple/.htaccess

WORKDIR /usr/share/nginx/html/tools
RUN tar zcvf  genome.tar.gz genome

VOLUME /data
COPY docker-entrypoint.sh /
CMD ["/docker-entrypoint.sh"]
