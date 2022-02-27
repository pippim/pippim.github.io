---
layout:       post
title:        >
    No sound in Ubuntu 18.04 after rebooting from windows 10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032576
type:         Answer
tags:         dual-boot sound pulseaudio alsa grub
created_date: 2018-05-05 23:53:09
edit_date:    2018-05-12 01:20:28
votes:        "4 "
favorites:    
views:        "5,885 "
accepted:     
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-05-No-sound-in-Ubuntu-18.04-after-rebooting-from-windows-10.md
toc:          false
navigation:   false
clipboard:    false
---

Windows is notorious for shutting off devices when rebooting and then powering them back on after rebooting. This is particularly problematic with Network cards but as your question illustrates it happens with sound cards as well.

From this [Dell forum][1] other users suffer the same fate. As stated you you can:

- reboot into Windows 10
- select shutdown
- cold boot your system with power button
- select Ubuntu

You can save time by suspending and resuming your Ubuntu 16.04 as one of the answer in [this thread][2] describes.

## Summary

You can't reboot Windows and select Ubuntu from Grub menu. You have to shutdown and hit power button as per the links above. You could visit the Dell links and post a request for a Linux utility to power on the device.

The best solution may be to post a Windows question in [Super User][3] asking how to change Windows not to power off sound card during reboot. 


  [1]: https://www.dell.com/community/Laptops-General/XPS-13-2015-Win10-Sound-breaks-after-wake-restart/td-p/4675699
  [2]: https://ubuntuforums.org/showthread.php?t=1660371&page=2
  [3]: https://superuser.com/
