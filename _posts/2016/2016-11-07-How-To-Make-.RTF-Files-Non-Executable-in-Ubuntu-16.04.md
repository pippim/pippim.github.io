---
layout:       post
title:        >
    How To Make .RTF Files Non-Executable in Ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846418
type:         Answer
tags:         command-line bash permissions
created_date: 2016-11-07 01:35:58
edit_date:    2016-12-04 16:52:08
votes:        "2 "
favorites:    
views:        "327 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-07-How-To-Make-.RTF-Files-Non-Executable-in-Ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

Open Nautilus.

Navigate to one of the RTF files in question and left single click on it. Not a double click, a single left click to give it focus.

Hover your mouse over the top menu bar to make the "File, Edit..." menu appear then use:

 1. Click `Edit` drop-down menu
 2. Click `Preferences` option
 3. Click `Behavior` tab
 4. Observe the radio option buttons under `Executable Text Files`
 5. Check radio button `View executable text files when they are opened`

Note though when you do this and double click on a Bash Script file it will be opened with the default text editor selected instead of being executed.



