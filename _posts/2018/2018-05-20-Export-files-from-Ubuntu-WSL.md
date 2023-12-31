---
layout:       post
title:        >
    Export files from Ubuntu WSL
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038444
type:         Answer
tags:         windows-10 windows-subsystem-for-linux
created_date: 2018-05-20 17:17:19
edit_date:    
votes:        "0 "
favorites:    
views:        "6,126 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-20-Export-files-from-Ubuntu-WSL.md
toc:          false
navigation:   false
clipboard:    false
---

The easiest way of editing Linux files stored in WSL (Windows Subsystem for Linux) is to use Linux GUI applications. After the initial setup of Ubuntu for Windows 10 is complete you need to install `vcxsrv` and Ubuntu desktop. This will give you full access to GUI apps such as `gedit` and  run scripts that contain GUI dialogs such as `zenity` or `yad`.

See this answer: [What's the easiest way to run GUI apps on Windows Subsystem for Linux?]({% post_url /2018/2018-01-07-What_s-the-easiest-way-to-run-GUI-apps-on-Windows-Subsystem-for-Linux_ %})

If you use a Windows app to modify a Linux file stored in a WSL directory **[you will corrupt the data][1]**: 


  [1]: https://blogs.msdn.microsoft.com/commandline/2016/11/17/do-not-change-linux-files-using-windows-apps-and-tools/
