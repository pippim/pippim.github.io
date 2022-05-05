---
layout:       post
title:        >
    Install Ubuntu including all drivers from the USB-Live system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1006666
type:         Answer
tags:         system-installation live-usb
created_date: 2018-02-16 03:12:50
edit_date:    2018-02-19 19:53:59
votes:        "2 "
favorites:    
views:        "15,886 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-16-Install-Ubuntu-including-all-drivers-from-the-USB-Live-system.md
toc:          false
navigation:   false
clipboard:    false
---

# Install but decline updates

To get the exact copy of the Live USB the best method is to not update the system during installation. Some users have experience bugs introduced by recent updates this year (2018):

- [Ubuntu Menu and Launcher not showing after 2/16/2018 update][1]
- [2/15/18 compiz update broke unity][2]
- [GUI/Unity crashing in 16.04 LTS after updates 2018-01-04, compiz segfaults][3]
- [Touchpad gestures and holding keys does not work][4]
- [virtualbox crash on kernel 4.13.0-26][5]
- [Lubuntu 16.04.3 - After the last update(kernel 4.13.0-26) crashed][6]
- [Ubuntu 16.04 not booting 4.13.0-x-generic][7]
- [Problem with ethernet on latest kernel on Ubuntu 16.04 LTS][8]
- [Intel Microcode 2018-01-08 breaks some systems][9]

Because of these and many other errors I haven't upgraded this year so far. I have manually installed Kernels though to keep ahead of Meltdown and Spectre.

By not applying any of the Ubuntu updates during installation and afterwards you are getting the closest possible system to the Live USB.

# Wifi related updates

Here are a couple of similar questions where during Live-USB session Wifi works but breaks after installation:

- [Why does my wireless work during install but not after booting?][10]
- [Internet worked during install, but not after][11]


  [1]: {% post_url /2018/2018-02-17-Ubuntu-Menu-and-Launcher-not-showing-after-2_16_2018-update %}
  [2]: https://askubuntu.com/questions/1006621/2-15-18-compiz-update-broke-unity
  [3]: https://askubuntu.com/questions/992571/gui-unity-crashing-in-16-04-lts-after-updates-2018-01-04-compiz-segfaults
  [4]: https://askubuntu.com/questions/995819/touchpad-gestures-and-holding-keys-does-not-work
  [5]: https://askubuntu.com/questions/994315/virtualbox-crash-on-kernel-4-13-0-26
  [6]: https://askubuntu.com/questions/995782/lubuntu-16-04-3-after-the-last-updatekernel-4-13-0-26-crashed
  [7]: https://askubuntu.com/questions/1001699/ubuntu-16-04-not-booting-4-13-0-x-generic
  [8]: https://askubuntu.com/questions/996284/problem-with-ethernet-on-latest-kernel-on-ubuntu-16-04-lts
  [9]: {% post_url /2018/2018-01-27-Samsung-M2-NVME-enters-read-only-on-linux-every-day_-not-on-Windows %}
  [10]: https://askubuntu.com/questions/996702/why-does-my-wireless-work-during-install-but-not-after-booting
  [11]: https://askubuntu.com/questions/358810/internet-worked-during-install-but-not-after
