---
layout:       post
title:        >
    Another (unsolvable) "old glib" problem
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027329
type:         Answer
tags:         software-installation dpkg glib pkg-config
created_date: 2018-04-23 03:50:29
edit_date:    
votes:        "3 "
favorites:    
views:        "852 "
accepted:     
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-23-Another-_unsolvable_-_old-glib_-problem.md
toc:          false
navigation:   false
clipboard:    true
---

Your `dpkg` command doesn't catch everything. Try this command instead:

``` 
$ dpkg -l libglib2*
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name              Version       Architecture  Description
+++-=================-=============-=============-=======================================
ii  libglib2.0-0:amd6 2.48.2-0ubunt amd64         GLib library of C routines
ii  libglib2.0-bin    2.48.2-0ubunt amd64         Programs for the GLib library
ii  libglib2.0-data   2.48.2-0ubunt all           Common files for GLib library
```

Although my Ubuntu 16.04 works perfectly for my needs it appears I have similar `glib` errors to you. I'll just ignore them though because I don't need to reinstall `glib`:

{% include copyHeader.html %}
``` 
$ sudo apt install libglib2.0
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Note, selecting 'libglib2.0-0-refdbg' for regex 'libglib2.0'
Note, selecting 'libglib2.0-cil-dev' for regex 'libglib2.0'
Note, selecting 'libglib2.0-tests' for regex 'libglib2.0'
Note, selecting 'libglib2.0-0-dbg' for regex 'libglib2.0'
Note, selecting 'libglib2.0-bin' for regex 'libglib2.0'
Note, selecting 'libglib2.0-cil' for regex 'libglib2.0'
Note, selecting 'libglib2.0-dbg' for regex 'libglib2.0'
Note, selecting 'libglib2.0-dev' for regex 'libglib2.0'
Note, selecting 'libglib2.0-doc' for regex 'libglib2.0'
Note, selecting 'libglib2.0-data' for regex 'libglib2.0'
Note, selecting 'libglib2.0-0' for regex 'libglib2.0'
libglib2.0-0 is already the newest version (2.48.2-0ubuntu1).
libglib2.0-data is already the newest version (2.48.2-0ubuntu1).
libglib2.0-bin is already the newest version (2.48.2-0ubuntu1).
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help resolve the situation:

The following packages have unmet dependencies:
 libglib2.0-0-dbg : Depends: libglib2.0-0 (= 2.48.0-1ubuntu4) but 2.48.2-0ubuntu1 is to be installed
 libglib2.0-0-refdbg : Depends: libglib2.0-0 (= 2.48.0-1ubuntu4) but 2.48.2-0ubuntu1 is to be installed
 libglib2.0-dev : Depends: libglib2.0-0 (= 2.48.0-1ubuntu4) but 2.48.2-0ubuntu1 is to be installed
                  Depends: libglib2.0-bin (= 2.48.0-1ubuntu4)
                  Depends: zlib1g-dev but it is not going to be installed
E: Unable to correct problems, you have held broken packages.
```

On one hand the messages say the most current version is already installed on the other hand it says incorrect versions are installed. At the end it says there are broken packages.
