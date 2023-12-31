---
layout:       post
title:        >
    Ubuntu script that runs commands after su - user
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182437
type:         Answer
tags:         command-line gnome scripts gnome-shell su
created_date: 2019-10-20 15:44:12
edit_date:    
votes:        "1 "
favorites:    
views:        "608 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-Ubuntu-script-that-runs-commands-after-su-user.md
toc:          false
navigation:   false
clipboard:    false
---

When my regular user desktop needs to run a script requiring `sudo` I create an entry like this:

[![eyesome desktop entry.png][1]][1]

Then I write a wrapper script within the path to elevate to `sudo` level:

``` 
$ cat /usr/local/bin/eyesome-cfg-desktop-wrapper.sh

#!/bin/bash

# NAME: eyesome-cfg-desktop-wrapper.sh
# PATH: /usr/local/bin
# DESC: Wrapper script to call `eyesome-cfg.sh`
# DATE: Sep 24, 2018. Modified June 6, 2019

# NOTE: Designed to be called from ~/Desktop/eyesome-cfg.desktop

# UPDT: 2019-06-06 Name change to reflect wrapper script.

PROGNAME="eyesome-cfg.sh"

tty -s;
if [[ "0" == "$?" ]]; then
    echo "$PROGNAME cannot be called from background process."
    exit 1
fi

if [[ $EUID != 0 ]]; then

    # Get sudo password
    Password=$(zenity --password --title="Password for $PROGNAME")
    encryptPassword=$(echo -n "$Password" | md5sum)

    # After viewing encrypted password once, comment out line below.
    # echo "md5sum: $encryptPassword" 

    # Set value in quotes below to encryped password revealed above.
    if [[ "$encryptPassword" != "005e160c7bcfacf3d818d66e5856d75a  -" ]]; then
        echo "Invalid password!"
        exit 1
    fi

fi # non-terminals can't enter password.

# Call eyesome-cfg.sh with any parameters passed to this wrapper sript
if [[ $EUID == 0 ]]; then
    sudo "$PROGNAME" "$@" # Already running as sudo.
else
    echo $Password | sudo -S "$PROGNAME" "$@"
fi

exit 0
```

Note the first time you run the script remove the comment (`#`) on this line:

``` 
    # echo "md5sum: $encryptPassword" 
```

Then the script will display your encrypted password. Take that encrypted password and enter it a couple lines below:

``` 
    if [[ "$encryptPassword" != "005e160c7bcfacf3d818d66e5856d75a  -" ]]; then
```

Of course this is all optional and you can skip encryption and have your password coded into the script in regular text for anyone to read. But I wouldn't do that...

  [1]: https://i.stack.imgur.com/hg5Knl.png
