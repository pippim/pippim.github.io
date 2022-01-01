---
layout:       post
title:        >
    Video drivers for Intel onboard graphic in 18.04 and thinkpad t410
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1097096
type:         Answer
tags:         drivers 18.04 graphics intel-graphics thinkpad
created_date: !!str "2018-11-29 11:54:13"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "2"
favorites:    
views:        !!str "2,347"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Overheating is a common problem in Linux. This article: [Most Effective Ways To Reduce Laptop Overheating In Linux][1] suggests five applications:

- Install TLP (and optional Thinkpad support in your case)
- Install Thermald
- Install Laptop Mode Tools (often not necessary)
- Install CPUFreq (often not necessary)
- Monitor System temperatures

You do **NOT** need to add PPAs as the article instructs to install `TLP`. See this answer: https://askubuntu.com/questions/1091959/how-can-i-install-tlp-in-ubuntu-18-04/1091962#1091962

You can read an in-depth Q&A here in **Ask Ubuntu** on CPU temperature control: https://askubuntu.com/questions/391474/stop-cpu-from-overheating/875872#875872

  [1]: https://itsfoss.com/reduce-overheating-laptops-linux/
