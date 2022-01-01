---
layout:       post
title:        >
    Is there a way to install Ubuntu completely on a portable external HDD and boot into it on any computer∕laptop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007421
type:         Answer
tags:         system-installation usb-installation portable
created_date: !!str "2018-02-18 16:11:58"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "2"
favorites:    
views:        !!str "260"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

## No

Each computer / laptop you want to run Ubuntu on can have different video cards and drivers meaning the kernel boot parameters might need changing.

## Better option

Your best bet would be to make a [Live-Boot USB with persistent storage][1].


  [1]: https://askubuntu.com/questions/772744/how-to-make-a-live-usb-persistent
