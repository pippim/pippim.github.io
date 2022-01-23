---
layout:       post
title:        >
    Output the current PATH to text file using BASH script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099855
type:         Answer
tags:         bash
created_date: 2018-12-10 18:12:47
edit_date:    2018-12-10 18:18:35
votes:        "1 "
favorites:    
views:        "563 "
accepted:     Accepted
uploaded:     2022-01-23 11:36:46
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-10-Output-the-current-PATH-to-text-file-using-BASH-script.md
toc:          false
navigation:   false
clipboard:    false
---

You change your `PATH` with command:

``` 
PATH=/new-path:$PATH
```

For example here is how to correctly expand the PATH:

``` 
$ PATH=/newpath:$PATH
$ echo $PATH
/newpath:/home/rick/bin:/home/rick/.local/bin:/mnt/e/bin:/mnt/e/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin
```

Here is just one way to break your PATH (by omitting `$` prefix):

``` 
$ PATH=/brokenpath:PATH
$ echo $PATH
/brokenpath:PATH
```

If you mess up your PATH usually you can simply close your terminal and reopen it.

Omitting the `$` is the mistake made in your question as well. The method to capture PATH to text file is:

``` 
echo $PATH > PATH.TXT
```

To keep a running log of PATH changes you can use:

``` 
echo $PATH >> PATH.TXT
```

PATH is an environmental variable. To set the variable we use "PATH=" but to reference it's contents we need to use "$PATH".


----------


The PATH variable can be set in many places as outlined in this Q&A: [Where is my PATH variable being set?](Where is my PATH variable being set?). To discover which files are setting the PATH one of the answers recommends using:

``` 
grep --color -H 'PATH=' ~/.bashrc ~/.profile ~/.bash_profile ~/bash.login \
                     ~/.bash_aliases /etc/bash.bashrc /etc/profile \
                     /etc/profile.d/* /etc/environment 2> /dev/null
```

On my machine the command returns:

``` 
/home/rick/.profile:PATH="$HOME/bin:$HOME/.local/bin:$PATH"
/etc/profile.d/apps-bin-path.sh:    export PATH=$PATH:${snap_bin_path}
/etc/profile.d/jdk.sh:export PATH=$PATH:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin
/etc/environment:PATH="/mnt/e/bin:/mnt/e/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
```

