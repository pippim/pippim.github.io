---
layout:       post
title:        Why show desktop (with alt tab) in kde renders alternatively two different things?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022714
type:         Answer
tags:         kde application-switcher kde5 show-desktop
created_date: 2018-04-07 01:00:23
edit_date:    2018-07-24 23:40:44
votes:        2
favorites:    
views:        2,209
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

<kbd>Alt</kbd>+<kbd>Tab</kbd> is window selector Ubuntu and Windows but in KDE it shows the desktop. In Ubuntu <kbd>Ctrl</kbd>+<kbd>Super</kbd>+<kbd>D</kbd> will minimize all Windows and reveal the desktop (with icons).

The OP's solution is to turn off desktop icons using:

``` 
gsettings set org.gnome.desktop.background show-desktop-icons false

```

Now there are no icons on the desktop at all, whether you minimize all Windows or not.


----------


[Another option][1] is to install **KDE** add-on; `kwin-addons` in [K]ubuntu 16.04:

``` 
sudo apt-get install kwin-addons

```


----------


From [Arch Linux][2] this user writes:

> So in KDE you can change the design of the Alt+Tab application  
> switcher. On my previous installation, I always used one called "Large  
> Icons", which was a Mac OS inspired application switcher that only  
> showed icons. In my installation this switcher is no longer available  
> (Settings -> Window Management -> Task Switcher). I can only select  
> Cover switch, Flip switch, Breeze and Breeze dark. Does anyone know  
> where that nice application switcher went?  

The solution (which might be your original problem) could be "Large Icons" as this screen (from the Arch Linux link) shows:

[![kde-alt-tab][3]][3]


  [1]: https://superuser.com/questions/996597/kde-plasma-alt-tab-behavior-options-most-of-them-are-missing
  [2]: https://bbs.archlinux.org/viewtopic.php?id=218308
  [3]: https://i.stack.imgur.com/NgZj4.png
