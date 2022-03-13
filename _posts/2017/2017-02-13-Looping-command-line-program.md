---
layout:       post
title:        >
    Looping command line program
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/882768
type:         Answer
tags:         command-line bash scripts python java
created_date: 2017-02-13 01:43:53
edit_date:    2017-02-13 01:47:00
votes:        "5 "
favorites:    
views:        "146 "
accepted:     Accepted
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-13-Looping-command-line-program.md
toc:          false
navigation:   false
clipboard:    false
---

Using bash by default one command doesn't start until the first one finishes so you can use:

``` 
/path/to/command /path/to/file1
/path/to/command /path/to/file2
/path/to/command /path/to/file3
```

Put the commands in a script called for example `~/run-all-commands`. Then mark it as executable using:

``` 
chmod +x ~/run-all-commands
```

Then call the bash script with batch of commands using:

``` 
~/run-all-commands
```
