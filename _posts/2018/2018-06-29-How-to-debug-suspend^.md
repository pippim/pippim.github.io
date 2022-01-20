---
layout:       post
title:        >
    How to debug suspend?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1050596
type:         Answer
tags:         suspend
created_date: 2018-06-29 02:13:38
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "6,701 "
accepted:     
uploaded:     2022-01-19 20:21:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-29-How-to-debug-suspend^.md
toc:          false
navigation:   false
clipboard:    false
---

The symptoms:

-    Pressing suspend brings my computer to a state where it has a blinking cursor, the fans are running, it seems that the HD has turned off (I think), and I can't do anything to bring it back from this state (short of a hard reboot).
-    Possibly related: My fans stay on even after a shutdown, and even then, I have to press the power button for five seconds before I can start it up again.
-    I don't know what logs to look at to debug the problem, and I imagine they'd get nuked on reboot anyway.


----------


My go to site for many Linux problems is Arch Linux. Here is what is posted about [suspend/resume problems][1] similar to yours:

## Instantaneous wakeups from suspend

For some Intel Haswell systems with the LynxPoint and LynxPoint-LP chipset, instantaneous wakeups after suspend are reported. They are linked to erroneous BIOS ACPI implementations and how the `xhci_hcd` module interprets it during boot. As a work-around reported affected systems are added to a blacklist (named `XHCI_SPURIOUS_WAKEUP`) by the kernel case-by-case.[[2]]

Instantaneous resume may happen, for example, if a USB device is plugged during suspend and ACPI wakeup triggers are enabled. A viable work-around for such a system, if it is not on the blacklist yet, is to disable the wakeup triggers. An example to disable wakeup through USB is described as follows.[[3]]

To view the current configuration:

``` 
$ cat /proc/acpi/wakeup

Device  S-state   Status   Sysfs node
...
EHC1      S3    *enabled  pci:0000:00:1d.0
EHC2      S3    *enabled  pci:0000:00:1a.0
XHC       S3    *enabled  pci:0000:00:14.0
```

...

The relevant devices are `EHC1`, `EHC2` and `XHC` (for USB 3.0). To toggle their state you have to echo the device name to the file as root.

``` 
# echo EHC1 > /proc/acpi/wakeup
# echo EHC2 > /proc/acpi/wakeup
# echo XHC > /proc/acpi/wakeup
```

This should result in suspension working again. However, this settings are only temporary and would have to be set at every reboot. To automate this take a look at [systemd#Writing unit files][4]. See [BBS thread][5] for a possible solution and more information.


----------

The entire Arch Linux article above on Suspend/Resume is a great reference for many areas:


``` 
1 Low level interfaces
    1.1 kernel (swsusp)
    1.2 uswsusp
2 High level interfaces
    2.1 systemd
3 Hibernation
    3.1 About swap partition/file size
    3.2 Required kernel parameters
        3.2.1 Hibernation into swap file
    3.3 Configure the initramfs
4 Troubleshooting
    4.1 ACPI_OS_NAME
    4.2 VAIO Users
    4.3 Suspend/hibernate doesn't work, or not consistently
    4.4 Wake-on-LAN
    4.5 Instantaneous wakeups from suspend
```


  [1]: https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate
  [2]: https://bugzilla.kernel.org/show_bug.cgi?id=66171#c6
  [3]: https://bbs.archlinux.org/viewtopic.php?pid=1575617
  [4]: https://wiki.archlinux.org/index.php/Systemd#Writing_unit_files
  [5]: https://bbs.archlinux.org/viewtopic.php?pid=1575617#p1575617
