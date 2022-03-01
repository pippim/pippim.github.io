---
layout:       post
title:        >
    Expand $PATH problem $HOME/bin is set twice
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1169391
type:         Answer
tags:         command-line bash
created_date: 2019-08-29 15:21:40
edit_date:    2019-08-30 13:25:10
votes:        "3 "
favorites:    
views:        "474 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-29-Expand-_PATH-problem-_HOME_bin-is-set-twice.md
toc:          false
navigation:   false
clipboard:    true
---

Ubuntu is already configured to automatically add `$HOME/bin` to the path.

You mentioned you're distribution was Server converted to Desktop and I'm not sure how that effects things but you can check:



{% include copyHeader.html %}
``` bash
$ cat ~/.profile

# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
	. "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin directories
PATH="$HOME/bin:$HOME/.local/bin:$PATH"
```

It sounds like this is being executed and what you are manually doing is doubling up on the last line in the file.


----------


## Using `grep` to find all references

You can use grep to find all the files where `$HOME/bin` is referenced:

``` bash
grep -rnw --exclude-dir={proc,root,run,sys,/tmp,tmpfs,var} '/' -e "$HOME/bin"
```
