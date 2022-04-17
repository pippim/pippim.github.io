---
layout:       post
title:        >
    stdin: invalid argument
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1394671
type:         Answer
tags:         boot partitioning 20.04 grub2 uefi
created_date: 2022-02-24 13:10:58
edit_date:    
votes:        "1 "
favorites:    
views:        "512 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-02-24-stdin_-invalid-argument.md
toc:          false
navigation:   false
clipboard:    false
---

From this forum:

- [Can't install any linux distro](https://www.linux.org/threads/cant-install-any-linux-distro.33034/)

---

This issue was raised:

``` 
[20.655271] usb usb1-port4: couldn't allocate usb_device
```

After a few seconds it restarts with appropriate OS logo and shows next errors:

``` 
stdin: invalid argument
```

...like 50 same errors...

``` 
Unable to find a medium container a live system
```
Attempt interactive netboot from a URL ?

---

This solution:

- Inserting "iommu=soft" into /boot/grub/grub.cfg in bootable USB helped me.

fixed the problem.

---

## Summary

Sounds like the same problem you have and the same solution *should* work.
