---
layout:       post
title:        >
    How can I create new "gksu" command based on pkexec?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/847769
type:         Answer
tags:         command-line nautilus gedit policykit gksudo grub
created_date: 2016-11-10 11:49:50
edit_date:    2016-11-11 00:09:35
votes:        "2 "
favorites:    
views:        "621 "
accepted:     Accepted
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-10-How-can-I-create-new-^gksu^-command-based-on-pkexec^.md
toc:          false
navigation:   false
clipboard:    false
---

Before you can use `pkexec` with `gedit` and `nautilus` you need to copy the polkit rules to support them. This will automatically be done in Ubuntu 17.04 but in the mean time you need to `wget` them.

### Nautilus Policy Kit

``` 
wget https://raw.githubusercontent.com/hotice/webupd8/master/org.gnome.nautilus.policy -O /tmp/org.gnome.nautilus.policy
sudo cp /tmp/org.gnome.nautilus.policy /usr/share/polkit-1/actions/

```

### Gedit Policy Kit

``` 
wget https://raw.githubusercontent.com/hotice/webupd8/master/org.gnome.gedit.policy -O /tmp/org.gnome.gedit.policy
sudo cp /tmp/org.gnome.gedit.policy /usr/share/polkit-1/actions/

```

## "gsu" bash script to replace "gksu"

Creating a bash script is one of two ways to call `pxexec` using the somewhat familiar term of `gsu`. Create this file in one of your paths:



``` bash
#!/bin/bash

# Usage: gsu gedit file1 file2...
#  -OR-  gsu natuilus /dirname

# & is used to spawn process and get prompt back ASAP
# > /dev/null is used to send gtk warnings into dumpster

COMMAND=$1 # extract gedit or nautilus

pkexec "$COMMAND" "${@:2}" &> /dev/null&

```

Save the file and mark it as executable with `chmod +x gsu`

Now instead of typing `gksu` to edit grub configuration you can use:

``` bash
gsu gedit /etc/default/grub

```

## "gsu" as an alias of "pkexec" to replace "gksu"

Creating an alias is the second option to call `pxexec` using the somewhat familiar term of `gsu`. Open the file `~/.bashrc` and search for `alias`. You will see this:

``` bash
# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

```

After the last line add this:

``` bash
alias gsu='pkexec'

```

Save the file and exit.

