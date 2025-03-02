---
layout:       post
title:        >
    New message when rebooting from login screen: Authentication is required for rebooting the system while an application asked to inhibit it
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187756
type:         Answer
tags:         login reboot authentication
created_date: 2019-11-10 16:30:42
edit_date:    2024-05-27 04:36:02
votes:        "7 "
favorites:    
views:        "9,346 "
accepted:     
uploaded:     2025-03-02 16:33:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-10-New-message-when-rebooting-from-login-screen_-Authentication-is-required-for-rebooting-the-system-while-an-application-asked-to-inhibit-it.md
toc:          false
navigation:   false
clipboard:    false
---

You can get a list of all systemd inhibitors with this:

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

However the list isn't dynamic. For example, the list doesn't change when you open a file for editing. Editing a file will inhibit rebooting.

This is how you can see inhibits due to files that need saving:

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

In the first `dbus` command there are no inhibitor locks. Then `gedit` is used to modify a new file. In the second `dbus` command an inhibitor exists.
