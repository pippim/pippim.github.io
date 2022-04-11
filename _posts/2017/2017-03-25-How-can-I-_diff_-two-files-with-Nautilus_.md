---
layout:       post
title:        >
    How can I "diff" two files with Nautilus?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/896832
type:         Answer
tags:         nautilus gnome gtk3 diff
created_date: 2017-03-25 18:27:34
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "8,076 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-25-How-can-I-_diff_-two-files-with-Nautilus_.md
toc:          false
navigation:   false
clipboard:    true
---

# Using Nautilus to compare file to clipboard containing text

This answer is primarily used to compare a file to text in the clipboard that was copied from the internet. The clipboard text could have been copied from another file on your system though--making this an eligible answer.

File differences are highlighted using bash's native `diff` command and then displayed using `gedit`. This can be modified to `meld` or any other third party package though.

This answer uses Nautilus's built-in function to run a custom script after selecting a file:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: clipboard-diff
# PATH: $HOME/.local/share/nautilus/scripts
# DESC: Find differences bewteen selected file on disk and clipboard.
# CALL: Called from Nautilus file manager.
# DATE: March 18, 2017. Modified: March 31, 2017.

# NOTE: The clipboard would contain text highlighted on website and copied
#       with <ctrl>+<C>. Requires command `xclip` to be installed.

# Must have the xclip package. On Ubuntu 16.04, not installed by default
command -v xclip >/dev/null 2>&1 || { zenity --error --text "Install xclip using: 'sudo apt install xclip' to use this script.  Aborting."; exit 99; }

# strip new line char passed by Nautilus
FILENAME=$(echo $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS | sed -e 's/\r//g')

# Multiple files can't be selected.
LINE_COUNT=$(wc -l <<< "$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS")
LINE_COUNT=$((LINE_COUNT-1))

if [[ $LINE_COUNT > 1 ]] ; then
    zenity --error --text "Ony one file can be selected at a time! "
    exit 1
fi

# Object type must be "file..." (ie no directories, etc.)
if [ -d "${FILENAME}" ] ; then
    zenity --error --text "$FILENAME is a directory!";
    exit 1
else
    if [ -f "${FILENAME}" ]; then
        : # Bash noop
    else
        zenity --error --text "${FILENAME} is not a file!";
        exit 2
    fi
fi

# Get clipboard contents into working file
workfile="/tmp/clipboard-work-"$(date +%s)
xclip -o > $workfile

# Create temporary file name so two or more open instances won't clash
differences="/tmp/clipboard-diff-"$(date +%s)

# Compare file differences
# -q brief -B ignore blank lines, -u only differences
diff --unified=2 -w -b -B -I --suppress-blank-empty \
        --suppress-common-lines --ignore-all-space \
        ${FILENAME} $workfile > $differences

# If file doesn't exist, errors in diff parameters
# If file size =0 there were no differences
if [[ -f $differences ]] ; then
    if [[ -s $differences ]] ; then
        # File not empty.
        gedit $differences
    else    
        zenity --info --text "$workfile matches $differences"
    fi
else
    zenity --error --text "cliboard-diff - error in diff parameters."
fi

# clean up /tmp directory
rm $workfile
rm $differences

exit 0
```

**NOTE:** I developed this Nautilus script a couple weeks ago and have been meaning to post it as a new Q&A but have been pressed for time and was unsure if anyone would really be all that interested in it.

## Sample output

[![clipboard-diff 1][1]][1]

In this example we're comparing the actual script posted here in AU prior to March 31, 2017 to the version revised on March 31, 2017. Notice how new information and error messages were setup.

The `diff` command is very powerful and as such has a myriad of control parameters. Type `man diff` in the terminal for the manual pages or `info diff` for more even more command usage details.


  [1]: https://i.stack.imgur.com/Uu7HS.png
