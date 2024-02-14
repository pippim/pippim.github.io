---
layout:       post
title:        >
    How can I print multiline output on the same line?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1016826
type:         Answer
tags:         command-line scripts text-processing
created_date: 2018-03-17 19:24:43
edit_date:    2018-03-17 19:31:22
votes:        "4 "
favorites:    
views:        "86,668 "
accepted:     
uploaded:     2024-02-14 06:19:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-17-How-can-I-print-multiline-output-on-the-same-line_.md
toc:          false
navigation:   false
clipboard:    false
---

This answer has a solution to the problem you are trying to create: [Why does bash remove \n in $(cat file)?][1]

If you type `cat myfile.txt` you will see:

``` 
abc
def
ghi
```

But if you type `echo $(cat myfile.txt)` you will see:

``` 
abc def ghi
```

Note this method inserts a space where separate new lines used to be. This makes the output easier to read but doesn't strictly adhere to your question scope.

  [1]: https://askubuntu.com/questions/121866/why-does-bash-remove-n-in-cat-file
