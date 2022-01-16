---
layout:       post
title:        >
    New message when rebooting from login screen: Authentication is required for rebooting the system while an application asked to inhibit it
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187756
type:         Answer
tags:         login reboot authentication
created_date: 2019-11-10 16:30:42
edit_date:    2019-11-10 16:37:20
votes:        "2 "
favorites:    
views:        "2,563 "
accepted:     
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-10-New-message-when-rebooting-from-login-screen:-Authentication-is-required-for-rebooting-the-system-while-an-application-asked-to-inhibit-it.md
toc:          false
navigation:   false
clipboard:    true
---

You can get a list of all systemd inhibitors with this:

{% include copyHeader.html %}
``` 
$ systemd-inhibit --list

     Who: rick (UID 1000/rick, PID 2358/unity-settings-)
    What: sleep
     Why: GNOME needs to lock the screen
    Mode: delay

     Who: rick (UID 1000/rick, PID 2358/unity-settings-)
    What: handle-power-key:handle-suspend-key:handle-hibernate-key
     Why: GNOME handling keypresses
    Mode: block

     Who: NetworkManager (UID 0/root, PID 1189/NetworkManager)
    What: sleep
     Why: NetworkManager needs to turn off networks
    Mode: delay

     Who: Unattended Upgrades Shutdown (UID 0/root, PID 1372/unattended-upgr)
    What: shutdown
     Why: Stop ongoing upgrades or perform upgrades before shutdown
    Mode: delay

     Who: rick (UID 1000/rick, PID 2358/unity-settings-)
    What: handle-lid-switch
     Why: Multiple displays attached
    Mode: block

5 inhibitors listed.
```

However the list doesn't change after you open a file for editing for example. You can use this instead:

``` 
$ dbus-send --print-reply --dest=org.gnome.SessionManager /org/gnome/SessionManager org.gnome.SessionManager.GetInhibitors

method return time=1573403207.555584 sender=:1.49 -> destination=:1.1853 serial=7743 reply_serial=2
   array [
   ]

$ gedit temp &

# Now type some text into gedit but don't save the file

$ dbus-send --print-reply --dest=org.gnome.SessionManager /org/gnome/SessionManager org.gnome.SessionManager.GetInhibitors

method return time=1573403241.678869 sender=:1.49 -> destination=:1.1855 serial=7747 reply_serial=2
   array [
      object path "/org/gnome/SessionManager/Inhibitor1727"
   ]
```

In the first instance there are no inhibitor locks. We edit a file in gedit and in the second instance a lock exists. However it doesn't actually tell us the name `gedit`.
