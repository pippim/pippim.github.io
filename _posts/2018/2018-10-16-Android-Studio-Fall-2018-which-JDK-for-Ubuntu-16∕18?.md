---
layout:       post
title:        >
    Android Studio Fall 2018 which JDK for Ubuntu 16∕18?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1084101
type:         Question
tags:         java android jdk
created_date: 2018-10-16 00:39:21
edit_date:    2018-10-16 02:29:42
votes:        "1 "
favorites:    
views:        "1,502 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

As Android seems to change all the time I put the date into the question title.

I've just installed Android Studio which is current as of October 15, 2018 and burned up 2 GB of SSD space. According to [Lifewire Instructions][1] I need to install JDK from Oracle next.

So I run:



``` text
$ apt search jdk | wc -l

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

311

```

Too many to list but, here is a sample:

``` text
openjdk-8-jdk/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
  OpenJDK Development Kit (JDK)

openjdk-8-jdk-headless/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
  OpenJDK Development Kit (JDK) (headless)

openjdk-8-jre/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
  OpenJDK Java runtime, using Hotspot JIT

openjdk-9-jdk/xenial 9~b114-0ubuntu1 amd64
  OpenJDK Development Kit (JDK)

```

``` text
openjdk-9-dbg/xenial 9~b114-0ubuntu1 amd64
  Java runtime based on OpenJDK (debugging symbols)

```

``` text
openjdk-9-jdk-headless/xenial 9~b114-0ubuntu1 amd64
  OpenJDK Development Kit (JDK) (headless)

```

JDK version 8 reports `8u181` in the Ubuntu listing. The **Lifewire** article says if `8U181` and `8U182` are available to pick `8u182`. However JDK version 9 in Ubuntu doesn't mention 8U182 or 8U181.

``` text
$ apt search jdk | grep -i 8U181

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

oracle-java8-installer/xenial,xenial,now 8u181-1~webupd8~1 all [installed]
Oracle Java(TM) Development Kit (JDK) 8
openjdk-8-demo/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-doc/xenial-updates,xenial-updates,xenial-security,xenial-security 8u181-b13-0ubuntu0.16.04.1 all
openjdk-8-jdk/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-jdk-headless/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-jre/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-jre-headless/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-jre-jamvm/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-jre-zero/xenial-updates,xenial-security 8u181-b13-0ubuntu0.16.04.1 amd64
openjdk-8-source/xenial-updates,xenial-updates,xenial-security,xenial-security 8u181-b13-0ubuntu0.16.04.1 all
oracle-java8-installer/xenial,xenial,now 8u181-1~webupd8~1 all [installed]
oracle-java8-set-default/xenial,xenial,now 8u181-1~webupd8~1 all [installed]

```

Which of the following should I run?

``` text
sudo apt install oracle-java8-installer # already installed
sudo apt install oracle-java9-installer
sudo apt install openjdk-8-jdk
sudo apt install openjdk-9-jdk

```

Or should I be running a combination or something different?

  [1]: https://www.lifewire.com/install-android-studio-for-linux-4056779





