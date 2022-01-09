---
layout:       post
title:        >
    How to determine which python modules were installed with `pip` and which with `apt`?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1081040
type:         Answer
tags:         apt package-management software-installation updates python
created_date: 2018-10-05 01:19:26
edit_date:    
votes:        "2 "
favorites:    
views:        "2,042 "
accepted:     Accepted
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    false
---

Not cast in stone but from this [**Ask Ubuntu Q&A**][1]: 

> As @Radu Rădeanu pointed out in this answer, there would generally be  
> difference in names of packages as well. Canonical usually names  
> Python 2 packages as python-<package_name> and Python 3 packages as  
> python3-<package_name>. Whereas for pip we generally just need to use  
> <package_name> for both Python 2 as well as Python3 packages.  

Generally speaking then:

- If the package name starts with `python-` or `python3-` it was installed by `apt`.
- Otherwise the package was installed by `pip`

  [1]: https://askubuntu.com/questions/431780/apt-get-install-vs-pip-install
