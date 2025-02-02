---
layout:       post
title:        >
    Bash script to run python script for all images in all subdirectories
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037190
type:         Answer
tags:         command-line bash
created_date: 2018-05-17 01:29:22
edit_date:    
votes:        "2 "
favorites:    
views:        "10,752 "
accepted:     Accepted
uploaded:     2025-02-01 17:53:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-17-Bash-script-to-run-python-script-for-all-images-in-all-subdirectories.md
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
