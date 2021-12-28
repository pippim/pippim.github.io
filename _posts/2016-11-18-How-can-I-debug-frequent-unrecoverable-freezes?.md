---
layout:       post
title:        How can I debug frequent unrecoverable freezes?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/850816
type:         Answer
tags:         16.04 dell xps
created_date: 2016-11-18 11:22:02
edit_date:    
votes:        3
favorites:    
views:        5,689
accepted:     
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

## How to install Kernel 4.8.5

Although 4.8.7 is the latest kernel, in this 500-post, 1 years long, bug log ([Bug 109051 - intel_idle.max_cstate=1 required on baytrail to prevent crashes][1]) it is reported not to work. Just yesterday someone posted they tried 4.8.7, it crashed so they went back to 4.8.6. 

Although the bug log title is for "Bay Trail" the solutions presented apply to other Intel platforms as users report. Because there are 582 posts spanning almost one year, I recommend pressing the <kbd>End</kbd> key after opening the link and scroll up from there.

I've been running 4.8.5 off and on again alongside with 4.4.0-47 for a couple of weeks and feel comfortable using either one. These are the instructions for installing kernel version 4.8.5:


``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.5/linux-headers-4.8.5-040805_4.8.5-040805.201610280434_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.5/linux-headers-4.8.5-040805-generic_4.8.5-040805.201610280434_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.5/linux-image-4.8.5-040805-generic_4.8.5-040805.201610280434_amd64.deb
sudo dpkg -i *.deb
sudo reboot

```

You can install any kernel by visiting the site: ([http://kernel.ubuntu.com/~kernel-ppa/mainline/][2]) and adapting the links there to the instructions above.


  [1]: https://bugzilla.kernel.org/show_bug.cgi?id=109051
  [2]: http://kernel.ubuntu.com/~kernel-ppa/mainline/
