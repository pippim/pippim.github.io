---
layout:       post
title:        >
    What does >&2 mean in a shell script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182458
type:         Answer
tags:         command-line bash redirect
created_date: 2019-10-20 16:37:44
edit_date:    2019-10-26 17:43:08
votes:        "10 "
favorites:    
views:        "16,541 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-What-does-^^2-mean-in-a-shell-script^.md
toc:          false
navigation:   false
clipboard:    false
---

It is simply displaying the message "`/blah/blah/: Is directory`" to `stderr`. Also known as **Standard Error** which is denoted by `&2`.

Without the `&2` messages are displayed on `stdout`. Also known as **Standard Output** which is denoted by `&1`. 

More details on displaying messages to `&>2` can be found here:

- [Bash command that prints a message on stderr][1]
- [echo >&2 “some text” what does it mean in shell scripting][2]

In your command posted, both messages for `stdout` and `stderr` will appear on your terminal screen. However some applications will separate the `stderr` messages and perform special processing.

Most people don't bother redirecting `echo` error messages to `>&2` but it is technically the correct way of doing things.


----------


For more reading on `stdin`, `stdout` and `stderr` from user or system administrator perspective see:

- [Confused about stdin, stdout and stderr?][3]

For a programmers perspective of stdin, stdout, stderr which are &0, &1 and &2 respectively see:

- [Linux Programmer's Manual][4]


  [1]: https://stackoverflow.com/questions/2643165/bash-command-that-prints-a-message-on-stderr
  [2]: https://stackoverflow.com/questions/23489934/echo-2-some-text-what-does-it-mean-in-shell-scripting
  [3]: https://stackoverflow.com/questions/3385201/confused-about-stdin-stdout-and-stderr
  [4]: http://man7.org/linux/man-pages/man3/stdin.3.html
