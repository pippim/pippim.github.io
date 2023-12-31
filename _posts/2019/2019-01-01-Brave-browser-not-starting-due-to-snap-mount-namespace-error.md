---
layout:       post
title:        >
    Brave browser not starting due to snap mount namespace error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1105938
type:         Answer
tags:         chromium snap apparmor
created_date: 2019-01-01 02:06:48
edit_date:    
votes:        "3 "
favorites:    
views:        "2,022 "
accepted:     
uploaded:     2023-12-31 12:29:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-01-01-Brave-browser-not-starting-due-to-snap-mount-namespace-error.md
toc:          false
navigation:   false
clipboard:    false
---

The solution presented [here][1] is to use:

``` 
sudo usysconf run -f
```

Additionally in the link another user points out you don't need to use `snap` because `brave` is in the repo's now. You can download the `brave` `.deb` installation package [here][2].


  [1]: https://dev.getsol.us/T6899
  [2]: https://community.brave.com/t/how-do-i-install-brave-in-ubuntu/7901/11
