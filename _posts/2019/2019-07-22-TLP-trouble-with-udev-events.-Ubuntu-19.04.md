---
layout:       post
title:        >
    TLP trouble with udev events. Ubuntu 19.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160206
type:         Answer
tags:         power-management battery udev tlp
created_date: 2019-07-22 16:42:40
edit_date:    
votes:        "0 "
favorites:    
views:        "389 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-22-TLP-trouble-with-udev-events.-Ubuntu-19.04.md
toc:          false
navigation:   false
clipboard:    false
---

I'm running an older version of `tlp` on Ubuntu 16.04 where `udevadm` is working properly. The rules are stored here:

``` 
$ ll /lib/udev/rules.d/*tlp*
-rw-r--r-- 1 root root 1221 Aug 11  2015 /lib/udev/rules.d/85-tlp-rdw.rules
-rw-r--r-- 1 root root  440 Aug 11  2015 /lib/udev/rules.d/85-tlp.rules
```

There have been recent bug reports of your situation:

- [AC not detect when plugged in][1]
- [AC mode not detected with USB charger][2]

All bugs were reported on your TLP version `1.1` and fixes were released under version `1.2`.

See the bug reports for instructions to fix.


  [1]: https://github.com/linrunner/TLP/issues/375
  [2]: https://github.com/linrunner/TLP/issues/320
