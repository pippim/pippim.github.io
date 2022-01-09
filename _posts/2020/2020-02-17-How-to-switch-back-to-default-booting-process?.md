---
layout:       post
title:        >
    How to switch back to default booting process?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1211026
type:         Answer
tags:         boot grub
created_date: 2020-02-17 06:12:16
edit_date:    
votes:        "2 "
favorites:    
views:        "67 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

It sounds like your grub is setup to always boot to a specific menu option. Taking this answer:

- [Edit grub from Windows?]({% post_url /2016/2016-10-07-Edit-grub-from-Windows? %})

You can always have grub remember the previous boot option each boot. Use `sudo -H gedit /etc/default/grub`, comment the line below and insert two lines below it:

``` 
#GRUB_DEFAULT=0 # Rather than first menu option, we'll default to last  OS.
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

Save the changes and run `sudo update-grub`.

The first time you boot **Recovery** will be the default option and you will need to press <kbd>Escape</kbd> again but now whatever option you select will be the default for the next boot.
