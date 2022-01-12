---
layout:       post
title:        >
    Strange LED blinking problem with USB flash drives - is it just me?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1107458
type:         Answer
tags:         usb kernel flash udisks eject
created_date: 2019-01-06 15:56:20
edit_date:    2019-01-06 16:59:10
votes:        "2 "
favorites:    
views:        "1,367 "
accepted:     Accepted
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    true
---

The problem of LED blinking after `Eject` is selected in **Nautilus**, is very close to this Launchpad Bug Report from 2013:

- [Safely remove does not work (LED is on) on USB 3.0 flash][1]

That bug report only has five subscribers and has been closed as a duplicate of this Bug Report from 2011: 

- [Automatic remount of safely removed USB 3.0 drive][2]

The latter bug report has 155 subscribers and:

- October 2017 fix has been triaged for Trusty (Ubuntu 14.04 LTS)
- October 2017 fix has been released for Xenial (Ubuntu 16.04 LTS)
- October 2017 fix has been released for Yakkety (Ubuntu 16.10)

Scouring through the first bug report (the one closed as a duplicate) you see the author of `udisks` mentioning how patches need to be made. Two users who applied the patch reported no success however.

I think in the bug report they missed some of the important aspects of one user's output. Here is the equivalent output from my system (that works):

{% include copyHeader.html %}
``` 
$ gvfs-mount -li

Drive(3): 3SYSTEM USB Flash Disk
  Type: GProxyDrive (GProxyVolumeMonitorUDisks2)
  ids:
   unix-device: '/dev/sdb'
  themed icons:  [drive-removable-media-usb]  [drive-removable-media]  [drive-removable]  [drive]
  symbolic themed icons:  [drive-removable-media-usb-symbolic]  [drive-removable-media-symbolic]  [drive-removable-symbolic]  [drive-symbolic]  [drive-removable-media-usb]  [drive-removable-media]  [drive-removable]  [drive]
  is_media_removable=1
  has_media=1
  is_media_check_automatic=1
  can_poll_for_media=0
  can_eject=1
  can_start=0
  can_stop=0
  start_stop_type=shutdown
  sort_key=01hotplug/1546789639130384

  Volume(0): LIVE_USB
    Type: GProxyVolume (GProxyVolumeMonitorUDisks2)
    ids:
     class: 'device'
     unix-device: '/dev/sdb1'
     uuid: '641A-A7DB'
     label: 'LIVE_USB'
    themed icons:  [drive-removable-media-usb]  [drive-removable-media]  [drive-removable]  [drive]
    symbolic themed icons:  [drive-removable-media-usb-symbolic]  [drive-removable-media-symbolic]  [drive-removable-symbolic]  [drive-symbolic]  [drive-removable-media-usb]  [drive-removable-media]  [drive-removable]  [drive]
    can_mount=1
    can_eject=1
    should_automount=1
    sort_key=gvfs.time_detected_usec.1546789639358749
    Mount(0): LIVE_USB -> file:///media/rick/LIVE_USB
      Type: GProxyMount (GProxyVolumeMonitorUDisks2)
      default_location=file:///media/rick/LIVE_USB
      themed icons:  [drive-removable-media-usb]  [drive-removable-media]  [drive-removable]  [drive]
      symbolic themed icons:  [drive-removable-media-usb-symbolic]  [drive-removable-media-symbolic]  [drive-removable-symbolic]  [drive-symbolic]  [drive-removable-media-usb]  [drive-removable-media]  [drive-removable]  [drive]
      can_unmount=1
      can_eject=1
      is_shadowed=0
      sort_key=gvfs.time_detected_usec.1546789639395990

```

- The variable `is_media_removable` is set to `1` on my system but on the bug reporters system is is set to `0`. I think this should have been addressed.
- The bug reporter has `can_eject=0` but my system has `can_eject=1`

Check your own `gvfs-mount -li` output to mine. Also consider subscribing to the bug reports above and/or posting there.

  [1]: https://bugs.launchpad.net/ubuntu/+source/udisks/+bug/1194608
  [2]: https://bugs.launchpad.net/fedora/+source/linux/+bug/792085


