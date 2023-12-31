---
layout:       post
title:        >
    systemd corrupting $0 by prepending 0000:00:14.0 to script name
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/566389
type:         Question
tags:         bash systemd suspend
created_date: 2020-02-08 00:00:01
edit_date:    2020-06-11 14:16:50
votes:        "1 "
favorites:    
views:        "74 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-02-08-systemd-corrupting-_0-by-prepending-0000_00_14.0-to-script-name.md
toc:          false
navigation:   true
clipboard:    false
---

I have a script in `/lib/systemd/system-sleep` that works perfectly from the command line:

``` 
$ ll /lib/systemd/system-sleep/smartplug

-rwxr-xr-x 1 root root 713 Feb  7 04:55 /lib/systemd/system-sleep/smartplug*

$ sudo /lib/systemd/system-sleep/smartplug pre Suspend

/lib/systemd/system-sleep/smartplug: Going to Suspend...
/lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is: OFF

$ sudo /lib/systemd/system-sleep/smartplug post Suspend

/lib/systemd/system-sleep/smartplug: Waking up from Suspend...

```

However when `systemd` calls the script during suspend it is "tainting" the script's name and returning null from called script:

``` 
$ journalctl -b-0 | grep smartplug

Feb 07 05:47:30 alien systemd-sleep[32243]: /lib/systemd/system-sleep/smartplug: Going to suspend...
Feb 07 05:47:30 alien systemd-sleep[32243]: 0000:00:14.0/lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is:
Feb 07 16:36:10 alien systemd-sleep[32243]: /lib/systemd/system-sleep/smartplug: Waking up from suspend...

```

`systemd` should be saying:

``` 
Feb 07 05:47:30 alien systemd-sleep[32243]: /lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is: OFF
```

But it is saying:

``` 
Feb 07 05:47:30 alien systemd-sleep[32243]: 0000:00:14.0/lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is:
```

I've never seen this bizarre behavior before. Here are the scripts contents:

``` bash
#!/bin/bash

# NAME: smartplug
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically
# DESC: When suspending turn off Kasa smartplugs.
# NOTE: Copy hs100.sh and myip.sh from user directory to /usr/bin.

# DATE: Feb 6 2020.

TMPLIST=/tmp/smartplug-list
PlugArr=( "192.168.0.15" )

case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    echo -n '' > "$TMPLIST"

    status=$(hs100.sh -i "${PlugArr[0]}" check | cut -f2)
    echo "$0: Status of: ${PlugArr[0]} is: $status"
    if [[ "$status" == ON ]] ; then
        hs100.sh -i "${PlugArr[0]}" off
        echo "${PlugArr[0]}" >> "$TMPLIST"
    fi
        ;;
  post/*)
    echo "$0: Waking up from $2..."
    rm $TMPLIST
        ;;
esac
```


----------



<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Reply to comments

## Results from `lspci -vt`

``` 
$ lspci -vt
-[0000:00]-+-00.0  Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Host Bridge/DRAM Registers
           +-01.0-[01]--+-00.0  NVIDIA Corporation GM204M [GeForce GTX 970M]
           |            \-00.1  NVIDIA Corporation GM204 High Definition Audio Controller
           +-02.0  Intel Corporation HD Graphics 530
           +-04.0  Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Thermal Subsystem
           +-14.0  Intel Corporation 100 Series/C230 Series Chipset Family USB 3.0 xHCI Controller

```


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Results from `journalctl -b-0 | grep smartplug -A5`

This confirms disconnecting PCI bus was root of problematic message

``` 
--
Feb 07 22:40:15 alien systemd-sleep[14761]: /lib/systemd/system-sleep/smartplug: Going to suspend...
Feb 07 22:40:15 alien systemd-sleep[14761]: /lib/systemd/system-sleep/custom-xhci_hcd: Going to suspend...
Feb 07 22:40:15 alien systemd-sleep[14761]: Failed to connect to non-global ctrl_ifname: (nil)  error: No such file or directory
Feb 07 22:40:15 alien systemd-sleep[14762]: /lib/systemd/system-sleep/wpasupplicant failed with error code 255.
Feb 07 22:40:15 alien systemd-sleep[14762]: /lib/systemd/system-sleep/r8169-reset failed with error code 1.
Feb 07 22:40:15 alien kernel: xhci_hcd 0000:00:14.0: remove, state 4
--
Feb 07 22:40:15 alien systemd-sleep[14761]: 0000:00:14.0/lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is:
Feb 07 22:40:15 alien kernel: usb 1-9: USB disconnect, device number 9
Feb 07 22:40:15 alien acpid[1320]: input device has been disconnected, fd 22
Feb 07 22:40:15 alien kernel: xhci_hcd 0000:00:14.0: USB bus 1 deregistered
Feb 07 22:40:15 alien kernel: xhci_hcd 0000:39:00.0: remove, state 4
Feb 07 22:40:15 alien kernel: usb usb4: USB disconnect, device number 1
--
```

