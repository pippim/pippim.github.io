---
layout:       post
title:        >
    Bash one-liner to display ALL `gsettings` in GUI dialog window
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1017046
type:         Answer
tags:         gnome bash gsettings zenity yad
created_date: 2018-03-18 17:08:46
edit_date:    2018-03-19 11:09:46
votes:        "2 "
favorites:    
views:        "1,129 "
accepted:     Accepted
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    false
---

# Yad works but not Zenity (yet)



I tried doing this with `zenity` but couldn't figure it out. I managed to make it work with `yad` but after a couple of clock days had to turn to google groups to get help from the yad experts. They fixed my one-liner bash code in 12 hours!

If you don't have `yad` installed already you need to use:

``` bash
sudo apt install yad

```

`yad` lets you sort the list by any column in ascending/descending order. You can grab the scroll bar to quickly move up and down the list. The Up/Down arrow, <kbd>PgUp</kbd>, <kbd>PgDn</kbd>, <kbd>Home</kbd> and <kbd>End</kbd> keys navigate as expected.

# The one-liner bash code

Here's the bash one-liner code you can copy and paste into your terminal window:

``` bash
gsettings list-recursively | sed 's/  */\n/;s/  */\n/;s/\&/\&amp;/g' | yad --list --title "gsettings" --item-seperator='\n' --width=1800 --height=800 --wrap-width=600 --column=Group --column=Key --column=Setting --no-markup

```

This is for a 1080p display where the screen is 1920 pixels wide. If your screen is smaller, reduce the size of these arguments:

``` bash
--width=1800 --height=800 --wrap-width=600

```

# Sample output

When the `yad` scroll box opened I:

- Clicked on the `Group` column heading to sort by group. Otherwise the order is random as `gsettings list-recursively` dumps out the database.
- Scrolled down `org.gnome.settings-daemon.plugins.power` section.
- Noticed a `gsettings` I've never seen before but might help me solve suspend problems I've encountered (as highlighted in screen shot below)

[![yad gsettings.png][1]][1]

# The one-liner pays for itself right away

Here is the new `gsettings` I discovered:

``` bash
$ gsettings get org.gnome.settings-daemon.plugins.power lid-close-suspend-with-external-monitor
false

```

The `gsettings` contradicts a `systemd` setting I have:

``` bash
$ cat /etc/systemd/logind.conf | grep -i lidswitchdock | grep -vF "#"
HandleLidSwitchDocked=suspend

```

# dconf-editor a complete GUI application

There is also `dconf-editor` a full blown GUI you can use: [What is dconf, what is its function, and how do I use it?][3]

To summarize the link, install it using:

``` bash
sudo apt install dconf-tools

```

The whole link is highly recommended reading and it covers `gsettings` in depth as well.

  [1]: https://i.stack.imgur.com/c4Bfp.png
  [2]: https://askubuntu.com/questions/828486/systemd-suspends-system-but-upon-resume-kernel-then-enters-sleep-and-wake-up
  [3]: https://askubuntu.com/questions/22313/what-is-dconf-what-is-its-function-and-how-do-i-use-it
