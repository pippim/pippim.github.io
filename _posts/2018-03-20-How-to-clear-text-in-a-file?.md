---
layout:       post
title:        How to clear text in a file?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1017769
type:         Answer
tags:         command-line bash files
created_date: 2018-03-20 23:39:00
edit_date:    2020-06-12 14:37:07
votes:        5
favorites:    
views:        202,694
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

# Not the shortest answer but...

This answer is based on another from [Super User][1]. Although not the shortest bash command, `truncate` is the most readable for average newbies:

``` 
$ echo Hello > Hello.txt
$ echo World! >> Hello.txt
$ cat Hello.txt
Hello
World!
$ truncate -s 0 Hello.txt
$ ll Hello.txt
-rw-rw-r-- 1 rick rick 0 Mar 20 17:32 Hello.txt

```

Parameters used with `truncate` command here:

- "-s" set the size
- "0" size will be zero

# Clear everything except first 10,000 bytes

An advantage of `truncate` is you can specify how much to keep, not just zero:

``` 
$ truncate -s 10000 Hello.txt

```

... will truncate everything after the first 10,000 bytes. This could be useful if a program went crazy and dumped many Megabytes of data into a small log file:

- Run the `truncate` command for a reasonable larger normal size of 10K
- Open the file with your text editor and press <kbd>End</kbd>
- Highlight and <kbd>PgUp</kbd> to delete the remaining bytes that don't belong (usually recognizable by ASCII garbage characters).

  [1]: https://superuser.com/a/634217/662962
