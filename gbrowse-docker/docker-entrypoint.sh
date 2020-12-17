#!/bin/bash
if [ -d "/data/" ];
then
    for f in /data/*.sh;
    do
        [ -f "$f" ] && . "$f"
    done
fi


if [-d "/s3fs/" ] ;
then
   rclone mount wormbase:wormbase-modencode/ /s3fs/ --daemon --allow-other --config /root/.config/rclone/rclone.conf 
fi

/usr/sbin/apache2ctl -D FOREGROUND
