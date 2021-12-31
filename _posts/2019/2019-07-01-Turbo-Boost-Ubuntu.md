---
layout:       post
title:        >
    Turbo Boost Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155295
type:         Answer
tags:         18.04 intel turbo-boost
created_date: !!str "2019-07-01 20:07:49"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "262"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

To disable turbo boost (for Intel anyway) use this command:

<!--Language-all: lang-bash -->

``` 
$ echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
1

```


----------


Another option is to limit your CPU frequencies to non-turbo boost speeds or even lower. For this purpose I wrote `cpuf`:


- https://askubuntu.com/questions/1141605/gui-or-simple-bash-script-to-throttle-the-cpu/1142671#1142671

[![cpuf-demo.gif][1]][1]

Visit the link to copy the script or get more details.

  [1]: https://i.stack.imgur.com/2lHSD.gif

