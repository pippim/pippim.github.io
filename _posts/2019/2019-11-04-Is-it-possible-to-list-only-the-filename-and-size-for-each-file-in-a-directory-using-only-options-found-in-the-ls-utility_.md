---
layout:       post
title:        >
    Is it possible to list only the filename and size for each file in a directory using only options found in the ls utility?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186028
type:         Answer
tags:         command-line bash
created_date: 2019-11-04 01:59:26
edit_date:    
votes:        "3 "
favorites:    
views:        "11,748 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-04-Is-it-possible-to-list-only-the-filename-and-size-for-each-file-in-a-directory-using-only-options-found-in-the-ls-utility_.md
toc:          false
navigation:   false
clipboard:    true
---

It's impossible to do with the `ls` command by itself. You can do it by piping `ls -l` output to other commands or with a totally different command like `find` as others have answered.

The `tree` command gives another alternative:

{% include copyHeader.html %}
``` 
rick@alien:~/askubuntu$ tree -h
.
├── [8.8K]  aptfielout
├── [1.8K]  aptfilein
├── [ 435]  aptfileout
   (... SNIP ...)
├── [  38]  script
├── [4.0K]  subdir-A
│   ├── [  14]  1.mp4
│   ├── [  14]  2.mp4
│   ├── [  14]  3.mp4
│   └── [4.0K]  JSON
│       └── [4.0K]  JSON
│           ├── [   7]  1.json
│           ├── [   7]  2.json
│           ├── [   7]  3.json
│           └── [   7]  4.json
   (... SNIP ...)
├── [1.5K]  ttlus
└── [1.3K]  ttlus~

7 directories, 57 files
```

The `tree` option passed is `-h` for human readable size. For size in exact bytes pass `-s`.
