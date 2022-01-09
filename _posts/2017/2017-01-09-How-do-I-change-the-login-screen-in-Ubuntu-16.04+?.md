---
layout:       post
title:        >
    How do I change the login screen in Ubuntu 16.04+?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/869692
type:         Answer
tags:         themes login-screen
created_date: 2017-01-09 04:44:26
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "105,671 "
accepted:     
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

To change the login screen in Ubuntu 16.04 I used the following:

``` 
gksu gedit /usr/share/glib-2.0/schemas/10_unity_greeter_background.gschema.override

```

Insert these lines:

``` 
[com.canonical.unity-greeter]
draw-user-backgrounds=false
background='/home/$USER/Pictures/1920x1080-TuxSuckingWindowsTetraWwallpaper.jpg'
# After changing use: sudo glib-compile-schemas /usr/share/glib-2.0/schemas

```

Where:

 - `$USER` = your user ID.
 - `Pictures` = your wallpaper directory.
 - `1920x1080-TuxSuckingWindowsTetraWwallpaper.jpg` = your image file name (can be `.png` format too).
 - `#` (comment) ... reminds you what to do after changing!

Save the file and exit `gedit`

Now compile the new login wallpaper with:

``` 
sudo glib-compile-schemas /usr/share/glib-2.0/schemas

```

Last step is to reboot.

Many thanks and credit to Serg: ([Change the background of the login screen][1]) 
Note on my system this no only changes the initial login screen but also the lock screen login as well.


----------

## Point and click with Nautilus to set login screen wallpaper

I wrote a script where you can navigate to a directory / image, right click on it and set it as login screen / lock screen background using Nautilus (file manager now called "Files"): [Nautilus can set desktop wallpaper. How can it set login and lock screen wallpaper?]({% post_url /2017/2017-01-13-Nautilus-can-set-desktop-wallpaper.-How-can-it-set-login-and-lock-screen-wallpaper? %})

[![Nautilus set-login-wallpaper Drop Down][2]][2]


  [1]: https://askubuntu.com/questions/694202/change-the-background-of-the-login-screen/694370#694370
  [2]: https://i.stack.imgur.com/CsQ9O.png
