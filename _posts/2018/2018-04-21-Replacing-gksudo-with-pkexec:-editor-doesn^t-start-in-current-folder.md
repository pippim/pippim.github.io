---
layout:       post
title:        >
    Replacing gksudo with pkexec: editor doesn't start in current folder
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1026821
type:         Answer
tags:         gksudo pkexec
created_date: 2018-04-21 01:21:40
edit_date:    
votes:        "5 "
favorites:    
views:        "2,176 "
accepted:     Accepted
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-21-Replacing-gksudo-with-pkexec:-editor-doesn^t-start-in-current-folder.md
toc:          false
navigation:   false
clipboard:    false
---

As mentioned in comments, `gksu` was "orphaned" in **16.04** but you can still install it with:

``` 
sudo apt install gksu
```

That said I made a wrapper script for `pkexec` a long time ago that might be of some interest:



``` bash
#!/bin/bash

# Usage: gsu gedit file1
#  -OR-  gsu natuilus /dirname

COMMAND="$1" # extract gedit or nautilus
ABSOLUTE_NAME=$(realpath "$2")

pkexec "$COMMAND" "$ABSOLUTE_NAME"

#log-file "$ABSOLUTE_NAME" ~/bin/log-gsu-"$COMMAND"
```

I named the wrapper `gsu` as a short form of `gksu`. The `log-file` script is a separate project which I commented out in the script for this answer.

You need to setup `gedit` and `nautilus` policy kits before you can use this script as the comments reference. In your case you would need to setup a policy kit for `leafpad`.

Hope this helps!
