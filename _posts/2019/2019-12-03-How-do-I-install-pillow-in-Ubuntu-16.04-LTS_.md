---
layout:       post
title:        >
    How do I install pillow in Ubuntu 16.04 LTS?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1193353
type:         Answer
tags:         16.04 lts python3
created_date: 2019-12-03 03:13:37
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "35,963 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-03-How-do-I-install-pillow-in-Ubuntu-16.04-LTS_.md
toc:          false
navigation:   false
clipboard:    false
---

# Ubuntu 18.04 and Python 3

This will interest users past Ubuntu 16.04 LTS: [install_pillow.sh][1]

``` bash
#!/bin/bash

apt update
apt install python3-pip -y
apt install libjpeg8-dev zlib1g-dev libtiff-dev libfreetype6 libfreetype6-dev libwebp-dev libopenjp2-7-dev libopenjp2-7-dev -y

pip3 install pillow --global-option="build_ext" --global-option="--enable-zlib" --global-option="--enable-jpeg" --global-option="--enable-tiff" --global-option="--enable-freetype" --global-option="--enable-webp" --global-option="--enable-webpmux" --global-option="--enable-jpeg2000"
```

This also addresses some of the "dependencies" which I believe OP was referring to:

- [Many of Pillow’s features require external libraries][2]


  [1]: https://gist.github.com/muratgozel/fdb854885d6a300004430239dd1f5cfb
  [2]: https://pillow.readthedocs.io/en/stable/installation.html
