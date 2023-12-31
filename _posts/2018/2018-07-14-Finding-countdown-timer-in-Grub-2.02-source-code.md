---
layout:       post
title:        >
    Finding countdown timer in Grub 2.02 source code
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/51341871
type:         Question
tags:         c assembly grub
created_date: 2018-07-14 17:39:45
edit_date:    2020-06-20 09:12:55
votes:        "6 "
favorites:    
views:        "1,186 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-14-Finding-countdown-timer-in-Grub-2.02-source-code.md
toc:          false
navigation:   false
clipboard:    false
---

## Change Grub's timeout to 1/10th or 1/100th second intervals

Using Grub 2.02 on UEFI system with AMD64 architecture. I'd like to change grub's timeout counter from 1 second intervals to 1/10th second or 1/100th second intervals. The reason is to make `gfxmenu` circular progress countdown less "choppy". Boot GIF below shows 5 second count down in circular 1 second "chunks":

[![Grub Boot][2]][2]

After successful source code change and recompile, `/etc/default/grub` would be changed as follows:

- If 1/10th second interval, a 2.5 second countdown would be `GRUB_TIMEOUT=25`.
- if 1/100th second interval, a 2.5 second countdown would be `GRUB_TIMEOUT=250`.


----------

## Grub 2.02 Source is 1/2 million lines

I've downloaded the source as described here: [how to build grub2 bootloader from it&#39;s source and test it with qemu emulator](how to build grub2 bootloader from it&#39;s source and test it with qemu emulator)r and spent time browsing source files. However there are 477k lines to search:

``` 
~/src/grub-2.02$ wc -l **/*

      20 asm-tests/arm.S
      18 asm-tests/i386-pc.S
       4 asm-tests/i386.S
      11 asm-tests/mips.S
       8 asm-tests/powerpc.S
            (... SNIP ...)
     115 util/spkmodem-recv.c
  477316 total
```

I've done many bash projects in **Ask Ubuntu** but this will be my first C/Assembler Linux project. As a "newbie" my thoughts are:

- Which file contains the countdown timer source code?
- How do I change the interval to 1/10th or 1/100th of a second?
- Was putting source code under my home directory a conventional method?
- Any tips on compiling and testing in Virtualbox would be helpful.

Please note **only the first question is relevant**. The other questions are for answers where the author chooses be more detailed.


  [1]: https://www.gnu.org/software/grub/manual/grub/html_node/Obtaining-and-Building-GRUB.html
  [2]: https://i.stack.imgur.com/epnMf.gif

