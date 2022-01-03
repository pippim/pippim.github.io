---
layout:       post
title:        >
    How to interact with zenity window and type some text inside it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1337013
type:         Answer
tags:         18.04 bash python xdotool zenity
created_date: 2021-05-08 19:07:14
edit_date:    
votes:        "5 "
favorites:    
views:        "602 "
accepted:     
uploaded:     2022-01-02 20:50:10
toc:          false
navigation:   false
clipboard:    false
---

Change your `zenity.sh` file with:

``` 
#!/usr/bin/python

zenity --forms --title="Question" \
   --add-entry="Question" \
```

To:

``` 
#!/usr/bin/bash

zenity --forms --title="Question" \
   --add-entry="Question" \
```

`zenity` is not a python command, it is a bash/shell command so your shebang (first line) must be `#!/usr/bin/bash` not `#!/usr/bin/python`.
