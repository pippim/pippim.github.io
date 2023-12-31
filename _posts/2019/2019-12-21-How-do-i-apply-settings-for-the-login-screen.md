---
layout:       post
title:        >
    How do i apply settings for the login screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1197757
type:         Answer
tags:         login keyboard-layout display-resolution users system-settings grub
created_date: 2019-12-21 20:50:53
edit_date:    2019-12-22 23:22:42
votes:        "1 "
favorites:    
views:        "4,769 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-21-How-do-i-apply-settings-for-the-login-screen.md
toc:          false
navigation:   false
clipboard:    false
---

The elusive login screen settings you were searching for are stored here:

``` 
/usr/share/glib-2.0/schemas/org.gnome.desktop.peripherals.gschema.xml
```

The reason you can't change login screen settings for keyboard and mouse is explained in a bug report:

> The login screen runs as user 'gdm' which is not privileged. That  
> means it has no access to retrieve your personal settings until after  
> you have entered a password. So it uses the system defaults.  

You should subscribe to the [bug report][1]. The bug was filed June 28, 2018 but only has one subscriber as of December 21, 2019.


----------

# Setting Grub resolution

The key to changing your login screen resolution is changing grub's resolution:

- [How to change the login screen resolution in Ubuntu 18.04](How to change the login screen resolution in Ubuntu 18.04)

To summarize the link, in `/etc/default/grub`:

> Use the down arrow or Page Down until you see the line that looks like  
> this:  
>   
>     #GRUB_GFXMODE=640x480  
>   
> Below that line, enter the following, substituting the 1920x1080 for a  
> supported resolution:  
>   
>     GRUB_GFXMODE=1920x1080  
>     GRUB_GFXPAYLOAD_LINUX=keep  


----------

# Setting default keyboard layout

To set the default keyboard layout change `/etc/default/keyboard` as described here:

- [How do I change the login manager&#39;s keyboard layout?](How do I change the login manager&#39;s keyboard layout?)


  [1]: https://bugs.launchpad.net/ubuntu/+source/gnome-shell/+bug/1779096
