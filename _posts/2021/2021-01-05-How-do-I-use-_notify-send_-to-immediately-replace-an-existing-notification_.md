---
layout:       post
title:        >
    How do I use 'notify-send' to immediately replace an existing notification?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1305360
type:         Answer
tags:         command-line bash notification notify-osd
created_date: 2021-01-05 23:37:42
edit_date:    
votes:        "0 "
favorites:    
views:        "39,832 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-05-How-do-I-use-_notify-send_-to-immediately-replace-an-existing-notification_.md
toc:          false
navigation:   false
clipboard:    false
---

This is a working example of [Mark L's Answer][1]:

[![tvpowered volume.gif][2]][2]

With this method a **confirmation** bubble is sent overlapping the top panel bar. Traditionally a **notification** bubble which appears lower below the top panel bar.

A notification bubble usually lasts a few seconds but in above `gif` the confirmation bubble is immediately replaced by the next one. The method is to call the `notify-send` command in a loop:

``` bash
# Make volume bar using progress bar methods
VolumeBar $CurrVolume
# Ask Ubuntu: https://askubuntu.com/a/871207/307523
notify-send --urgency=critical "tvpowered" \
    -h string:x-canonical-private-synchronous:volume \
    --icon=/usr/share/icons/gnome/48x48/devices/audio-speakers.png \
    "Volume: $CurrVolume $Bar"
```

In above code snippet the function `VolumeBar` sets the variable `$Bar` with a progress bar based on the value passed in `$CurrVolume`.


  [1]: https://askubuntu.com/a/871207/307523
  [2]: https://i.stack.imgur.com/QBGf7.gif
