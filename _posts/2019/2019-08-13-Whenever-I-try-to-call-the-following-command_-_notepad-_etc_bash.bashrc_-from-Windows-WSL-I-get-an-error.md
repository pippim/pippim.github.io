---
layout:       post
title:        >
    Whenever I try to call the following command: "notepad /etc/bash.bashrc" from Windows WSL I get an error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165306
type:         Answer
tags:         command-line bash windows windows-subsystem-for-linux
created_date: 2019-08-13 01:51:16
edit_date:    
votes:        "1 "
favorites:    
views:        "713 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-13-Whenever-I-try-to-call-the-following-command_-_notepad-_etc_bash.bashrc_-from-Windows-WSL-I-get-an-error.md
toc:          false
navigation:   false
clipboard:    false
---

NEVER EVER Use a Windows Application to change a WSL file. YOU WILL CORRUPT YOUR DATA.

If you have Windows update 1903 installed (March 2019) you can [use Windows File Explorer][1] to access WSL files. However WSL must be running first.

If you want a GUI to edit files try `gedit` after installing `sudo apt install ubuntu-desktop`. See this for more information:

- [What&#39;s the easiest way to run GUI apps on Windows Subsystem for Linux as of 2018?](What&#39;s the easiest way to run GUI apps on Windows Subsystem for Linux as of 2018?)


  [1]: https://www.omgubuntu.co.uk/2019/02/access-linux-files-from-windows-explorer-wsl
