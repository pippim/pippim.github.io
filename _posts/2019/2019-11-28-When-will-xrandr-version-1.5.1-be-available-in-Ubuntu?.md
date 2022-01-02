---
layout:       post
title:        >
    When will xrandr version 1.5.1 be available in Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192154
type:         Question
tags:         xrandr
created_date: 2019-11-28 01:56:29
edit_date:    2020-06-12 14:37:07
votes:        "7 "
favorites:    1
views:        "2,417 "
accepted:     Accepted
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---

I guess this is more of a question of where do I go to find out when `xrandr` version `1.5.1` will be published in Ubuntu? It's already available in Arch Linux and was released in August 2019. There is a [bug from 2010][1] I want to have fixed.

Ubuntu 16.04.6 LTS current version is:

``` 
$ xrandr --version
xrandr program version       1.5.0
Server reports RandR version 1.5

```

I'm not well-versed on the subject but could I simply get `1.5.1` source code and compile it? Or should such a mission critical app such as `xrandr` never be compiled from source?


----------


# TL;DR Why it matters

Everyone can try these short little tests on their platform to see the importance of `xrandr` version and the gamma bug.

The current Ubuntu version has the bug that's been around for 9 years:

``` 
$ xrandr --version
xrandr program version       1.5.0
Server reports RandR version 1.5
```

Basic problem is `xrandr` reports the wrong gamma values:

``` 
$ xrandr --verbose | grep ^DP-1-1 -A5
DP-1-1 connected 3840x2160+1920+0 (0xa5) normal (normal left inverted right x axis y axis) 1600mm x 900mm
    Identifier: 0x43
    Timestamp:  538179391
    Subpixel:   unknown
    Gamma:      1.0:1.1:1.3
    Brightness: 0.63
```

My "redshift-like" application has set gamma to **Red** = `1.0`, **Green** = `.88` and **Blue** = `.77` but RGB is incorrectly reported as `1.0:1.1:1.3`. Now imaging we want to increase brightness to .65. If we don't change gamma at the same time existing settings for gamma are reset to `1:1:1`. So we pass what we think are the current values:

``` 
$ xrandr --output DP-1-1 --brightness .65 --gamma 1.0:1.1:1.3
```

Low and behold the screen goes super bluish-greenish and kills our nighttime settings for reddish hue. When we check current settings again we find the values are inverted again:

``` 
$ xrandr --verbose | grep ^DP-1-1 -A5
DP-1-1 connected 3840x2160+1920+0 (0xa5) normal (normal left inverted right x axis y axis) 1600mm x 900mm
    Identifier: 0x43
    Timestamp:  541629314
    Subpixel:   unknown
    Gamma:      1.0:0.91:0.77
    Brightness: 0.65
```

So no matter what value `xrandr --verbose` is reporting we always have to use `1 / gamma` to get real gamma on Red, Green and Blue channels. After correcting our code, we have to put in a test for version `1.5.1` to **not correct** our code and use the gamma values returned. Assuming the bug has been fixed in version `1.5.1` which I have yet to compile and test.

  [1]: https://bugs.freedesktop.org/show_bug.cgi?id=31517
