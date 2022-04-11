---
layout:       post
title:        >
    How do I make a shell program run with the script name? and script help
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192784
type:         Answer
tags:         bash scripts
created_date: 2019-11-30 17:38:12
edit_date:    2019-11-30 18:25:09
votes:        "1 "
favorites:    
views:        "128 "
accepted:     Accepted
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-30-How-do-I-make-a-shell-program-run-with-the-script-name_-and-script-help.md
toc:          false
navigation:   false
clipboard:    false
---

The main problem is the script has the wrong name of `prargs.sh` when the filename should be `prargs`. The second problem is there should be a "shebang" at the top telling the system it is a bash script:



``` bash
#!/bin/bash

while [ "$#" -ne 0 ]  
do
    ((Count++))
    echo "$Count: $1"  
    shift
done
```

**Note:** Your script was missing the `1: `, `2: `, etc. parameter count. I've added that missing pieces with:

``` bash
((Count++))
echo "$Count: $1"
```

So when you run the script you now see:

``` bash
$ prargs a 'b c' d
1: a
2: b c
3: d
```

The next problem is calling the `prargs` without specifying a location in front. If you place your script in one of your paths it will be found without specifying a directory. To see your current paths use: `echo $PATH`. Many people will create a path in their home directory for personal scripts:

``` bash
mkdir -p $HOME/bin
```

After this reopen the terminal to have it in your path. So create your script as `$HOME/bin/prargs` and then mark it executable:

``` bash
chmod a+x $HOME/bin/prargs
```

After this no matter what your current directory is you can type `prargs a 'b c' d`.
