---
layout:       post
title:        >
    While Shift+1 prints the exclamation mark, the key "1" does not work!
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1095928
type:         Answer
tags:         keyboard keyboard-layout grub
created_date: 2018-11-25 14:54:07
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "2,376 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-25-While-Shift_1-prints-the-exclamation-mark_-the-key-_1_-does-not-work!.md
toc:          false
navigation:   false
clipboard:    false
---

## Narrow it down to hardware or software

First check to see if it is OS software, Application Tools or Laptop BIOS which is causing interference:

1. Boot with Live USB and select "Try Ubuntu without Installing". Does the <kbd>1</kbd> key work properly? If not try step 2. If yes reinstall Ubuntu 18.10.
2. Boot your laptop but interrupt Grub by pressing <kbd>c</kbd> key for command. Does the <kbd>1</kbd> key work properly? If Yes it is a problem with Ubuntu 18.10. If not go to step 3.
3. Get a USB keyboard (they start at $10 if you can't borrow one) and plug it in. Boot your laptop normally. Does the <kbd>1</kbd> key work properly? If not try step 4. If yes check [Dell Update website][1] and install this:
[![enter image description here][2]][2]
4. Try using Windows 7/8/10. Does problem still exist?


  [1]: https://www.dell.com/support/home/ca/en/cadhs1/product-support/product/inspiron-14-5458-laptop/drivers
  [2]: https://i.stack.imgur.com/gKDAk.png
