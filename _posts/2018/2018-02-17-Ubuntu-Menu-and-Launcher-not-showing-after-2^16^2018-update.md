---
layout:       post
title:        >
    Ubuntu Menu and Launcher not showing after 2/16/2018 update
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007213
type:         Answer
tags:         unity launcher
created_date: 2018-02-17 23:00:50
edit_date:    2018-02-18 19:12:33
votes:        "8 "
favorites:    
views:        "6,559 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-17-Ubuntu-Menu-and-Launcher-not-showing-after-2^16^2018-update.md
toc:          false
navigation:   false
clipboard:    false
---

This doesn't sound like the bug linked in the OP's question or the close candidate in the comments section: [2/15/18 compiz update broke unity](2/15/18 compiz update broke unity). It sounds more like this common problem: [Unity doesn&#39;t load, no Launcher, no Dash appears][1]

This is especially true due to comments in deep within my proposed link stating the guest session works perfectly just not the normal user. The OP here has same scenario.

Try the simple solution there by opening a terminal and typing:

``` 
rm -rf ~/.config/compiz-1/compizconfig/*
sudo reboot
```

Some users say it works right away while someone else says the reboot is necessary.

  [1]: https://askubuntu.com/questions/17381/unity-doesnt-load-no-launcher-no-dash-appears
