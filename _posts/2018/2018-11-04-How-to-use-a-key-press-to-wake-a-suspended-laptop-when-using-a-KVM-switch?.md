---
layout:       post
title:        >
    How to use a key press to wake a suspended laptop when using a KVM switch?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089840
type:         Answer
tags:         laptop wakeup lid kvm-switch
created_date: 2018-11-04 00:33:56
edit_date:    2018-11-04 15:41:57
votes:        "3 "
favorites:    
views:        "4,902 "
accepted:     
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   true
clipboard:    false
---

From: [USB IR remote wakup from Suspend](USB IR remote wakup from Suspend)

I had the same problem and was also stumped by my USBs not appearing in /proc/acpi/wakeup. In the end, however, despite many solutions suggesting this was required I did not need to enable USBs in ACPI.

Instead, enabling wakeup on the USB port my IR device was connected to was was enough.

Find your device ID:

``` 
$ lsusb

```

>Bus 002 Device 002: ID 8087:8001 Intel Corp.  
>Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub  
>Bus 001 Device 002: ID 8087:8009 Intel Corp.   
>Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub  
>Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub  
>Bus 003 Device 003: ID 13ba:0018 PCPlay Barcode PCP-BCG4209  
>**Bus 003 Device 002: ID 1934:5168 Feature Integration Technology Inc. (Fintek) F71610A or F71612A Consumer Infrared Receiver/Transceiver**  
>Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub  

In the above example my device ID is **5168**.


Grep /sys/bus/usb to find the port your device is plugged into:

``` 
$ grep 5168 /sys/bus/usb/devices/*/idProduct  

```

>/sys/bus/usb/devices/3-13/idProduct:5168  

This indicates my device is plugged into bus3, port 13.

Confirm the port is correct:

``` 
$lsusb -t

```

>/:  Bus 04.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/6p, 5000M  
>**/:  Bus 03.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/14p, 480M  
>    |__ Port 13: Dev 2, If 0, Class=Vendor Specific Class, Driver=mceusb, 12M**  
>    |__ Port 14: Dev 3, If 0, Class=Human Interface Device, Driver=usbhid, 1.5M  
>    |__ Port 14: Dev 3, If 1, Class=Human Interface Device, Driver=usbhid, 1.5M  
>/:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=ehci-pci/2p, 480M  
``` 
|__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/8p, 480M  
>/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=ehci-pci/2p, 480M  
```
  
>    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/6p, 480M  

Bus 3, port 13 matches the bus/port returned by grep (3-13) 


Check if wakeup is enabled:  

``` 
$ cat /sys/bus/usb/devices/3-13/power/wakeup  

```

>disabled  


Enable wakeup on port:

``` 
$ sudo sh -c 'echo "enabled" > /sys/bus/usb/devices/3-13/power/wakeup'

```


Check if wakeup enabled:

``` 
$ cat /sys/bus/usb/devices/3-13/power/wakeup  

```

>enabled  


Test your device, does it wake the system?

Make this change persistent across reboots:

``` 
$ sudo nano /etc/rc.local

```

Add the following lines after the comments and before 'exit 0'  

``` 
# Enable Wake on IR for USB bus 3 port 13.  
echo enabled > /sys/bus/usb/devices/3-13/power/wakeup

```

Now happily wake your PC from your USB device.

**Limitations**  
One problem with this approach is that if the USB port the IR device is plugged into changes, then enabling that port specifically does not help.

[This post][1] has a way of enabling any IR port based on the device that is plugged into it using a Udev rule.  

**References**  
[Kodi, MCE Remote and Ubuntu][2]  
[Wake from suspend with keyboard or mouse][3]  
[Enabling IR devices with a Udev rule][1]




----------



<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Original Answer Below

This question has three answers that may work for you: [Wake up from suspend using wireless USB keyboard or mouse (for any Linux Distro)](Wake up from suspend using wireless USB keyboard or mouse (for any Linux Distro))


----------


# Answer 1 (15 upvotes)

hit in terminal:

``` 
grep . /sys/bus/usb/devices/*/power/wakeup
The result, for me, was to find out that all usb were disabled.
```

So now, type:

1.

``` 
sudo su
we have now root privillages.
```


2.I have 8 usb ports (**you do that for as many usb ports you have**) ,so: 

``` 
echo enabled > /sys/bus/usb/devices/usb1/power/wakeup
echo enabled > /sys/bus/usb/devices/usb2/power/wakeup
echo enabled > /sys/bus/usb/devices/usb3/power/wakeup
echo enabled > /sys/bus/usb/devices/usb4/power/wakeup
echo enabled > /sys/bus/usb/devices/usb5/power/wakeup
echo enabled > /sys/bus/usb/devices/usb6/power/wakeup
echo enabled > /sys/bus/usb/devices/usb7/power/wakeup
echo enabled > /sys/bus/usb/devices/usb8/power/wakeup

```

