---
layout:       post
title:        Is there a way to install Ubuntu completely on a portable external HDD and boot into it on any computer/laptop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007421
type:         Answer
tags:         system-installation usb-installation portable
created_date: 2018-02-18 16:11:58
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    
views:        260
accepted:     
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

## No

Each computer / laptop you want to run Ubuntu on can have different video cards and drivers meaning the kernel boot parameters might need changing.

## Better option

Your best bet would be to make a [Live-Boot USB with persistent storage][1].


  [1]: https://askubuntu.com/questions/772744/how-to-make-a-live-usb-persistent
