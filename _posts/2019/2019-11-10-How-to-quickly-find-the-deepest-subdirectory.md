---
layout:       post
title:        >
    How to quickly find the deepest subdirectory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187625
type:         Answer
tags:         filesystem
created_date: 2019-11-10 00:40:42
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "1,284 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-10-How-to-quickly-find-the-deepest-subdirectory.md
toc:          false
navigation:   false
clipboard:    true
---

## `locate` command is the fastest

The locate command is your friend in this case:



``` bash
$ time locate "/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*"
/mnt/clone/home/rick/.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg/gradle-4.6/samples/userguide/multiproject/dependencies/java/services/personService/src/main/java/org/gradle/sample/services/PersonService.java
/mnt/clone/home/rick/.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg/gradle-4.6/samples/userguide/multiproject/dependencies/java/services/personService/src/test/java/org/gradle/sample/services/PersonServiceTest.java
/mnt/clone/home/rick/.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg/gradle-4.6/samples/userguide/multiproject/dependencies/javaWithCustomConf/services/personService/src/main/java/org/gradle/sample/services/PersonService.java
/mnt/clone/home/rick/.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg/gradle-4.6/samples/userguide/multiproject/dependencies/javaWithCustomConf/services/personService/src/test/java/org/gradle/sample/services/PersonServiceTest.java

real    0m1.731s
user    0m1.653s
sys     0m0.072s
```

Stuff in enough `/*/*` until no results are displayed, then subtract one `/*` to get the deepest subdirectory level. The files in the deepest levels will also be display.

**Note:** On this machine there are four different paths returned. Each path contains one file.

----------

## Some details about locate

The database used by locate is updated daily by cron. If you installed an application or created new directories today you need update the database using:

``` bash
sudo updatedb
```

In Ubuntu 19.10 the locate command is no longer installed by default. Hopefully it returns in 20.04 but in the meantime you need to install it with:

``` bash
sudo apt install mlocate
```

To gain an appreciation of `locate` speed look at what it has indexed for instant retrieval:

``` bash
$ locate -S

Database /var/lib/mlocate/mlocate.db:
    381,154 directories
    2,548,775 files
    213,049,136 bytes in file names
    92,287,412 bytes used to store database
## ```



## Using a script

Comments point out how people won't know the starting point. I wrote a script that defaults to 50 level starting point and works backwards from there. You can override with a starting point of 6 to 126 subdirectory levels.

### Script output:

{% include copyHeader.html %}
``` bash
$ time deepdir

Search point 50 levels deep: /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
Common path followed by unique sub-paths (deepest subdir 25 levels):
+- /mnt/clone/home/rick/.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg/gradle-4.6/samples/userguide/multiproject/dependencies/
|--- /java/services/personService/src/main/java/org/gradle/sample/services/PersonService.java
|--- /java/services/personService/src/test/java/org/gradle/sample/services/PersonServiceTest.java
|--- /javaWithCustomConf/services/personService/src/main/java/org/gradle/sample/services/PersonService.java
|--- /javaWithCustomConf/services/personService/src/test/java/org/gradle/sample/services/PersonServiceTest.java

real    0m45.141s
user    0m44.552s
sys     0m0.588s

$ time deepdir 26

Search point 26 levels deep: /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
Common path followed by unique sub-paths (deepest subdir 25 levels):
  (... SNIP repeated parts ...)

real    0m6.123s
user    0m6.041s
sys     0m0.080s
```

- The first time you run the script you don't know how deep the subdirectories go. Therefore the default of 50 levels will takes 43 seconds to run.
- The second time you run the script pass the known count + 1 and it only takes 6 seconds to run.
- After the second time, take the output line of `/*/*.../*` and copy it (less 1 set) to the clipboard as a parameter for calling `locate` or another command.

## The bash script

{% include copyHeader.html %}
``` bash
# !/bin/bash

# NAME: deepdir
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1187624/how-to-quickly-find-the-deepest-subdirectory/1187625?noredirect=1#comment1985731_1187625
# DATE: November 11, 2019.

StartLevel=50
[[ $1 != "" ]] && StartLevel="$1"
[[ $StartLevel -gt 126 ]] && { echo Max levels 126 ; exit 1 ; }
[[ $StartLevel -lt   6 ]] && { echo Min levels   6 ; exit 2 ; }

Big="/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*" # 33
Big="$Big/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*" # 31
Big="$Big/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*" # 31
Big="$Big/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*" # 31
                                                       # Total supported: 126

# If starting level populated it is too small.
Search="${Big:0:StartLevel*2}"
echo "Search point $StartLevel levels deep: $Search"
Count=$(locate "$Search" | wc -l)
[[ $Count -gt 0 ]] && { echo "Levels too small. $Count files found" ; exit 3 ; }

# Loop backwards to find first populated level, always more than 5
for (( l=StartLevel; l>5; l-- )) ; do
    Search="${Big:0:l*2}"
    Count=$(locate "$Search" | wc -l)
    [[ $Count -gt 0 ]] && break
done

Arr=( $(locate "$Search") )

# Enhancement using Q&A: Longest common prefix of two strings in bash
#                        https://stackoverflow.com/a/17475354/6929343

Common=\
"$(IFS=$'\n'; sed -e '$!{N;s/^\(.*\).*\n\1.*$/\1\n\1/;D;}' <<<"${Arr[*]}")"
Common="${Common%/*}/"
echo "Common path followed by unique sub-paths (deepest subdir $l levels):"
echo "+- $Common"
Len="${#Common}"

for p in "${Arr[@]}" ; do
    # echo "DEBUG: $p"
    Curr="$(dirname "$p")"
    [[ $Curr != "$Last" ]] && echo "|--- /${p:$Len}"
    Last="$Curr"
done

exit 0
```

