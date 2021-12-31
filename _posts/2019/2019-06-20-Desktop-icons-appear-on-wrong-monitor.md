---
layout:       post
title:        Desktop icons appear on wrong monitor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1152464
type:         Answer
tags:         multiple-monitors xfce monitor .desktop desktop-icons iconic
created_date: 2019-06-20 01:27:44
edit_date:    
votes:        2
favorites:    
views:        12,010
accepted:     
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

I wrote `iconic` to solve this problem and others. It will:

- Allow you to move icons to any of three monitors
- Not suffer the "lost icon syndrome" that occurs when monitors of multiple resolutions are used
- Sort icons alphabetically, alphabetically with "Link to" prefix ignored, sort by modified date ascending or date descending
- Allow different grid size (columns x rows) depending on monitor, EG more on 4K monitor than 2K monitor
- Instant **Test** button for quick experimentation on column x row changes or reserved space changes for monitor left, top, right or bottom areas
- **Test** button will last for x seconds defined by you, clear all windows before test and restore them after test
- Bash script for easy modifications

You can get the script on [github][1].

Here's the main screen:

[![iconic main menu.png][2]][2]

Visit the [github][1] page for **iconic** to see all the other screens, explanations and a copy of the script.


  [1]: https://github.com/WinEunuuchs2Unix/iconic
  [2]: https://i.stack.imgur.com/Q45Pz.png
