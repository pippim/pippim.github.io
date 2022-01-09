---
layout:       post
title:        >
    Unable to upgrade kernel after 4.16.3
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1030377
type:         Answer
tags:         16.04 upgrade kernel grub
created_date: 2018-05-01 01:21:40
edit_date:    2018-10-28 15:07:06
votes:        "10 "
favorites:    
views:        "19,303 "
accepted:     Accepted
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# October 28, 2018 Update

For dkms support of nVidia, bbswitch and virtual box compiling use:

``` 
sudo apt install libelf-dev

```

To circumvent newer `linux-header` installation errors download: [libssl1.1][1]

Download the [newer kernels][2] you want and your `~/Downloads` should look like this:

``` 
$ ll *.deb
-rw-rw-r-- 1 rick rick  1128420 Oct 28 08:33 libssl1.1_1.1.0g-2ubuntu4.1_amd64.deb
-rw-rw-r-- 1 rick rick 10741128 Oct 28 08:05 linux-headers-4.14.78-041478_4.14.78-041478.201810200529_all.deb
-rw-rw-r-- 1 rick rick  1052200 Oct 28 08:05 linux-headers-4.14.78-041478-generic_4.14.78-041478.201810200529_amd64.deb
-rw-rw-r-- 1 rick rick  8243552 Oct 28 08:05 linux-image-unsigned-4.14.78-041478-generic_4.14.78-041478.201810200529_amd64.deb
-rw-rw-r-- 1 rick rick 47559380 Oct 28 08:06 linux-modules-4.14.78-041478-generic_4.14.78-041478.201810200529_amd64.deb

```

Now you should be able to successfully install:

``` 
sudo dpkg -i *.deb
## 
```





<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# Original Answer

Kernels `4.14.xx`, `4.16.xx` and `4.17.rc(xx)` all share the same bug over this last week; April 24-30, 2018.

I just tried `4.14.38` tonight and it exhibits the same errors as `4.14.36` and `4.14.37` as documented in this [bug report][3].

In my case tonight the errors are:

{% include copyHeader.html %}
``` 
$ sudo dpkg -i *.deb
Selecting previously unselected package linux-headers-4.14.38-041438.
(Reading database ... 641792 files and directories currently installed.)
Preparing to unpack linux-headers-4.14.38-041438_4.14.38-041438.201804300419_all.deb ...
Unpacking linux-headers-4.14.38-041438 (4.14.38-041438.201804300419) ...
Selecting previously unselected package linux-headers-4.14.38-041438-generic.
Preparing to unpack linux-headers-4.14.38-041438-generic_4.14.38-041438.201804300419_amd64.deb ...
Unpacking linux-headers-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
Selecting previously unselected package linux-image-unsigned-4.14.38-041438-generic.
Preparing to unpack linux-image-unsigned-4.14.38-041438-generic_4.14.38-041438.201804300419_amd64.deb ...
Unpacking linux-image-unsigned-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
Selecting previously unselected package linux-modules-4.14.38-041438-generic.
Preparing to unpack linux-modules-4.14.38-041438-generic_4.14.38-041438.201804300419_amd64.deb ...
Unpacking linux-modules-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
Setting up linux-headers-4.14.38-041438 (4.14.38-041438.201804300419) ...
dpkg: dependency problems prevent configuration of linux-headers-4.14.38-041438-generic:
 linux-headers-4.14.38-041438-generic depends on libssl1.1 (>= 1.1.0); however:
  Package libssl1.1 is not installed.

dpkg: error processing package linux-headers-4.14.38-041438-generic (--install):
 dependency problems - leaving unconfigured
Setting up linux-modules-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
Setting up linux-image-unsigned-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
/var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.postinst: 50: /var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.postinst: linux-update-symlinks: not found
dpkg: error processing package linux-image-unsigned-4.14.38-041438-generic (--install):
 subprocess installed post-installation script returned error exit status 127
Errors were encountered while processing:
 linux-headers-4.14.38-041438-generic
 linux-image-unsigned-4.14.38-041438-generic

```

To fix errors I tried `sudo apt install -f` but it won't fix it plus causes a "crash report":

[![Kernel 4.14.38 crash.png][4]][4]

