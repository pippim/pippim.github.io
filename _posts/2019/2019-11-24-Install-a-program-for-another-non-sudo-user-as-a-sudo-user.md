---
layout:       post
title:        >
    Install a program for another non-sudo user as a sudo user
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191425
type:         Answer
tags:         software-installation sudo authentication
created_date: 2019-11-24 23:04:47
edit_date:    2019-11-24 23:27:46
votes:        "2 "
favorites:    
views:        "5,622 "
accepted:     
uploaded:     2024-06-09 08:36:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-24-Install-a-program-for-another-non-sudo-user-as-a-sudo-user.md
toc:          false
navigation:   false
clipboard:    false
---

Sudo can let you act as another user even if you don't know their password. It can be done as detailed in this answer:

- [sudo as another user with their environment][1]

Here is an example from the answer (granted on my single user system):

``` 
$ whoami
rick

$ sudo -i -u root whoami
root
```

So in your case use:

``` 
sudo -i -u usertofake install_something
```


  [1]: https://unix.stackexchange.com/a/177011/200094
