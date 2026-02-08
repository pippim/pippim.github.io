---
layout:       post
title:        >
    Smartctl: how to output SSD temp number only?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1563116
type:         Answer
tags:         ssd temperature
created_date: 2026-01-22 00:01:09
edit_date:    2026-01-22 00:23:23
votes:        "8 "
favorites:    
views:        "677 "
accepted:     
uploaded:     2026-02-08 09:04:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2026/2026-01-22-Smartctl_-how-to-output-SSD-temp-number-only_.md
toc:          false
navigation:   false
clipboard:    false
---

On my machine the temperature isn't the last field, it's the third last field. However, on both your machine and mine, the temperature is the 10th field:

``` shell
$ sudo smartctl -a /dev/sda | grep -i temp
194 Temperature_Celsius     0x0002   176   176   000    Old_age   Always       -       34 (Min/Max 12/51)
```

I've never mastered `awk` so I use "low-tech" programs:

``` shell
$ sudo smartctl -a /dev/sda | grep -i temp | tr -s ' ' | cut -d ' ' -f 10
34
```

## Breakdown:

> `tr -s ' '` - Compress extra white space. E.G. `Old_age   Always` becomes `Old_age Always` (Notice 3 spaces are only 1 space now).  

> `cut -d ' ' -f 10` - Treat a single space as a field separator and then print the 10th field.  

`awk` is definitely more powerful but the simple commands are easier for me to maintain so I've used them for a decade and focused on learning other things like bash and python.

Compressing all the white space into a sing space using `tr` is very important. This way you can count the temperature which is the 10th field and pass that to the `cut` command. If you didn't use `tr` you would have to pick the 37th field (in my case):

``` shell
$ sudo smartctl -a /dev/sda | grep -i temp
194 Temperature_Celsius     0x0002   171   171   000    Old_age   Always       -       35 (Min/Max 12/51)

$ sudo smartctl -a /dev/sda | grep -i temp | cut -d ' ' -f 37
35
```
