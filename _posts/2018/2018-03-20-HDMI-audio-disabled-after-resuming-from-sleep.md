---
layout:       post
title:        >
    HDMI audio disabled after resuming from sleep
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1017582
type:         Answer
tags:         sound pulseaudio hdmi spdif
created_date: 2018-03-20 10:50:34
edit_date:    
votes:        "2 "
favorites:    
views:        "1,084 "
accepted:     
uploaded:     2025-02-15 10:53:31
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-20-HDMI-audio-disabled-after-resuming-from-sleep.md
toc:          false
navigation:   false
clipboard:    false
---

There is a [complicated way][1] of accomplishing this with `udev` rules, `systemd` service and suspend/resume hooks.

An easier way is to check this:

``` 
$ cat /etc/pulse/default.pa | grep switch-on-port-available
load-module module-switch-on-port-available
```

If the second line doesn't begin with a `#` (commented out) then edit the file and insert a `#` in the beginning.

Now all output will be controlled to what you manually set it to and stay there until you change it.


  [1]: https://wiki.archlinux.org/index.php/PulseAudio/Examples#HDMI_output_configuration
