---
layout:       post
title:        >
    Files in ∕etc∕network∕interfaces.d ignored, but not ∕etc∕network∕interfaces itself
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/853689
type:         Answer
tags:         networking network-manager systemd raspberrypi arm
created_date: 2016-11-26 00:32:26
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "66,643 "
accepted:     
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    false
---

## Your Kernel 3.10 is too old for `systemd` [IFF using systemd-v230 or newer][3].

According to `systemd` kernel requirements in github at ([github.com - systemd README][1]) you need version >= 3.12 if you are using `systemd-v230` or newer:

``` 
REQUIREMENTS:
        Linux kernel >= 3.12
        Linux kernel >= 4.2 for unified cgroup hierarchy support

```

Lines 37, 38 and 39 are printed above.

You are running under ARM architecture which I frankly know little about. Google search tells me your `armvl7` is used by Raspberry Pi and is a 32 bit kernel.

## Updating your Kernel to modern times

If you want the latest (**October 21, 2016**) "Dirty COW" security protection ([What is the &quot;Dirty COW&quot; bug, and how can I secure my system against it?][2]) plus a host of other security patches, bug fixes and system improvements (**after your 2013 version**) you should be on kernel 4.4.0-47.

Unfortunately I don't know how to do that for a RaspberryPi. I have linked this question to people who use RaspberryPi and have asked them to critique this answer.

  [1]: https://github.com/systemd/systemd/blob/master/README
  [2]: {% post_url /2016/2016-10-21-What-is-the-"Dirty-COW"-bug,-and-how-can-I-secure-my-system-against-it? %}
  [3]: https://github.com/systemd/systemd/commit/58015d7815bce405c7c0ac082d8c2f407ec07eeb#diff-c47c7c7383225ab55ff591cb59c41e6b
