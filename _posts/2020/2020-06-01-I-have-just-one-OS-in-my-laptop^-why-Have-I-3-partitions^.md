---
layout:       post
title:        >
    I have just one OS in my laptop, why Have I 3 partitions?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1245639
type:         Answer
tags:         boot partitioning boot-partition
created_date: 2020-06-01 00:27:59
edit_date:    
votes:        "0 "
favorites:    
views:        "312 "
accepted:     Accepted
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-01-I-have-just-one-OS-in-my-laptop^-why-Have-I-3-partitions^.md
toc:          false
navigation:   false
clipboard:    false
---

I wouldn't worry about it for now as long as your system works OK. Tinkering around without knowing what you are doing can make matters worse. You have lots of space available for Ubuntu now (90% free our about 175 GB).

Spend a year or two learning more about Linux and Ubuntu and if by that time you need more space you can wipe out `sda5` and reclaim it for Ubuntu. Deleting it now will not make Ubuntu run any faster and could leave you with a bricked system.

Your question is kind of broad: *"Here's a picture of what I have, I don't know what it means what should I do?"*. So far others not familiar with your system are speculating on how your system might be setup.

Over the next year or two try to read up on:

- BIOS (Basic Input Output System)
- CSM / Legacy Boot
- UEFI

In the meantime just use Ubuntu day to day and enjoy it.
