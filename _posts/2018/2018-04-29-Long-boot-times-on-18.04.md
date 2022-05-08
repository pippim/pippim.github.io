---
layout:       post
title:        >
    Long boot times on 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029534
type:         Answer
tags:         boot 18.04
created_date: 2018-04-29 05:32:41
edit_date:    2018-07-07 04:07:13
votes:        "3 "
favorites:    
views:        "8,249 "
accepted:     
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Long-boot-times-on-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I just did a test conversion from 16.04 to 18.04 and did not have this problem. But you can suppress Plymouth by using `sudo` powers to edit the file `/etc/default/grub`. 


``` 
sudo -H gedit /etc/default/grub
```


Look for the line containing:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

and remove the word `splash` (which causes Plymouth to load).

Then save your file and run

``` 
sudo update-grub
```

Now Plymouth will no longer run on boot. This is a band-aid fix and you should keep searching for a real fix.
