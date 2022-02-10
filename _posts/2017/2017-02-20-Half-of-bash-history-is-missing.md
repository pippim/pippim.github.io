---
layout:       post
title:        >
    Half of bash history is missing
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885531
type:         Question
tags:         command-line bash bash-history
created_date: 2017-02-20 22:49:16
edit_date:    2017-04-13 12:24:42
votes:        "11 "
favorites:    9
views:        "23,061 "
accepted:     Accepted
uploaded:     2022-02-10 05:58:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-20-Half-of-bash-history-is-missing.md
toc:          false
navigation:   false
clipboard:    false
---

The other night I was reading AU Q&A and used a bash command:

``` 
inxi -????
```

Problem is today I don't remember characters comprising ????. I want to put the command and parameters into my documentation spreadsheet. Based on an this answer ([How to recall history in teminal][1]) I used this command:

``` 
$ cat .bash_history | grep inxi
inxi -b
sudo apt install inxi
inxi -b
```

However the command I want isn't there even though the history goes far back. I've used the `inxi` commands many times in the terminal since that old history but none of is showing up.

I've also tried <kbd>Ctrl</kbd>+<kbd>R</kbd>+<kbd>inxi</kbd> without any luck. Because I open multiple terminal windows all the time is history tied to a specific window?

Is there a different way to `grep` bash history file(s)? 

Note that I do not prefix terminal commands with a <kbd>Space Bar</kbd> such that they are supressed from history.


  [1]: https://askubuntu.com/questions/44044/how-to-recall-history-in-teminal/44047#44047
