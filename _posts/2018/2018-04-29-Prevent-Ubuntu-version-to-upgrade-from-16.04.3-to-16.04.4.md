---
layout:       post
title:        >
    Prevent Ubuntu version to upgrade from 16.04.3 to 16.04.4
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029840
type:         Answer
tags:         16.04 apt upgrade
created_date: 2018-04-29 19:56:45
edit_date:    2018-04-29 21:48:16
votes:        "1 "
favorites:    
views:        "443 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Prevent-Ubuntu-version-to-upgrade-from-16.04.3-to-16.04.4.md
toc:          false
navigation:   false
clipboard:    false
---

You need to disable your HWE (Hardware Enablement Stack). From this Q&A: [How to disable HWE messages (14.04)][1] you can turn off messages using:

``` 
sudo touch /var/lib/update-notifier/disable-hwe-eol-messages
```

From this Q&A: [Rolling back to non-HWE stack on Ubuntu 16.04.2][2] you can use:

``` 
sudo apt-get remove xserver-xorg-hwe-16.04
sudo apt install xserver-xorg-core
sudo apt install ubuntu-desktop xserver-xorg libgl1-mesa-dri:i386 libgl1-mesa-glx:i386
```

Not specified in the linked answer, but I would run these commands from the console (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd>) login.

**Please read the links carefully** and ensure they describe exactly what you want to do. If in doubt post a comment before proceeding.


----------

Another option is to pin kernel version `4.4.0-87` so it never gets upgraded. See this Q&A: [How can I avoid kernel updates?][3]. Basically you will:

``` 
sudo apt-mark hold <package_name>
sudo apt-mark hold linux-image-generic linux-headers-generic
```

This isn't a specific answer but will get you started in the right direction.

  [1]: https://askubuntu.com/questions/817200/how-to-disable-hwe-messages-14-04
  [2]: https://askubuntu.com/questions/885828/rolling-back-to-non-hwe-stack-on-ubuntu-16-04-2
  [3]: https://askubuntu.com/questions/678630/how-can-i-avoid-kernel-updates?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