Using [`sudo rm-kernels`][5] I removed `4.14.38` as much as I could:

[![remove 4.14.38 kernel][6]][6]

This time around only the headers were successfully removed:

``` 
The following packages will be REMOVED:
  linux-headers-4.14.38-041438*
0 upgraded, 0 newly installed, 1 to remove and 2 not upgraded.
1 not fully installed or removed.
After this operation, 74.6 MB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 665813 files and directories currently installed.)
Removing linux-headers-4.14.38-041438 (4.14.38-041438.201804300419) ...
Setting up linux-image-unsigned-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
/var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.postinst: 50: /var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.postinst: linux-update-symlinks: not found
dpkg: error processing package linux-image-unsigned-4.14.38-041438-generic (--configure):
 subprocess installed post-installation script returned error exit status 127
Errors were encountered while processing:
 linux-image-unsigned-4.14.38-041438-generic
E: Sub-process /usr/bin/dpkg returned an error code (1)

```

Now let's see what is left over:

``` 
$ apt list | grep 4.14.36

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

linux-image-unsigned-4.14.36-041436-generic/now 4.14.36-041436.201804240906 amd64 [residual-config]

```

Let's try to remove it:

{% include copyHeader.html %}
``` 
$ sudo apt remove linux-modules-4.14.38-041438-generic
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  bbswitch-dkms dkms gdm libjansson4 libxnvctrl0 linux-gcp-tools-4.10.0-1008
  linux-gcp-tools-4.10.0-1009 linux-headers-4.4.0-103 linux-headers-4.4.0-103-generic
  linux-image-4.4.0-103-generic linux-image-extra-4.4.0-103-generic
  linux-tools-4.10.0-1008-gcp linux-tools-4.10.0-1009-gcp nvidia-prime nvidia-settings
  python-compizconfig python-pyudev screen-resolution-extra
Use 'sudo apt autoremove' to remove them.
The following packages will be REMOVED:
  linux-image-unsigned-4.14.38-041438-generic linux-modules-4.14.38-041438-generic
0 upgraded, 0 newly installed, 2 to remove and 2 not upgraded.
After this operation, 296 MB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 641771 files and directories currently installed.)
Removing linux-image-unsigned-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
/var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.prerm: 11: /var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.prerm: linux-check-removal: not found
dpkg: error processing package linux-image-unsigned-4.14.38-041438-generic (--remove):
 subprocess installed pre-removal script returned error exit status 127
dpkg: linux-modules-4.14.38-041438-generic: dependency problems, but removing anyway as you requested:
 linux-image-unsigned-4.14.38-041438-generic depends on linux-modules-4.14.38-041438-generic.

Removing linux-modules-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
Errors were encountered while processing:
 linux-image-unsigned-4.14.38-041438-generic
E: Sub-process /usr/bin/dpkg returned an error code (1)

```

Edit the file `/var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.prerm`:

``` 
#!/bin/sh
set -e

version=4.14.38-041438-generic
image_path=/boot/vmlinuz-$version
    (... SNIP ...)

```

Just below the first line `#!/bin/sh` insert a new line:

``` 
exit 0

```

Save the file and rerun the failed command:

