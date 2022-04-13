---
layout:       post
title:        >
    Only one line in script output
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138332
type:         Answer
tags:         command-line bash scripts
created_date: 2019-04-26 11:24:14
edit_date:    2019-04-27 17:53:11
votes:        "6 "
favorites:    
views:        "3,492 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-26-Only-one-line-in-script-output.md
toc:          false
navigation:   false
clipboard:    false
---

You are writing to a file in a loop with this command:

``` 
echo "$serial"|sha256sum > Token.csv
```

However each time you loop you are erasing the file and writing a new entry. What you want to do is append (add to) the file each time you loop with this command:

``` 
echo "$serial"|sha256sum >> Token.csv
```

A single `>` tells bash to erase the file `Token.csv` and write the contents. A double `>>` tells bash to add to the end of the file.


----------

The bash script would now look like this:

``` bash
#!/bin/bash
epoch=$(date -d "`date`" +"%s")
StringCsv="/home/Desktop/TokenGenScript/SerialNos.csv"
StringToken=b5242a2d7973c1aca3723c834ba0d239

> Token.csv # Empty file from last run

while IFS=$'\n' read -r line || [ -n "$line" ]
do
 j=$line
 serial=${j}:${epoch}:${StringToken}
 echo "$serial"|sha256sum >> Token.csv # Append new record to end
done < "$StringCsv"
```


----------


There are two ways to create a new empty file `> Token.csv` as used above and `touch Token.csv`. However only `> Token.csv` will empty an existing file. See:

- [What is the difference between touch file and &gt; file?](What is the difference between touch file and &gt; file?)
