---
layout:       post
title:        >
    Can 'sudo apt-get remove [write]' destroy my Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1142089
type:         Answer
tags:         apt
created_date: 2019-05-10 11:26:56
edit_date:    2019-05-11 15:38:28
votes:        "9 "
favorites:    
views:        "6,301 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-10-Can-_sudo-apt-get-remove-_write__-destroy-my-Ubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

Before doing an `sudo apt-get`, it is wise to do a simulation:


``` bash
$ apt-get remove [write] -s | wc -l
65280
```

There are nearly **65,280** packages that qualify for removal ***if*** installed on your system. `[write]` is a search pattern for  [Regex matching][1] causing every package to be selected if it contains:

 - The letter `w` or `r` or `i` or `t` or `e`

Output is piped to the **Word Count** command with ` | wc -l`. Output lines from `apt-get` are suppressed by `wc`. The `-l` switch instructs `wc` to only print count of lines and not word count or character count.

**Simulation** is specified with the `-s` flag. You can also use the `--simulate` flag for greater readability. Another advantage of a simulation is you don't need `sudo` powers which many of us have learned can be dangerous at times.

To get an idea of the package names involved pipe output to the `less` command:

``` bash
$ apt-get remove [write] --simulate | less

NOTE: This is only a simulation!
      apt-get needs root privileges for real execution.
      Also keep in mind that locking is deactivated,
      so don't depend on the relevance to the real current situation!
Reading package lists...
Building dependency tree...
Reading state information...
Package 'libpam-pin' is not installed, so not removed
Package 'activity-log-manager-common' is not installed, so not removed
Package 'libnet-patricial-perl' is not installed, so not removed
Package 'pe' is not installed, so not removed

   (.... Plus 65,269 more packages ....)
```

  [1]: https://en.wikipedia.org/wiki/Regular_expression

