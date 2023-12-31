---
layout:       post
title:        >
    How do I install Intel drivers?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/820987
type:         Answer
tags:         16.04 gnome intel-graphics desktop-environments ubuntu-gnome
created_date: 2016-09-04 20:43:01
edit_date:    2016-09-12 22:58:05
votes:        "1 "
favorites:    
views:        "1,323 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-04-How-do-I-install-Intel-drivers_.md
toc:          false
navigation:   false
clipboard:    false
---

Unity (based on Gnome desktop) and reportedly more resource intensive runs great on my 2012 Dell Laptop (Intel i7 3630QM) using Intel HD4000.

Unitty also worked fine on my 2007 Toshiba laptop (Core 2 Duo) HD2000.

With 10 chrome tabs open on Dell laptop screen and watching youtube on TV the 8 CPUs are averaging 18% load with the HD4000. Similarly the older Toshiba 4 CPUs used to run at 50% load I believe. 

Both laptops automatically use Intel's i915 driver in Linux with no manual installation required. This is true for Ubuntu versions 14.04 and 16.04.

Indeed the Dell Motherboard has a Nvidia GT650M installed that I never even turned on in the two years I've owned it.

PS: Ubuntu 16.04 comes with Kernel 4.4. Due to suspend/resume issues I immediately updated to Kernel 4.6.3. A week later I updated to kernel 4.7.2 and I noticed 8 CPU load balancing was more even and overall load percentage dropped noticeably (let's say from 25% to 18%). Bear in mind these numbers are subjective.
