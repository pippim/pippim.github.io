---
layout:       post
title:        >
    How do I stress test CPU and RAM (at the same time)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/948865
type:         Answer
tags:         software-recommendation stress-testing conky
created_date: 2017-08-23 02:53:37
edit_date:    2017-09-05 22:13:23
votes:        "55 "
favorites:    
views:        "104,302 "
accepted:     Accepted
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-23-How-do-I-stress-test-CPU-and-RAM-_at-the-same-time__.md
toc:          false
navigation:   false
clipboard:    false
---

You can install `stress` with:

``` 
sudo apt install stress
```

Then call it with:

``` 
stress --cpu 8 --io 4 --vm 4 --vm-bytes 1024M --timeout 10s
```

On my conky display notice how:

- In the top section CPU utilization spikes from 3% to 100%
- In the middle the temperature spikes from 60C to 80C
- At the bottom memory spikes from normal 2.75 GiB to 6.25 GiB

[![stress test.gif][1]][1]

Type `stress --help` for a full list of options.


----------

A commentator requested posting the entire conky script which I did here: [conky transparent][2]


  [1]: https://i.stack.imgur.com/bJmjj.gif
  [2]: {% post_url /2017/2017-08-01-conky-transparent %}
