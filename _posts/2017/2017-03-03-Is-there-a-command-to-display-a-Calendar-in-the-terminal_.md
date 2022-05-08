---
layout:       post
title:        >
    Is there a command to display a Calendar in the terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/889113
type:         Answer
tags:         command-line calendar
created_date: 2017-03-03 11:10:55
edit_date:    2022-03-11 00:10:36
votes:        "54 "
favorites:    
views:        "33,532 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-03-Is-there-a-command-to-display-a-Calendar-in-the-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

# `cal` calendar command for terminal

You can use the `cal` command to display a calendar in Julian or Gregorian format. The format depends on your locale settings but can be toggled with parameters.

As the screen below shows the default calendar is the current month. You can use the parameter `-A 2` to display the next two months or `2018` to display all months in that year:

[![cal][1]][1]

---

## Ubuntu versions after 20.04

After version **20.04** you may have to use

``` shell
sudo apt update
sudo apt install ncal
```

Note the `ncal` package does include the `cal` command. Also note that `ncal` is available out of the box in earlier Ubuntu versions before `20.04` as well.

For example on Ubuntu 16.04 LTS ECM:

``` shell
$ ncal

    March 2022        
Su     6 13 20 27   
Mo     7 14 21 28   
Tu  1  8 15 22 29   
We  2  9 16 23 30   
Th  3 10 17 24 31   
Fr  4 11 18 25      
Sa  5 12 19 26      
```

  [1]: https://i.stack.imgur.com/Xhe3s.png
