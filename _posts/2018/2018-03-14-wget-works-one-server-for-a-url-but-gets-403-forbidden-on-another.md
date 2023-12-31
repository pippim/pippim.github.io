---
layout:       post
title:        >
    wget works one server for a url but gets 403 forbidden on another
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1015015
type:         Answer
tags:         wget
created_date: 2018-03-14 23:06:42
edit_date:    
votes:        "1 "
favorites:    
views:        "14,547 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-14-wget-works-one-server-for-a-url-but-gets-403-forbidden-on-another.md
toc:          false
navigation:   false
clipboard:    false
---

Not sure that anyone cares, but from Canada:

``` 
$ wget www.fivestarmazda.com/index.htm
--2018-03-14 17:04:34--  http://www.fivestarmazda.com/index.htm
Resolving www.fivestarmazda.com (www.fivestarmazda.com)... 151.101.52.247
Connecting to www.fivestarmazda.com (www.fivestarmazda.com)|151.101.52.247|:80... connected.
HTTP request sent, awaiting response... 301 Moved Permanently
Location: https://www.fivestarmazda.com/index.htm [following]
--2018-03-14 17:04:34--  https://www.fivestarmazda.com/index.htm
Connecting to www.fivestarmazda.com (www.fivestarmazda.com)|151.101.52.247|:443... connected.
HTTP request sent, awaiting response... 301 Moved Permanently
Location: / [following]
--2018-03-14 17:04:35--  https://www.fivestarmazda.com/
Reusing existing connection to www.fivestarmazda.com:443.
HTTP request sent, awaiting response... 200 OK
Length: 283589 (277K) [text/html]
Saving to: ‘index.htm’

index.htm              100%[==========================>] 276.94K  1.78MB/s    in 0.2s    

2018-03-14 17:04:35 (1.78 MB/s) - ‘index.htm’ saved [283589/283589]
```

Oops there goes another 280KB lost.
