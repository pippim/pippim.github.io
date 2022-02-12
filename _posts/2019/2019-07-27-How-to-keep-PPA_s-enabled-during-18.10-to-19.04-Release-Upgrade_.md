---
layout:       post
title:        >
    How to keep PPA's enabled during 18.10 to 19.04 Release Upgrade?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1161520
type:         Answer
tags:         do-release-upgrade
created_date: 2019-07-27 18:20:57
edit_date:    2019-07-28 02:41:27
votes:        "2 "
favorites:    
views:        "80 "
accepted:     
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-27-How-to-keep-PPA_s-enabled-during-18.10-to-19.04-Release-Upgrade_.md
toc:          false
navigation:   false
clipboard:    false
---

This article: 

- [Ubuntu Users Can Now Keep PPAs And Third Party Repositories Enabled When Upgrading To A Newer Ubuntu Version][1]

... describes a new ground-breaking development for Ubuntu users:

> Brian Murray, Ubuntu Bugmaster, says this should solve many of the  
> issues people are encountering when trying to upgrade from one Ubuntu  
> release to another. I'd also add that his makes it easier to continue  
> receiving updates to software installed from PPA / third-party sources  
> after an Ubuntu upgrade, while also not removing software that might  
> be otherwise removed due to incompatibility when upgrading.  

You can use (in 18.10 now, in 18.04 soon) a new flag:

``` 
RELEASE_UPGRADER_ALLOW_THIRD_PARTY=1 update-manager -d
```

**Note:** Only PPAs supported in the new version will be enabled:

> It's worth noting that you may still see a warning about third party  
> sources being disabled on upgrade, but those that support the Ubuntu  
> version to which you're upgrading will not be disabled.  

  [1]: https://www.linuxuprising.com/2019/01/ubuntu-users-can-now-keep-ppas-and.html
