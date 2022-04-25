---
layout:       post
title:        >
    Boot-Repair created too many grub menu entries for Windows
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022700
type:         Answer
tags:         dual-boot grub2 uefi
created_date: 2018-04-06 23:38:56
edit_date:    2020-06-12 14:37:07
votes:        "13 "
favorites:    
views:        "12,668 "
accepted:     
uploaded:     2022-04-24 19:32:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows.md
toc:          false
navigation:   false
clipboard:    true
---

Every time I've run `boot-repair` it adds a **5** extra Windows boot options to my main `grub` menu that do not work. In your case it has added **11** extra entries!

## `grub.cfg` shows the problem

The secret can be found within `/etc/grub/grub.cfg` file: 



{% include copyHeader.html %}
``` bash
### BEGIN /etc/grub.d/25_custom ###
    menuentry "Windows UEFI bootmgfw.efi" {
search --fs-uuid --no-floppy --set=root D656-F2A8
chainloader (${root})/EFI/Microsoft/Boot/bootmgfw.efi
}

menuentry "Windows Boot UEFI loader" {
search --fs-uuid --no-floppy --set=root D656-F2A8
chainloader (${root})/EFI/Boot/bkpbootx64.efi
}

menuentry "EFI/ubuntu/fwupx64.efi" {
search --fs-uuid --no-floppy --set=root D656-F2A8
chainloader (${root})/EFI/ubuntu/fwupx64.efi
}

menuentry "Windows UEFI bootmgfw.efi sda1" {
search --fs-uuid --no-floppy --set=root 9478-B6E2
chainloader (${root})/EFI/Microsoft/Boot/bootmgfw.efi
}

menuentry "Windows Boot UEFI loader sda1" {
search --fs-uuid --no-floppy --set=root 9478-B6E2
chainloader (${root})/EFI/Boot/bkpbootx64.efi
### END /etc/grub.d/25_custom ###

### BEGIN /etc/grub.d/30_os-prober ###
menuentry 'Windows Boot Manager (on /dev/nvme0n1p2)' --class windows --class os $menuentry_id_option 'osprober-efi-D656-F2A8' {
    savedefault
    insmod part_gpt
    insmod fat
    if [ x$feature_platform_search_hint = xy ]; then
      search --no-floppy --fs-uuid --set=root  D656-F2A8
    else
      search --no-floppy --fs-uuid --set=root D656-F2A8
    fi
    chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
menuentry 'Windows Boot Manager (on /dev/sda1)' --class windows --class os $menuentry_id_option 'osprober-efi-9478-B6E2' {
    savedefault
    insmod part_gpt
    insmod fat
    set root='hd0,gpt1'
    if [ x$feature_platform_search_hint = xy ]; then
      search --no-floppy --fs-uuid --set=root --hint-bios=hd0,gpt1 --hint-efi=hd0,gpt1 --hint-baremetal=ahci0,gpt1  9478-B6E2
    else
      search --no-floppy --fs-uuid --set=root 9478-B6E2
    fi
    chainloader /efi/Microsoft/Boot/bootmgfw.efi
}
### END /etc/grub.d/30_os-prober ###
```

The section `30_os-prober` contains the "good" Windows `grub` menu entries you want to keep. Section `25_custom` contains the bogus entries created by `boot-repair`. You can't edit the grub configuration file because it will simply be overwritten the next time `update-grub` is run.


----------

## Section `25_custom` was created by Boot Repair

On my system:

``` bash
$ locate 25_custom
/boot/efi/boot-repair/log/20171111_224241/nvme0n1p5/25_custom
/boot/efi/boot-repair/log/20171208_030854/nvme0n1p5/25_custom
/etc/grub.d/25_custom
```

Take a look at the extra Windows options that were setup (and don't work):

{% include copyHeader.html %}
``` bash
$ cat /boot/efi/boot-repair/log/20171208_030854/nvme0n1p5/25_custom
#!/bin/sh
exec tail -n +3 $0

menuentry "Windows UEFI bootmgfw.efi" {
search --fs-uuid --no-floppy --set=root D656-F2A8
chainloader (${root})/EFI/Microsoft/Boot/bootmgfw.efi
}

menuentry "Windows Boot UEFI loader" {
search --fs-uuid --no-floppy --set=root D656-F2A8
chainloader (${root})/EFI/Boot/bkpbootx64.efi
}

menuentry "EFI/ubuntu/fwupx64.efi" {
search --fs-uuid --no-floppy --set=root D656-F2A8
chainloader (${root})/EFI/ubuntu/fwupx64.efi
}

menuentry "Windows UEFI bootmgfw.efi sda1" {
search --fs-uuid --no-floppy --set=root 9478-B6E2
chainloader (${root})/EFI/Microsoft/Boot/bootmgfw.efi
}

menuentry "Windows Boot UEFI loader sda1" {
search --fs-uuid --no-floppy --set=root 9478-B6E2
chainloader (${root})/EFI/Boot/bkpbootx64.efi
```

These are the erroneous entries `boot-repair` created in `/etc/grub.d/25_custom` that were subsequently compiled into `\boot\grub\grub.cfg`.


----------

## Reverse Boot Repair's change to `25_custom`

Use `sudo -H gedit /etc/grub.d/25_custom` and delete everything except the first three lines:

``` sh
#!/bin/sh
exec tail -n +3 $0

```

- The file now contains two lines with text and one blank line.
- Save the file.
- Run `sudo update-grub`.
- Reboot.

Now your menu is no longer bloated with five bogus Windows menu entries that don't work.

### Double-check there are three lines in `25_custom`

Run this command and verify `25_custom` has three lines:

``` bash
$ wc /etc/grub.d/25_custom
      3       6      30
#     ^       ^       ^
#     |       |       +--- Number of characters
#     |       +----------- Number of words
#     +------------------- Number of lines
```

I added the `#` comments to decipher `wc` (word count) output.
