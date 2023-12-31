---
layout:       post
title:        >
    Any command line calculator for Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1241983
type:         Answer
tags:         command-line software-recommendation calculator
created_date: 2020-05-21 03:07:37
edit_date:    
votes:        "1 "
favorites:    
views:        "85,362 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-05-21-Any-command-line-calculator-for-Ubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

`awk` is built in so I created a little wrapper function in my `~/.bashrc` function and will use it in future projects. Here's how to use it:



``` bash
$ a=2.2; b=3.3

$ math c = $a / $b
$ echo $c
0.666667

$ math c = $a * $b
* not allowed, use x to multiply

$ math c = $a x $b
$ echo $c
7.26

$ math c = $a - $b
$ echo $c
-1.1

```

Here's the function:

``` bash
math () {

    [[ $2 != "=" ]] && { echo "Second parm must be '='"; return 1; }

    # Declare arg as reference to argument provided (Bash 4.3 or greater)
    declare -n mathres=$1

    math_op="$4"    # '*' as parameter changes operator to 'aptfielout' and
                    # operand2 to 'aptfilein' so force 'x' instead.
    [[ $math_op == "aptfielout" ]] && \
        { echo "* not allowed, use x to multiply"; return 2;}
    [[ $math_op == "x" ]] && math_op="*"

    mathres=$(awk "BEGIN { print ($3 $math_op $5) }")

#    test=$(awk "BEGIN { print ($3 $math_op $5) }")
#    echo "1:$1 2:$2 3:$3 4:$4 5:$5 result=$test"

} # math
```
