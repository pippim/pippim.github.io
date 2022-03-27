---
layout:       post
title:        >
    How to add /usr/bin to path after I mistakenly removed it (sudo and nano are no longer in path)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1081545
type:         Answer
tags:         permissions sudo environment-variables bashrc
created_date: 2018-10-06 20:52:42
edit_date:    
votes:        "5 "
favorites:    
views:        "1,903 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-06-How-to-add-_usr_bin-to-path-after-I-mistakenly-removed-it-_sudo-and-nano-are-no-longer-in-path_.md
toc:          false
navigation:   false
clipboard:    false
---

You can prefix the commands with the path:

``` 
/usr/bin/sudo /bin/nano ~/.bashrc
```
