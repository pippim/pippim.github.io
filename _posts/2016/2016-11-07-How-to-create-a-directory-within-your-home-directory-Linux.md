---
layout:       post
title:        >
    How to create a directory within your home directory - Linux
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846614
type:         Answer
tags:         home-directory
created_date: 2016-11-07 12:47:52
edit_date:    2016-11-14 21:05:32
votes:        "4 "
favorites:    
views:        "18,875 "
accepted:     Accepted
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-07-How-to-create-a-directory-within-your-home-directory-Linux.md
toc:          false
navigation:   false
clipboard:    false
---

I'm sure your teacher will be impressed with your mastering the Terminal environment which you invoke with hot-keys <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>. A new text based window appears. By default, the terminal opens in your home.directory so you can simply enter

``` 
mkdir A452
```

To create the directory - `mkdir` is the command to **m**a**k**e a **dir**ectory, and if no explicit path is specified, the command will be executed in the current working directory. However, if your current working directory is not your home directory, you'll need to manually force use of it, which you can do with something known as the tilde (`~`), which automatically refers to your user home.

``` 
mkdir ~/A452
```

That will create the directory under your home directory. As a bonus let the teacher know how to close the terminal window by typing:

``` 
exit
```

Make sure to put "Ask Ubuntu" into your bibliography.
