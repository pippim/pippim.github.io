---
layout:       post
title:        >
    How to make locate output look like `ll` or `ls -la` but nicer?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1039236
type:         Answer
tags:         command-line ls locate
created_date: 2018-05-23 02:45:51
edit_date:    2020-07-05 22:04:26
votes:        "2 "
favorites:    
views:        "3,175 "
accepted:     Accepted
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-23-How-to-make-locate-output-look-like-`ll`-or-`ls--la`-but-nicer^.md
toc:          false
navigation:   false
clipboard:    true
---

I created a script called `llocate` for this purpose:

``` 
$ time llocate etc/profile
ACCESS      OWNER  GROUP  SIZE  MODIFIED      NAME (updatdb last ran: 2018-07-01 11:30:05)
-rw-r--r--  root   root   575   Nov 12  2017  /etc/profile
drwxr-xr-x  root   root   4096  Jun  4 17:19  /etc/profile.d
-rw-r--r--  root   root   40    Feb 16  2017  /etc/profile.d/appmenu-qt5.sh
-rw-r--r--  root   root   580   Oct 18  2017  /etc/profile.d/apps-bin-path.sh
-rw-r--r--  root   root   663   May 18  2016  /etc/profile.d/bash_completion.sh
-rw-r--r--  root   root   1003  Dec 29  2015  /etc/profile.d/cedilla-portuguese.sh
-rwxr-xr-x  root   root   301   Feb 20  2013  /etc/profile.d/jdk.csh
-rwxr-xr-x  root   root   299   Feb 20  2013  /etc/profile.d/jdk.sh
-rw-r--r--  root   root   1941  Mar 16  2016  /etc/profile.d/vte-2.91.sh

real	0m0.760s
user	0m0.754s
sys 	0m0.020s
```

It takes `.76` seconds to run versus `.70` seconds for the regular `locate` command. The difference is negligible.

----------

## Bash script

The bash code is fairly straight forward. Copy the script below into the directory `/home/YOUR_NAME/bin` (you may have to create it first) or `/usr/local/bin` and mark it executable using:



``` bash
chmod a+x /home/YOUR_NAME/bin/llocate`
```

Here's the script `llocate`:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: llocate
# PATH: /mnt/e/bin
# DATE: May 22, 2018. Modified July 5, 2020.
# DESC: Use locate command but format output like `ll` with headings
# PARM: Parameter 1 = locate search string

# UPDT: 2018-07-01 Format date with Time or Previous Year like `ls -al`.
#       2018-11-09 Filenames trunctated after first space.
#       2020-07-05 Speed up processing. Handle permission denied.

if [[ $# -eq 0 ]]; then
    echo "First parameter must be full or partial file names to search for."
    exit 1
fi

tmpLine=$(locate "$1")

# Was anything found?
if [[ ${#tmpLine} -eq 0 ]] ; then
    echo "No files found. If files created today, did you run 'sudo updatedb' after?"
    exit 1
fi

LastRun=$(stat --printf=%y /var/lib/mlocate/mlocate.db | sed 's/\.[^\n]*//')

# Build output with columns separated by "|" for column command
tmpForm="ACCESS|OWNER|GROUP|SIZE|MODIFIED|NAME (updatdb last ran: $LastRun)"$'\n'

ThisYear=$(date +%Y)

while read -r Line; do

    StatLine=$(stat --printf='%A|%U|%G|%s|%Y|%N\n' "$Line" | sed "s/'//g")

    IFS="|" Arr=($StatLine)
    Seconds="${Arr[4]}"
    [[ $Seconds == "" ]] && continue    # Permission denied

    # Format date with time if it's this year, else use file's year
    if [[ $(date -d @$Seconds +'%Y') == "$ThisYear" ]]; then
        HumanDate=$(date -d @$Seconds +'%b %_d %H:%M')
    else
        HumanDate=$(date -d @$Seconds +'%b %_d  %Y')
    fi

    StatLine="${StatLine/$Seconds/$HumanDate}"
    tmpForm="$tmpForm$StatLine"$'\n'

done <<< "$tmpLine"                           # Read next locate line.

column -t -s '|' <<< "$tmpForm"

exit 0
```

  [1]: https://askubuntu.com/questions/1039220/sed-or-something-to-delete-everything-after-first-space-up-to

