---
layout:       post
title:        >
    Edit grub from Windows?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/834406
type:         Answer
tags:         dual-boot grub2
created_date: 2016-10-07 23:32:48
edit_date:    2017-04-13 12:23:51
votes:        "9 "
favorites:    
views:        "28,185 "
accepted:     Accepted
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-07-Edit-grub-from-Windows_.md
toc:          false
navigation:   false
clipboard:    false
---

The title of the question is what the OP proposed solution to the problem is. The title **could** be changed to *"How can I have Grub boot to the last used OS choice automatically?"*.

This should arguably be default grub behavior. For example, I might be using Windows for a week playing Mass Effect IV and never come into Ubuntu. Or I might be testing something in Ubuntu 14.04 with a specific Kernel and I don't like having to pick it every time over 50 reboots.

There is a link in various comments above to a Stack Exchange answer proposed as a duplicate question. We can reference an AskUbuntu Q&A too: [How to get grub2 to remember last choice?][1]

In summary edit `/etc/default/grub`, comment out one line and insert two lines below it:

``` 
#GRUB_DEFAULT=0 # Rather than first menu option, we'll default to last  OS.
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

Then save the changes and run `sudo update-grub`.

Voila! Whilst working in Windows and automatic updates happen at 3 am the system reboots to Windows and applies `Stage 3 of 3`.

OP is proposing *"Edit Grub from Windows?"* in the title as a solution to the problem. However, after stating the reason why, it becomes clear the title **should** be changed to something like: *"How do I ensure Windows automatic update reboots go to Windows instead of Ubuntu?"*.

**If** the question was *"How do I reboot to the last OS choice?"* it's an obvious duplicate of the link. The proposed new title (or something shorter) has merit because others may search on the same problem. I know I've had the Windows update-reboot-update problem before and never would have imagined to search on the link here.

PS You can edit Grub from Windows but, why would you want to?

  [1]: https://askubuntu.com/questions/148662/how-to-get-grub2-to-remember-last-choice
