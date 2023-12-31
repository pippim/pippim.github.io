---
layout:       post
title:        >
    how to know if a variable is a tuple, a string or an integer?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59348490
type:         Answer
tags:         python
created_date: 2019-12-15 22:09:01
edit_date:    2019-12-15 22:29:38
votes:        "-2 "
favorites:    
views:        "113,411 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-15-how-to-know-if-a-variable-is-a-tuple_-a-string-or-an-integer_.md
toc:          false
navigation:   false
clipboard:    false
---

To complement [Goujon's answer][1] consider this list of mixed integers and tuples:



``` python
for f in fills:
    print (type(f), f)
    if type(f)==int : print "INTEGER!!!"
```

Generates this output:

``` python
(<type 'int'>, 0)
INTEGER!!!
(<type 'tuple'>, (62973, 39058, 25708, 102))
(<type 'int'>, 1)
INTEGER!!!
(<type 'tuple'>, (16968, 12069, 3329, 102))
(<type 'int'>, 2)
INTEGER!!!
(<type 'tuple'>, (24939, 62205, 30062, 102))
(<type 'tuple'>, (32911, 32911, 0, 153))
(<type 'tuple'>, (32911, 0, 0, 153))
(<type 'tuple'>, (32911, 0, 32911, 153))
(<type 'tuple'>, (65535, 0, 0, 153))
(<type 'tuple'>, (0, 0, 65535, 153))
(<type 'tuple'>, (0, 32911, 0, 153))
(<type 'tuple'>, (0, 65535, 65535, 153))
```

So the secret isn't to test for `"int"` character string but, rather test for `int` keyword instead. If you are like me and migrating from the Bash scripting world, using `==` tests in the Python scripting world will probably be your first step.

  [1]: https://stackoverflow.com/a/47079734/6929343
