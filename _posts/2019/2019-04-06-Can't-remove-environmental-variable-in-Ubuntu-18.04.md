---
layout:       post
title:        >
    Can't remove environmental variable in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1131572
type:         Answer
tags:         18.04 java environment-variables
created_date: 2019-04-06 01:30:08
edit_date:    2019-04-06 01:36:33
votes:        "3 "
favorites:    
views:        "3,908 "
accepted:     Accepted
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-06-Can't-remove-environmental-variable-in-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

`$JAVA_HOME` will already have a definition on many systems without explicitly declaring it in `/etc/environment`:

``` 
$ echo $JAVA_HOME
/usr/lib/jvm/java-8-oracle

```

That said, the `unset` command will eliminate a variable. From: [Unix / Linux - Using Shell Variables][1]

> ##Unsetting Variables  
>   
> Unsetting or deleting a variable directs the shell to remove the  
> variable from the list of variables that it tracks. Once you unset a  
> variable, you cannot access the stored value in the variable.  
>   
> Following is the syntax to unset a defined variable using the unset  
> command −  
>   
>     unset variable_name  
>   
> The above command unsets the value of a defined variable. Here is a  
> simple example that demonstrates how the command works −  
>   
>     #!/bin/sh  
>     
>     NAME="Zara Ali"  
>     unset NAME  
>     echo $NAME  

In our case we can use:

``` 
$ echo $JAVA_HOME
/usr/lib/jvm/java-8-oracle
───────────────────────────────────────────────────────────────────────────────────────────
$ unset JAVA_HOME
───────────────────────────────────────────────────────────────────────────────────────────
$ echo $JAVA_HOME

───────────────────────────────────────────────────────────────────────────────────────────
$ 

```

  [1]: https://www.tutorialspoint.com/unix/unix-using-variables.htm


