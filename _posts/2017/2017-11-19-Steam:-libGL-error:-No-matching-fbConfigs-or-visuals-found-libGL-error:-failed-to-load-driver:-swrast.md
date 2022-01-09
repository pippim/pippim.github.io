---
layout:       post
title:        >
    Steam: libGL error: No matching fbConfigs or visuals found libGL error: failed to load driver: swrast
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/978112
type:         Answer
tags:         drivers nvidia steam yad
created_date: 2017-11-19 17:26:41
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "157,442 "
accepted:     
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    true
---

# Windows Subsystem for Linux (WSL) has same error

In Windows Subsystem for Linux (WSL) under Windows 10 there the file `/usr/lib/i386-linux-gnu/mesa/libGL.so.1` does not exist. Instead there is the file `/usr/lib/x86_64-linux-gnu/mesa/libGL.so.1` seems to replace it. However if you delete the replacement file the library doesn't work at all.

# Rename library then rename back solves problem

If you rename the file and then rename it back the errors disappear and it works a lot faster:

{% include copyHeader.html %}
``` 
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ lock-screen-timer
Linux version 4.4.0-43-Microsoft (Microsoft@Microsoft.com) (gcc version 5.4.0 (GCC) ) #1-Microsoft Wed Dec 31 14:42:53 PST 2014
libGL error: No matching fbConfigs or visuals found
libGL error: failed to load driver: swrast
Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged.
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ sudo ldconfig -p | grep -i gl.so
        libwayland-egl.so.1 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libwayland-egl.so.1
        libcogl.so.20 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libcogl.so.20
        libQt5OpenGL.so.5 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libQt5OpenGL.so.5
        libGL.so.1 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/mesa/libGL.so.1
        libEGL.so.1 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/mesa-egl/libEGL.so.1
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ sudo rm /usr/lib/i386-linux-gnu/mesa/libGL.so.1
rm: cannot remove '/usr/lib/i386-linux-gnu/mesa/libGL.so.1': No such file or directory
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ sudo mv /usr/lib/x86_64-linux-gnu/mesa/libGL.so.1 /usr/lib/x86_64-linux-gnu/mesa/libGL.so.1.ORIGINAL
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ lock-screen-timer
Linux version 4.4.0-43-Microsoft (Microsoft@Microsoft.com) (gcc version 5.4.0 (GCC) ) #1-Microsoft Wed Dec 31 14:42:53 PST 2014
/usr/bin/zenity: error while loading shared libraries: libGL.so.1: cannot open shared object file: No such file or directory
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ sudo mv /usr/lib/x86_64-linux-gnu/mesa/libGL.so.1.ORIGINAL /usr/lib/x86_64-linux-gnu/mesa/libGL.so.1
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$ lock-screen-timer
Linux version 4.4.0-43-Microsoft (Microsoft@Microsoft.com) (gcc version 5.4.0 (GCC) ) #1-Microsoft Wed Dec 31 14:42:53 PST 2014
Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged.
───────────────────────────────────────────────────────────────────────────────
rick@alien:/mnt/e/etc$

```

I verified the change is persistent, ie close the WSL terminal window and open a new window.

# What's using the library?

The library is used by `yad` in the [lock-screen-timer][1] bash script upgraded with hybrid support for WSL in addition to Ubuntu. Yad is a fork of `Zenity` which is why you see the Zenity-like `Gtk-Message:` reference in the third error message above.

Here's what the `yad` window looks like in Ubuntu (in WSL it's slightly different):

![Lock Screen Timer][2]

  [1]: {% post_url /2016/2016-10-14-Application-that-will-lock-screen-after-a-set-amount-of-time-for-Ubuntu %}
  [2]: https://i.stack.imgur.com/0jBz6.png
