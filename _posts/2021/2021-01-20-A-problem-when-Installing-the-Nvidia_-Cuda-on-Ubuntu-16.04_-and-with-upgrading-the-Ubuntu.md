---
layout:       post
title:        >
    A problem when Installing the Nvidia, Cuda on Ubuntu 16.04, and with upgrading the Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1309397
type:         Answer
tags:         16.04 nvidia python3 cuda tensorflow
created_date: 2021-01-20 00:28:45
edit_date:    
votes:        "2 "
favorites:    
views:        "992 "
accepted:     Accepted
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-20-A-problem-when-Installing-the-Nvidia_-Cuda-on-Ubuntu-16.04_-and-with-upgrading-the-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

The first thing I would do is getting `apt` working again as detailed here:

- [Ubuntu 16.04 Completely broken python3 + dpkg + apt-get!](https://askubuntu.com/a/1092925/307523)

To summarize the answer:

Visit http://packages.ubuntu.com, and download the `python-minimal` and `python3-minimal` and `apt` packages, then install those packages using dpkg. It may take a few iterations, as dpkg complains about other missing dependencies that you must download and install in the correct order.

**Generally, most users who have broken or missing Python find it faster and easier to simply backup their data and do a clean-install.**
