---
layout:       post
title:        >
    Which is the right way to drop caches in Lubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1098062
type:         Answer
tags:         permissions lubuntu cache
created_date: 2018-12-03 04:23:42
edit_date:    
votes:        "3 "
favorites:    
views:        "8,142 "
accepted:     
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-03-Which-is-the-right-way-to-drop-caches-in-Lubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

The easiest way is with a script lifted [here][1]:



``` bash
#!/bin/bash
if [[ $(id -u) -ne 0 ]] ; then echo "Please run as root" ; exit 1 ; fi
sync; echo 1 > /proc/sys/vm/drop_caches
sync; echo 2 > /proc/sys/vm/drop_caches
sync; echo 3 > /proc/sys/vm/drop_caches
```

Call the script `drop-caches`.

Mark it as executable using `chmod a+x drop-caches`

Call it using `sudo ./drop-caches`

If you place the script in `/usr/local/bin` you can call it using `sudo drop-caches`

  [1]: {% post_url /2018/2018-04-22-Improve-initial-use-of-_find_-performance-time %}
