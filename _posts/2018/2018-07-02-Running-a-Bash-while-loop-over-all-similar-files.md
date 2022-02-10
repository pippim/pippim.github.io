---
layout:       post
title:        >
    Running a Bash while loop over all similar files
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1051609
type:         Answer
tags:         bash scripts
created_date: 2018-07-02 19:55:00
edit_date:    2018-07-03 10:12:57
votes:        "6 "
favorites:    
views:        "3,855 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-02-Running-a-Bash-while-loop-over-all-similar-files.md
toc:          false
navigation:   false
clipboard:    false
---

From this **Stack Overflow** answer: [List files that only have number in names][1]:



``` bash
find . -regex '.*/[0-9]+\.tst'
```

**OR**

Using find also has advantages when you want to do something with the files, e.g. using the built-in `-exec`, `-print0` and pipe to `xargs -0` or even (using Bash):

``` bash
while IFS='' read -r -d '' file
do
  # ...
done < <(find . -regex '.*/[0-9]+\.tst' -print0)
```


----------

Note the other answers here my include files that aren't numbers if the filename starts with a digit. The answer posted here does not though. For example:

``` bash
$ ls *.tst
12tst.tst  1.tst  2.tst

$ find . -maxdepth 1 -regex '.*/[0-9]+\.tst'
./1.tst
./2.tst
```

**NOTE:** Use `-maxdepth 1` argument to only list numbered files in the current directory and not in sub-directories.

  [1]: https://stackoverflow.com/questions/30527166/list-files-that-only-have-number-in-names

