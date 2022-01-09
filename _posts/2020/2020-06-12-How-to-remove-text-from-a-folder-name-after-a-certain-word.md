---
layout:       post
title:        >
    How to remove text from a folder name after a certain word
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1249785
type:         Answer
tags:         delete text rename
created_date: 2020-06-12 22:53:33
edit_date:    2020-06-13 00:07:23
votes:        "1 "
favorites:    
views:        "168 "
accepted:     Accepted
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    true
---

Here's the code you need plus some test data you don't need:

<!-- Language-all: lang-bash -->

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: truncate-dname
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1249771/how-to-remove-text-from-a-folder-name-after-a-certain-word/1249785#1249785
# DATE: June 12, 2020

echo ==============  CREATE TEST DATA  ==================
mkdir -p dnames
cd dnames
mkdir -p "Song Band - Song Name download 9038450985934853434"
mkdir -p "Music List download dkjge3j6lk45j45756567"
mkdir -p "Video Chart download 4k645jel43k5yk574yryryrrtyryrryryrt"
ls

echo ==============  RENAME DIRECTORIES  ================
for old_name in ./*
do
    new_name="${old_name% download*}"
    mv -v "$old_name" "$new_name"
done

echo ==============  DELETE TEST DATA  ==================
ls
cd ..
rm -rf dnames
```

When you run the script you get this:

``` 
$ truncate-dname
============== CREATE TEST DATA ==================
Music List download dkjge3j6lk45j45756567
Song Band - Song Name download 9038450985934853434
Video Chart download 4k645jel43k5yk574yryryrrtyryrryryrt
============== RENAME DIRECTORIES ================
'./Music List download dkjge3j6lk45j45756567' -> './Music List'
'./Song Band - Song Name download 9038450985934853434' -> './Song Band - Song Name'
'./Video Chart download 4k645jel43k5yk574yryryrrtyryrryryrt' -> './Video Chart'
============== DELETE TEST DATA ==================
Music List  Song Band - Song Name  Video Chart
```


----------


The key operation you want is to extract sub-string within string before a search string. For example:

``` 
$ a="Song Band - Song Name download 9038450985934853434"

$ b="${a% download*}"

$ echo $b
Song Band - Song Name
```

This process is a little tricky if the word "download" appears in the song title so it's in the filename twice:

``` 
$ c="People keep downloading my songs download 9038465489643541"

$ d="${c%% download*}"

$ echo $d
People keep

$ d="${c% download*}"

$ echo $d
People keep downloading my songs
```

When you have two `%%` it deletes everything after the first "download" occurrence which you don't want. So in this case you want to just use a single `%` so the last "download" is the cut off point.

There is also the `#` operation which searches in the opposite direction you definitely don't want:

``` 
$ c="People keep downloading my songs download 9038465489643541"

$ e="${c##* download}"

$ echo $e
9038465489643541

$ e="${c#* download}"

$ echo $e
ing my songs download 9038465489643541

```

Here is a [thorough reference][1].


  [1]: http://tldp.org/LDP/abs/html/string-manipulation.html