Go ahead and test it. Now you can wake up from any wireless or wired usb keyboard and mouse.

So then, the reason we must enable all of them, is because in the next step, we will write this in rc.local to execute the command after every reboot, and after reboot some linux distros (maybe all) change the usb ports.
**We don't have to worry for anything going wrong by enabling all of them, since linux is in suspend or hibernation, it can't use the wifi to download anything, so it won't wake up without we wake it up on purpose.**

Next step:

3.

``` 
sudo nano /etc/rc.local

```

and we paste everything from step 2. in there (before the exit 0 of course).

That's it. From now on we can use our wireless usb and mouse to wake up from suspend.

I hope it works for all of you. This guide was made after testing all other possible solutions around the internet.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# Answer 2 (7 upvotes)

In addition to my guide above i want to add this information, because i recently discovered that some wireless usb devices after waking up from sleep, they revert back to disable.
I repeat, only some usb devices do that, not all. That's why i didn't add this small guide up on my guide.

So you did as i instructed above and your pc successfully wakes up, but later in the day suddenly it doesn't wake up again. 

Solution:

Open a terminal and do :

``` 
lsusb

```

At your keyboard device id information the 4 first digits are the vendor id and the 4 next digits are the product id (see screenshot)
[![enter image description here][4]][4]

Next do:

``` 
sudo nano /etc/udev/rules.d/10-wakeup.rules

```

Where "wakeup" enter your desired name of the script. Number 10 is the priority in case you have many other udev rules, the lower the number the 'rule' will be executed before the others.

Copy paste this and replace the vendor id and product id with your own wireless keyboard vendor id and product id.

``` 
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="062a", ATTRS{idProduct}=="4101" RUN+="/bin/sh -c 'echo enabled > /sys/bus/usb/devices/usb8/power/wakeup'"

```

***usb8** for me is my wireless keyboard (you can also see that in the screenshot (Bus 008)), replace it with your own.

<kbd>Ctrl</kbd> + <kbd>O</kbd> to save , <kbd>Ctrl</kbd> + <kbd>X</kbd> to exit and reboot.


----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Answer 3

Pavlos Theodorou's answer is very helpful.  I would like to add that you can find the usb device that your mouse/keyboard is connected to at boot-up by piping *dmesg* through *grep* a couple of times, then *egrep* once, and finally using *tail* to make sure it was the most recent entry. 

Using this method, you *don't* have to enable wake on **ALL** usb ports.

I put the following in my /etc/rc.local file and it finds my logitech receiver every time, even if moved from one usb port to another.  Just substitute the name of ***your*** keyboard or mouse from dmesg in place of "Logitech K270"

``` 
KB="$(dmesg | grep "Logitech K270 as" | grep -o -P "usb.{0,5}" | egrep -o ".{0,3}$" | tail -1)"
echo enabled > /sys/bus/usb/devices/${KB}/power/wakeup

```

This works on boot, but doesn't seem to run on wake from suspend, so I had to put a script file in /lib/systemd/system-sleep/.  Create it, set it as globally executable and give it a name that starts with a double digit number between 00 and 99.  My script is as follows, again substite ***your*** keyboard/mouse verbage from dmesg:

``` 
#!/bin/sh

# Action script to enable wake after suspend by keyboard or mouse

if [ $1 = post ]
	then
	KB="$(dmesg | grep "Logitech K270 as" | grep -o -P "usb.{0,5}" | egrep -o ".{0,3}$" | tail -1)"
	echo enabled > /sys/bus/usb/devices/${KB}/power/wakeup
fi

if [ $1 = pre ]
    then
    KB="$(dmesg | grep "Logitech K270 as" | grep -o -P "usb.{0,5}" | egrep -o ".{0,3}$" | tail -1)"
    echo enabled > /sys/bus/usb/devices/${KB}/power/wakeup
fi

```


For some reason I can't explain, the 'post' sleep *if* statement only works every other wake-up... but the 'pre' sleep *if* statement seems to work every time.

  [1]: http://forum.kodi.tv/showthread.php?tid=104541&pid=1948050#pid1948050
  [2]: http://jakobsens.net/?p=770%22Kodi,%20MCE%20Remote%20and%20Ubuntu%22
  [3]: http://ubuntuforums.org/showthread.php?t=1938480&p=11940008#post11940008%22Wake%20from%20suspend%20with%20keyboard%20or%20mouse%22
  [4]: https://i.stack.imgur.com/dt5Sr.png



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a></div>

