---
layout:       post
title:        How to create a directory within your home directory - Linux
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846614
type:         Answer
tags:         home-directory
created_date: 2016-11-07 12:47:52
edit_date:    2016-11-14 21:05:32
votes:        4
favorites:    
views:        17,561
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
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
