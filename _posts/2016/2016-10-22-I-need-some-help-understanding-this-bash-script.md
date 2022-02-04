---
layout:       post
title:        >
    I need some help understanding this bash script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840293
type:         Answer
tags:         bash scripts
created_date: 2016-10-22 01:29:13
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "97 "
accepted:     Accepted
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-22-I-need-some-help-understanding-this-bash-script.md
toc:          false
navigation:   false
clipboard:    false
---

# The magic of built-in bash variable $SECONDS

Your script highlights the built-in bash variable `$SECONDS` that keeps track of how many seconds a bash script has been running. Initially it starts at zero and the working variable `current` is set to this value at the beginning of the script. Then the script loops and increments `current` each time $SECONDS changes and displays "1, 2, 3... 10" on the screen.


----------


# Analyzing bash script line by line:

` #!/bin/bash` tells the system this is a bash script

`    current=0` sets the variable **current** to 0

`    while [ $SECONDS -le 10 ]; do` When the number of seconds this script has been running is less than or equal to 10 do the following

`                if [ $SECONDS -eq ${current} ]; then` if the value of current is equal to number of seconds then:

`                            echo ${current}` display the current value (0 initially, then 1, 2, 3... to 10)

`                            current=$((${current}+1))` increment current value

`                fi` End of If statement, required for syntax rules

`    done` end of While loop, required for syntax rules


----------


# Testing the script

To test this script copy and paste the OP's text to a new file. For our purposes call the file `seconds`. Mark the file as executable with the command:

``` 
chmod +x seconds
```

Then call the bash script with the current directory prefix in front:

``` 
./seconds
```
