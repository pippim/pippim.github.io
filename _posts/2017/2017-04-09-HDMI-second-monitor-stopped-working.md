---
layout:       post
title:        >
    HDMI second monitor stopped working
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/902988
type:         Answer
tags:         16.10
created_date: 2017-04-09 20:07:06
edit_date:    
votes:        "3 "
favorites:    
views:        "4,689 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-09-HDMI-second-monitor-stopped-working.md
toc:          false
navigation:   false
clipboard:    false
---

Given the limited information to date this is the closest answer I could find to your problems: [[SOLVED] Xrandr it doesn't detect HDMI output][1].

In a nut shell you may need to:

- Implement Intel early microcode updates
- Utilize a command something like: `xrandr --output LVDS-1-0 --auto --rotate normal --pos 0x0 --output HDMI-0 --auto --rotate normal  --left-of LVDS-1-0 --output VGA-0 --right-of LVDS-1-0`

Please try appropriate solutions in the link. Then report back success or how your system is different then we can work from there.


  [1]: https://bbs.archlinux.org/viewtopic.php?id=204800
