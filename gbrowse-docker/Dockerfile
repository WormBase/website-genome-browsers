#based on:
#FROM comics/centos
#MAINTAINER Ian Merrick <MerrickI@Cardiff.ac.uk>
#FROM wormbase/website-genome-browsers
FROM ubuntu:18.04
MAINTAINER Scott Cain <scott.cain@wormbase.org>

##############################################################
# Dockerfile Version:   0.1
# Software:             gbrowse
# Software Version:     latest available in CPAN
# Software Website:     https://github.com/GMOD/GBrowse
# Description:          the Generic Genome Browser
##############################################################

RUN apt-get update

#for some reason, this has to be installed by itself
RUN apt-get install -y tzdata

RUN apt-get install -y apt-utils

RUN apt-get install -y wget \
                       unzip \
                       git \
                       make \
                       gcc \
                       vim \
                       uuid-dev \
                       s3fs \
                       libncurses5-dev libncursesw5-dev

RUN apt-get install -y gbrowse \
                       gbrowse-calign \
                       gbrowse-data \
                       libbio-samtools-perl \
                       apache2 \
                       libapache2-mod-fcgid \
                       libfcgi-perl \
                       libssl-dev \
                       libpng-dev \
                       libmysqlclient-dev \
                       libmysql-cil-dev \
                       libmodule-build-perl

WORKDIR /usr/local

RUN wget http://hgdownload.cse.ucsc.edu/admin/jksrc.zip
RUN unzip jksrc.zip
RUN rm jksrc.zip

WORKDIR /usr/local/kent/src/
ENV MACHTYPE x86_64
ENV KENT_SRC /usr/local/kent/src

WORKDIR /usr/local/kent/src/lib
RUN make CXXFLAGS=-fPIC CFLAGS=-fPIC CPPFLAGS=-fPIC

WORKDIR /usr/local/kent/src/jkOwnLib
RUN make CXXFLAGS=-fPIC CFLAGS=-fPIC CPPFLAGS=-fPIC    
        
WORKDIR /usr/local/kent/src/htslib
RUN make CXXFLAGS=-fPIC CFLAGS=-fPIC CPPFLAGS=-fPIC

WORKDIR /usr/local
#RUN wget https://github.com/samtools/htslib/releases/download/1.3.2/htslib-1.3.2.tar.bz2 -O htslib.tar.bz2
#RUN tar -xjvf htslib.tar.bz2

#RUN git clone --single-branch --branch 0.1.20 https://github.com/samtools/samtools.git
#WORKDIR /usr/local/samtools
#RUN make
#RUN cp samtools /usr/local/bin

WORKDIR /tmp
RUN wget https://cpan.metacpan.org/authors/id/L/LD/LDS/Bio-SamTools-1.43.tar.gz
RUN tar zxvf Bio-SamTools-1.43.tar.gz
WORKDIR /tmp/Bio-SamTools-1.43
#huh, this just works. Nice.
RUN perl INSTALL.pl

#WORKDIR /usr/local/htslib-1.3.2
#RUN make
#RUN make install

WORKDIR /tmp
RUN git clone https://github.com/GMOD/GBrowse-Adaptors.git
WORKDIR /tmp/GBrowse-Adaptors/Bio-BigFile

RUN ls -la \
 && sed -i "s/\$ENV{KENT_SRC}/\'\/usr\/local\/kent\/src\'/" Build.PL \
 && sed -i "s/\$ENV{MACHTYPE}/x86_64/g" Build.PL \
 && sed -i "s/\$hts_lib\/$LibFileHTS/\/usr\/local\/kent\/src\/htslib\//" Build.PL

RUN perl Build.PL \
 && ./Build \
 && ./Build test \
 && ./Build install 

RUN a2enmod cgid

# default directories, and the apache config in conf.d will have to be modified
# and placed in git (how is it not already!!)
#
# Hopefully this will result in a cleaner install.
#
RUN cd / ; \
    git clone --single-branch --branch gbrowse-docker  https://github.com/WormBase/website-genome-browsers.git ; \
    cd website-genome-browsers ; \
    cp -R gbrowse/* /etc/gbrowse ; \
    cp gbrowse/gbrowse_apache.conf /etc/apache2/conf-enabled/gbrowse.conf ; \
    rm /etc/apache2/conf-enabled/serve-cgi-bin.conf
     


#this stuff will have to be modified for us
#COPY gbrowse2.conf /etc/httpd/conf.d/gbrowse2.conf
#COPY gbrowse_entrypoint.sh /usr/local/bin/gbrowse_entrypoint.sh
#ENTRYPOINT ["/usr/local/bin/gbrowse_entrypoint.sh"]

CMD ["/usr/sbin/apache2ctl","-D", "FOREGROUND"]
