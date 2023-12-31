---
layout:       post
title:        >
    Why does a process i executed die when the terminal is killed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155330
type:         Answer
tags:         bash scripts
created_date: 2019-07-02 00:00:23
edit_date:    2019-07-02 00:12:01
votes:        "0 "
favorites:    
views:        "2,540 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-02-Why-does-a-process-i-executed-die-when-the-terminal-is-killed.md
toc:          false
navigation:   false
clipboard:    false
---

To [execute a background job and keep it running][1] after terminal is closed use:

``` 
nohup command &>/dev/null &
```

  [1]: https://www.maketecheasier.com/run-bash-commands-background-linux/
