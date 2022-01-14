---
layout:       post
title:        >
    How do I save terminal output to a file?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1198795
type:         Answer
tags:         command-line
created_date: 2019-12-27 01:38:52
edit_date:    2021-12-13 01:02:51
votes:        "12 "
favorites:    
views:        "2,922,708 "
accepted:     
uploaded:     2022-01-14 04:38:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-27-How-do-I-save-terminal-output-to-a-file?
toc:          false
navigation:   false
clipboard:    false
---

# The `script` command

There are two different questions here. The first is in the title:

> How do I save terminal output to a file?  

The second question is in the body:

> How do I save the output of a command to a file?  

All the answers posted here address the second question but none address the first question which has a great answer in **Unix & Linux**:

- [Save all the terminal output to a file][1]

This answer uses a little known command called `script` which saves all your shell's output to a text file until you type `exit`. The command output still appears on your screen but **also appears in the text file**. 

The process is simple. Use:

``` 
$ script ~/outputfile.txt
Script started, file is /home/rick/outputfile.txt
$ command1
$ command2
$ command3
$ exit
exit
Script done, file is /home/rick/outputfile.txt

```

Then look at your recorded output of commands 1, 2 & 3 with:

``` 
cat ~/outputfile.txt

```

This is similar to [earlier answer][2] of:

``` 
command |& tee ~/outputfile.txt

```

- But you don't have to use `|& tee ~/outputfile.txt` after each `commnd`.
- The `script` command has added benefit (or disadvantage) of reloading `~/.bashrc` when it starts.
- The `script` command shows the command prompt (`$PS1`) followed by the command(s) you entered.
- The `script` command records all the details in full color.

# Send output to clipboard

Many times we want the output to go to the clipboard so we can paste it later. From [this answer](https://stackoverflow.com/a/5130969/6929343) you can use:

``` bash
cat ~/.bashrc | xclip -selection clipboard
```

Now you can use <kbd>Ctrl</kbd>+<kbd>V</kbd> in almost any application to paste the terminal output into your document. To paste the terminal output in the clipboard back into your terminal use <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> instead.

  [1]: https://unix.stackexchange.com/a/200642/200094
  [2]: https://askubuntu.com/a/485762/307523
