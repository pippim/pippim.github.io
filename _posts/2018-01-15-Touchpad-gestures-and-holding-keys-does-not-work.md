---
layout:       post
title:        Touchpad gestures and holding keys does not work
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/995948
type:         Answer
tags:         16.04 keyboard touchpad grub
created_date: 2018-01-15 00:00:49
edit_date:    2018-02-11 16:41:20
votes:        13
favorites:    
views:        7,793
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Many have reported problems with Kernel 4.13.0-26

Around January 11, 2018 many Ubuntu users began reporting problems with Kernel 4.13.0-26 automatic update:

- [After latest kernel, keyboard shortcuts stop working][1]
- [Strange laptop arrow keys, backspace and touchpad][2]
- [Touchpad gestures and holding keys does not work][3]
- [Keys don&#39;t repeat anymore, touchpad tap and touchpad two-finger scroll don&#39;t work anymore][4]
- [Touchpad and keybord not working properly][5]
- [Inconsistent Trackpad Movement][6]
- [All input is extremley unreliable after kernel upgrade][7]
- [Key repeat acting strangely][8]
- [Key stops repeating randomly][9]
- [Keyboard freezes and spams the last button][10]
- [Involuntary key repeat in Ubuntu 16.04][11]
- [Dell Latitude E7470 touchpad and touchstick sentitivity and behavior problem on Xubuntu 16.04][13]
- [Keyboard and Synaptics touchpad features stopped working after xenial software update][14]
- [Lenovo ideapad320 laptop(amd a9 processor) touchpad stop working - Ubuntu 17.10][15]
- [Touchpad double tap and two finger scroll is only working when press Window Keys/SuperKey on Ubuntu 16.04][16]
- [How to prevent installation of kernel 4.13 on Ubuntu 16.04 LTS][17]
- https://askubuntu.com/questions/995905/16-04-external-mic-or-headphone-jacks-no-longer-detected-since-last-hwe-update
- https://askubuntu.com/questions/995628/how-to-do-emergency-upgrade-to-kernel-4-14-13

These are issues reported over the last few days. *Not all of these issues have been verified as caused by Kernel 4.13.0-26.*


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# January 27, 2018 Update: Check your Intel Microcode

The [Intel Microcode Update 2018-01-08][18] to address speculative execution branching security holes broke some systems. This effected many Ubuntu systems from January 8th to January 21st. On January 22, 2018 Ubuntu released an update that puts back older Microcode from 2017-07-07.

If you experienced problems with updates, reinstalled Ubuntu and turned off updates between 2018-01-08 and 2018-01-22 you may want to try Ubuntu automatic updates again. Check the link in the preceding paragraph for more information.

# How to find out your kernel version

Open a terminal using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>. Then type:

``` 
uname -r

```

Since the terminal is open already, get your Ubuntu release using:

``` 
lsb_release -a

```

To close the terminal use:

``` 
exit

```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Easiest solution boot with older Kernel

When you boot your computer at the Grub menu select **Advanced Options** then select an older kernel to see if you problems go away. If so keep regularly updating to newer kernels as they are offered in Ubuntu LTS and check them until one works. Make sure you don't run `sudo apt auto-remove` which could make your working older kernel disappear.


----------


# Fixing Keyboard repeat problems in Kernel 4.13

With the introduction of Kernel 4.13.0-26 Ubuntu LTS update around January 11, 2018 and [old bug][19] from September 2017 resurfaced. The developer recommended trying Kernel 4.14 (described in the next session) but a quicker fix seems to be disabling [PEAQ WMI Hotkeys][20].

### Verify PEAQ WMI Hotkeys is loaded

As discussed in [Unix & Linux][21] the first step is to ensure it is loaded:

``` 
$ xinput list
⎡ Virtual core pointer                              id=2    [master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer                    id=4    [slave  pointer  (2)]
⎜   ↳ Dell Dell KM632 Wireless Keyboard and Mouse   id=11   [slave  pointer  (2)]
⎜   ↳ Dell Dell KM632 Wireless Keyboard and Mouse   id=12   [slave  pointer  (2)]
⎜   ↳ SynPS/2 Synaptics TouchPad                    id=16   [slave  pointer  (2)]
⎣ Virtual core keyboard                             id=3    [master keyboard (2)]
    ↳ Virtual core XTEST keyboard                   id=5    [slave  keyboard (3)]
    ↳ Power Button                                  id=6    [slave  keyboard (3)]
    ↳ Video Bus                                     id=7    [slave  keyboard (3)]
    ↳ Video Bus                                     id=8    [slave  keyboard (3)]
    ↳ Sleep Button                                  id=9    [slave  keyboard (3)]
    ↳ Dell Dell KM632 Wireless Keyboard and Mouse   id=10   [slave  keyboard (3)]
    ↳ Lenovo EasyCamera: Lenovo EasyC               id=13   [slave  keyboard (3)]
    ↳ Ideapad extra buttons                         id=14   [slave  keyboard (3)]
    ↳ AT Translated Set 2 keyboard                  id=15   [slave  keyboard (3)]
    ↳ Dell Dell KM632 Wireless Keyboard and Mouse   id=18   [slave  keyboard (3)]
    ↳ PEAQ WMI hotkeys                              id=17   [slave  keyboard (3)]

```

**Note the last line above**

If you have it loaded you can disable it with an `xinput` command but we'll use the work around suggestion in the bug report above:

### Disable PEAQ WMI Hotkeys for current session

``` 
sudo rmmod peaq_wmi

```

### Disable PEAQ WMI Hotkeys Permenantly

Using your favourite sudo editor, edit `/etc/modprobe.d/blacklist.conf`. At the end of the file insert two lines:

``` 
#spams ^@
blacklist peaq_wmi

```

Save the file and exit. 


----------


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

# Fixing Synaptics Touchpad in Kernel 4.13

## Temporary Fix

According to this [Debian Bug Report][22] a short term fix is to use:

``` 
sudo rmmod psmouse
sudo modprobe psmouse

```

Try this in the terminal and then test your Touchpad.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Permanent Fix

If the temporary fix works then edit the file `/etc/rc.local` with sudo powers. Add the following lines:

``` 
/sbin/rmmod psmouse
/sbin/modprobe psmouse

```

From now on when you reboot the fix will be permanent.

Note this hasn't been tested yet when resuming from suspend. If you have any problems in that department post a comment below.


----------



<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

# Install newest mainline / stable kernel 4.14.xx

***It's been confirmed that 4.14.13 improves Touchpad and Keyboard for users of Kernel 4.13.0-26. However as of January 20, 2018 4.14.14 is now the newest kernel and it includes Spectre support but runs 2% slower.***

**January 23, 2018** - Kernel 4.14.15 released.
**January 31, 2018** - Kernel 4.14.16 released.

In the bug report above a developer recommends trying the most current mainline (stable) kernel. In some cases an OP wants to go to a higher kernel number rather than a lower one. This section focuses on how to move up to the latest mainline (stable) kernel.

There are instances going back to August 2017 where the touchpad didn't work that is unrelated to Kernel 4.13.0-26 automatic Ubuntu LTS upgrade but one of the answers still require Kernel 4.14 anyway: [Touchpad not detected on Lenovo Ideapad 320 with Kubuntu 17.04][23].

On January 10, 2018 the latest stable mainline kernel was `4.14.13`. If you choose to manually install it you should know:

- Older LTS kernels will not [get updated][24] until they are greater than  the main menu first option titled **Ubuntu**.
- Manually installed kernels are not removed with the usual `sudo apt auto-remove` command. You need to follow this: [How do I remove old kernel versions to clean up the boot menu?][25]
- Monitor developments in the older kernels for when you want to get back on the regular LTS kernel update method. Then delete the manually installed mainline kernel as described in the previous bullet point link.
- After manually removing the newest mainline kernel run `sudo update-grub` and then Ubuntu's latest LTS kernel will be the first option called **Ubuntu** on Grub's main menu.

Now that the warning are out of the way, to install the latest mainline kernel (**4.14.13**) follow this link: [How to update kernel to the latest mainline version without any Distro-upgrade?][26]

[![Mainline Kernel 4.14.13.png][27]][27]


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

## Periodically watch the LTS kernel updates you missed

If you have updated to the latest kernel it's important to see the older kernels you've missed using this command:

``` 
$ apt-cache search . | grep 'image-4.13.0-..-generic'
linux-image-4.13.0-16-generic - Linux kernel image for version 4.13.0 on 64 bit x86 SMP
(... SNIP ....)
linux-image-4.13.0-26-generic - Linux kernel image for version 4.13.0 on 64 bit x86 SMP
linux-image-4.13.0-31-generic - Linux kernel image for version 4.13.0 on 64 bit x86 SMP
linux-image-4.13.0-32-generic - Linux kernel image for version 4.13.0 on 64 bit x86 SMP
(... SNIP ....)

```

When you see a newer supported kernel offered by Ubuntu Kernel Team you should install it and test it. For example to see what to install for `4.13.0-32` use:

``` 
$ apt-cache search . | grep '4.13.0-32-generic'
linux-cloud-tools-4.13.0-32-generic - Linux kernel version specific cloud tools for version 4.13.0-32
linux-headers-4.13.0-32-generic - Linux kernel headers for version 4.13.0 on 64 bit x86 SMP
linux-image-4.13.0-32-generic - Linux kernel image for version 4.13.0 on 64 bit x86 SMP
linux-image-extra-4.13.0-32-generic - Linux kernel extra modules for version 4.13.0 on 64 bit x86 SMP
linux-signed-image-4.13.0-32-generic - Signed kernel image generic
linux-tools-4.13.0-32-generic - Linux kernel version specific tools for version 4.13.0-32

```

Most users won't need all these packages. Usually just `headers`, `image`, `image-extra` and `signed-image`.


  [1]: https://askubuntu.com/questions/996988/after-latest-kernel-keyboard-shortcuts-stop-working
  [2]: https://askubuntu.com/questions/995875/strange-laptop-arrow-keys-backspace-and-touchpad
  [3]: https://askubuntu.com/questions/995819/touchpad-gestures-and-holding-keys-does-not-work
  [4]: https://askubuntu.com/questions/999303/keys-dont-repeat-anymore-touchpad-tap-and-touchpad-two-finger-scroll-dont-wor
  [5]: https://askubuntu.com/questions/995676/touchpad-and-keybord-not-working-properly
  [6]: https://askubuntu.com/questions/998531/inconsistent-trackpad-movement
  [7]: https://askubuntu.com/questions/996005/all-input-is-extremley-unreliable-after-kernel-upgrade
  [8]: https://askubuntu.com/questions/995604/key-repeat-acting-strangely
  [9]: https://askubuntu.com/questions/999248/key-stops-repeating-randomly
  [10]: https://askubuntu.com/questions/992693/keyboard-freezes-and-spams-the-last-button
  [11]: https://askubuntu.com/questions/978771/involuntary-key-repeat-in-ubuntu-16-04
  [13]: https://askubuntu.com/questions/994887/dell-latitude-e7470-touchpad-and-touchstick-sentitivity-and-behavior-problem-on
  [14]: https://askubuntu.com/questions/994467/keyboard-and-synaptics-touchpad-features-stopped-working-after-xenial-software-u
  [15]: https://askubuntu.com/questions/995351/lenovo-ideapad320-laptopamd-a9-processor-touchpad-stop-working-ubuntu-17-10
  [16]: https://askubuntu.com/questions/995365/touchpad-double-tap-and-two-finger-scroll-is-only-working-when-press-window-keys
  [17]: https://askubuntu.com/questions/995839/how-to-prevent-installation-of-kernel-4-13-on-ubuntu-16-04-lts
  [18]: {% post_url 2018-01-27-Samsung-M2-NVME-enters-read-only-on-linux-every-day,-not-on-Windows %}
  [19]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1720219
  [20]: https://github.com/torvalds/linux/blob/master/drivers/platform/x86/peaq-wmi.c
  [21]: https://unix.stackexchange.com/questions/395535/autorepeat-does-not-work
  [22]: https://lists.debian.org/debian-kernel/2017/11/msg00086.html
  [23]: https://askubuntu.com/questions/948439/touchpad-not-detected-on-lenovo-ideapad-320-with-kubuntu-17-04/963853#963853
  [24]: https://askubuntu.com/questions/763360/does-manual-kernel-update-affect-the-next-regular-automatic-update
  [25]: https://askubuntu.com/questions/2793/how-do-i-remove-old-kernel-versions-to-clean-up-the-boot-menu
  [26]: {% post_url 2017-02-20-How-to-update-kernel-to-the-latest-mainline-version-without-any-Distro-upgrade? %}
  [27]: https://i.stack.imgur.com/VOt2M.png


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

