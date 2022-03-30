#!/usr/bin/bash

convert -font font.ttf -background none -fill "#cbcbcb" -pointsize 24 -size 520x -interline-spacing 8 \
    caption:"by the way, Cancer,\nyou don't have the right!, O you don't have the right!" \
    template.png +swap -gravity north -geometry +0+45 -composite try-v01.png