---
layout:       post
title:        >
    What does $# mean in bash?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/939627
type:         Answer
tags:         bash
created_date: 2017-07-25 14:44:21
edit_date:    2022-02-11 07:31:10
votes:        "16 "
favorites:    
views:        "96,863 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-25-What-does-__-mean-in-bash_.md
toc:          false
navigation:   false
clipboard:    false
---

`$#` is typically used in bash scripts to ensure a parameter is passed. Generally, you check for a parameter at the beginning of your script.

For example, here's a snippet of a script I was working on today:

``` 
if [[ $# -ne 1 ]]; then
    echo 'One argument required for the file name, e.g. "Backup-2017-07-25"'
    echo '.tar will automatically be added as a file extension'
    exit 1
fi
```

To summarize `$#` reports the number of parameters passed to a script. In your case, you passed no parameters and the reported result is `0`.


----------

## Other `#` uses in Bash

The `#` is often used in bash to count the number of occurrences or the length of a variable.

To find the length of a string:

``` 
myvar="some string"; echo ${#myvar}
```

returns: `11`

To find the number of array elements:

``` 
myArr=(A B C); echo ${#myArr[@]}
```

returns: `3`

To find the length of the first array element:

``` 
myArr=(A B C); echo ${#myArr[0]}
```

returns: `1` (The length of `A`, 0 is the first element as arrays use zero-based indices/subscripts).
