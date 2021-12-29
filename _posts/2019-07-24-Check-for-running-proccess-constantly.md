---
layout:       post
title:        Check for running proccess constantly
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160849
type:         Answer
tags:         notification process notify-send eyesome
created_date: 2019-07-24 23:31:44
edit_date:    
votes:        0
favorites:    
views:        112
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

Using `pgrep` gives the least information. Using `ps -aux | grep` can provide too much at times:

<!-- Language-all: lang-bash -->

``` 
$ pgrep eyesome
1200
1217
1226

$ ps -aux | grep eyesome
root      1197  0.0  0.0   4504   696 ?        Ss   07:36   0:00 /bin/sh -c    /usr/local/bin/eyesome.sh
root      1200  0.0  0.0  13380  3912 ?        S    07:36   0:01 /bin/bash /usr/local/bin/eyesome.sh
root      1217  0.0  0.0  12768  3308 ?        S    07:36   0:00 /bin/bash /usr/local/bin/eyesome-dbus.sh
root      1226  0.0  0.0  12768  2368 ?        S    07:36   0:00 /bin/bash /usr/local/bin/eyesome-dbus.sh
root     10567  0.0  0.0  54792  3964 pts/18   S    10:27   0:00 sudo eyesome/movie.sh asdf
root     10568  0.0  0.0  12896  3380 pts/18   S    10:27   0:08 /bin/bash eyesome/movie.sh asdf
rick     26612  0.0  0.0  14224  1020 pts/19   S+   16:52   0:00 grep --color=auto eyesome

```

So let's narrow it down whilst making it user-friendly:

``` 
$ ps -aux | grep "sudo eyesome/movie" | grep -v grep
root     10567  0.0  0.0  54792  3964 pts/18   S    10:27   0:00 sudo eyesome/movie.sh asdf

```

Now put it into a script that you have loaded in Startup Applications:

``` 
#!/bin/bash
# Name: checkrunning.sh
# For: https://askubuntu.com/questions/1160844/check-for-running-proccess-constantly

while true; do

    Running=$(ps -aux | grep "sudo eyesome/movie" | grep -v grep)
    if [[ "$Running" == "" ]]
    then
        echo "NOT Running"
    else
        echo "Running: $Running"
    fi
    sleep 10

done

```

Mark the file as executable using:

``` 
chmod /path/to/checkrunning.sh

```

Replace the `echo` commands with `notify-send`.
