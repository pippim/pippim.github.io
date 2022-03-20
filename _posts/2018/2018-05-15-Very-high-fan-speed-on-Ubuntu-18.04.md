---
layout:       post
title:        >
    Very high fan speed on Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1036727
type:         Answer
tags:         18.04 fan fancontrol
created_date: 2018-05-15 22:29:23
edit_date:    
votes:        "7 "
favorites:    
views:        "92,498 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-15-Very-high-fan-speed-on-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I struggled with fan speed and thermal issues for a long time before I found `tlp` which has solved all my problems. You can learn more [here][1]:

> TLP brings you the benefits of advanced power management for Linux  
> without the need to understand every technical detail. TLP comes with  
> a default configuration already optimized for battery life, so you may  
> just install and forget it. Nevertheless TLP is highly customizable to  
> fulfill your specific requirements.  

Installation is the predictable

``` 
sudo apt install tlp
```

Configuration is automatic and I've never had to change it out of the box. 


----------

If `tlp` by itself doesn't solve all your thermal issues there are specific steps you can take for [ASUS Laptops][2]:

### Kernel modules overview

-     `asus-nb-wmi` is a kernel module, which is included in mainstream Linux kernel and is loaded automatically in Asus laptops. It will only allow to control a single fan and if there is a second fan - you will not have any controls over it. Blacklisting this module will prevent keyboard backlight to work.
-    `asus_fan` is a kernel module, which allows to control both fans on some older Asus laptops. Does not work with the most recent models.

For myself after installing `tlp` I was able to remove a couple of fan control programs I had struggled to setup for my laptop. However I do not have an ASUS so you might need something more than just `tlp`.

  [1]: https://wiki.archlinux.org/index.php/TLP
  [2]: https://wiki.archlinux.org/index.php/Fan_speed_control#Asus_laptops
