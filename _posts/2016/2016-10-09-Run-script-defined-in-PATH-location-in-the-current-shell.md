---
layout:       post
title:        >
    Run script defined in PATH location in the current shell
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/834794
type:         Answer
tags:         bash scripts
created_date: 2016-10-09 08:59:54
edit_date:    2016-10-10 01:30:39
votes:        "1 "
favorites:    
views:        "369 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-09-Run-script-defined-in-PATH-location-in-the-current-shell.md
toc:          false
navigation:   false
clipboard:    false
---

Based on new information in the OP this answer has been changed.

In your script you need to push the directory you want to end up in when the script finishes:

``` 
rick@dell:/$ cat /usr/local/bin/windows
pushd /boot/grub > /dev/null
ls
```

When you call the script you must but a dot and space in front of it `. ` like this:

``` 
────────────────────────────────────────────────────────────────
rick@dell:/$ . windows
fonts             grub.cfg   grubenv  locale       zapgrub.cfg
gfxblacklist.txt  grub.cfg~  i386-pc  unicode.pf2
────────────────────────────────────────────────────────────────
rick@dell:/boot/grub$ 
```

Above is simple example of how calling `. windows` containing the `push` command works instead of calling `windows` containing `cd` command.

For your script you need to change `cd "$mount_point"/Users/Justin` to `pushd "$mount_point"/Users/Justin` and call the script with `. windows` instead of `windows`
