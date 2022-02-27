---
layout:       post
title:        >
    I get an error when creating a VM on VirtualBox
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007491
type:         Answer
tags:         virtualbox docker
created_date: 2018-02-18 21:28:11
edit_date:    
votes:        "0 "
favorites:    
views:        "728 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-18-I-get-an-error-when-creating-a-VM-on-VirtualBox.md
toc:          false
navigation:   false
clipboard:    false
---

9 days ago someone reported getting [this error][1] after upgrading Virtual Box from version 5.1 to 5.2. Their solution below:

I got this error after upgrading from Virtualbox 5.1 to 5.2, as installed on Ubuntu from the Virtualbox PPA. I solved it by purging config files for 5.1 as well as uninstalling virtualbox-dkms 5.1:

``` 
sudo dpkg --purge virtualbox-5.1
sudo dpkg --purge virtualbox-dkms
```


----------

As you are running Kernel 4.10.0-xx you may be interested in this if you upgrade some day: [virtualbox crash on kernel 4.13.0-26](virtualbox crash on kernel 4.13.0-26)

  [1]: https://github.com/hashicorp/vagrant/issues/8687
