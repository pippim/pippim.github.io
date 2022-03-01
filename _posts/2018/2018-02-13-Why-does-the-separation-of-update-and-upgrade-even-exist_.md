---
layout:       post
title:        >
    Why does the separation of update and upgrade even exist?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1005794
type:         Answer
tags:         apt package-management upgrade updates architecture
created_date: 2018-02-13 12:37:57
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "642 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-13-Why-does-the-separation-of-update-and-upgrade-even-exist_.md
toc:          false
navigation:   false
clipboard:    false
---

## They do separate things for many reasons.

One example is a question I posted and self-answered: [How can PPAs be removed using GUI?][1]. On this screen we want to **remove PPAs** not upgrade the software:

[![Remove PPA.png][2]][2]

After removing a PPA the GUI software automatically runs `sudo apt update`. If you were to remove a PPA from the command line you need to run `sudo apt update` ***after*** removing a PPA from sources list.

### Without a separate `apt update` function there is no way to remove a PPA!.


----------


Another example is you need to run `sudo apt update` from command line to refresh sources. Then you can find out what **could** be upgraded **without** actually upgrading:

``` 
$ apt list --upgradable
Listing... Done
conky-std/xenial 1.10.1-3 amd64 [upgradable from: 1.9.0-4]
google-chrome-stable/stable 65.0.3325.181-1 amd64 [upgradable from: 63.0.3239.132-1]
libxnvctrl0/xenial 390.48-0ubuntu0~gpu16.04.1 amd64 [upgradable from: 387.22-0ubuntu0~gpu16.04.1]
nvidia-settings/xenial 390.48-0ubuntu0~gpu16.04.1 amd64 [upgradable from: 387.22-0ubuntu0~gpu16.04.1]
peek/xenial 1.3.1-0~ppa23~ubuntu16.04.1 amd64 [upgradable from: 1.2.1-0~ppa20~ubuntu16.04.1]
```

Looking at the output you could decide to have a given package "pinned" or "held back" and not upgraded the next time `sudo apt upgrade" is run. If there were a single "update/upgrade" process you would loose these ability.

### Without a separate `apt update` you can't see what would be upgraded!

  [1]: {% post_url /2018/2018-02-04-How-can-PPAs-be-removed-using-GUI_ %}
  [2]: https://i.stack.imgur.com/wMJvE.png
