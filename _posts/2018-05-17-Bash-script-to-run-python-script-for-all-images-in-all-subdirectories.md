---
layout:       post
title:        Bash script to run python script for all images in all subdirectories
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037190
type:         Answer
tags:         command-line bash
created_date: 2018-05-17 01:29:22
edit_date:    
votes:        2
favorites:    
views:        8,985
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

From [Super User][1] they tell us how to loop through sub-directories:



``` bash
for d in */ ; do
    echo "$d"
done

```

Using this reference you can use nested `for` loops:

``` bash
for d in */ ; do
    for file in "$d"/*.jpg
    do
        python modifyImage.py /"$file" /"$file"
    done
done

```


  [1]: https://unix.stackexchange.com/questions/86722/how-do-i-loop-through-only-directories-in-bash?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
