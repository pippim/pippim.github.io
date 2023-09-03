---
layout:       post
title:        >
    Shell Script : Focus already open terminal tab from second terminal tab
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1135206
type:         Answer
tags:         command-line scripts gnome-terminal
created_date: 2019-04-19 12:18:51
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "3,037 "
accepted:     
uploaded:     2023-09-03 11:16:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-19-Shell-Script-_-Focus-already-open-terminal-tab-from-second-terminal-tab.md
toc:          false
navigation:   false
clipboard:    false
---

# Manual Method



As per this Q&A: [Is there a hotkey to switch between tabs in the default terminal app?](Is there a hotkey to switch between tabs in the default terminal app?)

After opening the new tab you can return to the previous tab with <kbd>Ctrl</kbd> + <kbd>pg up</kbd>

# Automated Method within script

In order to send the signal to Bash Shell (gnome-terminal) use 
`xdotool`:

``` bash
sudo apt install xdotool
```

In your script issue this command:

``` bash
xdotool key Control+Page_Up
```

I've just finished installing and testing on Ubuntu 16.04 LTS and it works perfectly. It should work on all X11 desktops.


----------


# More conventional method

OP desires Wayland support and more importantly a POSIX method that works with many *NIX distributions.

From this Q&A:

- [Script to open terminal and show the output of the running commands](Script to open terminal and show the output of the running commands)s 

... comes this command:

``` bash
gnome-terminal -e 'bash -c "sudo apt-get update && sudo apt-get upgrade && sudo apt-get dist-upgrade; exec bash"'
```

We will modify the example command to look like this:

``` bash
gnome-terminal -e 'bash -c "second-script.sh; exec bash"'
```

This is what `second-script.sh` looks like:

``` bash
#!/bin/bash

# AU question: https://askubuntu.com/questions/1134625/shell-script-focus-already-open-terminal-tab-from-second-terminal-tab/1135206#1135209

echo "Welcome to the second script."
echo " Run command 1."
sleep 1
echo " Run command 2."
sleep 1
read -n 1 -s -r -p "Press any key to continue"

touch /tmp/second-script-user-ack # signal parent to continue commands there
echo " Run command 3."
sleep 5
echo " Run command 4."
sleep 5

# Now terminates.
exit 0
```

Always remember to marks scripts executable using:

``` bash
chmod a+x second-script.sh
```

**Note:** This opens a second terminal window that stays open until user closes it. This can be changed to auto-close.

Our first (Parent) script will look like this:

``` bash
#!/bin/bash

# AU question: https://askubuntu.com/questions/1134625/shell-script-focus-already-open-terminal-tab-from-second-terminal-tab/1135206#1135209

file=/tmp/second-script-user-ack
if [ -f $file ] ; then
    rm $file
fi

window=$(xdotool getactivewindow)
# Launch second script running in background, don't wait
gnome-terminal -e 'bash -c "second-script.sh; exec bash"' &&

while true ; do
    if [ -f $file ] ; then
        break
    fi
done

xdotool windowactivate $window

echo "Child still running. Ready to run extra Parent Commands"
read -n 1 -s -r -p "Press any key to continue"
echo
echo " Parent Command 1."
sleep 5
echo " Parent Command 2."
sleep 5

echo "Parent program completed"
read -n 1 -s -r -p "Press any key to continue"

exit 0
```

Advantages of current approach:

- You can see both windows running at same time. With second tab you can't see both scripts output.
- After child process (`second-script.sh`) completes output is still visible until window is closed.


----------

# Wayland tools

There aren't many Wayland tools to control active windows.

I did find this: [ydotool][1] but you'll need to compile it by hand. There is no Debian/Ubuntu installation package. There is an Arch Linux installation package which some of your users can use.


  [1]: https://github.com/ReimuNotMoe/ydotool
