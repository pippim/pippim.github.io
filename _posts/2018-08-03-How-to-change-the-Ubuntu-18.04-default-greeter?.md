---
layout:       post
title:        How to change the Ubuntu 18.04 default greeter?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062002
type:         Answer
tags:         18.04
created_date: 2018-08-03 11:20:15
edit_date:    
votes:        5
favorites:    
views:        23,102
accepted:     
uploaded:     2021-12-28 13:55:01
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