Notice the line `xhci_hcd 0000:00:14.0: USB bus 1 deregistered` their is a script `custom-xhci_hcd` whose job it is to disconnect all USB devices (unbind / power off). It was causing `smartplug` script to fail because it needs WiFi to turn off the Kasa Smartplug.

I'm not out of the woods yet because the Smartplug is still not turning off the TV light when laptop suspends. I think this is due to Network Manager bringing down WiFi too quickly but more investigation is needed.

After disabling `custom-xhci_hcd` (written years ago but probably not needed anymore with kernel `4.14.170` this is `journalctl`:

``` 
--
Feb 08 09:14:44 alien systemd-sleep[3032]: /lib/systemd/system-sleep/smartplug: Going to suspend...
Feb 08 09:14:44 alien systemd-sleep[3032]: Failed to connect to non-global ctrl_ifname: (nil)  error: No such file or directory
Feb 08 09:14:44 alien systemd-sleep[3033]: /lib/systemd/system-sleep/wpasupplicant failed with error code 255.
Feb 08 09:14:44 alien eyesome[3127]: Wakeup: Creating /tmp/eyesome-is-suspending
Feb 08 09:14:44 alien systemd-sleep[3032]: /lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is:
Feb 08 09:14:44 alien systemd-sleep[3033]: /lib/systemd/system-sleep/display-auto-brightness failed with error code 1.
Feb 08 09:14:45 alien systemd-sleep[3033]: /lib/systemd/system-sleep/lag-suspend.sh failed with error code 1.
Feb 08 09:14:45 alien systemd-sleep[3033]: /lib/systemd/system-sleep/r8169-reset failed with error code 1.
Feb 08 09:14:45 alien systemd-sleep[3033]: /lib/systemd/system-sleep/iwlwifi-reset failed with error code 1.
Feb 08 09:14:45 alien systemd-sleep[3032]: Suspending system...
--
Feb 08 09:14:57 alien systemd-sleep[3032]: /lib/systemd/system-sleep/smartplug: Waking up from suspend...
Feb 08 09:14:57 alien systemd-sleep[3032]: Failed to connect to non-global ctrl_ifname: (nil)  error: No such file or directory
Feb 08 09:14:57 alien kernel: PM: suspend exit
Feb 08 09:14:57 alien eyesome[3346]: Wakeup: Called from suspend.
Feb 08 09:14:57 alien systemd-sleep[3032]: /dev/sda:
Feb 08 09:14:57 alien systemd-sleep[3032]:  setting Advanced Power Management level to 0xfe (254)

```

The other error codes from scripts in `/lib/systemd/system-sleep` are because the scripts are non-executable but kept around for historical reasons.

``` 
rick@alien:/lib/systemd/system-sleep$ ll
total 68
drwxr-xr-x 2 root root 4096 Feb  7 04:55 ./
drwxr-xr-x 8 root root 4096 Feb  6 16:53 ../
-rw-r--r-- 1 root root 1079 Oct 28  2018 custom-xhci_hcd
-rw-r--r-- 1 root root 1079 Oct 28  2018 custom-xhci_hcd~
-rw-r--r-- 1 root root 1539 Jun 10  2018 display-auto-brightness
-rwxr-xr-x 1 root root   92 Mar 17  2016 hdparm*
-rw-r--r-- 1 root root  716 Apr 22  2017 iwlwifi-reset
-rw-r--r-- 1 root root  572 Oct 28  2018 lag-suspend.sh
-rw-r--r-- 1 root root  522 Oct 21  2018 lag-suspend.sh~
-rw-r--r-- 1 root root 2820 Aug  5  2018 r8169-reset
-rwxr-xr-x 1 root root  713 Feb  7 04:55 smartplug*
-rwxr-xr-x 1 root root  661 Feb  7 04:53 smartplug~*
-rwxr-xr-x 1 root root 1114 Oct 28  2018 sound*
-rwxr-xr-x 1 root root 1171 Aug  5  2018 sound~*
-rwxr-xr-x 1 root root  317 Aug 29 05:44 systemd-wake-eyesome*
-rwxr-xr-x 1 root root  219 Apr 29  2019 unattended-upgrades*
-rwxr-xr-x 1 root root  182 Oct 26  2015 wpasupplicant*

```


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Results from `cat -v`

As per comment request:

``` 
$ sudo /lib/systemd/system-sleep/smartplug pre Suspend |& cat -v
/lib/systemd/system-sleep/smartplug: Going to Suspend...
/lib/systemd/system-sleep/smartplug: Status of: 192.168.0.15 is: ON

```

Note piping to `|& cat -v` doesn't change output.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

