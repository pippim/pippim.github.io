---
layout:       post
title:        >
    How to tell if python script is being run in a terminal or via GUI?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63963798
type:         Answer
tags:         python user-interface shell testing
created_date: 2020-09-18 23:09:33
edit_date:    
votes:        "0 "
favorites:    
views:        "7,467 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-09-18-How-to-tell-if-python-script-is-being-run-in-a-terminal-or-via-GUI_.md
toc:          false
navigation:   false
clipboard:    false
---

In bash I use this script:

``` 
$ cat ~/bin/test-term.sh

#!/bin/bash

#See if $TERM has been set when called from Desktop shortcut

echo TERM environment variable: $TERM > ~/Downloads/test-term.txt
echo "Using env | grep TERM output below:" >> ~/Downloads/test-term.txt
env | grep TERM >> ~/Downloads/test-term.txt

exit 0
```

When you create a desktop shortcut to call the script the output is:

``` 
$ cat ~/Downloads/test-term.txt

TERM environment variable: dumb
Using env | grep TERM output below:
```

Notice grepping `env` command returns nothing?

Now call the script from the command line:

``` 
$ cat ~/Downloads/test-term.txt

TERM environment variable: xterm-256color
Using env | grep TERM output below:
TERM=xterm-256color
```

This time the TERM variable from `env` command returns `xterm-256color`

In Python you can use:

``` 
#import os
result = os.popen("echo $TERM")
result2 = os.popen("env | grep TERM")
```

Then check the results. I haven't done this in python yet but will probably need to soon for my current project. I came here looking for a ready made solution but noone has posted one like this yet.
