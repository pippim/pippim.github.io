---
layout:       post
title:        >
    How do I "edit grub to add iomem=relaxed"?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162794
type:         Answer
tags:         boot grub2 configuration
created_date: 2019-08-02 01:32:32
edit_date:    
votes:        "2 "
favorites:    
views:        "12,094 "
accepted:     
uploaded:     2023-09-20 18:34:26
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-02-How-do-I-_edit-grub-to-add-iomem_relaxed__.md
toc:          false
navigation:   false
clipboard:    false
---

You can use `nano` but personally I do everything with `gedit` both in my regular user account and with `sudo`. In this case `sudo` is needed so it would be:

``` 
sudo -H gedit /etc/default/grub
```

Then change:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

to:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="iomem=relaxed quiet splash"
```

- Save the file
- Exit `gedit`
- Run `sudo update-grub`
- Type `reboot`

After rebooting type:

``` 
cat /proc/cmdline
```

You will see your changes in effect. Whether everything works or not is a different story :)
