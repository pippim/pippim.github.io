---
layout:       post
title:        >
    How I can monitor for new files in a directory and drop a mail if files are not added every 30 mins?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157136
type:         Answer
tags:         command-line bash scripts
created_date: 2019-07-09 23:38:56
edit_date:    
votes:        "2 "
favorites:    
views:        "2,521 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-09-How-I-can-monitor-for-new-files-in-a-directory-and-drop-a-mail-if-files-are-not-added-every-30-mins^.md
toc:          false
navigation:   false
clipboard:    false
---

The answers so far assume that files only go into a directory and never go out. But what if you have a script that empties the directory periodically? Then the script could miss the fact a file went into the directory 5 minutes ago but was processed and taken out.

Another option is using the [`inotifywait`][1] command written in highly efficient C language for the express purposes of monitoring file and directory creation and modification. You can install it with the command:

``` 
sudo apt install inotify-tools
```

The *psuedo-code* for an appropriate script would be:

- Wait 30 minutes or until directory changes
- Did directory change?
- Yes? We got here because directory changed. Loop back and wait 30 minutes again.
- No? We got here because 30 minutes expired. Send email and loop back to wait 30 minutes again.

You would call the script from a place like `/etc/rc.local` so it runs when machine is booted.

The advantage of this methodology is you aren't checking the directory every 30 minutes but rather you are checking it 30 minutes after the last changes to the directory.



  [1]: https://linux.die.net/man/1/inotifywait
