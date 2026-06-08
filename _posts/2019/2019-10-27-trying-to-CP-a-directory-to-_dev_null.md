---
layout:       post
title:        >
    trying to CP a directory to /dev/null
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184105
type:         Answer
tags:         command-line cp
created_date: 2019-10-27 02:46:51
edit_date:    2019-10-28 23:52:54
votes:        "2 "
favorites:    
views:        "11,511 "
accepted:     
uploaded:     2026-06-08 06:28:40
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-27-trying-to-CP-a-directory-to-_dev_null.md
toc:          false
navigation:   false
clipboard:    false
---

## Use `cat` instead of `cp`



Instead of using `cp` to read every file, you can use the `cat` command.

The screen below illustrates `catall.sh` bash script. The first section shows results for a short run (40 minutes!) on `/home/rick/`. The second section shows in progress display on `/`:

[![catall progress display.gif][1]][1]

On my system there are many partitions (including two full Windows 10 installations) where all the files are being read.

## `catall.sh` bash script

The bash script must be called with `sudo` powers because there are files in Linux a regular user cannot read. Additionally you must pass a parameter to the starting location to begin reading files, eg `/` or `/mnt/ext_drive`, etc. :

``` bash
#!/bin/bash

# NAME: catall.sh (cat every single file)
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1184103/trying-to-cp-a-directory-to-dev-null/1184105#1184105
# DATE: October 27, 2019.

[[ $(id -u) != 0 ]] && { echo "Must be called with sudo" >&2 ; exit 2 ; }
[[ $1 != /* ]] && { echo "Parameter 1 must be a path" >&2 ; exit 3 ; }


DirCnt=0    # Directory count
FileCnt=0   # File
LinkCnt=0   # Symbolic Link
BdevCnt=0   # Block Device
CdevCnt=0   # Character Device
PipeCnt=0   # Pipe
SockCnt=0   # Socket
ZeroCnt=0   # Zero sized files count
SkipCnt=0   # Files skipped

updatedb    # Update locate's database for files added today
StartSec=$SECONDS
    
while read File ; do
    if [[ ! -e "$File" ]] ; then : # File no longer exists, stale database
    elif [[ -d "$File" ]] ; then (( DirCnt++ ))
    elif [[ -h "$File" ]] ; then (( LinkCnt++ ))
    elif [[ -b "$File" ]] ; then (( BdevCnt++ ))
    elif [[ -b "$File" ]] ; then (( CdevCnt++ ))
    elif [[ -c "$File" ]] ; then (( CdevCnt++ ))
    elif [[ -p "$File" ]] ; then (( PipeCnt++ ))
    elif [[ -S "$File" ]] ; then (( SockCnt++ ))
    # elif [[ $File == /mnt/* ]] ; then (( SkipCnt ++ ))
    elif [[ -s "$File" ]] ; then
        cat "$File" 1>/dev/null
        (( FileCnt++ ))
    else
        (( ZeroCnt++ ))
    fi
    printf "Number of Directories: %'d Files: %'d \r" "$DirCnt" "$FileCnt"
done <<<"$(locate "$1")"

echo # Line feed to keep statistics visible when job ends
printf "Number of Sybolic Links: %'d\n"     "$LinkCnt"
printf "Number of Block Devices: %'d\n"     "$BdevCnt"
printf "Number of Character Devices: %'d\n" "$CdevCnt"
printf "Number of Pipes: %'d\n"             "$PipeCnt"
printf "Number of Sockets: %'d\n"           "$SockCnt"
printf "Number of Zero sized files: %'d\n"  "$ZeroCnt"
# printf "Number of Skipped files: %'d\n"     "$SkipCnt"
echo
EndSec=$SECONDS
TotalSec=$(( EndSec - StartSec ))
printf "Total Seconds: %'d\n"               "$TotalSec"
```

Two lines are commented out for skipping specific directories:

``` bash
    # elif [[ $File == /mnt/* ]] ; then (( SkipCnt ++ ))
# printf "Number of Skipped files: %'d\n"     "$SkipCnt"
```

Remove the comment tag (`#`) and change `/mnt/*` to the directory you wish to skip to save time. In my case `/mnt/` represents over a million files in Windows and other Ubuntu installations on different partitions.


----------

## Speed of `cat` is terrible

The final results were:

``` bash
$ sudo ./catall.sh /

Number of Directories: 378,571 Files: 1,741,640 
Number of Sybolic Links: 92,011
Number of Block Devices: 25
Number of Character Devices: 55
Number of Pipes: 48
Number of Sockets: 138
Number of Zero sized files: 210,515

Total Seconds: 82,554
```

The process took 23 hours or almost a full day!

Much better speed can be achieved with `dd` even though a full partition is read including spaces where no files exist:

``` bash
$ time sudo dd if=/dev/nvme0n1p4 of=/dev/null bs=100M
3719+1 records in
3719+1 records out
389969573888 bytes (390 GB, 363 GiB) copied, 249.867 s, 1.6 GB/s

real	4m9.896s
user	0m0.017s
sys 	2m38.305s
## ```



## Why use `sudo` with `catall.sh` script?

This example illustrates why `sudo` is required:

``` bash
$ locate udev.log.1.gz
/mnt/clone/var/log/upstart/udev.log.1.gz
/var/log/upstart/udev.log.1.gz

$ cat /var/log/upstart/udev.log.1.gz | wc
cat: /var/log/upstart/udev.log.1.gz: Permission denied
      0       0       0

$ sudo cat /var/log/upstart/udev.log.1.gz | wc
      0       1      82
```

  [1]: https://pippim.github.io/assets/img/posts/2019/LSrOM.gif


