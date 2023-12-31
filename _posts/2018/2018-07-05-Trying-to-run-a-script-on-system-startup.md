---
layout:       post
title:        >
    Trying to run a script on system startup
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1052535
type:         Answer
tags:         command-line bash permissions scripts
created_date: 2018-07-05 23:22:49
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "1,401 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-05-Trying-to-run-a-script-on-system-startup.md
toc:          false
navigation:   false
clipboard:    false
---

## Make script readable

Your script is only readable by the owner. The first step (just to be safe) would to make it readable by everyone:

``` 
chmod a+r /home/user/Scripts/myScript.sh
```

If that doesn't solve your issues, please update your question with the actual contents of your script.
