---
layout:       post
title:        >
    Ubuntu drivers sees drivers I dont have
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1078185
type:         Answer
tags:         drivers nvidia 18.04 kubuntu dpkg
created_date: 2018-09-25 01:31:27
edit_date:    
votes:        "0 "
favorites:    
views:        "92 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-25-Ubuntu-drivers-sees-drivers-I-dont-have.md
toc:          false
navigation:   false
clipboard:    false
---

When you typed your command it listed what is installed. In my case:

``` 
$ ubuntu-drivers list
nvidia-384
```

In your case you appear to have three nVidia drivers installed; `nvidia-driver-396`, `nvidia-driver-390` and `nvidia-340`.

Additionally you have a WiFi driver (I believe) installed called: 'bcmwl'.

To completely remove your nVidia drivers you need to refer to: [How can I uninstall a nvidia driver completely ?](How can I uninstall a nvidia driver completely ?)



