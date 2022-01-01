---
layout:       post
title:        >
    Call Grub (MBR) from Linux
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/39887196
type:         Question
tags:         assemblies mbr grub2
created_date: !!str "2016-10-06 03:46:20"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    1
views:        !!str "63"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

I need an ASSEMBLER tool.

I need to switch processor from protected mode to real mode.

I need to copy the first 512 bytes of First Sector of first drive (it's an SSD now) to 0000:07c0 and JMP to that location.

In effect I need to boot Grub2 from Linux by-passing BIOS POST to save a few seconds in `sudo reboot`.

Any ideas?
