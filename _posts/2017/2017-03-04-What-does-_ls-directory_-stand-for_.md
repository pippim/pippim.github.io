---
layout:       post
title:        >
    What does `ls --directory` stand for?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/889549
type:         Answer
tags:         command-line ls
created_date: 2017-03-04 17:40:42
edit_date:    
votes:        "6 "
favorites:    
views:        "3,489 "
accepted:     
uploaded:     2022-06-19 17:56:58
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-04-What-does-_ls-directory_-stand-for_.md
toc:          false
navigation:   false
clipboard:    false
---

Using `ls -d` by itself is fairly useless because without a parameter it always returns `.`. After you specify a parameter it makes sense though. For example if your user name is `rick` and you want to see all the directories in your home use:

``` 
$ ls -d /home/rick/*/
/home/rick/AAC/        /home/rick/EnhanceIO/         /home/rick/silentcast/
/home/rick/assembly/   /home/rick/EnhanceIO-master/  /home/rick/Templates/
/home/rick/bin/        /home/rick/log/               /home/rick/test/
/home/rick/Desktop/    /home/rick/Music/             /home/rick/tmpe/
/home/rick/Documents/  /home/rick/Pictures/          /home/rick/Videos/
/home/rick/Downloads/  /home/rick/Public/
```

