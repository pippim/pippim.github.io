---
layout:       post
title:        >
    Call an app from a bash script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1174755
type:         Answer
tags:         bash bashrc
created_date: 2019-09-17 10:57:42
edit_date:    
votes:        "1 "
favorites:    
views:        "212 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-17-Call-an-app-from-a-bash-script.md
toc:          false
navigation:   false
clipboard:    false
---

To make the function visible to your script you need to "source" the file into your script with:

``` 
source /usr/local/MYPROGRAM/bin/myfn
```

or:

``` 
. /usr/local/MYPROGRAM/bin/myfn
```

This will include all the defined functions, variables and constants within the file into your script.
