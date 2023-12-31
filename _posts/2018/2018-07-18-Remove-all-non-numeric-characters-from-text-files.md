---
layout:       post
title:        >
    Remove all non-numeric characters from text files
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1057070
type:         Answer
tags:         command-line text-processing
created_date: 2018-07-18 00:08:56
edit_date:    
votes:        "0 "
favorites:    
views:        "7,862 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-18-Remove-all-non-numeric-characters-from-text-files.md
toc:          false
navigation:   false
clipboard:    false
---

Use:

``` 
$ echo "Jim 5" > file.txt
$ echo "Jane 3" >> file.txt
$ sed -i 's/[^0-9]//g' file.txt
$ cat file.txt
5
3
```

Using your test data:

``` 
$ cat file1.txt
Sydney 33
Castle hill 47
Lake's town hill 79

$ sed -i 's/[^0-9]//g' file1.txt

$ cat file1.txt
33
47
79
```

  [1]: https://www.cyberciti.biz/faq/sed-remove-all-except-digits-numbers/
