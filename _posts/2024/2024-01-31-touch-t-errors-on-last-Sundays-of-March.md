---
layout:       post
title:        >
    touch -t errors on last Sundays of March
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1501953
type:         Answer
tags:         command-line bug-reporting date coreutils
created_date: 2024-01-31 13:13:21
edit_date:    
votes:        "11 "
favorites:    
views:        "1,142 "
accepted:     
uploaded:     2025-03-13 15:35:00
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-01-31-touch-t-errors-on-last-Sundays-of-March.md
toc:          false
navigation:   false
clipboard:    false
---

During Daylight Savings Time transition the time of 02:00 to 02:59 does not exist. 

Linux / Ubuntu tracks time internally using UTC which does not observe Daylight Savings Time and works well. When converting to local time there will be a hole between 02:00 and 02:59.
