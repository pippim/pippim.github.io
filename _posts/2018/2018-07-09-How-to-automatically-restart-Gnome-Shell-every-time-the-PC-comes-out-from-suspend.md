---
layout:       post
title:        >
    How to automatically restart Gnome Shell every time the PC comes out from suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1053376
type:         Answer
tags:         gnome suspend gnome-shell
created_date: 2018-07-09 01:51:13
edit_date:    
votes:        "2 "
favorites:    
views:        "2,042 "
accepted:     
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-09-How-to-automatically-restart-Gnome-Shell-every-time-the-PC-comes-out-from-suspend.md
toc:          false
navigation:   false
clipboard:    false
---

Change your script from this:



``` bash
case "${1}" in
    post)
         gnome-shell --replace
;;
esac
```

To this:

``` bash
#!/bin/sh

case $1/$2 in
  pre/*)
    echo "Going to $2..."
    # Place your pre suspend commands here, or `exit 0`
    # if no pre suspend action required
    sleep 1
    ;;
  post/*)
    echo "Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` 
    # if no post suspend action required
    sleep 2
    gnome-shell --replace
    ;;
esac
```

For sure you are missing `#!/bin/sh` at the top of your script. Most of the rest of the proposed changes are not be necessary but informative.
