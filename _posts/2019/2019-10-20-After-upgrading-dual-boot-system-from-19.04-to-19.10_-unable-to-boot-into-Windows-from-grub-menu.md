---
layout:       post
title:        >
    After upgrading dual boot system from 19.04 to 19.10, unable to boot into Windows from grub menu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182429
type:         Answer
tags:         boot grub2 windows uefi 19.10
created_date: 2019-10-20 15:15:07
edit_date:    2019-10-24 23:16:33
votes:        "3 "
favorites:    
views:        "1,554 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-After-upgrading-dual-boot-system-from-19.04-to-19.10_-unable-to-boot-into-Windows-from-grub-menu.md
toc:          false
navigation:   false
clipboard:    false
---

The instructions on `boot-repair` report tell you to boot into Windows (as you do now by changing boot order) and then:

>     For example you can boot into Windows, then type the following command in an admin command prompt:  
>     bcdedit /set {bootmgr} path \EFI\ubuntu\shimx64.efi  

Do this from Windows and then if it doesn't work revise your question with current status / new issues.


----------

Also note boot-repair created 7 custom entries to boot Windows and Ubuntu from UEFI. In my experience they won't all work. After you fix the booting issues see this answer:

- [Boot-Repair created too many grub menu entries for Windows]({% post_url /2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows %})
