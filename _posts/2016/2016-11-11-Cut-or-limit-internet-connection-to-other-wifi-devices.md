---
layout:       post
title:        >
    Cut or limit internet connection to other wifi devices
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/848031
type:         Answer
tags:         wireless
created_date: 2016-11-11 00:59:15
edit_date:    2017-04-13 12:37:16
votes:        "2 "
favorites:    
views:        "4,555 "
accepted:     Accepted
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-11-Cut-or-limit-internet-connection-to-other-wifi-devices.md
toc:          false
navigation:   false
clipboard:    false
---

## ethtool

You can change the aggregate speed of the NIC port using `ethtool`.

``` 
$ sudo ethtool -s eth0 speed 10
```

This will set the port to 10MB, for example.

## wondershaper

You can also use the tool `wondershaper` to do it as well. NOTE: Speed should be in kilobits per second.

``` 
$ sudo wondershaper eth1 downspeed upspeed
```

For example:

``` 
$ sudo wondershaper eth0 10000 280
```

## trickle

A 3rd option is `trickle`. Trickle can be used per program by users or as a daemon that throttles the NIC completely.

User mode - [trickle man page][1]

``` 
$ sudo trickle -d 20 -u 20 wget http://www.google.com/bigfile
```

Will throttle 20K/s for both up and down traffic for just this `wget`, everything else will not be limited.

Daemon mode - [trickled man page][2]

In daemon mode, trickled can limit a group of programs to a fixed limit of bandwidth. To start the daemon, run the trickled command:

``` 
$ sudo trickled -d 20 -u 20
```

## pyshaper

A 4th option is `pyshaper`. It's a unique option among the choices in that it includes GUI and it dynamically monitors and sets the bandwidth over time. You can check out the [pyshaper man page][3]for more details.

Above copied from this answer: [StackExchange - limit outgoing bandwidth on a specific interface][4]


  [1]: https://monkey.org/~marius/trickle/trickle.1.txt
  [2]: https://monkey.org/~marius/trickle/trickled.8.txt
  [3]: http://freenet.mcnabhosting.com/python/pyshaper/pyshaper.html
  [4]: https://unix.stackexchange.com/questions/83888/limit-outgoing-bandwidth-on-an-specific-interface
