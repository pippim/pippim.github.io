---
layout:       post
title:        >
    Brave browser not starting due to snap mount namespace error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1105938
type:         Answer
tags:         chromium snap apparmor
created_date: !!str "2019-01-01 02:06:48"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "1,521"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
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
