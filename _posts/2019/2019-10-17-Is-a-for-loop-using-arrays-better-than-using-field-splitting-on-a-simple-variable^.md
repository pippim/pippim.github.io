---
layout:       post
title:        >
    Is a for loop using arrays better than using field splitting on a simple variable?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1181605
type:         Answer
tags:         bash scripts
created_date: 2019-10-17 11:51:10
edit_date:    2020-06-12 14:37:07
votes:        "5 "
favorites:    
views:        "1,787 "
accepted:     
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-17-Is-a-for-loop-using-arrays-better-than-using-field-splitting-on-a-simple-variable^.md
toc:          false
navigation:   false
clipboard:    false
---

## Answer to original title

The original title asked "what type of for loop is better".

For myself, the best method is the fastest one. To find out prepend the `time` command to your script or function. Some examples:

``` 
$ time du -s

real    0m0.002s
user    0m0.003s
sys     0m0.000s

$ time ls

real    0m0.004s
user    0m0.000s
sys     0m0.004s

```

It is important to flush cached buffers in-between tests though:

- [Which is the right way to drop caches in Lubuntu?]({% post_url /2018/2018-12-03-Which-is-the-right-way-to-drop-caches-in-Lubuntu^ %})

If two loops are about the same in speed, I'll pick the one with best readability.

The scope of this question is makes speed irrelevant though because most of the time is spent waiting for user input and there are only a maximum of 10 windows open for most people.

----------


## Answer to body of question

Other answers focus on rewriting the script so I'll give my two cents worth too.

The line:

``` 
list=$(wmctrl -l | awk ' !/-1/ { print $1 } ')

```

- is malformed if intent is to be an array
- `list` is generic and not descriptive

So I would use:

``` 
Windows=( $(wmctrl -l | awk ' !/-1/ { print $1 } ') )

```

- The outer set of () tells bash/shell everything inside is an array element delineated by spaces.
- Windows are what we are talking about so it is a descriptive array name.
- Windows is plural so naming convention helps identify it's an array.

The line:

``` 
wmctrl -i -a $i

```

- `-i` and `-a` can be combined into `-ia`.
- `$i` is non-descriptive I would use `$Window` instead.

There are two ways of writing a shorter more readable script, first with an array:

``` 
#!/bin/bash
Windows=( $(wmctrl -l | awk ' !/-1/ { print $1 } ' ) )
for Window in "${Windows[@]}" ; do wmctrl -ia $Window -c $Window ; done

```

second without an array:

``` 
#!/bin/bash
Windows=$(wmctrl -l | awk ' !/-1/ { print $1 } ' )
for Window in $Windows ; do wmctrl -ia $Window -c $Window ; done

```

I prefer the array method because I'm trying to learn more about them and want to use them as much as possible. The choice is yours however.
