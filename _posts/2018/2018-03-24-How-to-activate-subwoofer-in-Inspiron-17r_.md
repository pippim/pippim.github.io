---
layout:       post
title:        >
    How to activate subwoofer in Inspiron 17r?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1018740
type:         Answer
tags:         sound dell inspiron
created_date: 2018-03-24 01:21:10
edit_date:    2018-04-01 23:07:51
votes:        "2 "
favorites:    
views:        "12,479 "
accepted:     Accepted
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-24-How-to-activate-subwoofer-in-Inspiron-17r_.md
toc:          false
navigation:   false
clipboard:    false
---

On this answer: [https://askubuntu.com/a/481831/307523][1], I found this comment I wrote last year: ***March 5, 2017 - Just to confirm this activates the sub-woofer for the Dell Inspiron 17R 7720 SE in Ubuntu 16.04***.

Firstly you will need to install alsa-tools & alsa-tools-gui from either the software center or from terminal.

``` 
sudo apt-get install alsa-tools alsa-tools-gui
```

Open HDAJackRetask

Select the **IDT 92HD91BXX** codec

Check the “Show unconnected pins” box (the internal speakers do not show as connected)

 1. Remap 0x0d (Internal Speaker, which is your Front side) to Internal speaker.
 3. Remap 0×10 (“Not connected”, which is the subwoofer) to “Internal speaker (LFE)”
``` 

```
Select **“Install boot override”** to save the settings to apply at boot time. **Reboot**. When it comes back, you should have full sound from all speakers.


----------

Note: Option 2. was removed due to new testing by **alfC**. It used to say:

 2. Remap 0x0f (“Not connected”, which is the under-display speakers) to “Internal speaker” 


  [1]: https://askubuntu.com/a/481831/307523
