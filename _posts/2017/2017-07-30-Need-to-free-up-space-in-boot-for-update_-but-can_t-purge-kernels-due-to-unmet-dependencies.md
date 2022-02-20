---
layout:       post
title:        >
    Need to free up space in boot for update, but can't purge kernels due to unmet dependencies
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/941360
type:         Answer
tags:         kernel dpkg
created_date: 2017-07-30 23:18:26
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "1,087 "
accepted:     Accepted
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-30-Need-to-free-up-space-in-boot-for-update_-but-can_t-purge-kernels-due-to-unmet-dependencies.md
toc:          false
navigation:   false
clipboard:    false
---

### Why do I have to install something when I want to delete images?

You don't have to install something. It won't let you delete the images unless you delete the ones that depend on them at the same time. For example you need to use:

``` 
$ sudo apt-get purge linux-headers-4.4.33-040433* linux-headers-4.4.33-040433-generic* linux-image-4.4.33-040433-generic*
The following packages will be REMOVED:
  linux-headers-4.4.33-040433* linux-headers-4.4.33-040433-generic*
  linux-image-4.4.33-040433-generic*
```

To avoid this manual work try my [bash script][1] which automates the process. Yes it may be a shameless plug but I spent many hours in development and fine-tuning so would like to see as many use it as possible.

### Do I also have to delete the files with linux-headers-* and linux-signed-image-*?

Yes as answered in the previous section.

### Shouldn't Ubuntu handle the deletion of not needed kernels automatically or what is the reason I have to do it manually?

Ubuntu does remove kernels automatically that it installed automatically when you use:

``` 
sudo apt-get autoremove
```

If you manually installed a kernel using a technique like this: [How do I update kernel to the latest mainline version?][2] then you have to manually remove the kernel as well.

### I have to encrypt my hard drive. Could this be the reason?

No. But I wouldn't encrypt my hard drive.

  [1]: {% post_url /2017/2017-03-11-How-to-selectively-purge-old-kernels-all-at-once %}
  [2]: {% post_url /2017/2017-02-04-How-do-I-update-kernel-to-the-latest-mainline-version_ %}
