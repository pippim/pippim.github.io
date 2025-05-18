---
layout:       post
title:        >
    How to make a file (e.g. a .sh script) executable, so it can be run from a terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1364586
type:         Answer
tags:         command-line executable
created_date: 2021-09-19 15:22:34
edit_date:    
votes:        "2 "
favorites:    
views:        "2,039,504 "
accepted:     
uploaded:     2025-05-18 09:39:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-09-19-How-to-make-a-file-_e.g.-a-.sh-script_-executable_-so-it-can-be-run-from-a-terminal.md
toc:          false
navigation:   false
clipboard:    false
---

## Let all users run your script

As stated you can set the execution bit of the file to make it executable with `chmod +x`. But you can also use `chmod a+x`:



``` bash 
$ ll file_command.txt
-rw-rw-r-- 1 rick rick 17 Sep 19 08:55 file_command.txt

$ chmod a+x file_command.txt

$ ll file_command.txt
-rwxrwxr-x 1 rick rick 17 Sep 19 08:55 file_command.txt*

```

**NOTES:**

- A script doesn't have to end with `.sh` it can end in `.txt` as shown here, or have no extension whatsoever.
- Instead of just `+x` (only you can execute the script), use `a+x` so all users can execute the script.
- The file name has a `*` appended to it to indicate it is executable. Also the file name changes color to green on most systems.

[![make script executable][1]][1]


----------


## Run a script without making it executable

You can still run a bash script without making it executable. For example:

``` bash 
$ echo "echo Hello World" > file_command.txt

$ cat file_command.txt
echo Hello World

$ bash file_command.txt
Hello World
```

**NOTES:**

- First we create a script containing `echo Hello World`.
- Then we confirm the script called `file_command.txt` is correct.
- Lastly we run the script by calling `bash` and passing it the script name. The `bash`command is actually store as `/bin/bash` and it is an executable on all Ubuntu systems.
- Creating a file of commands saves you from adding the **shebang** `#!/bin/bash` as the first line in a script.
- Creating a file of commands saves you from making it executable with `chmod +x` or `chmod a+x`.


  [1]: https://pippim.github.io/assets/img/posts/2021/XLTbL.png
