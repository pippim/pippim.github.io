---
layout:       post
title:        >
    Why was kernel 4.9.77 released but not kernel 4.14.14?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/997861
type:         Question
tags:         kernel
created_date: !!str "2018-01-20 00:51:51"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "-2"
favorites:    
views:        !!str "855"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

Spectre protection ([Retpoline][1]) was released for Kernel 4.9.77 and 4.14.14 by the Linux Kernel team on January 15, 2018. The Ubuntu Kernel team only released [kernel version 4.9.77][2] on January 17, 2018 and have not published kernel version 4.14.14.

For the Meltdown patches (KPTI->KAISER->KASLR) the Ubuntu Kernel team released the [Mainline Kernel][3] updates at the same time for **4.9** and **14.14** but the Spectre patch is missing in 4.14:

- **4.9.74** Jan 2nd *9:10pm* ....... **4.14.11** Jan 2nd *10:40pm*
- **4.9.75** Jan 5th *4:20pm* ........ **4.14.12** Jan 5th *5:40pm*
- **4.9.76** Jan 10th *10:20am* .... **4.14.13** Jan 10th *10:50am*
- **4.9.77** Jan 17th *10:20am* .... **4.14.14** *Missing*

Mainline/Stable Ubuntu Kernel version 4.14.14 is still missing as of Jan 20th 5:46pm. Three days late and counting... I like to test the latest stable kernels and this is even more important now with the Spectre security hole.

I've googled for reasons but came up empty handed. Is there a newsletter or something that would explain why? Or is it as simple as someone forgot to push a button?

**NOTE:** Spectre protection is not being provided for LTS Kernels 4.4 and 3.18 by the Linux Kernel team however they have updated `sysfs` to indicate Spectre vulnerability. So far the only LTS Kernel versions offering Spectre protection are 4.9 and 4.14. 

Current Release Candidate (experimental kernel) 4.15 will soon have Spectre protection. Ubuntu 18.04 (Bionic Beaver) will be based upon 4.15 in April when it is no longer a Release Candidate and becomes a Mainline/Stable Kernel. 


----------

# End of Story

Thanks to Thomas Ward's help I got in touch with the *Ubuntu Kernel Team* and **Mainline/Stable Ubuntu Kernel version 4.14.14** was published January 20, 2018 at 1:10pm.

  [1]: https://www.phoronix.com/scan.php?page=news_item&px=Linux-4.9-4.14-Retpoline
  [2]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.9.77/
  [3]: http://kernel.ubuntu.com/~kernel-ppa/mainline/
