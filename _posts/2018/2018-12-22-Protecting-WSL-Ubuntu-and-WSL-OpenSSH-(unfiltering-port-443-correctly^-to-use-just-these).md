---
layout:       post
title:        >
    Protecting WSL-Ubuntu and WSL-OpenSSH (unfiltering port 443 correctly, to use just these)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1103835
type:         Answer
tags:         login security firewall automation windows-subsystem-for-linux
created_date: 2018-12-22 16:52:37
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "769 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-22-Protecting-WSL-Ubuntu-and-WSL-OpenSSH-(unfiltering-port-443-correctly^-to-use-just-these).md
toc:          false
navigation:   false
clipboard:    false
---

## Version 1803 allows outgoing connections on all ports 

Windows WSL Version 1803 (March 2018) allowed all ports as outgoing connections. Version 1809 (September 2018). However this version was pulled soon after release due to unrelated bugs. Your question doesn't mention which version you are running.

One month ago (Novemeer 2018) From [Redit][1]:

## WSL support for the built-in Windows Firewall

As I understand it the October Windows 10 1809 update finally added WSL support for the built-in Windows Firewall.

Previously, the only way to use WSL was to allow all outgoing connections, as it was not aware of pico.

However, it seems the 1809 update has been pulled for unrelated issues and is and isn't available for download anymore.

I'm on 1803 and I'm wondering if there is any way to get this functionality back or do I have to wait until 1809 is re-released?

History, more info on this: [https://github.com/Microsoft/WSL/issues/1852](https://github.com/Microsoft/WSL/issues/1852)


  [1]: https://www.reddit.com/r/bashonubuntuonwindows/comments/9sn6a3/wsl_support_for_the_builtin_windows_firewall/
