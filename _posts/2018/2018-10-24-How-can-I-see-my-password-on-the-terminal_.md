---
layout:       post
title:        >
    How can I see my password on the terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1086715
type:         Answer
tags:         sudo password
created_date: 2018-10-24 11:28:15
edit_date:    
votes:        "2 "
favorites:    
views:        "41,987 "
accepted:     
uploaded:     2024-08-24 14:41:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-24-How-can-I-see-my-password-on-the-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

To help you enter your password correctly there is: [How can I make stars appear when I type sudo password?]({% post_url /2016/2016-12-15-How-can-I-make-stars-appear-when-I-type-sudo-password_ %})

To summarize the answer there, you need to configure it using:

``` 
sudo visudo
```

Locate the line containing `env_reset` and add the parameter `, pwfeedback` behind it.

See the link for full instructions.
