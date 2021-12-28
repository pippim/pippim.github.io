---
layout:       post
title:        Desktop shortcut to Bash script crashes and burns
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1019481
type:         Answer
tags:         bash nautilus symbolic-link
created_date: 2018-03-26 22:36:38
edit_date:    2020-06-12 14:37:07
votes:        5
favorites:    
views:        261
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

The problem is the script relies on the `TERM` environmental variable being setup. The Ubuntu Unity Desktop does not have this initialized when scripts are called. If you open a terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> the variable is setup.

To test your system create a little script called `test-term.sh` and make it look like this:



``` bash
#!/bin/bash

#See if $TERM has been set when called from Desktop shortcut

echo TERM environment variable: $TERM > ~/Downloads/test-term.txt
echo "Using env | grep TERM output below:" >> ~/Downloads/test-term.txt
env | grep TERM >> ~/Downloads/test-term.txt

exit 0

```

Create a link in Nautilus to `test-term.sh` and run the link. Then check the output file:

``` bash
$ cat ~/Downloads/test-term.txt

TERM environment variable: dumb
Using env | grep TERM output below:
(... blank line appears here ...)

```

As you can see the environment variable `TERM` is blank when the command `env | grep TERM` is used. Also the variable `$TERM` is set to `dumb` which doesn't suit the color-based, mouse-supported command `dialog` very well.


----------

## Boilerplate solution

The short term solution was to include boilerplate code at the top of the two scripts in question:

``` bash
# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

```

