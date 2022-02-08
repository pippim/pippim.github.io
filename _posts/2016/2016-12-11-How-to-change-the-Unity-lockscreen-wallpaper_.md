---
layout:       post
title:        >
    How to change the Unity lockscreen wallpaper?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/859587
type:         Answer
tags:         lightdm wallpaper lock-screen
created_date: 2016-12-11 20:39:42
edit_date:    2018-05-14 21:44:50
votes:        "6 "
favorites:    
views:        "9,036 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-11-How-to-change-the-Unity-lockscreen-wallpaper_.md
toc:          false
navigation:   false
clipboard:    false
---

This solution will change the lock-screen wallpaper and the logon wallpaper (greeter screen) at the same time.

**Note:** In Ubuntu 18.04 only the lock screen wallpaper is changed. A different technique will be required to change the login wallpaper.

``` 
gksu gedit /usr/share/glib-2.0/schemas/10_unity_greeter_background.gschema.override
```

Then add the lines below:

``` 
[com.canonical.unity-greeter]
draw-user-backgrounds=false
background='/home/user_name/Pictures/picture_name.png'
```

In my example change `/home/user_name/Pictures/picture_name.png` to whatever directory and file name you want to use. Note `.jpg` file formats are also accepted.

Next compile the schema using:

``` 
sudo glib-compile-schemas /usr/share/glib-2.0/schemas
```

The final step is to log-out or reboot.

This works in **Ubuntu 16.04** but I haven't tested it in **Ubuntu 16.10** please respond via comment if you know for sure. Thanks.


----------


You can use ***Nautilus*** to view wallpaper images and right click to change login screen and lock screen wallpaper: ([Nautilus can set desktop wallpaper. How can it set login and lock screen wallpaper?][1]).

Sample screen:

[![Nautilus set-login-wallpaper Drop Down][2]][2]



  [1]: {% post_url /2017/2017-01-13-Nautilus-can-set-desktop-wallpaper.-How-can-it-set-login-and-lock-screen-wallpaper_ %}
  [2]: https://i.stack.imgur.com/CsQ9O.png
