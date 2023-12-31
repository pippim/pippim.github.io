---
layout:       post
title:        >
    Permission denied creating directory after switching user
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182455
type:         Answer
tags:         permissions users su mkdir
created_date: 2019-10-20 16:24:38
edit_date:    2019-10-20 23:38:14
votes:        "1 "
favorites:    
views:        "6,908 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-Permission-denied-creating-directory-after-switching-user.md
toc:          false
navigation:   false
clipboard:    false
---

As [mchid answer][1] states you can use:



``` bash
cd
```

to change to the home directory of the current user `safi_test4`. However on my system it doesn't work due to a function that gets in the way:

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

    cd $OLDPWD      Change back to previous directory (similar to "cd -").
```

In this case on my system I must always type:

``` bash
cd ~
```

Note that the regular `cd` command also supports the usages described above.

## `cd` help screen

Here is how I get the `cd` help screen but be warned some people have criticized it. Edit your `~/.bashrc` and put in these lines:

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

    cd $OLDPWD      Change back to previous directory (similar to "cd -").

EOF
        return
    fi

    builtin cd "$@"
} # cd ()
```

  [1]: https://askubuntu.com/a/1182440/307523

