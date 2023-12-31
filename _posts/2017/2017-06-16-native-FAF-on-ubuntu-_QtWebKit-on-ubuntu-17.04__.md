---
layout:       post
title:        >
    native FAF on ubuntu (QtWebKit on ubuntu 17.04+)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/925912
type:         Answer
tags:         software-installation 17.04 pyqt qt4 qtwebkit
created_date: 2017-06-16 01:26:25
edit_date:    
votes:        "1 "
favorites:    
views:        "8,662 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-16-native-FAF-on-ubuntu-_QtWebKit-on-ubuntu-17.04__.md
toc:          false
navigation:   false
clipboard:    false
---

# Check `~/.bashrc` for Python version override

The package you are wanting to compile requires Python version 2.7.x. Confirm that with these commands:

``` 
$ python
Python 2.7.12 (default, Nov 19 2016, 06:48:10) 
[GCC 5.4.0 20160609] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import PyQt4
>>> print PyQt4.__path__
['/usr/lib/python2.7/dist-packages/PyQt4']
>>> 
```

That was the problem in this [Q&A][1].

# You are not alone with `linux error PyQt4 import QtWebKit` google search:

 - [ImportError: No module named &#39;PyQt4.QtWebKit&#39;][2]
 - [cannot run spyder / ImportError: No module named QtWebKit #3200][3]
 - [ImportError: No module named 'PyQt4.QtWebKit' #1683][4]
 - [Some PyQt4 applications fail to start in Yakkety due to missing PyQt4-WebKit][5]
 - [Python cannot import specific PyQt4 QtWebKit modules][6]
 - [Python 2.7.11 - ImportError: cannot import name QtWebKit - Kali Linux / Debian 8][7]
 - [PyQt4: Why I get “ImportError: No module named QtWebkit”?][8]

Unfortunately there are alot more google results but these I believe are the most pertinent for you to read **if** the first recommendation doesn't pan out.

  [1]: https://ubuntuforums.org/showthread.php?t=2253348&page=2
  [2]: https://askubuntu.com/questions/840318/importerror-no-module-named-pyqt4-qtwebkit
  [3]: https://github.com/spyder-ide/spyder/issues/3200
  [4]: https://github.com/biolab/orange3/issues/1683
  [5]: https://bugs.launchpad.net/ubuntu/+source/python-qt4/+bug/1633819
  [6]: https://stackoverflow.com/questions/22847003/python-cannot-import-specific-pyqt4-qtwebkit-modules
  [7]: https://stackoverflow.com/questions/37604532/python-2-7-11-importerror-cannot-import-name-qtwebkit-kali-linux-debian-8
  [8]: https://stackoverflow.com/questions/11701619/pyqt4-why-i-get-importerror-no-module-named-qtwebkit
