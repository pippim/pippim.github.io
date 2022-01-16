---
layout:       post
title:        >
    No Audio Over HDMI on NVIDIA GeForce GTX 1050 Ti
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062956
type:         Answer
tags:         drivers nvidia 17.10 nvidia-optimus nvidia-prime
created_date: 2018-08-06 17:28:18
edit_date:    2018-09-26 01:07:31
votes:        "2 "
favorites:    
views:        "7,064 "
accepted:     
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-06-No-Audio-Over-HDMI-on-NVIDIA-GeForce-GTX-1050-Ti.md
toc:          false
navigation:   false
clipboard:    false
---

Note this is for a GTX 970M but applies to 1060 and others.

The problem for me with the `setpci` route is multiple screen resets as `lightdm` is reloaded. Perhaps because I have three monitors:

- 50" TV attached via built-in HDMI hardwired to nVidia card
- 17" internal display driven by Intel iGPU
- 32" TV attached via Thunderbolt and driven by Intel iGPU

The larger problem is complexity of setting up `systemd` and bash scripts.

The `c` language, kernel based solution found on this link: [https://bugs.freedesktop.org/show_bug.cgi?id=75985#c33](https://bugs.freedesktop.org/show_bug.cgi?id=75985#c33)3 is far superior. I've included the bulk of the link below with some modifications to my platform.


----------


My system specs:

``` 
i7-6700HQ + GTX 970M
Linux kernel version: 4.13.0-26-generic
Nvidia driver Version: 384.130
OS: Ubuntu 16.04.5 LTS
```

I can confirm that kernel module, posted by Maik Freudenberg [Comment 27], is working fine on my system. Thank you for the fix. The HDMI audio device now works as it should.

I download and extracted the file [nvhda.tar.xz][1]. I created the directory `~/nVidia` for extraction.

Run commands in terminal:

``` 
cd ~/nVidia
make
sudo make install
echo nvhda | sudo tee -a /etc/initramfs-tools/modules
echo "options nvhda load_state=1" | sudo tee /etc/modprobe.d/nvhda.conf
sudo update-initramfs -u # This updated newest kernel 4.15.0-26
sudo update-initramfs -u -k `uname -r` # Update booted 4.13.0-36
reboot
```

With this fix, I did not notice any problems with power management or system stability. HDMI audio works at system startup, after resume from sleep, after plugging/unplugging HDMI cable.


  [1]: https://bugs.freedesktop.org/attachment.cgi?id=136418


