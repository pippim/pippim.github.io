---
layout:       post
title:        >
    How to *STOP* sharing a folder
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1245644
type:         Answer
tags:         nautilus samba file-sharing sharing
created_date: 2020-06-01 01:32:39
edit_date:    2020-06-01 01:37:56
votes:        "1 "
favorites:    
views:        "1,876 "
accepted:     Accepted
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-01-How-to-*STOP*-sharing-a-folder.md
toc:          false
navigation:   false
clipboard:    false
---

You should read all the answers here:

- [How do I completely remove Samba?](How do I completely remove Samba?)

But the solution which seems best is:
``` 
sudo apt -y remove --purge samba samba-common cifs-utils smbclient
sudo rm -rf /var/cache/samba /etc/samba /run/samba /var/lib/samba /var/log/samba
```

If you want to keep samba and only one to uncheck a specific folder see this:

- [How to remove/disable sharing of single folder [SOLVED]](https://forums.linuxmint.com/viewtopic.php?t=184402)

The share definitions are in `/var/lib/samba/usershares`. Open it (as root if necessary) and remove the definition files.
