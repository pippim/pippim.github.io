---
layout:       post
title:        >
    What is the difference between "cat < filename" and "cat filename"?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1190733
type:         Answer
tags:         command-line redirect cat
created_date: !!str "2019-11-22 00:03:29"
edit_date:    !!str "2019-12-12 01:01:10"
votes:        !!str "14"
favorites:    
views:        !!str "10,233"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

# One Big Difference
<!-- Language-all: lang-bash -->
One big difference is with the `*`, `?`, or `[` globbing characters (wildcards) or anything else the shell may expand into multiple filenames. Anything the shell expands into two or more items, rather than treating as a single filename, cannot be opened for redirection.

Without redirection (ie no `<`), the shell passes multiple filenames to `cat`, which outputs the files' contents one after another. For example this works:

``` 
$ ls hello?.py
hello1.py  hello2.py

$ cat hello?.py

# Output for two files 'hello1.py' and 'hello2.py' appear on your screen
```

But with redirection (`<`) an error message occurs:

```     
$ ls < hello?.py
bash: hello?.py: ambiguous redirect

$ cat < hello?.py
bash: hello?.py: ambiguous redirect
```

----------


### One Tiny Difference

I thought with redirection it would be slower but there is no perceivable time difference:

``` 
$ time for f in * ; do cat "$f" > /dev/null ; done

real	0m3.399s
user	0m0.130s
sys 	0m1.940s

$ time for f in * ; do cat < "$f" > /dev/null ; done

real	0m3.430s
user	0m0.100s
sys 	0m2.043s

```

**Notes:**

- The difference is about 1/1000th (1 one thousandth) of a second in this test. In other tests it was 1/100th of a second which is still can't be noticed.
- Alternate the tests a few times so data is cached into RAM as much as possible and more consistent comparison times are returned. Another option is to drop all caches before each test.
