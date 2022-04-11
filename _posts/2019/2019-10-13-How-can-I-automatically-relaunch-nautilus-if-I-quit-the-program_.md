---
layout:       post
title:        >
    How can I automatically relaunch nautilus if I quit the program?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180596
type:         Answer
tags:         nautilus automation
created_date: 2019-10-13 00:31:10
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "630 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-13-How-can-I-automatically-relaunch-nautilus-if-I-quit-the-program_.md
toc:          false
navigation:   false
clipboard:    true
---

### Update: October 16, 2019.

Thanks to gnome expert's answer on linked question below, a faster more stable method of relaunching Nautilus File Manager has been implemented.


----------


This turned out to be a [challenging problem][1] because Nautilus is always running to control the desktop. If you kill the program `nautilus` all your desktop icons will disappear. When nautilus is running and your desktop icons are present and you type `nautilus` in the terminal then the Nautilus File Manager appears.

Copy this script to a file called `~/ttlus`:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: ttlus (Twenty Thousand Loops Under Startup)
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1180043/how-can-i-automatically-relaunch-nautilus-if-i-quit-the-program
#       Call Nautilus, named after Twenty Thousand Leagues Under the Sea novel,
#       20,000 times in loop from Startup Applications
# DATE: October 10, 2019.  Modified October 16, 2019.

# NOTE: Things that don't work:
#       https://askubuntu.com/questions/965052/how-to-make-script-wait-for-nautilus-to-exit
#       https://ubuntuforums.org/showthread.php?t=1604843

# UPDT: Rpelace loop with occassional focus grabbing and unpredictable delays:
#    while ps -L -p "$PID" -o pid,nice,lwp,comm | grep pool > /dev/null ; do
#       with:
#    while gdbus introspect --session --dest org.gnome.Nautilus \ ... 3 lines

LoopLimit=20000
Program="nautilus"
#Program="/usr/bin/nautilus --gapplication-service"
PID=$(pgrep nautilus)
Sec=3

if [[ $PID == "" ]] ; then
    notify-send "ERROR in $0: Cannot find nautilus PID"
    exit
fi

for (( l=0; l<LoopLimit; l++ )) ; do
    # Is nautilus file manager running? 1 Window only is desktop icons
    while gdbus introspect --session --dest org.gnome.Nautilus \
        --object-path /org/gnome/Nautilus --recurse | \
        grep -q '^ *node /org/gnome/Nautilus/window/' | \
        grep -v '/window/1' ; do
            sleep "$Sec"
    done
    "$Program" "$HOME" 2> /dev/null
    sleep $(( Sec / 2 ))
done

notify-send "ERROR in $0: $Program exceeded $LoopLimit loop limit"
```

Make it executable with `chmod a+x ~/ttlus`

First test is by typing `~/ttlus &` in the terminal. After you are satisfied add it in [Startup Applications][2].

If program runs amok use:

``` bash
$ pgrep ttlus
7970

$ kill 7970
[1]+  Terminated              ttlus
## ```




**Notes:**

- Due to the `sleep "$Sec"` command after exiting Nautilus with <kbd>Alt</kbd>+<kbd>F4</kbd> or clicking <kbd>X</kbd> on window a three second delay (to reduce resource usage) will occur before Nautilus reappears on the desktop.

  [1]: https://unix.stackexchange.com/questions/546241/best-way-to-check-if-nautilus-file-manager-is-running
  [2]: {% post_url /2016/2016-09-19-How-can-I-display-text-from-a-file-automatically-after-powering-up-my-computer_-in-text-editor-or-terminal_ %}
