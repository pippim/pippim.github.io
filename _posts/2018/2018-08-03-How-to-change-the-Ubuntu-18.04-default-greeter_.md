---
layout:       post
title:        >
    How to change the Ubuntu 18.04 default greeter?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062002
type:         Answer
tags:         18.04
created_date: 2018-08-03 11:20:15
edit_date:    
votes:        "6 "
favorites:    
views:        "24,415 "
accepted:     
uploaded:     2022-09-15 05:40:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-03-How-to-change-the-Ubuntu-18.04-default-greeter_.md
toc:          false
navigation:   false
clipboard:    false
---

There is a nice little blog on doing this: [Ubuntu 18.04 – Bring back Lightdm login manager][1]. Here are the steps summarized from the blog:

- To install use: `sudo apt-get -y install slick-greeter`
- Verify setup using: `lightdm --show-config `
- Edit the file `/etc/lightdm/slick-greeter.conf` to setup login screen wallpaper
- To revert back to GDM3 login manager use `sudo dpkg-reconfigure lightdm`



  [1]: http://c-nergy.be/blog/?p=11767
