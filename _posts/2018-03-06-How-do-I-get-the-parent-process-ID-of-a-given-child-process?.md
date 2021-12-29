---
layout:       post
title:        How do I get the parent process ID of a given child process?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1012277
type:         Answer
tags:         command-line bash process
created_date: 2018-03-06 04:03:44
edit_date:    2020-06-12 14:37:07
votes:        11
favorites:    
views:        254,691
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

# Using `pstree` by command name

Using `pstree` you can search by the child process name and get the Process ID (PID) along with the parents, grandparents and any children of the child process:

``` 
$ pstree -hp | grep sleep
           |-cron(763)---cron(795)---sh(839)---display-auto-br(841)---sleep(8414)

```


In this case `sleep` is the child command and it's PID is `8414`. It's parent ID is 841 and is called `display-auto-brightness`. The grandparent is a shell (`sh`) with a process ID of `839`. The great-grandparent is `cron` with a process ID of `795`. The great-great-grandparent is also `cron` with a process ID of `763`.

If you want to search by Process ID of `sleep` instead of name you can use:

``` 
$ pstree -hp | grep 14653
           |-cron(763)---cron(795)---sh(839)---display-auto-br(841)---sleep(14653)

```

Notice the `sleep` process ID changed to `14653`. The parent (PID 841) sleeps for 1 minute, wakes up for a split second and then starts a new `sleep` command which gets a new process ID. This is another reason why searching for `sleep` is easier than searching by process ID.

This code was taken from: [Automatically adjust display brightness based on sunrise and sunset][1] and adapted to this question.

----------

To see a nested chain all the way back to boot process use the PID instead of name:

``` 
$ pstree -aps 8541
systemd,1 splash fastboot kaslr
  └─cron,763 -f
      └─cron,795 -f
          └─sh,839 -c    /usr/local/bin/display-auto-brightness
              └─display-auto-br,841 /usr/local/bin/display-auto-brightness
                  └─sleep,8541 60

```

**Note:** Another minute has passed and the sleep command gets a new PID (8541).

  [1]: https://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset

