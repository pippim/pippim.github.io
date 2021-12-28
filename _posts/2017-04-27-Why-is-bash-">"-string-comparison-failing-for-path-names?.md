---
layout:       post
title:        Why is bash ">" string comparison failing for path names?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43669662
type:         Question
tags:         string bash command-line path
created_date: 2017-04-27 23:44:25
edit_date:    2017-04-28 02:23:56
votes:        0
favorites:    
views:        58
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

In these three short tests only the second one works out correctly:

``` 
$ if [[ "/etc/cupshelpers" > "/etc/cups/interfaces" ]]; then echo ">"; else echo "<="; fi
<=
$ if [[ "/etc/cupsh" > "/etc/cups/" ]]; then echo ">"; else echo "<="; fi
>
$ if [[ "/etc/cupshe" > "/etc/cups/i" ]]; then echo ">"; else echo "<="; fi
<=

```

The issue became apparent when I sorted a list of directories and the results were different from `tree` command:

``` 
$ tree /etc/cups* -d
/etc/cups
├── interfaces
├── ppd
└── ssl [error opening dir]
/etc/cupshelpers

```

Any clues?

Thanks.


----------

**Edit** - Reply to comments in accepted answer:

``` 
$ bash --version
GNU bash, version 4.3.46(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

$ uname -a
Linux dell 4.4.0-72-generic #93-Ubuntu SMP Fri Mar 31 14:07:41 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux

```


----------

**Edit** Proving it works (You can try on your own non-Mac machine).

``` 
$ if [[ "/etc/cupshelpers" > "/etc/cups/interfaces" ]]; then echo ">"; else echo "<="; fi
<=
$ LANG=C
$ if [[ "/etc/cupshelpers" > "/etc/cups/interfaces" ]]; then echo ">"; else echo "<="; fi
>

```


----------

**Edit** New problem is "X" comes before "a".

``` 
$  if [[ "/etc/X11/xsm" > "/etc/acpi" ]]; then echo ">"; else echo "<="; fi
>
$ echo $LANG
en_CA.UTF-8
$ LANG=C
$ if [[ "/etc/X11/xsm" > "/etc/acpi" ]]; then echo ">"; else echo "<="; fi
<=

```

There is nothing extraordinary I'm trying to accomplish. I generate a list of directory names (3,000 to 20,000) using the `tree` command. Later I append a directory to the list and I need to resort the internal bash array. During the bash bubble sort the collating sequence results on hundreds of extra directories moving up the list out of sequence.

I don't think I need a special collating sequence, just what the `tree` or `ls` commands use.
