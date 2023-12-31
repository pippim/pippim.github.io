---
layout:       post
title:        >
    How to allocate more ram?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027292
type:         Answer
tags:         ram
created_date: 2018-04-23 00:09:20
edit_date:    2018-04-23 00:23:22
votes:        "1 "
favorites:    
views:        "8,758 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-23-How-to-allocate-more-ram_.md
toc:          false
navigation:   false
clipboard:    false
---

If you know the program names your application uses you can put this in your startup applications:

``` 
cat /<path-to-app-1>/<prog-name-1> > /dev/null
cat /<path-to-app-1>/<prog-name-2> > /dev/null
cat /<path-to-app-1>/<prog-name-3> > /dev/null
    (... SNIP ...)
cat /<path-to-app-9>/<prog-name-9> > /dev/null
```

Additionally if your applications has large configuration files you can speed up access to them in startup applications as well using:

``` 
cat /<path-to-config1>/<config_file-1 > /dev/null
```

If after preseeding the caches above, you wish to clear them out and regain RAM, you can create and run this bash script:

``` bash
#!/bin/bash
if [[ $(id -u) -ne 0 ]] ; then echo "Please run as root" ; exit 1 ; fi
sync; echo 1 > /proc/sys/vm/drop_caches
sync; echo 2 > /proc/sys/vm/drop_caches
sync; echo 3 > /proc/sys/vm/drop_caches
```


