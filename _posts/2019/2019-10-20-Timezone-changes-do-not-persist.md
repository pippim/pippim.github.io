---
layout:       post
title:        >
    Timezone changes do not persist
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182535
type:         Answer
tags:         18.04 time timezone
created_date: !!str "2019-10-20 23:18:20"
edit_date:    !!str "2019-10-24 10:57:12"
votes:        !!str "1"
favorites:    
views:        !!str "602"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
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

```

``` 
$ sudo timedatectl set-timezone "Pacific/Auckland"

```

``` 
$ timedatectl # lists your new time zone

```

If time zone reverts back to UTC, use this command:

``` 
sudo dpkg-reconfigure tzdata

```

  [1]: https://linuxize.com/post/how-to-set-or-change-timezone-on-ubuntu-18-04/

