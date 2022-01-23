---
layout:       post
title:        >
    Grep characters before and after match?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/62724650
type:         Answer
tags:         bash grep iconic
created_date: 2020-07-04 02:21:41
edit_date:    2021-09-04 07:23:11
votes:        "2 "
favorites:    
views:        "235,223 "
accepted:     
uploaded:     2022-01-23 11:36:46
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-07-04-Grep-characters-before-and-after-match^.md
toc:          false
navigation:   false
clipboard:    false
---

I'll never easily remember these cryptic command modifiers so I took the [top answer](https://stackoverflow.com/a/8101776/6929343) and turned it into a function in my `~/.bashrc` file:

<!-- Language-all: lang-bash -->

``` 
cgrep() {
    # For files that are arrays 10's of thousands of characters print.
    # Use cpgrep to print 30 characters before and after search pattern.
    if [ $# -eq 2 ] ; then
        # Format was 'cgrep "search string" /path/to/filename'
        grep -o -P ".{0,30}$1.{0,30}" "$2"
    else
        # Format was 'cat /path/to/filename | cgrep "search string"
        grep -o -P ".{0,30}$1.{0,30}"
    fi
} # cgrep()
```

Here's what it looks like in action:

``` 
$ ll /tmp/rick/scp.Mf7UdS/Mf7UdS.Source

-rw-r--r-- 1 rick rick 25780 Jul  3 19:05 /tmp/rick/scp.Mf7UdS/Mf7UdS.Source

$ cat /tmp/rick/scp.Mf7UdS/Mf7UdS.Source | cgrep "Link to iconic"

1:43:30.3540244000 /mnt/e/bin/Link to iconic S -rwxrwxrwx 777 rick 1000 ri

$ cgrep "Link to iconic" /tmp/rick/scp.Mf7UdS/Mf7UdS.Source

1:43:30.3540244000 /mnt/e/bin/Link to iconic S -rwxrwxrwx 777 rick 1000 ri

```

The file in question is one continuous 25K line and it is hopeless to find what you are looking for using regular `grep`.

Notice the two different ways you can call `cgrep` that parallels `grep` method.

There is a "niftier" way of creating the function where "$2" is only passed when set which would save 4 lines of code. I don't have it handy though. Something like `${parm2} $parm2`. If I find it I'll revise the function and this answer.
