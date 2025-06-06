---
layout:       post
title:        >
    Edits to nvidia-xconfig not taking hold after restart?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/989752
type:         Answer
tags:         drivers nvidia xorg nvidia-settings
created_date: 2017-12-27 03:30:59
edit_date:    
votes:        "1 "
favorites:    
views:        "3,910 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-27-Edits-to-nvidia-xconfig-not-taking-hold-after-restart_.md
toc:          false
navigation:   false
clipboard:    false
---

I had a similar problem repairing screen tearing for nVidia. Even if I deleted /etc/X11/xorg.conf it would be recreated on reboot. The solution is to put your custom changes into:

``` 
/etc/X11/xorg.conf.d/20-nvidia.conf
```

A thorough write-up of nVidia modifications can be found [here][1].


  [1]: https://wiki.archlinux.org/index.php/NVIDIA/Troubleshooting
