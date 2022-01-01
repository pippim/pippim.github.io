---
layout:       post
title:        >
    Which is faster to delete first line in file... sed or tail?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/862804
type:         Question
tags:         scripts sed tail
created_date: !!str "2016-12-20 20:32:09"
edit_date:    !!str "2017-04-13 12:25:10"
votes:        !!str "14"
favorites:    3
views:        !!str "15,010"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
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
