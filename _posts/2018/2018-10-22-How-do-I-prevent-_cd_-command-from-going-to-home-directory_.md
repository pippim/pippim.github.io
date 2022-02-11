---
layout:       post
title:        >
    How do I prevent 'cd' command from going to home directory?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1086196
type:         Answer
tags:         command-line cd-command
created_date: 2018-10-22 18:17:40
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "4,147 "
accepted:     Accepted
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-22-How-do-I-prevent-_cd_-command-from-going-to-home-directory_.md
toc:          false
navigation:   false
clipboard:    true
---

Use `gedit ~/.bashrc` and insert these lines at the bottom:



``` bash
cd() {
    [[ $# -eq 0 ]] && return
    builtin cd "$@"
}
```

Open a new terminal and now when you type `cd` with no parameters you simply stay in the same directory.


----------

## TL;DR

If you want to be really elaborate you can put in a help screen when no parameters are passed:

``` bash
$ cd

cd: missing operand

Usage:

    cd ~            Change to home directory. Equivelent to 'cd /home/$USER'

    cd -            Change to previous directory before last 'cd' command

    cd ..           Move up one directory level
    
    cd ../..        Move up two directory levels
    
    cd ../sibling   Move up one directory level and change to sibling directory

    cd /path/to/    Change to specific directory '/path/to/' eg '/var/log'
```


The expanded code to accomplish this is:

{% include copyHeader.html %}
``` bash
cd() {
    if [[ $# -eq 0 ]] ; then
        cat << 'EOF'

cd: missing operand

Usage:

    cd ~            Change to home directory. Equivelent to 'cd /home/$USER'

    cd -            Change to previous directory before last 'cd' command

    cd ..           Move up one directory level
    
    cd ../..        Move up two directory levels
    
    cd ../sibling   Move up one directory level and change to sibling directory

    cd /path/to/    Change to specific directory '/path/to/' eg '/var/log'

EOF
        return
    fi

    builtin cd "$@"
}
```


