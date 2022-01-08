---
layout:       post
title:        >
    Downgrade of kernel fails
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092385
type:         Answer
tags:         kernel gcc grub
created_date: 2018-11-12 23:39:10
edit_date:    2018-11-13 00:07:32
votes:        "2 "
favorites:    
views:        "432 "
accepted:     
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    true
---

Rather than compiling a kernel, you can use a pre-compiled version released by Ubuntu. `3.16` kernel chain is supported and it might suit your needs.

In your browser address bar paste this: `http://kernel.ubuntu.com/~kernel-ppa/mainline/`.

- Use <kbd>Ctrl</kbd>+<kbd>F</kbd> to bring up search. 
- Use `3.16` as a search string. 
- Tap <kbd>PgDn</kbd> key until the screen changes to the image below.

[![kernel 3.16 index.png][1]][1]

Notice how `3.16.60` was just compiled on November 6, 2018 by the Ubuntu Kernel Farm. Click on `3.16.60` link and this screen appears:

[![kernel 3.16.60 download.png][2]][2]

Click the links under AMD64 to download:

-  linux-headers-3.16.60-031660_3.16.60-031660.201810220732_all.deb
-  linux-headers-3.16.60-031660-generic_3.16.60-031660.201810220732_amd64.deb
-  linux-image-3.16.60-031660-generic_3.16.60-031660.201810220732_amd64.deb

Change to your downloads directory:

``` 
cd ~/Downloads

```

Keep repeating command until all three files are downloaded with right size:

``` 
$ ll *.deb
-rw-rw-r-- 1 rick rick  9064576 Nov 12 16:40 linux-headers-3.16.60-031660_3.16.60-031660.201810220732_all.deb
-rw-rw-r-- 1 rick rick   693010 Nov 12 16:39 linux-headers-3.16.60-031660-generic_3.16.60-031660.201810220732_amd64.deb
-rw-rw-r-- 1 rick rick 54562272 Nov 12 16:40 linux-image-3.16.60-031660-generic_3.16.60-031660.201810220732_amd64.deb

```

Install the kernel files for `3.16.60`:

``` 
sudo dpkg -i *.deb
Selecting previously unselected package linux-headers-3.16.60-031660.
(... SNIP ...)
dpkg: dependency problems prevent configuration of linux-image-3.16.60-031660-generic:
 linux-image-3.16.60-031660-generic depends on module-init-tools (>= 3.3-pre11-4ubuntu3); however:
  Package module-init-tools is not installed.

dpkg: error processing package linux-image-3.16.60-031660-generic (--install):
 dependency problems - leaving unconfigured
Errors were encountered while processing:
 linux-image-3.16.60-031660-generic

```

**OH OH** There is a dependency problem. Install missing module:

{% include copyHeader.html %}
``` 
$ sudo apt install module-init-tools
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  module-init-tools
0 upgraded, 1 newly installed, 0 to remove and 15 not upgraded.
1 not fully installed or removed.
Need to get 2,372 B of archives.
After this operation, 18.4 kB of additional disk space will be used.
Get:1 http://ca.archive.ubuntu.com/ubuntu xenial-updates/universe amd64 module-init-tools all 22-1ubuntu5.1 [2,372 B]
Fetched 2,372 B in 0s (7,745 B/s)             
Selecting previously unselected package module-init-tools.
(Reading database ... 346572 files and directories currently installed.)
Preparing to unpack .../module-init-tools_22-1ubuntu5.1_all.deb ...
Unpacking module-init-tools (22-1ubuntu5.1) ...
Setting up module-init-tools (22-1ubuntu5.1) ...
Setting up linux-image-3.16.60-031660-generic (3.16.60-031660.201810220732) ...
Running depmod.
update-initramfs: deferring update (hook will be called later)
Examining /etc/kernel/postinst.d.
run-parts: executing /etc/kernel/postinst.d/apt-auto-removal 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
run-parts: executing /etc/kernel/postinst.d/dkms 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
run-parts: executing /etc/kernel/postinst.d/initramfs-tools 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
update-initramfs: Generating /boot/initrd.img-3.16.60-031660-generic
run-parts: executing /etc/kernel/postinst.d/pm-utils 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
run-parts: executing /etc/kernel/postinst.d/unattended-upgrades 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
run-parts: executing /etc/kernel/postinst.d/update-notifier 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
run-parts: executing /etc/kernel/postinst.d/zz-update-grub 3.16.60-031660-generic /boot/vmlinuz-3.16.60-031660-generic
Generating grub configuration file ...
    (... SNIP ...)
done

```

**AFTER** missing module is installed, kernel `3.16.60` installation carries on where it left off.


----------

Booting with `3.16.60` works OK for me but I loose:

- Kernel features for NVMe M.2 SSD Gen 3.0 x 4 suspend / resume.
- Kernel features to set laptop display brightness to last setting.
- nVidia display driver features.
- Support for Thunderbolt Type C DPI to HDMI converter is lost.
- Grub overrides are needed to avoid login loop. <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> needed to access console.

  [1]: https://i.stack.imgur.com/iNqtUm.png
  [2]: https://i.stack.imgur.com/bMazC.png




