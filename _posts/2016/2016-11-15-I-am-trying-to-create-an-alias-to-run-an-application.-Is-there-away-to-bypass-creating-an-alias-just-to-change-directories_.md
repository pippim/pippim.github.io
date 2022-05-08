---
layout:       post
title:        >
    I am trying to create an alias to run an application. Is there away to bypass creating an alias just to change directories?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/849690
type:         Answer
tags:         command-line bash alias
created_date: 2016-11-15 11:37:47
edit_date:    2016-11-15 12:59:57
votes:        "2 "
favorites:    
views:        "85 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-15-I-am-trying-to-create-an-alias-to-run-an-application.-Is-there-away-to-bypass-creating-an-alias-just-to-change-directories_.md
toc:          false
navigation:   false
clipboard:    false
---

When you type `echo $PATH` you should see `/usr/local/bin` is already in your path and there is no need to change to that directory in the first place. You can run the executable simply by typing `packettracer` - there is no need to `cd` to it.

Even if it is not in your PATH, you don't need to change to a program's / script's directory as a separate command; you can run it by prefixing the executable's name with the full path, in this case:

``` 
/usr/local/bin/packettracer
```

Therefore your alias can simply be:

``` 
alias pt='/usr/local/bin/packettracer'
```

or even

``` 
alias pt='packettracer'
```

Before setting an alias, check that the command you want to use doesn't already exist using the `type` command. Hopefully you will see that it is not in use:

``` 
$ type pt
bash: type: pt: not found
```

Once you have a suitable alias, to make is permanent you can add it to the end of your `~/.bashrc` file (use your favourite text editor; for example, open a terminal and type `nano .bashrc` add the alias, save and exit, and the alias will be available as soon as you open a new shell).
