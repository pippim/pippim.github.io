---
layout:       post
title:        >
    How can I copy the content of a text file and paste it to another starting at a certain line?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/950434
type:         Answer
tags:         text-processing
created_date: 2017-08-27 21:30:47
edit_date:    2020-06-12 14:37:07
votes:        "11 "
favorites:    
views:        "36,676 "
accepted:     Accepted
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-27-How-can-I-copy-the-content-of-a-text-file-and-paste-it-to-another-starting-at-a-certain-line^.md
toc:          false
navigation:   false
clipboard:    false
---

# `head` and `tail` solution

Assume the source file is called `~/a` and the file to be inserted is called `~/b`. We'll put the merged file into `~/c`:

``` 
head -n 5 ~/a > ~/c
cat ~/b >> ~/c
tail --lines=+6 ~/a >> ~/c

```

- The path `~/` is short hand for your `/home/user` directory name
- head copies the first five lines of file `a` into newly created file `c`
- cat lists the contents of file `b` and appends it to file `c`
- tail appends file `a` starting at line 6 until the end to file `c`

# After verification rename merged file

After verifying that file `c` is merged correctly from files `a` and `b` we'll rename `c` to `a` using:

``` 
mv ~/c ~/a

```

- `mv` moves file `c` into file `a`. Data isn't physically moved. The file is simply renamed which saves time.

