---
layout:       post
title:        >
    how do I find openjdk-11 that I just installed?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1336957
type:         Answer
tags:         software-installation openjdk jdk
created_date: 2021-05-08 14:00:11
edit_date:    
votes:        "1 "
favorites:    
views:        "14,634 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-08-how-do-I-find-openjdk-11-that-I-just-installed_.md
toc:          false
navigation:   false
clipboard:    false
---

An alternative to `whereis` and `find` command is the `locate` command. It is extremely fast:

``` 
$ locate openjdk | head -n10
/home/rick/Android/Sdk/sources/android-28/org/openjdk
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util/stream
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util/stream/CollectorOps.java
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util/stream/DoubleStreamTestDataProvider.java
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util/stream/DoubleStreamTestScenario.java
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util/stream/FlagDeclaringOp.java
/home/rick/Android/Sdk/sources/android-28/org/openjdk/testlib/java/util/stream/IntStreamTestDataProvider.java

```

These are the first 10 filenamess containing `openjdk`. You can quickly locate and count the number of files using `wc` (word count) command with the `-l` (line count) parameter:

``` 
$ time locate java | wc -l
57555

real	0m0.945s
user	0m0.927s
sys 	0m0.021s

$ time locate openjdk | wc -l
72

real	0m1.053s
user	0m1.033s
sys 	0m0.021s

```

So there are 57,555 files with`java` in the filename and 72 files with `openjdk` in the filename. In both instances it takes about 1 second to find them all.

To truly appreciate the speed of the `locate` command consider searching which filenames contain the letter `e` which is the most common letter in the alphabet:

``` 
$ time locate e | wc -l
2283738

real	0m0.580s
user	0m0.592s
sys 	0m0.177s
```

There are 2,228,738 files with the letter `e` occuring at least once in their filename. This is for three Ubuntu installations, one Windows installation and one shared Ubuntu + Windows partition. It only takes 1/2 a second to locate them!

You may have to install the `locate` command first:

- [Ubuntu 19.10: why is the &quot;locate&quot; command missing?](Ubuntu 19.10: why is the &quot;locate&quot; command missing?)


