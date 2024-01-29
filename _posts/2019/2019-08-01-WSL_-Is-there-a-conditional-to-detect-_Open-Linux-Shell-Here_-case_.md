---
layout:       post
title:        >
    WSL: Is there a conditional to detect "Open Linux Shell Here" case?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162728
type:         Answer
tags:         bashrc windows-subsystem-for-linux
created_date: 2019-08-01 17:23:00
edit_date:    2019-08-02 03:36:11
votes:        "3 "
favorites:    
views:        "452 "
accepted:     Accepted
uploaded:     2024-01-28 17:32:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-01-WSL_-Is-there-a-conditional-to-detect-_Open-Linux-Shell-Here_-case_.md
toc:          false
navigation:   false
clipboard:    false
---



I would change the `~/.bashrc` enhancement to something like this:

``` bash
CurrDir="$(pwd)"
if [[ "$CurrDir" == "$SystemDir" ]]
then
    cd /path/to/sensible-dir-name
Fi
```

Where `$SystemDir` is your System32 directory. Always remember how `\` and `/` differ between Windows and Linux paths:

- [Bash script to convert Windows path to Linux path][1]

Suggests using:

``` bash
sed -e 's#^J:##' -e 's#\\#/#g'
```

That said in your instance you could probably hard-code the path.

  [1]: https://stackoverflow.com/questions/19999562/bash-script-to-convert-windows-path-to-linux-path
