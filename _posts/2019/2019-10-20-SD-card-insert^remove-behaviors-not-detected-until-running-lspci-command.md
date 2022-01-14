---
layout:       post
title:        >
    SD card insert/remove behaviors not detected until running lspci command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182400
type:         Answer
tags:         sd-card dmesg pci lspci
created_date: 2019-10-20 13:16:56
edit_date:    
votes:        "0 "
favorites:    
views:        "1,091 "
accepted:     Accepted
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-SD-card-insert^remove-behaviors-not-detected-until-running-lspci-command.md
toc:          false
navigation:   false
clipboard:    false
---

A lengthy Q&A on Unix & Linux addresses this issue:

- [Udev triggers are not firing on insert of CF card into USB card reader (anymore)][1]

After many pages of scrolling the solution is a new `udev` rule:

``` 
# enable in-kernel media-presence polling
ACTION=="add", SUBSYSTEM=="module", KERNEL=="block", ATTR{parameters/events_dfl_poll_msecs}=="0", ATTR{parameters/events_dfl_poll_msecs}="2000"
ACTION=="add", ATTR{removable}=="1", ATTR{events_poll_msecs}=="-1", ATTR{events_poll_msecs}="2000"

```

The Q&A is far too long to repost here, but please read the entire link to learn more.

  [1]: https://unix.stackexchange.com/questions/38582/udev-triggers-are-not-firing-on-insert-of-cf-card-into-usb-card-reader-anymore
