---
layout:       post
title:        >
    A new command combining apt update && apt upgrade in 18.04 or some later beta?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1077867
type:         Answer
tags:         command-line apt updates
created_date: 2018-09-24 01:54:17
edit_date:    2018-09-24 01:59:18
votes:        "3 "
favorites:    
views:        "2,857 "
accepted:     
uploaded:     2022-03-06 19:51:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-24-A-new-command-combining-apt-update-__-apt-upgrade-in-18.04-or-some-later-beta_.md
toc:          false
navigation:   false
clipboard:    true
---

Edit your `~/.bashrc` file and add this:

``` 
update () {
    sudo apt-get update
    sudo apt-get upgrade "$@"
}
```

Save the file, close any open terminal(s) and open a new terminal.

Test from the command line like this:

{% include copyHeader.html %}
``` 
$ update -s
Hit:1 http://archive.canonical.com/ubuntu xenial InRelease
Hit:2 http://security.ubuntu.com/ubuntu xenial-security InRelease                          
Ign:3 http://dl.google.com/linux/chrome/deb stable InRelease                               
Hit:4 http://ca.archive.ubuntu.com/ubuntu xenial InRelease                                 
Hit:5 http://ppa.launchpad.net/fossfreedom/indicator-sysmonitor/ubuntu xenial InRelease    
Hit:6 http://ca.archive.ubuntu.com/ubuntu xenial-updates InRelease                         
Hit:7 http://dl.google.com/linux/chrome/deb stable Release                                 
Hit:9 http://ca.archive.ubuntu.com/ubuntu xenial-backports InRelease                       
Hit:10 http://ppa.launchpad.net/peek-developers/stable/ubuntu xenial InRelease
Hit:11 http://ppa.launchpad.net/webupd8team/java/ubuntu xenial InRelease       
Reading package lists... Done                      
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Calculating upgrade... Done
The following packages will be upgraded:
  binutils google-chrome-stable
2 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Inst google-chrome-stable [69.0.3497.92-1] (69.0.3497.100-1 Google:1.0/stable [amd64])
Inst binutils [2.26.1-1ubuntu1~16.04.6] (2.26.1-1ubuntu1~16.04.7 Ubuntu:16.04/xenial-updates [amd64])
Conf google-chrome-stable (69.0.3497.100-1 Google:1.0/stable [amd64])
Conf binutils (2.26.1-1ubuntu1~16.04.7 Ubuntu:16.04/xenial-updates [amd64])
```

You will be prompted for your password if you haven't used the `sudo` command in awhile.


