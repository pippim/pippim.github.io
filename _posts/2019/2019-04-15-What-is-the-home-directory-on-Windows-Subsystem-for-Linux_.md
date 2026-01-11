---
layout:       post
title:        >
    What is the home directory on Windows Subsystem for Linux?
site:         Super User
stack_url:    https://superuser.com/q/1425611
type:         Answer
tags:         windows-10 bash windows-subsystem-for-linux
created_date: 2019-04-15 11:34:10
edit_date:    2019-04-16 00:49:23
votes:        "2 "
favorites:    
views:        "1,479,779 "
accepted:     
uploaded:     2026-01-11 15:47:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-15-What-is-the-home-directory-on-Windows-Subsystem-for-Linux_.md
toc:          false
navigation:   false
clipboard:    false
---

I just needed to find `/etc/environment` using Ubuntu 16.04 looking into Windows 10 NTFS storage. I found it here:



``` bash
C:\Users\USER_NAME\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu16.04onWindows_79rhkp1fndgsc\LocalState\rootfs\etc\environment
```

- I changed `/mnt/c/` to `C:\` for Windows nomenclature.
- I also changed all occurrences of `/` to `\` for same reason.
- You need to replace `USER_NAME` with your Windows User Name.
- I had to use `sudo -H Nautilus` to get permissions to view the User Files stored in WSL.
- **NEVER** update your Linux files in WSL using a Windows application. **It will corrupt your Linux data**.

From the Linux (Ubuntu 16.04) side the nomenclature would be:

``` bash
$ sudo cat /mnt/c/Users/USER_NAME/AppData/Local/Packages/CanonicalGroupLimited.Ubuntu16.04onWindows_79rhkp1fndgsc/LocalState/rootfs/etc/environment

PATH="/mnt/e/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
export LIBGL_ALWAYS_INDIRECT=Yes
export DISPLAY=localhost:0.0
```

