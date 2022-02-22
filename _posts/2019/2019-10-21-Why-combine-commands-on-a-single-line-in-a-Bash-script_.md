---
layout:       post
title:        >
    Why combine commands on a single line in a Bash script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182804
type:         Answer
tags:         command-line bash scripts
created_date: 2019-10-21 23:21:33
edit_date:    2019-10-23 17:25:39
votes:        "5 "
favorites:    
views:        "20,530 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-21-Why-combine-commands-on-a-single-line-in-a-Bash-script_.md
toc:          false
navigation:   false
clipboard:    false
---

## Why we sometimes like to use it

When we are writing answers here in **Ask Ubuntu** it is helpful to put them into one line which people can cut and paste into their terminal easier. For example:

``` 
$ CurrDir=$PWD ; cd /bin ; ls -la dd ; cd "$CurrDir"

-rwxr-xr-x 1 root root 72632 Mar  2  2017 dd
```

As mentioned earlier you could use `&&` for the same effect but if there were errors above you could end up on the wrong directory. In this case `;` is preferable to `&&` that isn't tested for success:

``` 
rick@alien:~/askubuntu$ CurrDir=$PWD && cd /bin && llllssss -la dd && cd "$CurrDir"

llllssss: command not found

rick@alien:/bin$ 
```

## Why we have to use it

There are some commands where you have to string multiple lines together. One case is the abbreviated `if`-commands-`fi` which must be one line. For example:

``` 
$ [[ 2 -eq 2 ]] && { echo 2 equals 2 ; echo setting three to 3 ; three=3 ; }

2 equals 2
setting three to 3
```
