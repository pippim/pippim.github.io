---
layout:       post
title:        >
    Why is a blank required between "[[" and "-e xxx" in ksh?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1153463
type:         Answer
tags:         command-line syntax ksh
created_date: !!str "2019-06-24 01:54:33"
edit_date:    !!str "2019-06-24 16:56:29"
votes:        !!str "2"
favorites:    
views:        !!str "2,350"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

The space is a [deliminator][1] and is required. As you can see from [`shellcheck`][2]:

``` 
$ shellcheck gmail-browse-msgs-algorithm.sh

In gmail-browse-msgs-algorithm.sh line 847:
        [[$Today != "${DaysArr[ i + DAY_DELETED_ON_NDX ]}" ]] && continue
          ^-- SC1035: You need a space after the [[ and before the ]].

```

(Both ksh and bash support `[[` and don't work without the space. Shellcheck gives exactly that output with similar ksh and bash scripts containing that buggy line.)

Why deliminators are needed has to do with [tokens and lexicons][3].


  [1]: https://web.archive.org/web/20130827121341/http://cosman246.com/jargon.html#deliminator
  [2]: http://manpages.ubuntu.com/manpages/xenial/en/man1/shellcheck.1.html
  [3]: https://www.cs.auckland.ac.nz/references/unix/digital/AQTLTBTE/DOCU_002.HTM
