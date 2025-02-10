---
layout:       post
title:        >
    Gnome3: How to disable "Shutdown" button
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195779
type:         Answer
tags:         18.04 gnome shutdown
created_date: 2019-12-13 00:38:18
edit_date:    2019-12-16 15:19:43
votes:        "2 "
favorites:    
views:        "9,718 "
accepted:     
uploaded:     2025-02-10 14:32:12
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-13-Gnome3_-How-to-disable-_Shutdown_-button.md
toc:          false
navigation:   false
clipboard:    false
---

You can use this extension to [hide the shutdown button][1].

[![hide shutdown button.png][2]][2]

----------


This [article][3] describes how to disable shutdown and reboot:

> Certain Linux distros such as Ubuntu, Linux Mint, Mandriva just to  
> mention but a few, make it possible to reboot/halt/shutdown the system  
> as a normal user, by default. This is not ideal setting especially on  
> servers, it must be something to worry about especially for a system  
> administrator.  

Here are a summary of steps in article:

- Edit `/etc/sudoers` to disable shutdown.
- Use `chmod o-x /sbin/shutdown` and `chmod o-x /sbin/reboot` to deny permissions.
- For systemd based systems (probably most today) use: `chmod  o-x /bin/systemctl` which `/sbin/shutdown` and the rest have symbolic links to.

I don't know how to change the GUI to remove the "Shutdown" button but you can tell the users not to press it and if they do nothing will happen.


  [1]: https://extensions.gnome.org/extension/1346/hide-shutdown-button/
  [2]: https://pippim.github.io/assets/img/posts/2019/QsrN8.png
  [3]: https://www.tecmint.com/disable-shutdown-and-reboot-commands-in-linux/
