---
layout:       post
title:        >
    How to search for all the files starting with the name "ABC" in a directory?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162893
type:         Answer
tags:         directory search regex
created_date: 2019-08-02 11:02:09
edit_date:    2019-08-02 11:17:57
votes:        "3 "
favorites:    
views:        "505,187 "
accepted:     
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    false
---

If you don't know the directory the `ABC*` files are located in, and you have millions of files, the `locate` command is the fastest method.

``` 
$ locate /ABC
/mnt/clone/home/rick/.cache/mozilla/firefox/9fu0cuql.default/cache2/entries/ABC6AD2FEC16465049B48D39FD2FE538258F2A34
/mnt/clone/home/rick/.cache/mozilla/firefox/9fu0cuql.default/cache2/entries/ABCBFDA54262F47253F95ED6ED4131A465EE0E39
/mnt/clone/usr/src/linux-headers-5.0.1-050001/tools/lib/lockdep/tests/ABCABC.sh
/mnt/clone/usr/src/linux-headers-5.0.1-050001/tools/lib/lockdep/tests/ABCDBCDA.sh
/mnt/clone/usr/src/linux-headers-5.0.1-050001/tools/lib/lockdep/tests/ABCDBDDA.sh
/mnt/old/home/rick/.cache/mozilla/firefox/3vkvi6ov.default/cache2/entries/ABC0C99FCEABAD0C6AA2078CD025A1CDE48D7BA1
/usr/src/linux-headers-5.0.1-050001/tools/lib/lockdep/tests/ABCABC.sh
/usr/src/linux-headers-5.0.1-050001/tools/lib/lockdep/tests/ABCDBCDA.sh
/usr/src/linux-headers-5.0.1-050001/tools/lib/lockdep/tests/ABCDBDDA.sh

```

**Notes:**

- The above command takes 1 second to run on 1 million files.
- In comparison the `find` command starting at `/` root directory will **a very long time** and generate many permission errors.
- If files were created today you must run `sudo updatedb` first.
