---
layout:       post
title:        >
    UbuntuOnWindows: Restoring backup directory causes UbuntuOnWindows to fail starting
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069578
type:         Answer
tags:         windows windows-10
created_date: 2018-08-27 23:45:11
edit_date:    
votes:        "1 "
favorites:    
views:        "19 "
accepted:     Accepted
uploaded:     2022-02-10 05:58:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-27-UbuntuOnWindows_-Restoring-backup-directory-causes-UbuntuOnWindows-to-fail-starting.md
toc:          false
navigation:   false
clipboard:    false
---

As this blog: [Do not change Linux files using Windows apps and tools][1] and many others explicitly state, if you use a Windows program to create or modify files in Ubuntu on Windows they will become corrupted. You must use a Linux program to copy, restore or modify files within Ubuntu for Windows.

I suspect you used a Windows program to restore the `.zip` file and not a Linux program like one of those found here: [Zipping and Unzipping Files in UNIX][2]


  [1]: https://blogs.msdn.microsoft.com/commandline/2016/11/17/do-not-change-linux-files-using-windows-apps-and-tools/
  [2]: https://www.hostingmanual.net/zipping-unzipping-files-unix/
