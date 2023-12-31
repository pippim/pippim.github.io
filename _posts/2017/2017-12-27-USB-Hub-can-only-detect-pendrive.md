---
layout:       post
title:        >
    USB Hub can only detect pendrive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/989749
type:         Answer
tags:         usb usb-drive
created_date: 2017-12-27 02:52:28
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "1,571 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-27-USB-Hub-can-only-detect-pendrive.md
toc:          false
navigation:   false
clipboard:    false
---

# Make sure you are using USB 3 cables

Although you can plug USB 2 cables (usually black) into USB 3 devices they are not the same as USB 3 cables (usually blue). From this [write up][1] we learn:

> To get USB 3.0 speeds, you need special USB 3.0 cables. Yes, USB 3.0  
> cables are different. Even though you can connect a USB 3.0 device via  
> a USB 2.0 cable, in order to achieve full USB 3.0 speeds you need to  
> rewire any existing cabling. USB 3.0 cables have more internal wires,  
> are usually blue, and are noticeably thicker than the old USB 2.0  
> cables.  

Another consideration is distance. USB 3 is limited to 9 feet whilst USB 2 can travel 15 feet.

Finally when it comes to an external HDD powered via USB there is an important consideration:

> A USB 2.0 cable may not be adequate for a high current USB 3.0 device.  
> Some USB 3.0 devices draw more power than USB 2.0 devices. The power  
> conductors in USB 3.0 cables need to be able to carry 900 mA versus  
> 500 mA for USB 2.0 cables.  

  [1]: https://www.howtogeek.com/222400/do-usb-3.0-connections-require-usb-3.0-cables/
