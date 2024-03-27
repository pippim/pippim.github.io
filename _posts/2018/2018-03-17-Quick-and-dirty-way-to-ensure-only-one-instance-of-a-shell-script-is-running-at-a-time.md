---
layout:       post
title:        >
    Quick-and-dirty way to ensure only one instance of a shell script is running at a time
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/49338826
type:         Answer
tags:         bash shell process lockfile
created_date: 2018-03-17 15:54:09
edit_date:    
votes:        "2 "
favorites:    
views:        "142,065 "
accepted:     
uploaded:     2024-03-26 20:16:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-17-Quick-and-dirty-way-to-ensure-only-one-instance-of-a-shell-script-is-running-at-a-time.md
toc:          false
navigation:   false
clipboard:    false
---

This one line answer comes from someone related [Ask Ubuntu Q&A][1]:

``` 
[ "${FLOCKER}" != "$0" ] && exec env FLOCKER="$0" flock -en "$0" "$0" "$@" || :
#     This is useful boilerplate code for shell scripts.  Put it at the top  of
#     the  shell script you want to lock and it'll automatically lock itself on
#     the first run.  If the env var $FLOCKER is not set to  the  shell  script
#     that  is being run, then execute flock and grab an exclusive non-blocking
#     lock (using the script itself as the lock file) before re-execing  itself
#     with  the right arguments.  It also sets the FLOCKER env var to the right
#     value so it doesn't run again.
```

  [1]: https://askubuntu.com/questions/988032/how-can-i-cause-a-script-to-log-in-a-separate-file-the-number-of-times-it-has-be/1015648#1015648
