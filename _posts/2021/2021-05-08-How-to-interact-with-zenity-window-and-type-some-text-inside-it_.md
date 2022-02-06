---
layout:       post
title:        >
    How to interact with zenity window and type some text inside it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1337013
type:         Answer
tags:         18.04 bash python xdotool zenity
created_date: 2021-05-08 19:07:14
edit_date:    2022-01-08 00:02:09
votes:        "5 "
favorites:    
views:        "650 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-08-How-to-interact-with-zenity-window-and-type-some-text-inside-it_.md
toc:          false
navigation:   false
clipboard:    false
---

Change your `zenity.sh` file with:

``` python
#!/usr/bin/python

zenity --forms --title="Question" \
   --add-entry="Question" \
```

To:

``` bash
#!/bin/bash

zenity --forms --title="Question" \
   --add-entry="Question" \
```

You are not calling `zenity` within a python script. You are calling it from a bash/shell command so your shebang (first line) must be `#!/bin/bash` not `#!/usr/bin/python`.
