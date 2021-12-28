---
layout:       post
title:        How do I downgrade Plymouth without breaking lightdm?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/849021
type:         Question
tags:         boot apt package-management lightdm plymouth
created_date: 2016-11-13 17:20:20
edit_date:    2017-04-13 12:24:07
votes:        1
favorites:    0
views:        465
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    true
---

After many weeks of searching, I've found a new solution for my boot-up Plymouth `earth-sunrise` to start earlier and last longer. I just read how to in ([Plymouth does not work properly][1]) write-up on a gentoo site.

I've read the highly voted Q&A ([How to Downgrade a Package via apt-get?][2]) but it doesn't address the peculiarities of plymouth and it's relationship to `lightdm`.

Below are the Plymouth versions I want (0.8.8) and the currently installed one (0.9.2):

{% include copyHeader.html %}
``` 
───────────────────────────────────────────────────────────────────────────────
rick@dell:/var/log$ apt-cache showpkg plymouth | grep 0.8.8
  lightdm,plymouth 0.8.8-0ubuntu18
  lightdm,plymouth 0.8.8-0ubuntu18
───────────────────────────────────────────────────────────────────────────────
rick@dell:/var/log$ apt show plymouth
Package: plymouth
Version: 0.9.2-3ubuntu13.1
Priority: standard
Section: x11
Origin: Ubuntu
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Laurent Bigonville <bigon@debian.org>
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Installed-Size: 452 kB
Depends: libc6 (>= 2.14), libdrm2 (>= 2.4.25), libplymouth4 (>= 0.9.2), initramfs-tools | dracut, init-system-helpers (>= 1.18)
Recommends: plymouth-theme-ubuntu-text | plymouth-theme
Suggests: desktop-base, plymouth-themes
Conflicts: console-common, plymouth-theme-lubuntu-text (<< 0.57~)
Breaks: plymouth-drm (<< 0.9.0-6~), plymouth-theme-edubuntu (<< 15.12.1~), plymouth-theme-kubuntu-logo (<< 1:16.04ubuntu1~), plymouth-theme-kubuntu-text (<< 1:16.04ubuntu1~), plymouth-theme-lubuntu-logo (<< 0.57~), plymouth-theme-sability (<< 1.3~), plymouth-theme-sabily-text (<< 1.3~), plymouth-theme-ubuntu-gnome-logo (<< 16.04.1~), plymouth-theme-ubuntu-gnome-text (<< 16.04.1~), plymouth-theme-ubuntu-logo (<< 0.9.2-3ubuntu1~), plymouth-theme-ubuntu-mate-logo (<< 15.12.1~), plymouth-theme-ubuntu-mate-text (<< 15.12.1~), plymouth-theme-ubuntu-text (<< 0.9.2-3ubuntu1~), plymouth-theme-ubuntustudio (<< 0.50~), plymouth-theme-xubuntu-logo (<< 15.12.1~), plymouth-theme-xubuntu-text (<< 15.12.1~), plymouth-themes (<< 0.9.0-8~)
Replaces: libplymouth2 (<< 0.9.2-3ubuntu1~), plymouth-drm (<< 0.9.0-6~), plymouth-themes (<< 0.9.0-8~)
Homepage: http://www.freedesktop.org/wiki/Software/Plymouth
Task: standard, ubuntu-touch-core, ubuntu-touch, ubuntu-touch, ubuntu-sdk
Supported: 5y
Download-Size: 107 kB
APT-Manual-Installed: yes
APT-Sources: http://ca.archive.ubuntu.com/ubuntu xenial-updates/main amd64 Packages
Description: boot animation, logger and I/O multiplexer
 Plymouth provides a boot-time I/O multiplexing framework - the most obvious
 use for which is to provide an attractive graphical animation in place of
 the text messages that normally get shown during boot. (The messages are
 instead redirected to a logfile for later viewing.) However, in event-driven
 boot systems Plymouth can also usefully handle user interaction such as
 password prompts for encrypted file systems.
 .
 This package provides the basic framework, enabling a text-mode animation.

N: There is 1 additional record. Please use the '-a' switch to see it
───────────────────────────────────────────────────────────────────────────────
rick@dell:/var/log$

```

My problem is the package I want to downgrade to is called `lightdm,plymouth 0.8.8-0ubuntu18` and the installed package is called `plymouth 0.9.2-3ubuntu13.1`. I'm not sure how to square this circle.

Another concern I have is messing up my `lightdm` which would cause all kinds of headaches.

Using the highly voted Q&A above do I type:

``` 
sudo apt-get install "lightdm,plymouth"=0.8.8-0ubuntu18
apt-mark hold "lightdm,plymouth"

```

**OR** is the correct format:

``` 
sudo apt-get install plymouth=0.8.8-0ubuntu18
apt-mark hold plymouth

```

**OR** is it something totally different???

Thanks in advance.



  [1]: https://forums.gentoo.org/viewtopic-p-7975064.html?sid=73bff67f2f7cf3b125ac2b867f495d2f
  [2]: https://askubuntu.com/questions/138284/how-to-downgrade-a-package-via-apt-get/138327#138327

