---
layout:       post
title:        >
    Unattended upgrade is ignoring some packages
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159563
type:         Answer
tags:         apt upgrade unattended-upgrades
created_date: 2019-07-20 00:07:30
edit_date:    2019-07-22 16:31:21
votes:        "2 "
favorites:    
views:        "4,528 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-20-Unattended-upgrade-is-ignoring-some-packages.md
toc:          false
navigation:   false
clipboard:    false
---

A similar question was asked before:

- [Why unattended-upgrades upgraded so few packages, seemingly?][1]

The accept answer states:

> Most of the answer is in your unattended-upgrades logfile, located at  
> `/var/log/unattended-upgrades/unattended-upgrades.log`  
>   
> Here's an example:  
>   
>     2018-01-08 06:17:51,770 INFO Starting unattended upgrades script  
>     2018-01-08 06:17:51,771 INFO Allowed origins are: ['o=Ubuntu,a=xenial-security']  
>     2018-01-08 06:18:07,765 INFO No packages found that can be upgraded unattended and no pending auto-removals  
>   
> Take a look at that middle line 'Allowed origins'. That means Software  
> Repositories. The only source there is -security. Not -upgrades, not  
> -backports, no PPAs, no third-party repos.  
>   
> In other words, this example unattended-upgrades is **only** providing  
> security upgrades. Nothing else.  
>   
> You can add, remove, or edit Allowed Origins (repositories) through  
> the Software and Updates Control Panel, or by editing the  
> unattended-upgrades config file, located at  
> `/etc/apt/apt.conf.d/50unattended-upgrades`.  
>   
> The rest of the answer is that Xenial (16.04) is two years old. Fewer  
> new security updates for old software.  


----------

Additional reading:

- [How to enable silent automatic updates for any repository?](How to enable silent automatic updates for any repository?)
- [Generates system-specific repositories to be added in configuration file for silently updating all packages via unattended upgrades.][2]
- [Upgrading External Packages with unattended-upgrade][3]


  [1]: https://askubuntu.com/questions/993470/why-unattended-upgrades-upgraded-so-few-packages-seemingly
  [2]: https://github.com/abhigenie92/unattended_upgrades_repos
  [3]: https://linux-audit.com/upgrading-external-packages-with-unattended-upgrade
