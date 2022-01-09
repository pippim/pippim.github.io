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
views:        "615 "
accepted:     
uploaded:     2022-01-09 05:43:54
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
