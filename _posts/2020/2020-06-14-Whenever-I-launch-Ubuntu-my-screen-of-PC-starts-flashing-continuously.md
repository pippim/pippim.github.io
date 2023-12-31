---
layout:       post
title:        >
    Whenever I launch Ubuntu my screen of PC starts flashing continuously
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1250351
type:         Answer
tags:         screen flicker
created_date: 2020-06-14 20:13:10
edit_date:    
votes:        "1 "
favorites:    
views:        "1,902 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-14-Whenever-I-launch-Ubuntu-my-screen-of-PC-starts-flashing-continuously.md
toc:          false
navigation:   false
clipboard:    false
---

From this Bug Report (You should read the entire bug report from start to finish):

- [Intel 8550U with 620UHD GPU screen flashing][1]

This solution:

- Add kernel parameter: `drm.debug=0x1e log_buf_len=4M`

To add a kernel parameter use `sudo -H gedit /etc/default/grub` and locate the line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

change it to:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash drm.debug=0x1e log_buf_len=4M"
```

Save the file and exit `gedit` then run

``` 
sudo update-grub
```

Now reboot and see if the flickering is gone.


----------


In my own `/etc/default/grub` file I keep random notes I've collected over the years about kernel parameters. I've extracted these old notes that may help you:

`# i915.enable_rc6=0 Fix screen flickering Kernel's > 4.12` [https://bbs.archlinux.org/viewtopic.php?id=211399](https://bbs.archlinux.org/viewtopic.php?id=211399)

`# i915.enable_psr=0 screen flickering kernel's > 4.6` [https://wiki.archlinux.org/index.php/intel_graphics#Skylake_support](https://wiki.archlinux.org/index.php/intel_graphics#Skylake_support)


  [1]: https://gitlab.freedesktop.org/drm/intel/-/issues/166
