---
layout:       post
title:        >
    Timezone changes do not persist
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182535
type:         Answer
tags:         18.04 time timezone
created_date: 2019-10-20 23:18:20
edit_date:    2019-10-24 10:57:12
votes:        "1 "
favorites:    
views:        "629 "
accepted:     Accepted
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-Timezone-changes-do-not-persist.md
toc:          false
navigation:   false
clipboard:    false
---

According to this article:

- [How To Set or Change Timezone on Ubuntu 18.04][1]

You don't need the `sudo dpkg-reconfigure -f noninteractive tzdata` command and it makes me wonder if it harms things.

Basically just use:

``` 
$ timedatectl # lists your current time zone

$ sudo timedatectl set-timezone "Pacific/Auckland"

$ timedatectl # lists your new time zone
```

If time zone reverts back to UTC, use this command:

``` 
sudo dpkg-reconfigure tzdata
```

  [1]: https://linuxize.com/post/how-to-set-or-change-timezone-on-ubuntu-18-04/

