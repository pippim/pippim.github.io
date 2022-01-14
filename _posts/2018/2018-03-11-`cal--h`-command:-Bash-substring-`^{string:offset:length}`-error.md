---
layout:       post
title:        >
    `cal -h` command: Bash substring `${string:offset:length}` error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1013954
type:         Question
tags:         bash
created_date: 2018-03-11 19:47:52
edit_date:    2018-04-29 17:11:18
votes:        "5 "
favorites:    
views:        "567 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-11-`cal--h`-command:-Bash-substring-`^{string:offset:length}`-error.md
toc:          false
navigation:   false
clipboard:    true
---

# Beware the Ides of March Caesar

I'm getting a weird error in bash using: `${string:offset:length}`. 

The fifth output line for the middle of March has the wrong output:

``` 
$ substring_test.sh
     March 2018       
Su Mo Tu We Th Fr Sa  
             1  2  3  T=   T=   T=   T=   T= 1 T= 2 T= 3 
 4  5  6  7  8  9 10  T= 4 T= 5 T= 6 T= 7 T= 8 T= 9 T=10 
11 12 13 14 15 16 17  T= T= T= 1 T= 1 T= 1 T= 1 T= 1 
18 19 20 21 22 23 24  T=18 T=19 T=20 T=21 T=22 T=23 T=24 
25 26 27 28 29 30 31  T=25 T=26 T=27 T=28 T=29 T=30 T=31 
                      T=   T=   T=   T=   T=   T=   T=   

```

It is showing:

``` 
T= T= T= 1 T= 1 T= 1 T= 1 T= 1

```

But it **should** show:

``` 
T=11 T=12 T=13 T=14 T=15 T=16 T=17

```

The code is pretty straight forward:



{% include copyHeader.html %}
``` bash
#!/bin/bash

cal > /tmp/terminal

CalLineCnt=1
Today=$(date +"%d")

# Prefix with space when length < 2
if [[ ${#Today} < 2 ]] ; then
    Today=" "$Today
fi

while IFS= read -r Cal; do
    printf "$Cal"
    if [[ $CalLineCnt > 2 ]] ; then
        # See if today is on current line & invert background
        for (( j=0 ; j <= 18 ; j += 3 )) ; do
            Test=${Cal:$j:2}    # Current day on calendar line
printf "T=$Test "
            if [[ "$Test" == "$Today" ]] ; then
                printf "Offset: $j "
            fi
        done
    fi
    tput cud1           # Down one line
    CalLineCnt=$((++CalLineCnt))
done < /tmp/terminal

```

Can anyone point me in the right direction?


----------

# End Result

Applying fix of `cal -h` recommended below it worked fine until **Ubuntu 18.04 LTS** was released and tested on April 28, 2018. Now the fix recommended by @Steve H is used:

[![now.png][1]][1]

Some are curious about the what the code does so I provided the screen shot above. Others have asked for the full code and it is available here:[How can I get this terminal splash screen?][2]


  [1]: https://i.stack.imgur.com/CQZhd.png
  [2]: {% post_url /2018/2018-03-30-Terminal-splash-screen-with-Weather^-Calendar^-Time-^-Sysinfo^ %}
