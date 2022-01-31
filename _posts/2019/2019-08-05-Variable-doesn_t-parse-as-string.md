---
layout:       post
title:        >
    Variable doesn't parse as string
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1163607
type:         Answer
tags:         command-line bash scripts text
created_date: 2019-08-05 17:29:46
edit_date:    2019-08-05 18:38:45
votes:        "6 "
favorites:    
views:        "1,063 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-05-Variable-doesn_t-parse-as-string.md
toc:          false
navigation:   false
clipboard:    false
---

This works on my machine:

``` 
$ string="$(iwconfig wlp60s0 | grep -I Signal)"
$ echo $string
Link Quality=68/70 Signal level=-42 dBm
$ echo $string | cut -d' ' -f4,5
level=-42 dBm
```

- For your machine replace `wlp60s0` with `wlan0`.
- **Note** this is using Ubuntu 16.04 and Ubuntu 19.04 where there is a space between `42` and `dBm`. As such the `cut` command is instructed to print fields #4 and #5. In your question there is no space so I'm not sure what version you are using.

You could also use:

``` 
$ echo $string | cut -d'=' -f3
-42 dBm
```

- In this case `cut` is told to use `=` as field delimiter.

If you want to use `${string...}` though the correct syntax is:

``` 
$ echo ${string##*=}
-38 dBm

$ echo "${string##*=}"
-38 dBm  
```

Either method will work to take the substring after the last `=`. The original method of `5` in your question I don't understand how it can work.
