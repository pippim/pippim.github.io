---
layout:       post
title:        Don't see new kernel after upgrade
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037217
type:         Answer
tags:         grub2 upgrade kernel
created_date: 2018-05-17 04:06:39
edit_date:    2020-06-12 14:37:07
votes:        1
favorites:    
views:        709
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    true
---

## I don't think you want to try `4.16.9` but

Go to: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.16.9/

Select the files:

-  linux-headers-4.16.9-041609_4.16.9-041609.201805161024_all.deb
-  linux-headers-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb
-  linux-image-unsigned-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb
-  linux-modules-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb

for downloading to a directory, say `~/Downloads`.

Then change to the directory, confirm they have finished downloading and install the new kernel:

{% include copyHeader.html %}
``` 
$ cd ~/Downloads
$ ll *.deb
-rw-rw-r-- 1 rick rick 10956316 May 16 21:59 linux-headers-4.16.9-041609_4.16.9-041609.201805161024_all.deb
-rw-rw-r-- 1 rick rick  1062312 May 16 21:59 linux-headers-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb
-rw-rw-r-- 1 rick rick  7938532 May 16 21:59 linux-image-unsigned-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb
-rw-rw-r-- 1 rick rick 45088060 May 16 21:59 linux-modules-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb
$ sudo dpkg -i *.deb
Selecting previously unselected package linux-headers-4.16.9-041609.
(Reading database ... 603082 files and directories currently installed.)
Preparing to unpack linux-headers-4.16.9-041609_4.16.9-041609.201805161024_all.deb ...
Unpacking linux-headers-4.16.9-041609 (4.16.9-041609.201805161024) ...
Selecting previously unselected package linux-headers-4.16.9-041609-generic.
Preparing to unpack linux-headers-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb ...
Unpacking linux-headers-4.16.9-041609-generic (4.16.9-041609.201805161024) ...
Selecting previously unselected package linux-image-unsigned-4.16.9-041609-generic.
Preparing to unpack linux-image-unsigned-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb ...
Unpacking linux-image-unsigned-4.16.9-041609-generic (4.16.9-041609.201805161024) ...
Selecting previously unselected package linux-modules-4.16.9-041609-generic.
Preparing to unpack linux-modules-4.16.9-041609-generic_4.16.9-041609.201805161024_amd64.deb ...
Unpacking linux-modules-4.16.9-041609-generic (4.16.9-041609.201805161024) ...
Setting up linux-headers-4.16.9-041609 (4.16.9-041609.201805161024) ...
dpkg: dependency problems prevent configuration of linux-headers-4.16.9-041609-generic:
 linux-headers-4.16.9-041609-generic depends on libssl1.1 (>= 1.1.0); however:
  Package libssl1.1 is not installed.

dpkg: error processing package linux-headers-4.16.9-041609-generic (--install):
 dependency problems - leaving unconfigured
dpkg: dependency problems prevent configuration of linux-image-unsigned-4.16.9-041609-generic:
 linux-image-unsigned-4.16.9-041609-generic depends on linux-base (>= 4.5ubuntu1~16.04.1); however:
  Version of linux-base on system is 4.0ubuntu1.

dpkg: error processing package linux-image-unsigned-4.16.9-041609-generic (--install):
 dependency problems - leaving unconfigured
Setting up linux-modules-4.16.9-041609-generic (4.16.9-041609.201805161024) ...
Errors were encountered while processing:
 linux-headers-4.16.9-041609-generic
 linux-image-unsigned-4.16.9-041609-generic

```

Then you'll see an error message because of this [bug][1]. Now you'll have to fix it using this answer: https://askubuntu.com/questions/1030043/unable-to-upgrade-kernel-after-4-16-3


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux-base/+bug/1766851
