---
layout:       post
title:        >
    How can you tell the version of Ubuntu on a system in a .sh (bash) script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162492
type:         Answer
tags:         command-line bash scripts
created_date: 2019-07-31 19:47:55
edit_date:    2019-08-01 10:56:49
votes:        "26 "
favorites:    
views:        "7,835 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-31-How-can-you-tell-the-version-of-Ubuntu-on-a-system-in-a-.sh-_bash_-script_.md
toc:          false
navigation:   false
clipboard:    false
---

``` 
Var=$(lsb_release -r)
echo "$Var"
```

Should do the trick.

For the numeric portion only add this:

``` 
NumOnly=$(cut -f2 <<< "$Var")
echo "$NumOnly"
```


----------

## The `lsb-release` variables file

`/usr/bin/lsb_release` is a Python script. It's a short script that serves as a good introduction to the python language. As others mentioned, a shorter way to get the version number only is with `lsb_release -sr`.

The `/etc/lsb-release` file defines environmental variables with the same information provided by the `lsb_release -a` command:

``` 
$ cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.6 LTS"
```

You can include these environment variables at anytime using `. /etc/lsb-release`. To test in your terminal:

``` 
$ . /etc/lsb-release

$ echo $DISTRIB_RELEASE
16.04

$ echo $DISTRIB_DESCRIPTION
Ubuntu 16.04.6 LTS
```