{% include copyHeader.html %}
``` 
$ sudo apt remove linux-image-unsigned-4.14.38-041438-generic
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  bbswitch-dkms dkms gdm libjansson4 libxnvctrl0 linux-gcp-tools-4.10.0-1008
  linux-gcp-tools-4.10.0-1009 linux-headers-4.4.0-103 linux-headers-4.4.0-103-generic
  linux-image-4.4.0-103-generic linux-image-extra-4.4.0-103-generic
  linux-tools-4.10.0-1008-gcp linux-tools-4.10.0-1009-gcp nvidia-prime nvidia-settings
  python-compizconfig python-pyudev screen-resolution-extra
Use 'sudo apt autoremove' to remove them.
The following packages will be REMOVED:
  linux-image-unsigned-4.14.38-041438-generic
0 upgraded, 0 newly installed, 1 to remove and 2 not upgraded.
After this operation, 8,663 kB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 635588 files and directories currently installed.)
Removing linux-image-unsigned-4.14.38-041438-generic (4.14.38-041438.201804300419) ...
/var/lib/dpkg/info/linux-image-unsigned-4.14.38-041438-generic.postrm ... removing pending trigger
/etc/kernel/postrm.d/initramfs-tools:
update-initramfs: Deleting /boot/initrd.img-4.14.38-041438-generic
/etc/kernel/postrm.d/zz-update-grub:
Generating grub configuration file ...
Found background: /home/rick/Pictures/1600x900/19.jpg
Found background image: /home/rick/Pictures/1600x900/19.jpg
Found linux image: /boot/vmlinuz-4.14.34-041434-generic
Found initrd image: /boot/initrd.img-4.14.34-041434-generic
Found linux image: /boot/vmlinuz-4.14.31-041431-generic
Found initrd image: /boot/initrd.img-4.14.31-041431-generic
Found linux image: /boot/vmlinuz-4.14.30-041430-generic
Found initrd image: /boot/initrd.img-4.14.30-041430-generic
Found linux image: /boot/vmlinuz-4.14.27-041427-generic
Found initrd image: /boot/initrd.img-4.14.27-041427-generic
Found linux image: /boot/vmlinuz-4.14.15-041415-generic
Found initrd image: /boot/initrd.img-4.14.15-041415-generic
Found linux image: /boot/vmlinuz-4.14.10-041410-generic
Found initrd image: /boot/initrd.img-4.14.10-041410-generic
Found linux image: /boot/vmlinuz-4.14.4-041404-generic
Found initrd image: /boot/initrd.img-4.14.4-041404-generic
Found linux image: /boot/vmlinuz-4.14.2-041402-generic
Found initrd image: /boot/initrd.img-4.14.2-041402-generic
Found linux image: /boot/vmlinuz-4.13.9-041309-generic
Found initrd image: /boot/initrd.img-4.13.9-041309-generic
Found linux image: /boot/vmlinuz-4.10.0-42-generic
Found initrd image: /boot/initrd.img-4.10.0-42-generic
Found linux image: /boot/vmlinuz-4.9.77-040977-generic
Found initrd image: /boot/initrd.img-4.9.77-040977-generic
Found linux image: /boot/vmlinuz-4.4.0-104-generic
Found initrd image: /boot/initrd.img-4.4.0-104-generic
Found linux image: /boot/vmlinuz-4.4.0-103-generic
Found initrd image: /boot/initrd.img-4.4.0-103-generic
Found linux image: /boot/vmlinuz-3.16.53-031653-generic
Found initrd image: /boot/initrd.img-3.16.53-031653-generic
Found Windows Boot Manager on /dev/nvme0n1p2@/EFI/Microsoft/Boot/bootmgfw.efi
Found Ubuntu 18.04 LTS (18.04) on /dev/nvme0n1p8
Found Windows Boot Manager on /dev/sda1@/efi/Microsoft/Boot/bootmgfw.efi
Adding boot menu entry for EFI firmware configuration
done

```

Double check everything is ok:

``` 
$ sudo apt install -f
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  bbswitch-dkms dkms gdm libjansson4 libxnvctrl0 linux-gcp-tools-4.10.0-1008
  linux-gcp-tools-4.10.0-1009 linux-headers-4.4.0-103 linux-headers-4.4.0-103-generic
  linux-image-4.4.0-103-generic linux-image-extra-4.4.0-103-generic
  linux-tools-4.10.0-1008-gcp linux-tools-4.10.0-1009-gcp nvidia-prime nvidia-settings
  python-compizconfig python-pyudev screen-resolution-extra
Use 'sudo apt autoremove' to remove them.
0 upgraded, 0 newly installed, 0 to remove and 2 not upgraded.

```


  [1]: https://packages.ubuntu.com/bionic/amd64/libssl1.1/download
  [2]: http://kernel.ubuntu.com/~kernel-ppa/mainline/
  [3]: https://bugs.launchpad.net/ubuntu/+source/linux-base/+bug/1766851
  [4]: https://i.stack.imgur.com/NWARG.png
  [5]: {% post_url /2017/2017-03-11-How-to-selectively-purge-old-kernels-all-at-once %}
  [6]: https://i.stack.imgur.com/tZLnH.png


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a></div>

