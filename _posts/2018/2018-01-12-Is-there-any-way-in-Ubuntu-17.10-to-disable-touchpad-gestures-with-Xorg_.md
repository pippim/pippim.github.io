---
layout:       post
title:        >
    Is there any way in Ubuntu 17.10 to disable touchpad gestures with Xorg?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/994978
type:         Answer
tags:         xorg touchpad 17.10 logitech
created_date: 2018-01-12 01:17:19
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "2,180 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-12-Is-there-any-way-in-Ubuntu-17.10-to-disable-touchpad-gestures-with-Xorg_.md
toc:          false
navigation:   false
clipboard:    false
---

# Ubuntu 17.10 uses Wayland

From the [libinput][1] wiki page:

> libinput is a library to handle input devices in Wayland compositors and to provide a generic X.Org input driver. It provides  
> device detection, device handling, input device event processing and  
> abstraction so minimize the amount of custom input code compositors  
> need to provide the common set of functionality that users expect.  

# `libinput` and `synaptics` can be both be installed

If you have libinput and synaptics installed in parallel with default configuration (i.e. no files in `/etc/X11/xorg.conf.d` for either), synaptics will take precedence due to its higher numeric order `70-` in the default installation directory. To avoid this, you can symlink the default libinput configuration (`40-libinput.conf`) to `/etc/X11/xorg.conf.d/` where directory search order precedence over `70-synaptics.conf` will take place instead:

``` 
$ sudo ln -s /usr/share/X11/xorg.conf.d/40-libinput.conf /etc/X11/xorg.conf.d/40-libinput.conf
```

If you do have `/etc/X11/xorg.conf.d/` configuration files for both, the libinput file must be ordered second. If you want to disable libinput (and fallback to older drivers) - just remove the previously created symbolic link from `/etc/X11/xorg.conf.d/`.

# Check what `libinput` is managing

One way to check which devices are managed by libinput is the xorg logfile. For example, the following:

``` 
$ grep -e "Using input driver 'libinput'" /path/to/Xorg.0.log

[    28.799] (II) Using input driver 'libinput' for 'Power Button'
[    28.847] (II) Using input driver 'libinput' for 'Video Bus'
[    28.853] (II) Using input driver 'libinput' for 'Power Button'
[    28.860] (II) Using input driver 'libinput' for 'Sleep Button'
[    28.872] (II) Using input driver 'libinput' for 'AT Translated Set 2 keyboard'
[    28.878] (II) Using input driver 'libinput' for 'SynPS/2 Synaptics TouchPad'
[    28.886] (II) Using input driver 'libinput' for 'TPPS/2 IBM TrackPoint'
[    28.895] (II) Using input driver 'libinput' for 'ThinkPad Extra Buttons'
```

is a notebook without any configuration files in `/etc/X11/xorg.conf.d/`, i.e. devices are autodetected.

# Choose `synaptics` driver over `lipinput` for one device

Of course you can elect to use an alternative driver for one device and libinput for others. A number of factors may influence which driver to use. For example, in comparison to Touchpad Synaptics the libinput driver has fewer options to customize touchpad behaviour to one's own taste, but far more programmatic logic to process multitouch events (e.g. palm detection as well). Hence, it makes sense to try the alternative, if you are experiencing problems on your hardware with one driver or the other. 

### Reference

Answer from [ArchLinux Wiki][2] which has many more details.


  [1]: https://freedesktop.org/wiki/Software/libinput/
  [2]: https://wiki.archlinux.org/index.php/Libinput
