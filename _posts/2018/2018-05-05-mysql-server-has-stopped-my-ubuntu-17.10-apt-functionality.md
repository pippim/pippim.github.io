---
layout:       post
title:        >
    mysql-server has stopped my ubuntu 17.10 apt functionality
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032531
type:         Answer
tags:         apt mysql
created_date: 2018-05-05 20:16:20
edit_date:    
votes:        "1 "
favorites:    
views:        "70 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-05-mysql-server-has-stopped-my-ubuntu-17.10-apt-functionality.md
toc:          false
navigation:   false
clipboard:    false
---

Not using SQL myself yet but it's been on my 30 year to-do list. From [this answer][1], I've summarized the steps:

To find all socket files on your system run:

``` 
sudo find / -type s
```

My Mysql server system had the socket open at /var/lib/mysql/mysql.sock

Once you find where the socket is being opened, add or edit the line to your `/etc/my.cnf` file with the path to the socket file:

``` 
socket=/var/lib/mysql/mysql.sock
```

**You still need to read the full answer** to get an appreciation of the whole environment and how changes effect **MySQL**.


  [1]: https://stackoverflow.com/questions/11990708/error-cant-connect-to-local-mysql-server-through-socket-var-run-mysqld-mysq?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
