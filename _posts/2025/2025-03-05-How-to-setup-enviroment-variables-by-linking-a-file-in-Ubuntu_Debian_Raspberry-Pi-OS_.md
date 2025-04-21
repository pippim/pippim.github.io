---
layout:       post
title:        >
    How to setup enviroment variables by linking a file in Ubuntu/Debian/Raspberry Pi OS?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1542999
type:         Answer
tags:         raspberrypi environment-variables vulkan
created_date: 2025-03-05 23:40:00
edit_date:    
votes:        "2 "
favorites:    
views:        "211 "
accepted:     Accepted
uploaded:     2025-04-21 05:23:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2025/2025-03-05-How-to-setup-enviroment-variables-by-linking-a-file-in-Ubuntu_Debian_Raspberry-Pi-OS_.md
toc:          false
navigation:   false
clipboard:    false
---

Use `gedit ~/.bashrc`

Go to the end of the file and add the line: `setup-env.sh`

Save the file and exit the terminal.

Reopen the terminal and now Vulkan SDK should work from the command line every time you open the terminal.
