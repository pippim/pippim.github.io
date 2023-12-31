---
layout:       post
title:        >
    Laptop powers off automatically : Ubuntu 18.04 & Jupyter Notebook running Python 2
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064710
type:         Answer
tags:         18.04 jupyter
created_date: 2018-08-12 16:42:21
edit_date:    
votes:        "0 "
favorites:    
views:        "269 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-Laptop-powers-off-automatically-_-Ubuntu-18.04-_-Jupyter-Notebook-running-Python-2.md
toc:          false
navigation:   false
clipboard:    false
---

See this post for an example of investigating errors: [jupyter notebook crash][1]

To see the messages you need to start `jupyter` from the command line:

``` 
jupyter notebook
```

At the end of the link notice what the author did to prevent crashing:

``` 
mkdir /run/user/1000/jupyter
```


----------

Here is a [Redhat Linux][2] question & answer with a different `jupyter` crash log.

If you are still having problems after trying solutions then edit your question and put the crash log into it.

  [1]: https://github.com/jupyter/notebook/issues/3602
  [2]: https://bugzilla.redhat.com/show_bug.cgi?id=1542976
