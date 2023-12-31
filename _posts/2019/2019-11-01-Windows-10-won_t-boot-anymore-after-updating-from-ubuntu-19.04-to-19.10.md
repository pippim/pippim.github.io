---
layout:       post
title:        >
    Windows 10 won't boot anymore after updating from ubuntu 19.04 to 19.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1185450
type:         Answer
tags:         dual-boot grub2 windows-10
created_date: 2019-11-01 10:50:05
edit_date:    2019-11-01 11:02:19
votes:        "0 "
favorites:    
views:        "762 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-01-Windows-10-won_t-boot-anymore-after-updating-from-ubuntu-19.04-to-19.10.md
toc:          false
navigation:   false
clipboard:    false
---

First you need to [install and run boot-repair][1]:

[![boot-repair menu.png][2]][2]

Then check the boot-repair report. If the bottom of the report tells you:

>     For example you can boot into Windows, then type the following command in an admin command prompt:  
>     bcdedit /set {bootmgr} path \EFI\ubuntu\shimx64.efi  

Boot into Windows by changing the BIOS boot order. See the section in link below on ***Access BIOS/UEFI***:

- [The computer didn't automatically boot from USB,]({% post_url /2019/2019-10-13-The-computer-didn_t-automatically-boot-from-USB_ %})

After successfully booting into windows via BIOS/UEFI boot order override, open a command prompt as administer and run the `bcedit` command above.

Then reboot back into BIOS/UEFI and reset Ubuntu to top of boot order.

----------

Also note boot-repair can create about 7 custom entries to boot Windows and Ubuntu from UEFI. In my experience they won't all work. After you fix the booting issues see this answer:

- [Boot-Repair created too many grub menu entries for Windows]({% post_url /2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows %})


  [1]: {% post_url /2018/2018-12-31-How-to-make-grub-menu-appear-instead-grub-minimal-bash-like-in-booting_ %}
  [2]: https://i.stack.imgur.com/UXflA.png
