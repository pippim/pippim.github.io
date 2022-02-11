---
layout:       post
title:        >
    How can I reboot extra fast?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/982797
type:         Answer
tags:         boot grub2 uefi login reboot yad
created_date: 2017-12-03 17:37:58
edit_date:    2017-12-05 04:56:25
votes:        "3 "
favorites:    
views:        "6,240 "
accepted:     
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-03-How-can-I-reboot-extra-fast_.md
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Reboot times

We can procrastinate rebooting at times in this world of "overly busy" and not wanting to waste 5 or 15 seconds. When I had first looked at this question my boot times had gone from 45 seconds to 14 seconds with an SSD and `systemd` tweaking.

Recently I acquired a "modern" laptop with a NVMe M.2 Gen 3.0 x 4 SSD with blazing 3.4 GB/s Windows read speed and 2 GB/s Linux read speed. So it should be faster right? Um... no. It's painfully slower:

``` 
$ systemd-analyze
Startup finished in 6.823s (firmware) + 4.447s (loader) + 3.467s (kernel) + 8.412s (userspace) = 23.151s
```

This time is actually **after** tweaking. It was much worse 80 seconds because nVidia and Dell choose to cut power to HDMI audio on nVidia GTX970M graphics card which drives the HDMI port. As such a `setpci` command was required which caused "low grapics error" message and you had to wait 20 seconds for mouse pointer to proceed. Then it would reload all graphic drivers and restart lightdm.

Another problem with the "modern" laptop is BIOS POST was taking 15 seconds. Tweaks in BIOS to turn off hardware error checking, turn off loading boot drivers for NICs and other tweaks I can't remember just now changed BIOS POST time to 6 seconds. By comparison the "old" laptop BIOS POST time was only a couple of seconds using Legacy BIOS CSM and no BIOS tweaking.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Ubuntu's `RapidReboot` project from 2010

The Ubuntu [RapidReboot][1] project mention in ByteCommander's post is from 2010. The project's rationale is summed up thusly:

> ### Rationale  
>   
> There are a few cases where we can safely assume the user does not  
> want to see the boot loader; in these cases, we should use kexec to  
> avoid long reboots, BIOS POSTs, and boot loader time. This can take 10  
> seconds in optimal situations; but with SCSI or RAID BIOS and network  
> boot roms, the time can climb to 20, 30, or even over 60 seconds, even  
> in cases where the time between loading the kernel and seeing the  
> log-in screen is 30-60 seconds.  

The project's usage examples:

> ### Use cases  
> - Bob has just upgraded his kernel; update-notifier informs him he must reboot for the changes to take effect, and the 'Restart' button  
> uses kexec to make this faster.  
> - Alice just upgraded dbus; update-notifier tells her to restart, and uses kexec.  
> - Seveas has performed several updates in the past month, and now is under three times as much memory pressure due to different programs  
> using different copies of shared libraries. He decides to reboot to  
> clear this up, and uses a "Quick Reboot" to make this faster.  
> - Keybuk just installed Ubuntu Edgy and wants to boot into it. The LiveCD loads the target kernel and initrd with kexec; umounts all  
> disk-based file systems; sync; and then uses kexec to start the new  
> system rather than rebooting.  


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Using kexec to reboot

`kexec` is the magic spell we cast to reboot without BIOS post and some other low level discovery mechanisms such as RAID setup.


## Kernel must be compiled with `CONFIG_KEXEC` flag

The first step is to ensure your kernel was compiled with the `CONFIG_KEXEC=y` option:

``` 
$ uname -r
4.14.2-041402-generic
$ grep KEXEC= /boot/config-`uname -r`
CONFIG_KEXEC=y
```

The first command `uname -r` is optional just to show what kernel you've booted with. As we can see on the second command the kernel is compiled by Ubuntu team with the necessary flag set. Not sure when this was added but likely <= year 2012.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Install `kexec-tools`

The next step is to install the `kexec` tools for user space:

``` 
$sudo apt install kexec-tools
```

After normal binary downloads you are greeted with this screen:

[![kexec-tools install.png][2]][2]

I answered `No` in part because of this bug report that the option is not relevant in `systemd`.

Then the installation continues (snippet shown below):

``` 
Unpacking kexec-tools (1:2.0.10-1ubuntu2.4) ...
Processing triggers for man-db (2.7.5-1) ...
Processing triggers for systemd (229-4ubuntu21) ...
Setting up kexec-tools (1:2.0.10-1ubuntu2.4) ...
Generating /etc/default/kexec...
Generating grub configuration file ...
  (... CUT ...)
Found Windows Boot Manager on /dev/nvme0n1p2@/EFI/Microsoft/Boot/bootmgfw.efi
Found Windows Boot Manager on /dev/sda1@/efi/Microsoft/Boot/bootmgfw.efi
Adding boot menu entry for EFI firmware configuration
done
Processing triggers for systemd (229-4ubuntu21) ...
```


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Configuring `kexec`

Our cohorts at ArchLinux have [great documentation for kexec][3] but it needs massaging for Ubuntu / Debian distributions.

### Basic usage are with two commands:

``` 
sudo kexec -l /boot/vmlinuz-`uname -r` --initrd=/boot/initrd.img-`uname -r` --reuse-cmdline
sudo kexec -e
```

from this point forward it appears every time you click reboot it automatically reloads the last kernel in fast reboot mode.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## Using Systemd to load kexec

Create the file `/etc/systemd/system/kexec-load@.service`:

``` 
[Unit]
Description=load %i kernel into the current kernel
Documentation=man:kexec(8)
DefaultDependencies=no
Before=shutdown.target umount.target final.target

[Service]
Type=oneshot
ExecStart=/usr/bin/kexec -l /boot/vmlinuz-%i --initrd=/boot/initrd.img-%i --reuse-cmdline

[Install]
WantedBy=kexec.target
```


Then enable the service file for the kernel you want to load, for example to simply set the current kernel `uname -r`:

``` 
$ sudo systemctl enable kexec-load@`uname -r`
Created symlink from /etc/systemd/system/kexec.target.wants/kexec-load@4.4.0-101-generic.service to /etc/systemd/system/kexec-load@.service.
```

Then to kexec:

``` 
$ sudo systemctl kexec
```

If you have `youtube` running there might be a system inhibitor preventing you from rebooting in which case use:

``` 
$ sudo systemctl kexec -i
```

If you wish to load a different kernel for the next kexec, for example 4.12.2-041202-generic, disable the service for the current kernel and enable the one for the new kernel:

``` 
$ sudo systemctl disable kexec-load@`uname -r`
$ sudo systemctl enable kexec-load@4.12.2-041202-generic
```


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

# More to come

I have to post this answer now as it's time to boot, fix, boot, fix, repeat. I have a complicated setup where `systemd` loads five `nVidia` drivers which I have to unload, run `setpci` to power on audio to hdmi, reload nVidia drivers and restart lightdm. It might take awhile to work out.

After getting the `cli` methods working I'll create a desktop shortcut for one-click rebooting with `sudo` password prompt. After that I'll create a desktop shortcut to a `yad` dialog box allowing you to pick from installed kernels to reboot. Similar to grub's advanced options menu.

  [1]: https://wiki.ubuntu.com/RapidReboot
  [2]: https://i.stack.imgur.com/UFmGv.png
  [3]: https://wiki.archlinux.org/index.php/kexec
  [4]: https://stackoverflow.com/questions/42790410/simplest-chainloading-a-boot-manager


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

