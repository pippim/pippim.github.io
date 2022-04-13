---
layout:       post
title:        >
    echo "hello" >&0 | > file.txt doesn't write to file.txt
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020127
type:         Answer
tags:         command-line bash
created_date: 2018-03-29 00:23:08
edit_date:    2018-03-29 03:58:47
votes:        "2 "
favorites:    
views:        "15,437 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-29-echo-_hello_-__0-_-_-file.txt-doesn_t-write-to-file.txt.md
toc:          false
navigation:   false
clipboard:    false
---

- The `>` symbol is for file redirection to start of a file.
- The `>>` symbol is for file redirection to the end of a file (append). 
- The `|` symbol is for "piping" or passing the output from one command as input to another command.

``` 
    $ echo "Hello" > file.txt
    $ echo "World!" >> file.txt
    $ cat file.txt
    Hello
    World!
    $ cat file.txt | grep !
    World!
```

The `grep` (Global regular expression print) command searches a file for a given search string and prints the line it is on.

The `&>0` according to [Advanced-Bash Scripting Guide][1]:

``` 
&>filename
  # Redirect both stdout and stderr to file "filename."
  # This operator is now functional, as of Bash 4, final release.
```

In your case the file name was 0 which is standard input. So it is redirecting all output to input. Which as best as I can tell is a circular reference that will not work. The syntax you used is `>&0` which redirects output to input. Which is also appears to be a circular reference.

The "filenames" are:

- `0` standard input
- `1` standard output
- `2` standard error output

The traditional way of using file descriptor `0` (standard input) through file redirection is:

``` 
 0< FILENAME
    < FILENAME
      # Accept input from a file.
      # Companion command to ">", and often used in combination with it.
      #
      # grep search-word <filename
```

If you want to use the `echo` command and `|` together (as Zanna's answer points out) you can use:

``` 
$ echo "hello" | cat > file.txt
$ cat file.txt
hello
```

  [1]: https://www.tldp.org/LDP/abs/html/io-redirection.html



