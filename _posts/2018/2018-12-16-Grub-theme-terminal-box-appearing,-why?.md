---
layout:       post
title:        >
    Grub theme terminal-box appearing, why?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1102423
type:         Answer
tags:         boot grub2 themes
created_date: 2018-12-16 21:54:51
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "911 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

It's perfectly normal for the black text box to appear empty. Sometimes it will show the "Loading" kernel version though:

[![Grub boot.gif][1]][1]

The purpose of the box is to show terminal messages before the kernel boots and mounts it's own screen with scrolling list of kernel messages.

In this example the "black box" background image was created as cut-out image of the main screen to make it less distracting.

----------

# Putting Boot Text into box

When you boot your first kernel (last installed version) no text is displayed in the box. When you boot older kernels:

- The kernel version number is displayed
- The text "Loading initial ramdisk" is displayed

Although you can write a [script to update][2] `/boot/grub/grub.cfg` it is easiest to simply edit it:

``` 
    echo    'Loading Linux 4.15.0-42-generic ...'
        linux   /boot/vmlinuz-4.15.0-42-generic root=UUID=b40b3925-70ef-447f-923e-1b05467c00e7 ro  noplymouth fastboot acpiphp.disable=1 pcie_aspm=force scsi_mod.use_blk_mq=1 vt.handoff=7 i915.enable_guc_loading=1 i915.enable_guc_submission=1 i915.edp_vswing=2 nopti nospectre_v2 nospec
    echo    'Loading initial ramdisk ...'
    initrd  /boot/initrd.img-4.15.0-42-generic

```

Insert the two `echo` lines in front of the two existing lines.

**Important:** After you, or more often a system update, runs `sudo update-grub` the changes are lost and you will have to manually edit the file again.


  [1]: https://i.stack.imgur.com/tOliY.gif
  [2]: {% post_url /2016/2016-09-09-Editing-OS-names-in-∕etc∕default∕grub---where-is-the-OS-name-read-from? %}
