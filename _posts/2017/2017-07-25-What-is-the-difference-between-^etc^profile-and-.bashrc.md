---
layout:       post
title:        >
    What is the difference between /etc/profile and .bashrc
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/939742
type:         Answer
tags:         bash bashrc
created_date: 2017-07-25 20:29:44
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "8,920 "
accepted:     Accepted
uploaded:     2022-01-14 19:32:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-25-What-is-the-difference-between-^etc^profile-and-.bashrc.md
toc:          false
navigation:   false
clipboard:    false
---

I think this [answer][1] sums it up nicely:

# From man bash:

## Invocation

[...]

> When bash is invoked as an interactive login shell, or as a  
> non-interactive shell with the --login option, it first reads and  
> executes commands from the file /etc/profile, if that file exists.  
> After reading that file, it looks for ~/.bash_profile, ~/.bash_login,  
> and ~/.profile, in that order, and reads and executes commands from  
> the first one that exists and is readable. The --noprofile option may  
> be used when the shell is started to inhibit this behavior.  

[...]

> When an interactive shell that is not a login shell is started, bash  
> reads and executes commands from ~/.bashrc, if that file exists. This  
> may be inhibited by using the --norc option. The --rcfile file option  
> will force bash to read and execute commands from file instead of  
> ~/.bashrc.  


  [1]: https://stackoverflow.com/questions/18791486/differences-uses-and-similarities-between-bashrc-bash-profile-and-etc-profil
