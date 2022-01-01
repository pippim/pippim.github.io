---
layout:       post
title:        >
    How to execute a script, line by line, for troubleshooting purposes?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1295767
type:         Answer
tags:         command-line bash scripts
created_date: 2020-11-27 20:46:32
edit_date:    
votes:        "2 "
favorites:    
views:        "251 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

From Stack overflow:

`set -x` or `set -o xtrace` expands variables and prints a little + sign before the line.

`set -v` or `set -o verbose` does not expand the variables before printing.

Use `set +x` and `set +v` to turn off the above settings.

On the first line of the script, one can put `#!/bin/sh -x` (or `-v`) to have the same effect as `set -x` (or `-v`) later in the script.

The above also works with `/bin/sh`.

See the bash-hackers' wiki on [`set` attributes](https://wiki.bash-hackers.org/commands/builtin/set#attributes), and on [debugging](https://wiki.bash-hackers.org/scripting/debuggingtips).

``` 
$ cat shl
#!/bin/bash                                                                     

DIR=/tmp/so
ls $DIR

```

``` 
$ bash -x shl 
+ DIR=/tmp/so
+ ls /tmp/so
$

```
