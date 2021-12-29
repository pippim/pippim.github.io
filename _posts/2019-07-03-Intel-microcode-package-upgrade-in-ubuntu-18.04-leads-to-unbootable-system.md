---
layout:       post
title:        Intel-microcode package upgrade in ubuntu 18.04 leads to unbootable system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155662
type:         Answer
tags:         boot apt 18.04 intel cpu grub
created_date: 2019-07-03 11:28:17
edit_date:    2020-06-12 14:37:07
votes:        3
favorites:    
views:        1,719
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

When the [`meltdown` and `spectre` virus ***potential***][1] was first discovered (but no actual virus) the first patches in early 2018 also [broke the microcode][2].

The microcode is loaded before `grub` boots the kernel during the `initramfs` stage but you can also tell the kernel not to run the code until the microcode is fixed. This may or may not give you microcode updates and still run the kernel. You would need to update your grub command line with these options:

``` 
nopti nospectre_v2 nospec

```

- `nopti` https://askubuntu.com/questions/991874/how-to-disable-page-table-isolation-to-regain-performance-lost-due-to-intel-cpu
- `nospectre_v2` [HOWTO make Linux run blazing fast (again) on Intel CPUs][3]
- `nospec` [Can I disable the intel spectre fixes?][4]

These three grub options are what I use but the middle link above has even more options to consider.

I'm not suggesting you disable your meltdown/spectre kernel options for speed but rather in order to use your microcode.

The other option is to roll back your microcode to a version prior to the bug. You can only discover if this is possible by trial and error:

- https://askubuntu.com/questions/293948/where-to-find-older-sourcebinary-package-versions

  [1]: https://askubuntu.com/questions/992232/what-is-ubuntus-status-on-the-meltdown-and-spectre-vulnerabilities/992459#992459
  [2]: https://askubuntu.com/questions/998471/razer-blade-stealth-disk-corruption-fsck-needed-probably-samsung-ssd-bug-afte/1000454#1000454
  [3]: https://linuxreviews.org/HOWTO_make_Linux_run_blazing_fast_(again)_on_Intel_CPUs
  [4]: https://www.reddit.com/r/linuxquestions/comments/bqn8we/can_i_disable_the_intel_spectre_fixes/
