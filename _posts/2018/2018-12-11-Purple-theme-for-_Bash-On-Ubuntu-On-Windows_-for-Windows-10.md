---
layout:       post
title:        >
    Purple theme for "Bash On Ubuntu On Windows" for Windows 10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099927
type:         Answer
tags:         command-line themes windows-subsystem-for-linux
created_date: 2018-12-11 02:01:41
edit_date:    
votes:        "2 "
favorites:    
views:        "10,688 "
accepted:     Accepted
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-11-Purple-theme-for-_Bash-On-Ubuntu-On-Windows_-for-Windows-10.md
toc:          false
navigation:   false
clipboard:    false
---

## Introduction

You can setup Ubuntu like colors in Windows Subsystem for Linux as [this tutorial][1] describes in detail:

[![wsl with standard screenfetch.png][2]][2]

## Caveat

Don't use the `screenfetch` display above, use the modified `winscreeny` [here][3]:

[![WSL bash startup.png][4]][4]

Using this splash screen gives more details than the tutorial's screen and avoids error messages like it has.

## Terminal Background Color Instruction Summary

To summarize the tutorial in the first link you will need to:

- Head to the Ubuntu Website to download the Ubuntu Font for free.
- Install these fonts by clicking the “Install” button in the Windows Font Viewer windows. **NOTE:** I found the Consola's font built into Windows the best for me.
- Change the default terminal colors as per table below.

- Slot 1: `Red: 78, Green: 154, Blue: 6` 
- Slot 2: `Red: 52, Green: 101, Blue: 164` 
- Slot 3: `Red: 48, Green: 10, Blue: 36` 
- Slot 4: `Red: 6, Green: 152, Blue: 154` 
- Slot 5: `Red: 204, Green: 0, Blue: 0` 
- Slot 6: `Red: 117, Green: 80, Blue: 123` 
- Slot 7: `Red: 196, Green: 160, Blue: 0` 
- Slot 8: `Red: 211, Green: 215, Blue: 207` 
- Slot 9: `Red: 85, Green: 87, Blue: 83` 
- Slot 10: `Red: 114, Green: 159, Blue: 207` 
- Slot 11: `Red: 138, Green: 226, Blue: 52` 
- Slot 12: `Red: 52, Green: 226, Blue: 226` 
- Slot 13: `Red: 239, Green: 41, Blue: 41` 
- Slot 14: `Red: 173, Green: 127, Blue: 168` 
- Slot 15: `Red: 252, Green: 233, Blue: 79` 
- Slot 16: `Red: 238, Green: 238, Blue: 238`

As Piotr Bartnicki notes, many people may prefer a lighter blue for directories. If you fall into this camp, put the value for slot 10 in slot 2.

  [1]: https://medium.com/@jgarijogarde/make-bash-on-ubuntu-on-windows-10-look-like-the-ubuntu-terminal-f7566008c5c2
  [2]: https://i.stack.imgur.com/zfwZQ.png
  [3]: {% post_url /2017/2017-11-22-Windows-Subsystem-for-Linux-display-Linux-distribution_ %}
  [4]: https://i.stack.imgur.com/Ki66O.png
