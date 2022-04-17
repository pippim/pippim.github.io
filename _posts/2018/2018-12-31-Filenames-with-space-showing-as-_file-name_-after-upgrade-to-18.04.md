---
layout:       post
title:        >
    Filenames with space showing as 'file name' after upgrade to 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1105870
type:         Answer
tags:         command-line 18.04 ls
created_date: 2018-12-31 16:16:37
edit_date:    2018-12-31 16:28:01
votes:        "33 "
favorites:    
views:        "2,333 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-31-Filenames-with-space-showing-as-_file-name_-after-upgrade-to-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

This `ls` behavior change was [from 2016][1] but is finally making it's way into Ubuntu.

To get back the old behavior use `ls -N`.

Optionally you can use an environmental variable:

``` 
QUOTING_STYLE=literal ls
```

Make it an alias, or set `export QUOTING_STYLE=literal` in your `~/.bashrc` to achieve the old behavior.

You can read the link above for more details including the history of when, where, why and how this all came to be. There are quite a few comments under the **author of ls changes** where he justifies the new behavior:


> A few points about the change.  
>   
> -    It was introduced in coreutils v8.25, and alignment improved in v8.26  
> -    It only happens when outputting to terminals so doesn't break scripts  
> -    It disambiguates the output for users for files containing whitespace  
> -    It sanitizes output so it is safe to copy and paste  
> -    Output is now always **valid** to copy and paste back to shell  
> -    Users can get back to the old format by adding `-N` to their `ls` alias  



  [1]: https://unix.stackexchange.com/questions/258679/why-is-ls-suddenly-wrapping-items-with-spaces-in-single-quotes
