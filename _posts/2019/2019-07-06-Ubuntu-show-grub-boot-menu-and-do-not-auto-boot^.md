---
layout:       post
title:        >
    Ubuntu show grub boot menu and do not auto boot?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156431
type:         Answer
tags:         grub2
created_date: 2019-07-06 17:05:33
edit_date:    2019-07-06 22:31:04
votes:        "1 "
favorites:    
views:        "1,155 "
accepted:     Accepted
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-06-Ubuntu-show-grub-boot-menu-and-do-not-auto-boot^.md
toc:          false
navigation:   false
clipboard:    false
---

<!-- Language-all: lang-bash -->
What you tried:

``` 
sudo nano /etc/default/grub
GRUB_TIMEOUT=0

```

Then run `sudo update-grub`

Does not work because grub automatically changes a time out of zero to 10. What you need to do is this:

``` 
sudo nano /etc/default/grub
GRUB_RECORDFAIL_TIMEOUT=0.1
GRUB_TIMEOUT=0.1

```

Then run `sudo update-grub`
