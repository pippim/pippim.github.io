---
layout:       post
title:        >
    Can't reset my JAVA_HOME to new Open JDK 11 Java installation
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1137883
type:         Answer
tags:         software-installation java environment-variables jdk openjdk
created_date: 2019-04-24 23:11:45
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "16,754 "
accepted:     Accepted
uploaded:     2022-01-29 13:56:05
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-24-Can^t-reset-my-JAVA_HOME-to-new-Open-JDK-11-Java-installation.md
toc:          false
navigation:   false
clipboard:    false
---

# To Answer the question

The answers and some comments focus on how to set `JAVA_HOME` to version 11 but the question is partly about "where is version 8 being set?". To answer that see: 

- [`grep`ing all files for a string takes a long time]({% post_url /2018/2018-02-12-`grep`ing-all-files-for-a-string-takes-a-long-time %})

Use this command:

``` 
$ sudo grep -rnw --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e '/usr/lib/jvm/java-8-oracle' | grep JAVA_HOME

/etc/profile.d/jdk.sh:4:export JAVA_HOME=/usr/lib/jvm/java-8-oracle
/etc/profile.d/jdk.csh:4:setenv JAVA_HOME /usr/lib/jvm/java-8-oracle
/home/rick/.gradle/daemon/4.6/daemon-14831.out.log:53:20:45:23.553 [DEBUG] (... SNIP ...) /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin (... SNIP ...) Configuring env variables: {PATH=/home/rick/bin:/home/rick/.local/bin:/mnt/e/bin:/mnt/e/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin,  (... SNIP ...) 
```

This is what my system returns. Yours will likely be different. To make a long story short the culprit is `/etc/profile.d/jdk.sh`:

``` 
$ cat /etc/profile.d/jdk.sh

setenv J2SDKDIR /usr/lib/jvm/java-8-oracle
setenv J2REDIR /usr/lib/jvm/java-8-oracle/jre
setenv PATH ${PATH}:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin
setenv JAVA_HOME /usr/lib/jvm/java-8-oracle
setenv DERBY_HOME /usr/lib/jvm/java-8-oracle/db
```

You probably surmise `/etc/profile.d/jdk.csh` needs changing too. Indeed it contains the exact same contents as `/etc/profile.d/jdk.sh`


----------

# To address the XY problem

There is a better way than going through files line by line and changing an `8` to an `11`.

The easiest method is using Java installer. From this **Ask Ubuntu Q&A**: [Setting JDK 7 as default](Setting JDK 7 as default)



> To get a list of your installed Java platforms, run the following command from the terminal:  

``` 
sudo update-alternatives --config java
```

> This will give you a list output similar to this:  

``` 
There are 2 choices for the alternative java (providing /usr/bin/java).
   Selection    Path                                           Priority   Status
  ------------------------------------------------------------
  0            /usr/lib/jvm/java-6-oracle/jre/bin/java         1070      auto mode
  1            /usr/lib/jvm/java-7-openjdk-i386/jre/bin/java   1051      manual mode
* 2            /usr/lib/jvm/java-6-openjdk-i386/jre/bin/java   1069      manual mode
Press enter to keep the current choice[*], or type selection number: 
```



