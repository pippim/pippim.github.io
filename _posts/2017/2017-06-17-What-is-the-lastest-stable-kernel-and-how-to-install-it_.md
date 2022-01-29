---
layout:       post
title:        >
    What is the lastest stable kernel and how to install it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/926287
type:         Answer
tags:         kernel 16.04 grub
created_date: 2017-06-17 01:15:37
edit_date:    2017-07-04 10:09:15
votes:        "3 "
favorites:    
views:        "42,235 "
accepted:     
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-17-What-is-the-lastest-stable-kernel-and-how-to-install-it_.md
toc:          false
navigation:   false
clipboard:    false
---

The risk of crashes is highest with release candidate new kernels at this time *February 4, 2017* version 4.10 release candidate **4.10-rc6** is the newest. Mainline kernels are considered **stable** and the latest version here is **4.9.8** which I installed a few hours ago.

# Finding the right kernel

Rather than the link you are using, go to ([kernel.ubuntu.com - Kernel PPA Mainline][1]) and press the <kbd>End</kbd> key:

[![Mainline kernel 1][2]][2]

Now click on the link `4.9.8` and this screen appears:

[![mainline kernel 2][3]][3]

Note the links with the black airbrush marks. These are the three we will download for ***Ubuntu 16.04 64-Bit*** using ***Intel or AMD*** processors.

# Installing using Terminal

Open a terminal session with <kbd>ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and use:

``` 
cd Downloads # Assuming this is your browser download directory
rm *.deb     # This erases all *.deb files, ensure only old ones are here
```

Now toggle back to the download screen above and single-click on all three of the `.deb` kernel downloads. After downloads complete (you'll see status in your browser) toggle back to terminal session and use:

``` 
sudo dpkg -i *.deb
rm *.deb
sudo reboot
```

Voila! - you are running the latest kernel when first option in grub boot menu is selected. Your older kernel versions are still available under grub's **Advanced Options** menu.

After installing the newest kernel a dozen times you will ask the question "*How do I remove older kernel versions?*" and you will find those answers [here][4] and [here][5] in ***Ask Ubuntu***.


  [1]: http://kernel.ubuntu.com/~kernel-ppa/mainline/
  [2]: https://i.stack.imgur.com/0aGxt.png
  [3]: https://i.stack.imgur.com/BnsVG.png
  [4]: {% post_url /2017/2017-03-11-How-to-selectively-purge-old-kernels-all-at-once %}
  [5]: https://askubuntu.com/questions/2793/how-do-i-remove-old-kernel-versions-to-clean-up-the-boot-menu
