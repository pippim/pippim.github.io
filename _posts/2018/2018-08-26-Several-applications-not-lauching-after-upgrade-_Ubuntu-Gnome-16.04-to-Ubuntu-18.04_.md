---
layout:       post
title:        >
    Several applications not lauching after upgrade (Ubuntu-Gnome 16.04 to Ubuntu 18.04)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069124
type:         Answer
tags:         gnome 18.04 synaptic dbus 0ad
created_date: 2018-08-26 15:13:32
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "1,413 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-26-Several-applications-not-lauching-after-upgrade-_Ubuntu-Gnome-16.04-to-Ubuntu-18.04_.md
toc:          false
navigation:   false
clipboard:    false
---

# Steam gaming bug

You appear to be affected by this bug reported on Github:

- [Arguments to dbus_message_new_method_call() were incorrect #5103][1]

which has been closed as a duplicate of this bug:

- [Thread synchronization object is unusable on Fedora 26 #5101][2]

and summarized in this bug:

- [Steam Client's SDL broken by XMODIFIERS #5201][3]

You should read all bug reports from top to bottom but to summarize a couple of solutions.

## Work-around from first link

> A workaround is to opt-out the beta and to restart the client:  

``` 
mv ${HOME}/.local/share/Steam/package/beta ${HOME}/.local/share/Steam/package/beta.disabled
```

## Work-around from second link

> The dbus_message_new_method_call() message is non-fatal and the  

``` 
ln -s ${HOME}/.local/share/Steam/ubuntu12_32/steam-runtime/i386/lib/i386-linux-gnu/libdbus-1.so.3 ${HOME}/.local/share/Steam/ubuntu12_32/steam-runtime/pinned_libs_32/libdbus-1.so.3
```

> workaround from #5099 gets the steam client to start.  

----------

# Related bug you may or may not encounter

In the future you may also find yourself affected by this gaming bug: [D-Bus bug in 18.04 i386 SDL: arguments to dbus_message_new_method_call() were incorrect, assertion "path != NULL" failed][4]

If so click on the link and subscribe to the bug. The more people reporting being affected by the bug the sooner it will be fixed.

In the meantime there are work-arounds posted by other users you can try.


  [1]: https://github.com/ValveSoftware/steam-for-linux/issues/5103
  [2]: https://github.com/ValveSoftware/steam-for-linux/issues/5101
  [3]: https://github.com/ValveSoftware/steam-for-linux/issues/5201
  [4]: https://bugs.launchpad.net/ubuntu/+source/libsdl2/+bug/1775067
