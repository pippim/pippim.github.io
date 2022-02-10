---
layout:       post
title:        >
    Error unknown command hwmatch
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/869670
type:         Answer
tags:         boot grub2 raid
created_date: 2017-01-09 02:25:25
edit_date:    2017-03-20 10:18:11
votes:        "5 "
favorites:    
views:        "24,502 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-09-Error-unknown-command-hwmatch.md
toc:          false
navigation:   false
clipboard:    true
---

Dealing strictly with the `hwmatch` problem look into `/etc/grub.d/10_linux` and you will find it listed something like this near the bottom (9th line down on this display):

{% include copyHeader.html %}
``` 
# Use ELILO's generic "efifb" when it's known to be available.
# FIXME: We need an interface to select vesafb in case efifb can't be used.
if [ "x$GRUB_GFXPAYLOAD_LINUX" != x ] || [ "$gfxpayload_dynamic" = 0 ]; then
  echo "set linux_gfx_mode=$GRUB_GFXPAYLOAD_LINUX"
else
  cat << EOF
if [ "\${recordfail}" != 1 ]; then
  if [ -e \${prefix}/gfxblacklist.txt ]; then
    if hwmatch \${prefix}/gfxblacklist.txt 3; then
      if [ \${match} = 0 ]; then
        set linux_gfx_mode=keep
      else
        set linux_gfx_mode=text
      fi
    else
      set linux_gfx_mode=text
    fi
  else
    set linux_gfx_mode=keep
  fi
else
  set linux_gfx_mode=text
fi
EOF
fi
```

For whatever reason your grub installation is incomplete and missing `hwmatch` module. You should see it among many other files when you use `ll /boot/grub/i386-pc`:

{% include copyHeader.html %}
``` 
-rw-r--r-- 1 root root  47292 Dec  5 07:13 hwmatch.mod
-rw-r--r-- 1 root root   2928 Dec  5 07:13 iorw.mod
-rw-r--r-- 1 root root   8656 Dec  5 07:13 iso9660.mod
-rw-r--r-- 1 root root   6168 Dec  5 07:13 jfs.mod
-rw-r--r-- 1 root root   6280 Dec  5 07:13 jpeg.mod
-rw-r--r-- 1 root root   5112 Dec  5 07:13 keylayouts.mod
-rw-r--r-- 1 root root   2044 Dec  5 07:13 keystatus.mod
-rw-r--r-- 1 root root   6608 Dec  5 07:13 ldm.mod
-rw-r--r-- 1 root root  29816 Dec  5 07:13 legacycfg.mod
-rw-r--r-- 1 root root  14536 Dec  5 07:13 legacy_password_test.mod
-rw-r--r-- 1 root root   8048 Dec  5 07:13 linux16.mod
-rw-r--r-- 1 root root  13184 Dec  5 07:13 linux.mod
-rw-r--r-- 1 root root    100 Dec  5 07:13 load.cfg
-rw-r--r-- 1 root root   5924 Dec  5 07:13 loadenv.mod
-rw-r--r-- 1 root root   3056 Dec  5 07:13 loopback.mod
-rw-r--r-- 1 root root   4872 Dec  5 07:13 lsacpi.mod
-rw-r--r-- 1 root root   2352 Dec  5 07:13 lsapm.mod
-rw-r--r-- 1 root root   1884 Dec  5 07:13 lsmmap.mod
-rw-r--r-- 1 root root   4136 Dec  5 07:13 ls.mod
-rw-r--r-- 1 root root   4928 Dec  5 07:13 lspci.mod
-rw-r--r-- 1 root root   6724 Dec  5 07:13 luks.mod
-rw-r--r-- 1 root root   6776 Dec  5 07:13 lvm.mod
```

As per this bug report ([bugs.launchpad.net - Ubuntu Upgrade from Lucid to Precise results in broken grub configuration][1]) the easiest way of getting all the grub modules is to reinstall it.

> You should run `sudo dpkg-reconfigure grub-pc` and instruct it to  
> install the boot loader somewhere, probably /dev/vda.  

Above is a direct quote from the bug report. As a comment here points out and looking at your link, this should be used instead:

``` 
sudo dpkg-reconfigure grub-efi-amd64
```

However looking at this post ([superuser.com - How to reinstall grub2 efi][2]) you must first boot with a live USB/DVD and use:

``` 
sudo mount /dev/sda2 /mnt #sda2 is the root partition
sudo mount /dev/sda1 /mnt/boot/efi #sda1 is the efi partition
for i in /dev /dev/pts /proc /sys; do sudo mount -B $i /mnt$i; done
sudo cp /etc/resolv.conf /mnt/etc/ #makes the network available after chrooting
modprobe efivars # make sure this is loaded
sudo chroot /mnt
```

The first step is to confirm that the file `hwmatch` is really missing. If so the easiest method is to simply copy it from:

``` 
/usr/lib/grub/i386-pc/hwmatch.mod
```

into the directory:

``` 
/boot/efi/efi/grub
```

This directory name comes from ([https://help.ubuntu.com/community/UEFIBooting][3]) where they say that is "mostly" the directory name. Please confirm for your installation.

The more complicated methods of `dpkg-reconfigure` should be approached with *extreme caution* and only after appropriate backups.


  [1]: https://bugs.launchpad.net/ubuntu/+source/update-manager/+bug/949992
  [2]: https://superuser.com/questions/376470/how-to-reinstall-grub2-efi
  [3]: https://help.ubuntu.com/community/UEFIBooting
