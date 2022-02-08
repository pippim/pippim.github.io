---
layout:       post
title:        >
    I don't want my ls command in my script to print results on screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180236
type:         Answer
tags:         command-line bash scripts printing
created_date: 2019-10-11 10:50:43
edit_date:    2019-10-11 23:01:51
votes:        "4 "
favorites:    
views:        "2,383 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-11-I-don_t-want-my-ls-command-in-my-script-to-print-results-on-screen.md
toc:          false
navigation:   false
clipboard:    false
---

## Updated Answer

After posting script used in the question it was discovered:

``` 
#!/bin/bash -x
```

was used where the `-x` option outputs all commands to the terminal. 

Removing the `-x` solved the original problem.

----------

## Original Answer

You're missing the argument flag indicator so this:

<!-- Language-all: lang-bash -->

``` 
ls lX umbrella31_*log |  awk '{if($5 >=20000) {print}}' | wc -l
```

should be this instead:

``` 
ls -lX umbrella31_*log |  awk '{if($5 >=20000) {print}}' | wc -l
```

On my system looking for bash scripts it works like so:

``` 
$ ls -lX *.sh
-rwxrwxr-x 1 rick rick 4183 Jul  1 10:48 aptfileparse.sh
-rwxrwxr-x 1 rick rick  339 Jul 24 17:26 checkrunning.sh
-rwxrwxr-x 1 rick rick  506 Jul 15 17:54 Downloads.sh
-rwxrwxr-x 1 rick rick   78 Jul  6 11:28 runall.sh

$ ls -lX *.sh | awk '{if($5 >=200) {print}}' | wc -l
3
```

