---
layout:       post
title:        >
    How to get the location of a program in Ubuntu terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1051333
type:         Answer
tags:         command-line bash
created_date: 2018-07-01 23:19:09
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "7,902 "
accepted:     
uploaded:     2023-11-17 06:28:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-01-How-to-get-the-location-of-a-program-in-Ubuntu-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

As David Foerster already mentioned, you can use `type -a` which will show all the locations a given executable can be found in the active `$PATH`:

``` 
$ type -a now
now is /home/rick/bin/now
now is /mnt/e/bin/now
```

`type -a` will also identify if the command is a shell built-in. For example:

``` 
$ type -a test
test is a shell builtin
test is /usr/bin/test
```

`type -a` will also identify if the command is a shell keyword. For example:

``` 
$ type -a if
if is a shell keyword
```

`type a` lists programs, commands, shell built-ins and shell keywords in the hierarchal order they would be called depending on the `$PATH` environment variable. By changing `PATH=` to a different order it changes which version of the program is called. This is handy when you have production, development and test program versions on the same machine.

## Program isn't in $PATH

What if the program isn't in your path? The fastest way of finding it is with the `locate` command:

``` 
$ locate .bashrc
/etc/bash.bashrc
/etc/skel/.bashrc
/home/rick/.bashrc
/home/rick/.bashrc~
/mnt/e/.bashrc
/mnt/e/Temporary Work/.bashrc
/usr/share/base-files/dot.bashrc
/usr/share/doc/adduser/examples/adduser.local.conf.examples/bash.bashrc
/usr/share/doc/adduser/examples/adduser.local.conf.examples/skel/dot.bashrc
```

I kind of cheated here because `.bashrc` isn't a real executable, it's a "source" file to include in a bash script which is an executable. However it serves to illustrate appropriately.
