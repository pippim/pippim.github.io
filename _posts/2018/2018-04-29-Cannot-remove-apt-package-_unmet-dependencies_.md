---
layout:       post
title:        >
    Cannot remove apt package (unmet dependencies)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029546
type:         Answer
tags:         apt package-management upgrade dpkg latex
created_date: 2018-04-29 06:01:54
edit_date:    
votes:        "2 "
favorites:    
views:        "3,283 "
accepted:     Accepted
uploaded:     2024-09-01 12:09:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Cannot-remove-apt-package-_unmet-dependencies_.md
toc:          false
navigation:   false
clipboard:    false
---

Just had a headache myself today with having to fix a broken kernel `4.14.36` and `4.14.37` which could not be removed due to symbolic link errors.

Referring to this Q&A: [Remove broken PPA package with unknown option][1], but following my "cheat" method, edit the file `/var/lib/dpkg/info/context.postrm` and after the line:

``` sh
#!/bin/sh
```

insert the line

``` 
exit 0
```

Save the file and use:

``` 
sudo apt install -f
```

It should run without any errors now.


  [1]: https://askubuntu.com/questions/816314/remove-broken-ppa-package-with-unknown-option/816318
