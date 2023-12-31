---
layout:       post
title:        >
    How can I change the boot sequence in Ubuntu 23.10?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1494740
type:         Answer
tags:         boot suspend wayland 23.10 app-center grub
created_date: 2023-12-03 01:02:26
edit_date:    
votes:        "1 "
favorites:    
views:        "157 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2023/2023-12-03-How-can-I-change-the-boot-sequence-in-Ubuntu-23.10_.md
toc:          false
navigation:   false
clipboard:    false
---

This answer will solve some of your problems:

- [Is there a way for grub to automatically reboot into Windows from Windows?]({% post_url /2018/2018-03-13-Is-there-a-way-for-grub-to-automatically-reboot-into-Windows-from-Windows_ %})

- When you reboot from Windows, then Windows automatically reloads unattended.

- When you reboot from Ubuntu, then Ubuntu automatically reloads unattended.

- If you don't want to automatically reboot to the last OS, then you have 10 seconds to override the default.

As far as Wayland goes, I wouldn't touch it with a ten foot pole because I have numerous X-11 only utilities and programs that are working perfectly with no Wayland substitution.

If you don't require customization, then Wayland will probably work fine.

If you have problems with Wayland then you should switch to X-11. If you have problems with Gnome then you can switch to Unity (if you like the Desktop Manager). Using software because it might be the future isn't justified when it's broken.

