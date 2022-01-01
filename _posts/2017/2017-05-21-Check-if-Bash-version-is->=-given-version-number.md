---
layout:       post
title:        >
    Check if Bash version is >= given version number
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/917419
type:         Answer
tags:         command-line bash scripts versions
created_date: 2017-05-21 14:06:23
edit_date:    2019-08-05 15:28:16
votes:        "2 "
favorites:    
views:        "16,040 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    true
---

# One-liner not possible but a bash script is possible

I developed a script that draws on answers in Stack Overflow. One of those answers led to a Dell Employee writing version number comparisons in 2004 for the DKMS application.


## The code

The bash script below needs to be marked as executable using the command `chmod a+x script-name`. I'm using the name `/usr/local/bin/testver`:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: testver
# PATH: /usr/local/bin
# DESC: Test a program's version number >= to passed version number
# DATE: May 21, 2017. Modified August 5, 2019.

# CALL: testver Program Version

# PARM: 1. Program - validated to be a command
#       2. Version - validated to be numberic

# NOTE: Extracting version number perl one-liner found here:
#       http://stackoverflow.com/questions/16817646/extract-version-number-from-a-string

#       Comparing two version numbers code found here:
#       http://stackoverflow.com/questions/4023830/how-compare-two-strings-in-dot-separated-version-format-in-bash

# Map parameters to coder-friendly names.
Program="$1"
Version="$2"

# Program name must be a valid command.
command -v $Program >/dev/null 2>&1 || { echo "Command: $Program not found. Check spelling."; exit 99; }

# Passed version number must be valid format.
if ! [[ $Version =~ ^([0-9]+\.?)+$ ]]; then
    echo "Version number: $Version has invalid format. Aborting.";
    exit 99
fi

InstalledVersion=$( "$Program" --version | perl -pe '($_)=/([0-9]+([.][0-9]+)+)/' )
# echo "Installed Version: $InstalledVersion"

if [[ $InstalledVersion =~ ^([0-9]+\.?)+$ ]]; then
    l=(${InstalledVersion//./ })
    r=(${Version//./ })
    s=${#l[@]}
    [[ ${#r[@]} -gt ${#l[@]} ]] && s=${#r[@]}

    for i in $(seq 0 $((s - 1))); do
        # echo "Installed ${l[$i]} -gt Test ${r[$i]}?"
        [[ ${l[$i]} -gt ${r[$i]} ]] && exit 0 # Installed version > test version.
        [[ ${l[$i]} -lt ${r[$i]} ]] && exit 1 # Installed version < test version.
    done

    exit 0 # Installed version = test version.
else
    echo "Invalid version number found for command: $Program"
    exit 99
fi

echo "testver - Unreachable code has been reached!"
exit 255

```

