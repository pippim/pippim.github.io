---
layout:       post
title:        >
    Looping command line program
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/882768
type:         Answer
tags:         command-line bash scripts python java
created_date: !!str "2017-02-13 01:43:53"
edit_date:    !!str "2017-02-13 01:47:00"
votes:        !!str "5"
favorites:    
views:        !!str "143"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
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
