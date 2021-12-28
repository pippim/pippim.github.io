---
layout:       post
title:        How to find current version of Gnome for Ubuntu 18.04 from internet?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1065431
type:         Question
tags:         apt gnome internet versions
created_date: 2018-08-14 22:51:08
edit_date:    2018-08-15 23:02:44
votes:        0
favorites:    
views:        10,404
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

I'm writing this in Ubuntu 16.04.5 LTS. I'm looking at Gnome Extensions for Ubuntu 18.04 that work with Gnome version 3.24 and breaks with version 3.26.

How can I find out using browser (google search doesn't tell me), `apt list | grep ...` or other means what version of Gnome Ubuntu 18.04 is using today?

Rebooting every time I want to know something about a version I haven't booted is inconvenient.


----------

**Test Results:**

``` 
zcat /dev/nvme0n1p10/usr/share/doc/gnome-session-bin/changelog.Debian.gz | head -n1
gzip: /dev/nvme0n1p10/usr/share/doc/gnome-session-bin/changelog.Debian.gz: Not a directory

```


**Important Note:** I do not have 18.04 installed. I have 18.04 Unity installed. I want to know current known version would be installed so I can research bugs before installation.

----------


**EDIT:** I'm not looking for the Gnome version of the current booted partition (as the duplicate candidate does) using:

``` 
$ apt-cache policy gnome-shell
gnome-shell:
  Installed: (none)
  Candidate: 3.18.5-0ubuntu0.3
  Version table:
     3.18.5-0ubuntu0.3 500
        500 http://ca.archive.ubuntu.com/ubuntu xenial-updates/universe amd64 Packages
     3.18.4-0ubuntu3 500
        500 http://ca.archive.ubuntu.com/ubuntu xenial/universe amd64 Packages

```

I'm looking for the gnome version for a partition that needs to be mounted first (18.04). Or simply a link to a website containing the current version numbers as of today for 14.04, 16.04, 18.04, etc.

