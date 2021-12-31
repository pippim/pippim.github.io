---
layout:       post
title:        >
    After dual booting from Ubuntu to Windows nVidia GPU disappears?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/953778
type:         Answer
tags:         dual-boot grub2 nvidia windows-8 reboot
created_date: !!str "2017-09-08 03:21:29"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "415"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

When you boot Ubuntu it powers off the nVidia GPU. When you reboot power remains off so Windows doesn't see it. The same thing can happen with other devices when you reboot from Windows back to Grub and then Ubuntu.

The solution is to **Shut Down** and then **Power On**.

There is a reason why they call it "warm boot" versus "cold boot" and "soft boot" versus "hard boot". This is just one example.
