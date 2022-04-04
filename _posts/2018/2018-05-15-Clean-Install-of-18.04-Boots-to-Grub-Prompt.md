---
layout:       post
title:        >
    Clean Install of 18.04 Boots to Grub Prompt
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1036579
type:         Answer
tags:         grub2 18.04
created_date: 2018-05-15 15:17:10
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "28,975 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-15-Clean-Install-of-18.04-Boots-to-Grub-Prompt.md
toc:          false
navigation:   false
clipboard:    false
---

## Reinstall Ubuntu in CSM / Legacy mode

There was confusion about whether your installation was UEFI or CSM (Legacy BIOS mode). Recent comments show it's the latter. Using this [reference](https://help.ubuntu.com/community/UEFI):

### Converting Ubuntu into Legacy mode

**Note:** Use this procedure only to convert an UEFI-mode Linux installation to boot in BIOS/CSM/legacy mode. Such a conversion may be necessary if some hardware doesn't work correctly under UEFI mode. (Video cards are a common source of problems.) Converting to boot in BIOS/CSM/legacy mode while Windows boots in UEFI mode can make the boot process more awkward -- you'll need to use the computer's built-in boot manager to switch between OSes, and some computer's have such poor boot managers that this may be impossible.

1.  If Ubuntu is installed on a GPT disk (you can check it via the 'sudo parted -l' command), use Gparted to create a BIOS-Boot partition (1MB, unformatted filesystem, bios_grub flag) at the start of its disk.

2.  Start Boot-Repair, click on "Advanced options", go to the "GRUB location" tab.
3.  Untick the "Separate /boot/efi partition" option
4.  Click the "Apply" button.

5.  Set up your BIOS so that it boots the HDD in Legacy mode (see the ""Set up the BIOS in UEFI or Legacy mode" paragraph above). 


----------

### Original answer below

You are trying to install `grub` to your root partition but it needs to go into the EFI partition which is about 500 MB usually. Full instructions are available [here](https://wiki.archlinux.org/index.php/GRUB)

Basically the correct syntax is:

``` 
sudo grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB
```
