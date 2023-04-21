#!/bin/bash


perl -pi -e"s/<head>/<head><script async src='https:\/\/www.googletagmanager.com\/gtag\/js?id=G-PWJS2SKB32'><\/script><script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PWJS2SKB32');<\/script>/" index.html

