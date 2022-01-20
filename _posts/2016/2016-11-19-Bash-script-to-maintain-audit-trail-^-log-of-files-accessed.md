---
layout:       post
title:        >
    Bash script to maintain audit trail / log of files accessed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/851051
type:         Answer
tags:         command-line bash scripts gedit log
created_date: 2016-11-19 02:21:17
edit_date:    
votes:        "0 "
favorites:    
views:        "1,213 "
accepted:     Accepted
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-19-Bash-script-to-maintain-audit-trail-^-log-of-files-accessed.md
toc:          false
navigation:   false
clipboard:    true
---

The simplest answer for me to wrap my head around is not using `journalctl` derivatives but rather "brute force" programming / scripting.

Here is the code.

`~/bin/gsu`:

``` 
#!/bin/bash

# Usage: gsu gedit file1 file2...
#  -OR-  gsu natuilus /dirname

# & is used to spawn process and get prompt back ASAP
# > /dev/null is used to send gtk warnings into dumpster

COMMAND="$1" # extract gedit or nautilus

pkexec "$COMMAND" "${@:2}"

log-file "${@:2}" gsu-log-file-for-"$COMMAND"
```

`/usr/local/bin/log-file`:

{% include copyHeader.html %}
``` 
#! /bin/bash

# NAME: log-file
# PATH: /usr/local/bin
# DESC: Update audit trail/log file with passed parameters.
# CALL: log-file FileName LogFileName
# DATE: Created Nov 18, 2016.
# NOTE: Primarily called from ~/bin/gsu

ABSOLUTE_NAME=$(realpath "$1")
TIME_STAMP=$(date +"%D - %T")
LOG_FILE="$2"

# Does log file need to be created?
if [ ! -f "$LOG_FILE" ]; then
    touch "$LOG_FILE"
    echo "__Date__ - __Time__ - ______File Name______" >> "$LOG_FILE"
    #     MM/DD/YY - hh:mm:ss - "a/b/c/FileName"
fi

echo "$TIME_STAMP" - '"'"$ABSOLUTE_NAME"'"' >> "$LOG_FILE"

exit 0
```

Contents of log file `gsu-log-file-for-gedit`after a few edits:

``` 
__Date__ - __Time__ - ______File Name______
11/18/16 - 19:07:54 - "/etc/default/grub"
11/18/16 - 19:08:34 - "/home/rick/bin/gsu"
11/18/16 - 19:09:26 - "/home/rick/bin/gsu"
```

## Future enhancements

A consolidation script which will take take last two lines and merge them into:

``` 
11/18/16 - 19:09:26 - "/home/rick/bin/gsu" (2 edits, first on 11/18/16 - 19:08:34"
```

