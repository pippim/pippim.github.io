---
layout:       post
title:        >
    HDMI (DP-3) no output 2560x1600 59-60Hz in Ubuntu 19.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1166287
type:         Answer
tags:         nvidia multiple-monitors intel-graphics hdmi xrandr
created_date: 2019-08-16 23:16:39
edit_date:    
votes:        "0 "
favorites:    
views:        "615 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-16-HDMI-_DP-3_-no-output-2560x1600-59-60Hz-in-Ubuntu-19.04.md
toc:          false
navigation:   false
clipboard:    false
---

My 4K monitor and adapter rated at 60 Hz wouldn't work at 60 Hz either. Like yourself though it worked at 30 Hz. Then I tried 45 Hz and it worked too. I kept increasing it until 54 Hz which also worked. So I created a configuration at 54 Hz and placed it in `xorg` configuration. For me the jump from 30 Hz to 54 Hz relieves a lot of stress on the eyes. I don't think I loose that much dropping down from 60 Hz to 54 Hz.

Here is my `xorg` configuration snippet:

``` 
Section "Monitor"
    Identifier "DP-1-1"
    Modeline "3840x2160_54.00"  637.50  3840 4152 4568 5296  2160 2163 2168 2230 -hsync +vsync
    Option "PreferredMode" "3840x2160_54.00"
EndSection
```

You need to use `cvt` to create your `Modeline` above:

- [How to set a custom resolution?](How to set a custom resolution?)


