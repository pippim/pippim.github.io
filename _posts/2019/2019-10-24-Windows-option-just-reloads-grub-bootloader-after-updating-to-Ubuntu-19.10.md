---
layout:       post
title:        >
    Windows option just reloads grub bootloader after updating to Ubuntu 19.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1183623
type:         Answer
tags:         boot dual-boot windows-10 bootloader grub
created_date: 2019-10-24 22:54:33
edit_date:    2019-10-24 23:05:13
votes:        "1 "
favorites:    
views:        "652 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-24-Windows-option-just-reloads-grub-bootloader-after-updating-to-Ubuntu-19.10.md
toc:          false
navigation:   false
clipboard:    false
---

First you need to change your boot order to Windows instead of Grub. To find out the key to press during boot to bring up the BIOS menu see:

- [The computer didn't automatically boot from USB,]({% post_url /2019/2019-10-13-The-computer-didn_t-automatically-boot-from-USB_ %})

Ignore the part about selecting device boot order, you want to change the UEFI boot order and move Windows to the top.

Then the instructions on `boot-repair` report tell you to boot into Windows and then:

>     For example you can boot into Windows, then type the following command in an admin command prompt:  
>     bcdedit /set {bootmgr} path \EFI\ubuntu\shimx64.efi  

Do this from Windows and then if it doesn't work revise your question with current status / new issues.

Also note boot-repair created 5 entries to boot Windows but in my experience they won't all work. After you fix the booting issues see this answer:

- [Boot-Repair created too many grub menu entries for Windows]({% post_url /2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows %})
