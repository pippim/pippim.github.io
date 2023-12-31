---
layout:       post
title:        >
    How to compile and run "protoident"
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/819545
type:         Answer
tags:         software-installation compiling make configure makefile
created_date: 2016-09-01 10:47:11
edit_date:    
votes:        "1 "
favorites:    
views:        "260 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-01-How-to-compile-and-run-_protoident_.md
toc:          false
navigation:   false
clipboard:    false
---

I took at look at your link for instructions. They can be found but are written in Czech. For example:

``` 
Zdrojová a cílová síťová adresa, zdrojový a cílový port není třeba dále
vysvětlovat.
```

Translates into English as:

``` 
Source and destination network address, source and destination port does not need to be further explain.
```

Looking at various source files you'll see "Not Tested" in the description.

This author calls the project an experiment and it has not been updated in 2 years.

I propose the project is broken and there may be nothing wrong with your compiler and make functions. To confirm your system is working download a simple calculator from github for gnome desktop that has 200 contributors and 243 releases: [gnome-calculator][1]. Compile this instead of your current choice that has no activity for two years and is called an experiment by the author.


  [1]: https://github.com/GNOME/gnome-calculator
