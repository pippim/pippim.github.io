---
layout:       post
title:        Unmet dependancy unity-control-center
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162267
type:         Question
tags:         16.04 apt upgrade dependencies 19.04
created_date: 2019-07-31 01:13:08
edit_date:    2020-06-12 14:37:07
votes:        0
favorites:    
views:        564
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    true
---

I'm trying to bravely step forward into the "apt-world" and got these errors tonight testing upgrade from 16.04 to 19.04 on a clone (it's.. well... complicated...):

``` 
The following packages have unmet dependencies:
 indicator-bluetooth : Depends: unity-control-center but it is not going to be installed or
                                gnome-control-center but it is not going to be installed or
                                ubuntu-system-settings but it is not installable
 libdouble-conversion1v5 : Conflicts: libdouble-conversion1 but 3.1.0-2 is to be installed
                           Breaks: libdouble-conversion1 but 3.1.0-2 is to be installed
 libqt5dbus5 : Depends: qtbase-abi-5-5-1
 libqt5network5 : Depends: qtbase-abi-5-5-1
E: Error, pkgProblemResolver::Resolve generated breaks, this may be caused by held packages.

```

Does anyone know how to solve these errors or what additional information I can provide to help solve them?

The 16.04 to 19.04 upgrade is by script so I can install packages beforehand if that helps things out. I've recloned 16.04 and run the script five times to work out the other bugs and now I can almost see the light at the end of the tunnel.


----------

## Reply to comments

Currently only Unity Desktop is installed and converted by upgrade. After successful upgrade I plan to install Gnome Desktop and possibly Wayland.

I see even before upgrade there is a problem:

``` 
$ sudo dpkg -P libdouble-conversion1v5

dpkg: dependency problems prevent removal of libdouble-conversion1v5:amd64:
 libqt5qml5:amd64 depends on libdouble-conversion1v5 (>= 2.0.0).

dpkg: error processing package libdouble-conversion1v5:amd64 (--purge):
 dependency problems - not removing
Errors were encountered while processing:
 libdouble-conversion1v5:amd64

```

The other item asked for:

{% include copyHeader.html %}
``` 
$ apt list --installed | grep hw

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

hwdata/xenial-updates,xenial-updates,now 0.267-1ubuntu2 all [installed]
linux-generic-hwe-16.04/xenial-updates,xenial-security,now 4.15.0.55.76 amd64 [installed]
linux-headers-generic-hwe-16.04/xenial-updates,xenial-security,now 4.15.0.55.76 amd64 [installed]
linux-hwe-tools-4.15.0-54/xenial-updates,xenial-security,now 4.15.0-54.58~16.04.1 amd64 [installed,automatic]
linux-hwe-tools-4.15.0-55/xenial-updates,xenial-security,now 4.15.0-55.60~16.04.2 amd64 [installed,automatic]
linux-image-generic-hwe-16.04/xenial-updates,xenial-security,now 4.15.0.55.76 amd64 [installed,automatic]
linux-signed-generic-hwe-16.04/xenial-updates,xenial-security,now 4.15.0.55.76 amd64 [installed]
linux-signed-image-generic-hwe-16.04/xenial-updates,xenial-security,now 4.15.0.55.76 amd64 [installed]
linux-tools-generic-hwe-16.04/xenial-updates,xenial-security,now 4.15.0.55.76 amd64 [installed,automatic]
lshw/xenial-updates,now 02.17-1.1ubuntu3.6 amd64 [installed]
xserver-xorg-core-hwe-16.04/xenial-updates,xenial-security,now 2:1.19.6-1ubuntu4.1~16.04.2 amd64 [installed]
xserver-xorg-hwe-16.04/xenial-updates,now 1:7.7+16ubuntu3~16.04.1 amd64 [installed]
xserver-xorg-input-all-hwe-16.04/xenial-updates,now 1:7.7+16ubuntu3~16.04.1 amd64 [installed]
xserver-xorg-input-evdev-hwe-16.04/xenial-updates,now 1:2.10.5-1ubuntu1~16.04.1 amd64 [installed]
xserver-xorg-input-synaptics-hwe-16.04/xenial-updates,now 1.9.0-1ubuntu1~16.04.1 amd64 [installed]
xserver-xorg-input-wacom-hwe-16.04/xenial-updates,now 1:0.34.0-0ubuntu2~16.04.1 amd64 [installed]
xserver-xorg-legacy-hwe-16.04/xenial-updates,xenial-security,now 2:1.19.6-1ubuntu4.1~16.04.2 amd64 [installed,automatic]
xserver-xorg-video-all-hwe-16.04/xenial-updates,now 1:7.7+16ubuntu3~16.04.1 amd64 [installed]
xserver-xorg-video-amdgpu-hwe-16.04/xenial-updates,now 18.0.1-1~16.04.1 amd64 [installed]
xserver-xorg-video-ati-hwe-16.04/xenial-updates,now 1:18.0.1-1~16.04.1 amd64 [installed]
xserver-xorg-video-fbdev-hwe-16.04/xenial-updates,now 1:0.4.4-1build6~16.04.1 amd64 [installed]
xserver-xorg-video-intel-hwe-16.04/xenial-updates,now 2:2.99.917+git20171229-1~16.04.1 amd64 [installed]
xserver-xorg-video-nouveau-hwe-16.04/xenial-updates,now 1:1.0.15-2~16.04.1 amd64 [installed]
xserver-xorg-video-qxl-hwe-16.04/xenial-updates,now 0.1.5-2build1~16.04.1 amd64 [installed]
xserver-xorg-video-radeon-hwe-16.04/xenial-updates,now 1:18.0.1-1~16.04.1 amd64 [installed]
xserver-xorg-video-vesa-hwe-16.04/xenial-updates,now 1:2.3.4-1build3~16.04.1 amd64 [installed]
xserver-xorg-video-vmware-hwe-16.04/xenial-updates,now 1:13.2.1-1build1~16.04.1 amd64 [installed]

```


----------

## The next step

I might be suffering from packages being held back:

- https://askubuntu.com/questions/601/the-following-packages-have-been-kept-back-why-and-how-do-i-solve-it

Because all three packages exist in **16.04** they just aren't being upgraded to **19.04**:

``` 
$ apt list unity-control-center
Listing... Done
unity-control-center/xenial-updates,now 15.04.0+16.04.20171130-0ubuntu1 amd64 [installed]
N: There is 1 additional version. Please use the '-a' switch to see it

$ apt list libqt5core5a
Listing... Done
libqt5core5a/xenial-updates,xenial-security,now 5.5.1+dfsg-16ubuntu7.6 amd64 [installed]
N: There is 1 additional version. Please use the '-a' switch to see it

$ apt list libdouble-conversion1v5
Listing... Done
libdouble-conversion1v5/xenial,now 2.0.1-3ubuntu2 amd64 [installed]

```

The answers in the link have many suggestions, the first one I'll try after work is:

``` 
sudo apt-get --with-new-pkgs upgrade

```
