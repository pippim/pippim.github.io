---
layout:       post
title:        >
    After running "pip install --upgrade pip" pip tells me the same thing
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1090662
type:         Answer
tags:         16.04 python pip
created_date: 2018-11-07 02:27:04
edit_date:    
votes:        "0 "
favorites:    
views:        "83,595 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-07-After-running-_pip-install-upgrade-pip_-pip-tells-me-the-same-thing.md
toc:          false
navigation:   false
clipboard:    false
---

I wouldn't worry about it unless you have a problem. I was following the [Google quick start to using Python to manipulate gmail.com][1] tonight. I did the following:

``` 
$ pip install --upgrade google-api-python-client oauth2client
Collecting google-api-python-client
  Downloading https://files.pythonhosted.org/packages/4e/92/e4746e646585c8c359781c19984fe8b6b8794a6cfe382cd481329d5252ac/google-api-python-client-1.7.4.tar.gz (141kB)
    (... SNIP ...)
You are using pip version 8.1.1, however version 18.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

So as you can see Ubuntu is still distributing `8.1.1` but now version `18.1` is available whereas a four months ago `10.0.1` was available.

I've read many times how people upgrading `pip` and `python` got burned so my advise would be to do nothing unless you run into problems and feel a forced upgrade is necessary to correct them.

I've learned the hard way *"If it's not broken don't fix it"*.

  [1]: https://developers.google.com/gmail/api/quickstart/python
