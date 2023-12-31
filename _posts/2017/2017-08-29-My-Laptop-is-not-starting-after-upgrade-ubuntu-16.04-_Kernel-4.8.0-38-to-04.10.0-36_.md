---
layout:       post
title:        >
    My Laptop is not starting after upgrade ubuntu 16.04 (Kernel 4.8.0-38 to 04.10.0-36)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/950762
type:         Answer
tags:         boot 16.04 kernel
created_date: 2017-08-29 00:33:08
edit_date:    
votes:        "0 "
favorites:    
views:        "448 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-29-My-Laptop-is-not-starting-after-upgrade-ubuntu-16.04-_Kernel-4.8.0-38-to-04.10.0-36_.md
toc:          false
navigation:   false
clipboard:    false
---

My first concern would be the next update installs 4.10.0-37 which is also broken. Then through auto-remove you loose your only working kernel which is 4.8.0-38.

The first thing I would do is install a kernel version which can't be auto-removed and must be manually removed. I would suggest [4.9.45 mainline build][1] because 4.9 is LTS (Long Term Support) for about 5 years I believe.

The instructions for installing a stable mainline kernel are fairly straightforward: [What is the lastest stable kernel and how to install it?][2]

Another kernel you can install to test version 4.10 compatibility is [4.10.17 mainline build][2].

Finally an extra version of 4.8 that can't be removed automatically is [4.8.17 mainline build][3]

Keep in mind each kernel consumes about 50 MB in your `/boot` directory and about 350 MB in `/lib` and `/etc` sub-directories.

Later after auto-installed kernels are working reliably you can [remove manually installed kernels][4]. I have lots of disk space and keep about 20 kernels installed for testing purposes but that's not everyone's cup of tea.

Hopefully your problems wiht `4.10.0-36` is a one-off glitch and will never be repeated. First things first though is to protect your system to ensure you can always boot successfully.

Please keep us posted on progress.

  [1]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.9.45/
  [2]: {% post_url /2017/2017-06-17-What-is-the-lastest-stable-kernel-and-how-to-install-it_ %}
  [3]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.17/
  [4]: {% post_url /2017/2017-03-11-How-do-I-remove-old-kernel-versions-to-clean-up-the-boot-menu_ %}
