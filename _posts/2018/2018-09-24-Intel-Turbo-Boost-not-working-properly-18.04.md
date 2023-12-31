---
layout:       post
title:        >
    Intel Turbo Boost not working properly 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1077888
type:         Answer
tags:         18.04 intel turbo-boost cpuf
created_date: 2018-09-24 03:57:04
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "10,572 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-24-Intel-Turbo-Boost-not-working-properly-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

For full answer see: [Is Turbo Boost Working?]({% post_url /2018/2018-01-03-Is-Turbo-Boost-Working_ %})

## Is Intel Turbo Boost enabled?

Using the terminal you can check if Turbo Boost feature is enabled:

``` 
$ cat /sys/devices/system/cpu/intel_pstate/no_turbo
0
```

This is a double negative; when "no turbo" is off (=0) then Turbo Boost is on.

To disable Turbo Boost use `sudo` powers and set the switch `no_turbo` to `1`:

``` 
$ echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
1
```

The returned `1` indicates turbo is now off.


----------

I wrote `cpuf` to let you change the minimum and maximum frequencies to any within the allowable range:

- [GUI or simple Bash script to throttle the CPU?]({% post_url /2019/2019-05-12-GUI-or-simple-Bash-script-to-throttle-the-CPU_ %})

[![cpuf-demo.gif][1]][1]

  [1]: https://i.stack.imgur.com/2lHSD.gif

Visit the link to copy the script or get more details.

