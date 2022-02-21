---
layout:       post
title:        >
    How can I include the cursor in the screenshots created when PrtScr is pressed?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1146146
type:         Answer
tags:         19.04 screenshot gnome-screenshot yad
created_date: 2019-05-25 14:56:20
edit_date:    2019-05-31 22:29:54
votes:        "17 "
favorites:    
views:        "1,735 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-25-How-can-I-include-the-cursor-in-the-screenshots-created-when-PrtScr-is-pressed_.md
toc:          false
navigation:   false
clipboard:    false
---

You can do this with [dconf-editor][1] but with command line as well. Here are the `gsettings` effecting `gnome-screenshot`:

[![gnome-screenshot gsettings.png][2]][2]

Use this command to check current settings:

``` 
gsettings get org.gnome.gnome-screenshot include-pointer
false
```

Use this command to turn on the option:

``` 
gsettings set org.gnome.gnome-screenshot include-pointer true
```

Use the same technique for the other `gnome-screenshot` settings.


----------

Note you can get a list of all settings with `gsettings list-recursively`. For the screenshot above I used the technique in this answer:

- [Bash one-liner to display ALL `gsettings` in GUI dialog window]({% post_url /2018/2018-03-18-Bash-one-liner-to-display-ALL-_gsettings_-in-GUI-dialog-window %})

And the one-liner code (works with `yad` only) is:

``` 
gsettings list-recursively | sed 's/  */\n/;s/  */\n/;s/\&/\&amp;/g' | yad --list --title "gsettings" --item-seperator='\n' --width=1800 --height=800 --wrap-width=600 --column=Group --column=Key --column=Setting --no-markup
```

  [1]: https://www.linuxhelp.com/how-to-install-dconf-editor-on-ubuntu-18-04
  [2]: https://i.stack.imgur.com/ygMnZ.png
