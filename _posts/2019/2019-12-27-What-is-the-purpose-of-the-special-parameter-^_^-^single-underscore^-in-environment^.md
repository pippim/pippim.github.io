---
layout:       post
title:        >
    What is the purpose of the special parameter "_" (single underscore) in environment?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1198935
type:         Question
tags:         command-line bash
created_date: 2019-12-27 14:56:34
edit_date:    2020-06-12 14:37:07
votes:        "11 "
favorites:    1
views:        "2,339 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-27-What-is-the-purpose-of-the-special-parameter-^_^-^single-underscore^-in-environment^.md
toc:          false
navigation:   false
clipboard:    false
---

I'm trying to understand how the environment variable `_` can be used. Below is an example of using it:

``` 
$ echo $_

$ echo $_
echo

$ ls non-existant-filename
ls: cannot access 'non-existant-filename': No such file or directory

$ echo $_
non-existant-filename
```

- First it returns nothing
- Second it returns the last command used
- Last it returns the last parameter used

This might be a handy variable for bash scripts but only if it's function is fully understood.


----------

## Some useful applications of `_`

I found some useful applications of `_`.

### `_` contains the last filename you can recycle

In this example `_` is used to keep the last filename which you can reuse in subsequent commands without retying it.

``` 
$ ll ~/python/scroll1.py
-rwxrwxrwx 1 rick rick 2384 Dec 27 09:15 /home/rick/python/scroll1.py*

$ $_
# The python program ~/python/scroll1.py is executed

$ cat $_
#!/usr/bin/env python
# -*- coding: utf-8 -*-
   (... SNIP ... remaining contents of ~/python/scroll1.py appears on screen)
```

- First command uses `ll` to list a python script filename. The filename is saved to `_` for future use.
- Second command `$_` runs the python script.
- Third command `cat $_` lists the contents of the python script.

So the `$_` variable/parameter can save some typing.

### `_` contains the last program run

Here's an example of differences between `env` and `printenv` updating the `_` variable/parameter:

``` 
$ env > env.txt

$ printenv > printenv.txt

$ diff env.txt printenv.txt
66c66
< _=/usr/bin/env
---
> _=/usr/bin/printenv
```

Because a parameter wasn't passed to either command, the `_` isn't updated with the last used parameter as in the previous example but, it is updated with the last command used.

Also noticed how `_` is updated **before** the commands `env` and `printenv` are executed because `_` it appears in the output.
