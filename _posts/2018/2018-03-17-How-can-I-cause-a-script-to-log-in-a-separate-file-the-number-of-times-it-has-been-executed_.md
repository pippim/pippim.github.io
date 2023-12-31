---
layout:       post
title:        >
    How can I cause a script to log in a separate file the number of times it has been executed?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1015648
type:         Answer
tags:         command-line bash scripts
created_date: 2018-03-17 02:42:03
edit_date:    
votes:        "1 "
favorites:    
views:        "1,198 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-17-How-can-I-cause-a-script-to-log-in-a-separate-file-the-number-of-times-it-has-been-executed_.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# A different approach

A separate counter file has disadvantages:

- It takes 4096 bytes (or whatever your block size is) for each counter file.
- You have to look up the name of the file in the bash script and then open the file to see the count.
- There is no file locking (in other answers) so it's possible that two people update the counter at the exact same time (called race condition in comments under Byte Commander's answer).

So this answer does away with a separate counter file and puts the count in the bash script itself!

- Putting the counter in the bash script itself allows you to see within your script itself how many times it has been run.
- Using `flock` guarantees that for a brief moment it's not possible for two users to run the script at the same time.
- Because counter file name isn't hard coded, you don't need to change the code for different scripts, you can simply source it or copy and paste it from a stub / boilerplate file.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# The code



``` bash
#!/bin/bash

# NAME: run-count.sh
# PATH: $HOME/bin
# DESC: Written for AU Q&A: https://askubuntu.com/questions/988032/how-can-i-cause-a-script-to-log-in-a-separate-file-the-number-of-times-it-has-be

# DATE: Mar 16, 2018.

# This script run count: 0

# ======== FROM HERE DOWN CAN GO INTO FILE INCLUDED WITH SOURCE COMMAND =======

[ "${FLOCKER}" != "$0" ] && exec env FLOCKER="$0" flock -en "$0" "$0" "$@" || :
#     This is useful boilerplate code for shell scripts.  Put it at the top  of
#     the  shell script you want to lock and it'll automatically lock itself on
#     the first run.  If the env var $FLOCKER is not set to  the  shell  script
#     that  is being run, then execute flock and grab an exclusive non-blocking
#     lock (using the script itself as the lock file) before re-execing  itself
#     with  the right arguments.  It also sets the FLOCKER env var to the right
#     value so it doesn't run again.

# Read this script with entries separated newline " " into array
mapfile -t ScriptArr < "$0"

# Build search string that cannot be named
SearchStr="This script"
SearchStr=$SearchStr" run count: "

# Find our search string in array and increment count
for i in ${!ScriptArr[@]}; do
    if [[ ${ScriptArr[i]} = *"$SearchStr"* ]]; then
        OldCnt=$( echo ${ScriptArr[i]} | cut -d':' -f2 )
        NewCnt=$(( $OldCnt + 1 ))
        ScriptArr[i]=$SearchStr$NewCnt
        break
    fi
done

# Rewrite our script to disk with new run count
# BONUS: Date of script after writing will be last run time
printf "%s\n" "${ScriptArr[@]}" > "$0"

# ========= FROM HERE UP CAN GO INTO FILE INCLUDED WITH SOURCE COMMAND ========

# Now we return you to your original programming....

exit 0
```


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# Another Approach using a Log File

Similar to Videonauth's answer I wrote a log file answer here: [Bash script to maintain audit trail / log of files accessed][1] to log every time root powers were used with `gedit` or `nautilus`.

The catch though is rather than using `gksu` the script is named `gsu` and invokes `pkexec` the "modern" way of using sudo in the GUI, so I am told.

Another advantage is not only does it say each time root powers were used with `gedit` but it logs the file name that was edited.
Here is the code.

`~/bin/gsu`:

``` bash
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

``` bash
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

``` bash
__Date__ - __Time__ - ______File Name______
11/18/16 - 19:07:54 - "/etc/default/grub"
11/18/16 - 19:08:34 - "/home/rick/bin/gsu"
11/18/16 - 19:09:26 - "/home/rick/bin/gsu"
```



  [1]: https://askubuntu.com/questions/850315/bash-script-to-maintain-audit-trail-log-of-files-accessed/851051#851051


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

