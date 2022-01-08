---
layout:       post
title:        >
    What configuration files in Ubuntu control the graphics drivers in a dual GPU system?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032510
type:         Answer
tags:         drivers nvidia graphics xorg
created_date: 2018-05-05 19:00:49
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "177 "
accepted:     Accepted
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    false
---

Some log files you can view:

- `dmesg | grep -i nvidia`
- `journalctl -b | grep -i nvidia`
- `cat /var/log/Xorg.0.log | grep -i nvidia`
- `cat /var/log/nvidia-installer.log` #......... Does not exist on my system.

You can also review Q&A's like these:

- From **Ask Ubuntu**: [Meaning of files in /var/log/lightdm/ and how to properly read lightdm.log file?][1]
- From **Ask Ubuntu**: [Graphics issues after/while installing Ubuntu 16.04/16.10 with NVIDIA graphics][2]
- From **nVidia** website: [384.98 Install Error on Ubuntu 16.04][3] 

## TL;DR - History of my GTX 970M

I have the same nVidia GTX 970M GPU on an Alienware 17R3 laptop with Skylake i7-6700HQ processor.

I found booting with a live USB the Nouveau graphics work OK and the Intel onboard GT2 HD 530 iGPU is not used.

Initially I installed with Ubuntu's System Settings, Additional Drivers, proprietary drivers version 384.

Much to my chagrin I discovered no sound from the HDMI port because Dell in it's infinite wisdom decided to power off the sound card aspect in the nVidia GTX 970M GPU. This led to lots of hacking into `systemd` to force sound on. It also probably led to my next problem.

Later I decided to try upgrading proprietary driver version 384 to 390. That was a big mistake because it totally broke the system. I went back to using Intel iGPU graphics instead.

Still later I tried using Nouveau drivers with somewhat limited success. So back to trusted old Intel i915 display driver again.

There are other problems getting screen tearing fixed in initial nVidia 384 driver which although time consuming I was rewarded with no more screen tearing. But the performance of the GTX 970M feel short of the Intel iGPU. For example resizing windows was slower and lagged on the screen.

No one has answered your questions:

  - What I'm trying to understand now is exactly what configuration in ubuntu is used to configure which graphics drivers are actually loaded?

  - How do I actually query the kernel to understand what drivers it thinks are available, and which drivers it is using?

  - Are there logs other than dmesg (with show nothing special) that I should be looking at to debug this?

So I thought I should throw in my 2-cents worth based on my experience--stick with the Intel iGPU to maintain your sanity. Currently I'm working on upgrading 16.04 to 18.04 and have done it 4 times on a test partition. I find the boot process much cleaner with Plymouth starting earlier and finishing later. I will get my nVidia working on a test clone and repeat the recloning process to get it working. This is highly preferable to mucking up my 16.04 LTS installation again!


  [1]: https://askubuntu.com/questions/396957/meaning-of-files-in-var-log-lightdm-and-how-to-properly-read-lightdm-log-file?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  [2]: https://askubuntu.com/questions/760934/graphics-issues-after-while-installing-ubuntu-16-04-16-10-with-nvidia-graphics?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  [3]: https://devtalk.nvidia.com/default/topic/1026550/linux/384-98-install-error-on-ubuntu-16-04/
