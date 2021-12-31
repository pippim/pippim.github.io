---
layout:       post
title:        >
    Intel-microcode package upgrade in ubuntu 18.04 leads to unbootable system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155662
type:         Answer
tags:         boot apt 18.04 intel cpu grub
created_date: !!str "2019-07-03 11:28:17"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "3"
favorites:    
views:        !!str "1,719"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
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

  [1]: {% post_url /2018/2018-01-05-What-is-Ubuntu's-status-on-the-Meltdown-and-Spectre-vulnerabilities? %}
  [2]: {% post_url /2018/2018-01-27-Samsung-M2-NVME-enters-read-only-on-linux-every-day,-not-on-Windows %}
  [3]: https://linuxreviews.org/HOWTO_make_Linux_run_blazing_fast_(again)_on_Intel_CPUs
  [4]: https://www.reddit.com/r/linuxquestions/comments/bqn8we/can_i_disable_the_intel_spectre_fixes/
