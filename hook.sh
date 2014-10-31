#!/bin/bash

# First, get the zip file
cd /var/zip && wget -O projectmaster.zip -q https://github.com/Jarvl/ENG2089-Project/archive/master.zip

# Second, unzip it, if the zip file exists
if [ -f /var/zip/projectmaster.zip ]; then
    # Unzip the zip file
    unzip -q /var/zip/projectmaster.zip

    # Delete zip file
    rm /var/zip/projectmaster.zip

    # Rename project directory to desired name
    mv ENG2089-Project-master /var/www

    # Delete current directory
    # rm -rf /var/www/somesite.com

    # Replace with new files
    # mv somesite.com /var/www/

    # Perhaps call any other scripts you need to rebuild assets here
    # or set owner/permissions
    # or confirm that the old site was replaced correctly
fi