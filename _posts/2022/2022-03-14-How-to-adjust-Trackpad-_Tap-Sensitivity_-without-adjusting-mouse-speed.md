---
layout:       post
title:        >
    How to adjust Trackpad "Tap Sensitivity" without adjusting mouse speed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1397394
type:         Answer
tags:         mouse touchpad synaptics multi-touch
created_date: 2022-03-14 01:02:06
edit_date:    
votes:        "2 "
favorites:    
views:        "85 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-03-14-How-to-adjust-Trackpad-_Tap-Sensitivity_-without-adjusting-mouse-speed.md
toc:          false
navigation:   false
clipboard:    false
---

The problem when you type on your keyboard your palm is being detected as touch pad movements.

The solution is rather detailed but documented by Dell:

- [Precision and XPS: Ubuntu General Touchpad or Mouse Issue Fix 🔗](https://www.dell.com/support/kbdoc/en-ca/000150104/precision-xps-ubuntu-general-touchpad-mouse-issue-fix "This article provides information about the options to improve touchpad and mouse performance running on Ubuntu on a Dell XPS or Precision system.")

Although the article was published less than a year ago it still references Ubuntu 16.04 instead of 20.04. However the programs discussed, `xinput`, `synaptics` and `libinput` remain the same in both versions (Unless you are using Wayland).

