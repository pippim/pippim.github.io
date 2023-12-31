---
layout:       post
title:        >
    Is the number of bugs falling as new Ubuntu releases are released?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/876692
type:         Answer
tags:         development debugging stable-release-updates
created_date: 2017-01-27 00:58:55
edit_date:    
votes:        "1 "
favorites:    
views:        "572 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-27-Is-the-number-of-bugs-falling-as-new-Ubuntu-releases-are-released_.md
toc:          false
navigation:   false
clipboard:    false
---

The number of bugs reported is based upon:

 - more lines of code = greater chances of a bug. Ubuntu is based on the Linux Kernel which as grown from 150 thousand lines (version 1) to 17 million lines (version 4.5.4).
 - more users = greater number of potential hardware / software pairings resulting in bugs
 - more users = greater chances of reporting bugs. If bugs are only reported 20% of the time and 5 users encounter it it may not get reported. If 50 users encounter it (due to larger user base) it will be reported.
 - new hardware = more bugs. We see all kinds of bugs with Intel Bay Trail processor, nVidia cards and Radeon cards. This will only increase with 4k TV, USB 3.1 and whatever new hardware developments are on the horizon.
 - More hardware = more chances of conflicts. Each new device may bring its own device driver / kernel module. More modules = more chances of two clashing against each other creating a bug.
 - More software = more chances of conflicts. As the user base grows so does the volume of software developed for them. Apache Open Office can conflict with Libre Open Office and some might choose to install both because storage space is so abundant at lower prices. There might be 5 programs available now to control fan speed and a user might install more than one and they might conflict with each other causing system micro freezes every 10 seconds.

Keep in mind that as the number of bugs are increasing so are the number of people fixing them and users sharing solutions/answers with others.

Additionally in some cases the number of bugs didn't increase but the number of people encountering them increased. Also as stated earlier the number of people reporting bugs has increased.
