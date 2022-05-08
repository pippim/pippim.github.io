---
layout:       post
title:        >
    Which is faster to delete first line in file... sed or tail?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/862804
type:         Question
tags:         scripts sed tail
created_date: 2016-12-20 20:32:09
edit_date:    2017-04-13 12:25:10
votes:        "15 "
favorites:    3
views:        "15,391 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-20-Which-is-faster-to-delete-first-line-in-file...-sed-or-tail_.md
toc:          false
navigation:   false
clipboard:    false
---

In this answer ([How can I remove the first line of a file with sed?][1]) there are two ways to delete the first record in a file:

``` 
sed '1d' $file >> headerless.txt
```

** ----------------  OR ----------------**

``` 
tail -n +2 $file >> headerless.txt
```

Personally I think the `tail` option is cosmetically more pleasing and more readable but probably because I'm sed-challenged.

Which method is fastest?

  [1]: https://askubuntu.com/questions/25174/how-can-i-remove-the-first-line-of-a-file-with-sed/25177#25177
