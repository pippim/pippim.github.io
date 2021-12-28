---
layout:       post
title:        WSL: Is there a conditional to detect "Open Linux Shell Here" case?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162728
type:         Answer
tags:         bashrc windows-subsystem-for-linux
created_date: 2019-08-01 17:23:00
edit_date:    2019-08-02 03:36:11
votes:        3
favorites:    
views:        267
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

<!-- Language-all: lang-bash -->

I would change the `~/.bashrc` enhancement to something like this:

``` 
CurrDir="$(pwd)"
if [[ "$CurrDir" == "$SystemDir" ]]
then
    cd /path/to/sensible-dir-name
Fi

```

Where `$SystemDir` is your System32 directory. Always remember how `\` and `/` differ between Windows and Linux paths:

- [Bash script to convert Windows path to Linux path][1]

Suggests using:

``` 
sed -e 's#^J:##' -e 's#\\#/#g'

```

That said in your instance you could probably hard-code the path.

  [1]: https://stackoverflow.com/questions/19999562/bash-script-to-convert-windows-path-to-linux-path
