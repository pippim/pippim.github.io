---
layout:       post
title:        >
    What if I accidentally run command "chmod -R" on system directories (/, /etc, ...)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1255242
type:         Answer
tags:         permissions sudo chmod
created_date: 2020-07-01 01:48:53
edit_date:    
votes:        "2 "
favorites:    
views:        "63,324 "
accepted:     
uploaded:     2024-12-22 11:32:00
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-07-01-What-if-I-accidentally-run-command-_chmod-R_-on-system-directories-___-_etc_-..._.md
toc:          false
navigation:   false
clipboard:    false
---

There is a closed question (with a great answer) as duplicate of this one from:

- [Set myself as owner of /etc with chown command now getting all kinds of errors](Set myself as owner of /etc with chown command now getting all kinds of errors)

As such I will give [Terdon][1] the credit but here is my own answer based his.

During development of a new script, the variable  `$TMP_DIRECTORY/` had unexpected result of `/`. This was followed by `chmod 700` and `chown -R $UDO_USER` pointing to `$TMP_DIRECTORY` which was really `/`.

System slowly crashed and burned. After that it would not reboot. Everyone screams "YOU MUST REINSTALL" but that means loosing years of work. This script is a variation of Terdon's answer:



``` bash
#!/bin/bash

if [[ $(id -u) != 0 ]]; then # root powers needed to call this script
    echo >&2 "$0 must be called with sudo powers"
    exit 1
fi

# Parameters blank?
[[ $1 == "" ]] && echo "Parm 1 must be source directory" && exit 1
[[ $2 == "" ]] && echo "Parm 2 must be target directory" && exit 1

# Parameters valid directories?
[[ ! -d "$1" ]] && echo "Parm 1 must be a directory" && exit 1
[[ ! -d "$2" ]] && echo "Parm 2 must be a directory" && exit 1
# [[ ! "$2" == "/mnt/"* ]] && echo "Parm 2 must start with /mnt/..." && exit 1

# shopt -s globstar     # From original
shopt -s dotglob
liveSystem="$1"
deadSystem="$2"

# Parameters must end in same subdirectory
[[ "${liveSystem##*/}" != "${deadSystem##*/}" ]] && \
    echo "subdirectory ${liveSystem##*/} not same as ${deadSystem##*/}" && \
    exit 1

cd "$deadsystem"
Count=0
NoRef=0
one() {
    path="$1"
    MountlessPath="${path##*$deadSystem/}"
    if [ -e "$liveSystem/$MountlessPath" ] ; then
        echo chown --reference "$liveSystem/$MountlessPath" "$path"
        echo chmod --reference "$liveSystem/$MountlessPath" "$path"
        (( Count++ ))
    else
        echo "No reference for: $path"
        (( NoRef++ ))
    fi
}

# From: https://stackoverflow.com/questions/51654041/loop-through-all-files-in-a-directory-and-subdirectories-using-bash
# Note typo "If" instead of "if" in above link
recurse() {
  path="$1"
  if [ -d "$path" ] ; then
#     echo "Path: $path"
     one "$path"            # Enhancement: chown of directories too
     for i in "$path/"* # "$path/."* # Enhancement: do hidden directories
     do
        # Skip over .. which gives endless loop
        [[ "$path" == *".cache/speech-dispatcher"* ]] && continue
        [[ "$path" == *"/usr/bin/X11"* ]] && continue
        BaseName=${path##*/}
        [[ "${#BaseName}" -gt 300 ]] && continue
#        [[ ${#BaseName[@]} -gt 1 ]] && continue
#        echo BaseName: $BaseName
#        [[ $BaseName == ".." || $BaseName == "*" ]] && continue
        recurse "$i"
     done
# Original code selected only files but we want links too
#  elif [ -f "$path" ] ; then
  else
    [ ! -f "$path" ] && printf "Not a file -> "
    one "$path"
  fi
}

recurse "$deadSystem"

echo "========================================================================"
echo "$Count references found for chown command to process"
echo "$NoRef files, directories and links, etc. could not be processed"
# From: https://unix.stackexchange.com/questions/193368/can-scp-create-a-directory-if-it-doesnt-exist/193372?noredirect=1#comment1111576_193372
# Original didn't have much luck?
#for file in **/*; do 
#    [ -e "$liveSystem/$file" ] &&
#        echo sudo chown --reference "$liveSystem/$file" "$file"
#done
```

When running the script with `$ sudo reset-owner /mnt/old/var /var | grep "No reference"` the tail end says this:

``` bash
Not a file -> No reference for: /var/tmp/systemd-private-fdbc599820b645f4a461404675af3b5d-rtkit-daemon.service-jvV8tG/tmp/*
No reference for: /var/tmp/systemd-private-fdbc599820b645f4a461404675af3b5d-systemd-timesyncd.service-vmgqTh
No reference for: /var/tmp/systemd-private-fdbc599820b645f4a461404675af3b5d-systemd-timesyncd.service-vmgqTh/tmp
Not a file -> No reference for: /var/tmp/systemd-private-fdbc599820b645f4a461404675af3b5d-systemd-timesyncd.service-vmgqTh/tmp/*
No reference for: /var/tmp/uefi.dat
No reference for: /var/tmp/uefi.dsl
========================================================================
12369 references found for chown command to process
7676 files, directories and links, etc. could not be processed
```

As daunting as it seems it only took an hour to work it all out. By the time I was done I was left with this:

``` bash
$ sudo reset-owner /mnt/old/var /var | grep "No reference" | grep -v /var/tmp/ | grep -v /var/spool/ | grep -v '\/\*' | grep -v /var/run | grep -v /unattended | grep -v /upstart | grep -v /log/journal | grep -v /log/pm | grep -v /log/cron | grep -v /log/dpkg | grep -v /log/apt | grep -v /log/altern | grep -v /lib/u | grep -v /lib/systemd | grep -v /lib/snapd | grep -v /lib/shim | grep -v /lib/NetworkManager | grep -v /lib/lightdm | grep -v /lib/initram | grep -v /lib/dpkg | grep -v /lib/doc-base | grep -v /var/lib/dkms | grep -v /lib/blue | grep -v /lib/binfmts | grep -v /lib/apt | grep -v /lib/app-info | grep -v /lib/Accounts | grep -v /var/crash | grep -v /var/cache
No reference for: /var
No reference for: /var/lib/flashplugin-installer
No reference for: /var/lib/gems
No reference for: /var/lib/gems/2.3.0
No reference for: /var/lib/git
No reference for: /var/lib/tlp/rfkill-saved
```





  [1]: https://askubuntu.com/users/85695/terdon
