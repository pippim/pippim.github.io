---
layout:       post
title:        >
    Set LD_LIBRARY_PATH correctly
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1066846
type:         Answer
tags:         environment-variables matlab paths boost
created_date: 2018-08-19 14:30:47
edit_date:    
votes:        "7 "
favorites:    
views:        "13,936 "
accepted:     
uploaded:     2023-09-11 23:17:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-19-Set-LD_LIBRARY_PATH-correctly.md
toc:          false
navigation:   false
clipboard:    false
---

This [Stack Exchange Q&A][1] has various ways of setting `LD_LIBRARY_PATH` the top voted answer suggests this is the best way:

``` 
sudo -H gedit /etc/ld.so.conf.d/randomLibs.conf
```

inside the file you are supposed to write the complete path to the directory that contains all the libraries that you wish to add to the system, for example

``` 
/home/linux/myLocalLibs
```

remember to add only the path to the dir, not the full path for the file, all the libs inside that path will be automatically indexed.

Save and run `sudo ldconfig` to update the system with this libs.

  [1]: https://stackoverflow.com/questions/13428910/how-to-set-the-environmental-variable-ld-library-path-in-linux
