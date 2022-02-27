---
layout:       post
title:        >
    Replugging network cable doesn't reconnect
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1087720
type:         Answer
tags:         tlp
created_date: 2018-10-27 11:24:43
edit_date:    2018-10-27 14:56:37
votes:        "1 "
favorites:    
views:        "673 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-27-Replugging-network-cable-doesn_t-reconnect.md
toc:          false
navigation:   false
clipboard:    false
---

From this Dell LAN problem with TLP: [Wired network not working after resuming from suspend (Ubuntu 16.04) #222][1]

Edit TLP configuration using: `sudo -H gedit /etc/default/tlp`

Locate these lines:

``` 
# Disable wake on LAN: Y/N
WOL_DISABLE=Y
```

- Change "`Y`" to "`N`"

Locate your USB_BLACKLIST lines (if any) and un-blacklist them by placing `#` at beginning:

``` 
#USB_BLACKLIST="10ec:8168"
#USB_BLACKLIST="103c:832b"
```

- Save file and exit
- Restart TLP with command: `sudo tlp start`


----------

## Second option: Disable PCIe power management

From: [TLP Troubleshooting][2]:

Disable Runtime Power Management completely

Comment both related config lines with a leading '`#`':

``` 
#RUNTIME_PM_ON_AC=on
#RUNTIME_PM_ON_BAT=auto
```

When the problem disappears, uncomment above lines and continue with the next section.

Otherwise the cause is not a PCIe device – proceed to USB.


----------


## Bug Watch

Here are some related bugs that will interest R8169 users:

### Mar 21, 2018 - [Fix Runtime PM for r8169][3]:

> ===SRU Justification===<br>  
> [Impact]<br>  
> r8169 stays in D0 even when no ethernet cable is plugged in. This drains lots of power (~3W). The  
> tested laptop uses 5.5W when r8169 is in D0,  
> 1.8W when r8169 is in D3. The power saved is substantial.  
>   
> [Fix]<br>  
> Improved rumtime PM logic to let the device gets suspended (D3)  
> when the port is not in used and the link is down.  

### July 3, 2018 - [r8169 no internet after suspending][4]:

> ===SRU Justification===<br>  
> [Impact]<br>  
> r8169 failed to establish connection after the fix for LP: #1752772 landed.  
>   
> [Fix]<br>  
> Accepts BIOS WoL settings again, and disables MSI-X for certain  
> chip revisions.  

### March 2, 2018 - [r8169 ethernet card don't work after returning from suspension][5]

This bug affects 127 people:

> ===SRU Justification===<br>  
> [Impact]<br>  
> Ethernet r8169 stops working after system resumed from suspend.  
>   
> [Test]<br>  
> User confirmed these patches fix the issue. r8169 continues to  
> work after resume from suspend.  
>   
> [Regression Potential]<br>  
> Medium. The fix is limited to one device, all  
> patches are in mainline. The WOL default change might cause regression  
> for users that depend on BIOS settings. We can advice them to use  
> userspace tool (systemd, ethtool, etc.) instead.  

### Summary

There have been quite a few bugs with r8169 in 2018. I'm using a kernel from 2017 (`4.13.0-36`) so I haven't experienced the same problems with TLP. It is more difficult to fix bugs I'm not experiencing. The kernel developers do have time to install new kernels, test for bugs and come up with solutions. I can do a little but, time constraints prevent installation of newer kernels.


  [1]: https://github.com/linrunner/TLP/issues/222
  [2]: https://linrunner.de/en/tlp/docs/tlp-troubleshooting.html
  [3]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1757422
  [4]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1779817
  [5]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1752772
