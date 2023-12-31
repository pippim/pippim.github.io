---
layout:       post
title:        >
    Is it worth upgrading Ubuntu 17.10 kernel from 4.13 to 4.15?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1002062
type:         Answer
tags:         upgrade kernel
created_date: 2018-02-01 11:57:52
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "3,878 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-01-Is-it-worth-upgrading-Ubuntu-17.10-kernel-from-4.13-to-4.15_.md
toc:          false
navigation:   false
clipboard:    false
---

# 4.15 released February 1, 2018

[Kernel version 4.15][1] was just released yesterday. It is reported to be about [8% faster than Kernel 4.11][2].

# 4.14 is 5 year Long Term kernel

Kernel version 4.14 is stable/mainline found at: http://kernel.ubuntu.com/~kernel-ppa/mainline/

Like 3.16, 4.4 and 4.9 Kernel version 4.14 is LTS (Long Time Support) kernel and will be maintained for five years by the Linux Kernel Team. 

Starting with Kernel version 4.14.13 support for Spectre protection has been added. See: [What is Ubuntu&#39;s status on the Meltdown and Spectre vulnerabilities?][3]. I've been running version 4.14.15 with no problems since it came out last week. 

Having to manually install and remove kernels yourself involves extra work and is not considered practical for most users. See [How to update kernel to the latest mainline version without any Distro-upgrade?][4]


  [1]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.15/
  [2]: http://news.softpedia.com/news/linux-systems-running-newer-kernels-not-affected-by-meltdown-and-spectre-patches-519639.shtml
  [3]: https://askubuntu.com/questions/992232/what-is-ubuntus-status-on-the-meltdown-and-spectre-vulnerabilities
  [4]: https://askubuntu.com/questions/119080/how-to-update-kernel-to-the-latest-mainline-version-without-any-distro-upgrade
