# JBrowse

#this docker file uses a build arg to indicate the release version, so the typical command to build is

#   docker build --no-cache -t  protein_schematic  . 

# and it uses multistage builds, so after the build is done, the first image can be deleted and the second, usually much
# smaller (200MB or so) can be used for production

FROM gmod/jbrowse-buildenv:latest as build

ARG RELEASE=291

# JBrowse source
#RUN git clone --single-branch --branch 1.16.8-release https://github.com/GMOD/jbrowse.git

#this is using a branch specifically to support faster builds--needs to be incorporated into main jbrowse build
RUN git clone --single-branch --branch dev https://github.com/GMOD/jbrowse.git

RUN git clone --single-branch --branch protein-${RELEASE} https://github.com/WormBase/website-genome-browsers.git

# Provides the phantomJS powered screenshot plugin
RUN git clone https://github.com/WormBase/jbplugin-screenshot.git

RUN mkdir -p /usr/share/nginx/html/tools/protein_schematic

RUN rm /usr/share/nginx/html/index.html && rm /usr/share/nginx/html/50x.html && \
    cp -r /website-genome-browsers/protein_schematic/jbrowse/data /jbrowse/data/ && \
    cp -r /jbplugin-screenshot /jbrowse/plugins/ScreenShotPlugin && \
    cp -r /jbrowse/* /usr/share/nginx/html/tools/protein_schematic && \
    cp -r /jbrowse/.htaccess /usr/share/nginx/html/tools/protein_schematic/.htaccess && \
    cp /website-genome-browsers/protein_schematic/jbrowse/jbrowse.conf /usr/share/nginx/html/tools/protein_schematic/jbrowse.conf && \
    cp /website-genome-browsers/protein_schematic/jbrowse/url_builder.html /usr/share/nginx/html/tools/protein_schematic/url_builder.html
    
WORKDIR /usr/share/nginx/html/tools/protein_schematic

RUN cp /website-genome-browsers/protein_schematic/bin/fetch_trackList.sh .

RUN ./fetch_trackList.sh -r WS${RELEASE}

#RUN npm install yarn
#RUN ./node_modules/.bin/yarn
#RUN JBROWSE_BUILD_MIN=1 ./node_modules/.bin/yarn build

RUN ./setup.sh -f


FROM nginx:latest as production
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/dist /usr/share/nginx/html/tools/protein_schematic/dist
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/browser /usr/share/nginx/html/tools/protein_schematic/browser
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/css /usr/share/nginx/html/tools/protein_schematic/css
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/data /usr/share/nginx/html/tools/protein_schematic/data
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/img /usr/share/nginx/html/tools/protein_schematic/img
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/index.html /usr/share/nginx/html/tools/protein_schematic/index.html
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/jbrowse_conf.json /usr/share/nginx/html/tools/protein_schematic/jbrowse_conf.json
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/jbrowse.conf /usr/share/nginx/html/tools/protein_schematic/jbrowse.conf
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/LICENSE /usr/share/nginx/html/tools/protein_schematic/LICENSE
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/plugins /usr/share/nginx/html/tools/protein_schematic/plugins
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/site.webmanifest /usr/share/nginx/html/tools/protein_schematic/site.webmanifest
COPY --from=build /usr/share/nginx/html/tools/protein_schematic/.htaccess /usr/share/nginx/html/tools/protein_schematic/.htaccess

COPY --from=build /usr/share/nginx/html/tools/protein_schematic/url_builder.html /usr/share/nginx/html/tools/protein_schematic/url_builder.html

VOLUME /data
COPY docker-entrypoint.sh /
CMD ["/docker-entrypoint.sh"]
