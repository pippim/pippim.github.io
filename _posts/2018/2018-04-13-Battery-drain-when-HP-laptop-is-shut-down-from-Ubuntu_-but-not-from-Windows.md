---
layout:       post
title:        >
    Battery drain when HP laptop is shut down from Ubuntu, but not from Windows
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1024516
type:         Answer
tags:         16.04 power-management shutdown battery
created_date: 2018-04-13 02:05:19
edit_date:    2018-04-18 23:47:20
votes:        "6 "
favorites:    
views:        "3,852 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-13-Battery-drain-when-HP-laptop-is-shut-down-from-Ubuntu_-but-not-from-Windows.md
toc:          false
navigation:   false
clipboard:    true
---

Another user with an HP Pavilion was [loosing 10% battery overnight][1]. Apparently there was no BIOS configuration for Wake-on-LAN and they had to use this method:

``` 
$ sudo lshw -class network | grep logical
       logical name: enp59s0
       logical name: wlp60s0
```

The logical name starting with `e` is for Ethernet which means "LAN". The logical name starting with `w` is for WiFi which is of no concern.

Then take the Ethernet/LAN logical name and pass it to the `ethtool` command:

{% include copyHeader.html %}
``` 
$ sudo ethtool enp59s0
Settings for enp59s0:
	Supported ports: [ TP ]
	Supported link modes:   10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Supported pause frame use: Symmetric Receive-only
	Supports auto-negotiation: Yes
	Advertised link modes:  10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Advertised pause frame use: Symmetric
	Advertised auto-negotiation: Yes
	Speed: 1000Mb/s
	Duplex: Full
	Port: Twisted Pair
	PHYAD: 0
	Transceiver: internal
	Auto-negotiation: on
	MDI-X: Unknown
	Current message level: 0x000060e4 (24804)
			       link ifup rx_err tx_err hw wol
	Link detected: yes
```

In my case "Wake on LAN" is not turned on but if yours shows:

``` 
    Wake-on: g
```

That means "Wake-on-LAN" is turned on and like the OP is loosing `0% battery per night you are loosing the 5% per day.

To turn off "Wake-on-LAN" the OP used:

``` 
sudo ethtool -s enp59s0 wol d
```

- Remember to substitute `enp59s0` with your logical name from step 1. above.
- `wol` stands for "Wake-on-LAN".
- The `d` stands for `disable`.

ArchLinux has an extensive write-up about [Wake-on-LAN][2].

### Why would you use "Wake-on-LAN"?

Some servers will want to wake up client PCs overnight and install new programs on them overnight or update files.

----------

## USB turned off in Windows, left on in Ubuntu

A user on [Tom's Hardware][3] reports that when Windows shuts down all USB powered devices power off. However when Ubuntu 16.04 shuts down USB powered devices stay powered on.

To confirm if this is happening in your case, attach a USB powered device such as a Cell phone or mouse to all USB ports and see if they are powered when Ubuntu shuts down the computer.

## Less likely scenerios

- Wake on USB
- Wake on Wireless LAN


----------

# Review shutdown log

I've experience during `suspend` the system doesn't finish the process. When the system resumes it completes the process. You should check your `/var/log/syslog` or `/var/log/syslog.1` to ensure everything shutdown properly and was powered off. You can also check `journalctl -b-1` to look at end of previous boot. Use `journalctl -b` to look at start of current boot.

Background: [systemd suspends system but upon resume kernel then enters sleep and wake-up][4]


  [1]: https://ubuntuforums.org/showthread.php?t=2359966
  [2]: https://wiki.archlinux.org/index.php/Wake-on-LAN#Enable_WoL_on_the_network_adapter
  [3]: http://www.tomshardware.com/answers/id-3194135/ubuntu-shut-usb-shut.html
  [4]: https://askubuntu.com/questions/828486/systemd-suspends-system-but-upon-resume-kernel-then-enters-sleep-and-wake-up
