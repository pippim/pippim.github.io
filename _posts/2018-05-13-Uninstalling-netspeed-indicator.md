---
layout:       post
title:        Uninstalling netspeed indicator
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035723
type:         Answer
tags:         uninstall indicator
created_date: 2018-05-13 14:46:09
edit_date:    
votes:        0
favorites:    
views:        1,153
accepted:     Accepted
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

You only removed the PPA containing the program for downloading. You need to remove the program itself:

``` 
sudo apt update
sudo apt install remove --purge indicator-netspeed

```

If that doesn't work you probably need to add back the PPA first (granted I'm not sure on this one):

``` 
add-apt-repository ppa:nilarimogard/webupd8
sudo apt update
sudo apt install remove --purge indicator-netspeed

```
