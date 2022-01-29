---
layout:       post
title:        >
    Find the power supply hardware information for a PC using Ubuntu's command-line
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1009641
type:         Answer
tags:         command-line power-management hardware
created_date: 2018-02-25 15:26:19
edit_date:    2018-02-26 19:07:38
votes:        "7 "
favorites:    
views:        "61,543 "
accepted:     
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-25-Find-the-power-supply-hardware-information-for-a-PC-using-Ubuntu_s-command-line.md
toc:          false
navigation:   false
clipboard:    true
---

# Software interface to Power Supply

As mentioned in the top voted answer a special communication channel to the Power Supply is required. On my laptop there is a USB 3 self powered hub connected to the UPS (Interruptible Power Supply). Although you don't have this type of power supply the communication concept would be similar:

{% include copyHeader.html %}
``` 
$ sudo pwrstat -status

The UPS information shows as following:

	Properties:
		Model Name................... CP550HGa
		Firmware Number.............. BFBB104#BI1.g
		Rating Voltage............... 120 V
		Rating Power................. 330 Watt

	Current UPS status:
		State........................ Normal
		Power Supply by.............. Utility Power
		Utility Voltage.............. 121 V
		Output Voltage............... 121 V
		Battery Capacity............. 100 %
		Remaining Runtime............ 33 min.
		Load......................... 72 Watt(22 %)
		Test Result.................. Unknown
		Last Power Event............. None
```

The current load is 72 Watts and the maximum load is 330 watts.

# Installing `pwrstat`

To install `pwrstat` go to the Cyber Power Systems website [Linux Software][1] page. You will find 32-bit and 64-bit downloads available for all Linux distro's but make sure you select the one for Debian (`.deb`) which Ubuntu is based on.

After downloading install it using:

``` 
sudo dpkg -i powerpanel_132_amd64.deb
```

To learn more about using `pwrstat` use:



``` bash
man pwrstat   # to learn more about the terminal interface
man pwrstatd  # to learn about background daemon with alarms, auto shutdown, etc.
```

# What to do when there is no software

The old tried and true method is to look at the safety label on your power supply. By law in most countries this label must exist. For my old laptop it is as easy as looking at the power brick. For your desktop PC it may be on the back or you might have to open it up and look inside:

[![Dell Inspiron Power Supply][2]][2]

The label shows:

- Output 130 Watts *(Watt=Volt x Amp)*
- Input 100-240 VAC ~ 2.5 Amps, 50-60 HZ
- Output 19.5 Volts ~ 6.7 Amps

# What to do when you can't look at the hardware

You could get someone who is on site to take the picture for you. If that isn't viable get the make and model of the computer and google the power supply specs. From [this article][3] the generic specs for PCs are:

-    Small Form Factor - 15A (250W)
-    Mini-Tower - 25A (300-350W)
-    Mid-Tower - 35A (400-500W)
-    Full Tower - 40A (600-650W)
-    Dual Video Card (SLI) - 50A (750W+)

Note the amperage is specified for 12 Volt rail output. So 15A = 180 watts and 50A (**For dual video cards**) = 600 watts. **Wattage = Amperage * Voltage.**


  [1]: https://www.cyberpowersystems.com/product/software/powerpanel-for-linux/
  [2]: https://i.stack.imgur.com/O09aL.jpg
  [3]: https://www.lifewire.com/computer-power-supply-wattage-832368
