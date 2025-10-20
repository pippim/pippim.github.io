---
layout:       post
title:        >
    How can I find only the executable files under a certain directory in Linux?
site:         Super User
stack_url:    https://superuser.com/q/1445393
type:         Answer
tags:         linux command-line bash find
created_date: 2019-06-06 00:08:27
edit_date:    
votes:        "2 "
favorites:    
views:        "322,406 "
accepted:     
uploaded:     2025-10-19 18:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-06-How-can-I-find-only-the-executable-files-under-a-certain-directory-in-Linux_.md
toc:          false
navigation:   false
clipboard:    false
---

I created a function in `~/.bashrc` tonight to find executable files not in the system path and not directories:



``` bash
# Quickly locate executables not in the path
xlocate () {
    locate -0r "$1" | xargs -0 -I{} bash -c '[[ -x "$1" ]] && [[ ! -d "$1" ]] \
        &&  echo "executable: $1"'  _  {}
} # xlocate ()
```

The advantage is it will search three Linux distros and a Windows installation in under a second where the `find` command takes 15 minutes.

For example:

``` bash
$ time xlocate llocate
executable: /bin/ntfsfallocate
executable: /home/rick/restore/mnt/e/bin/llocate
executable: /mnt/clone/bin/ntfsfallocate
executable: /mnt/clone/home/rick/restore/mnt/e/bin/llocate
executable: /mnt/clone/usr/bin/fallocate
executable: /mnt/e/bin/llocate
executable: /mnt/old/bin/ntfsfallocate
executable: /mnt/old/usr/bin/fallocate
executable: /usr/bin/fallocate

real	0m0.504s
user	0m0.487s
sys 	0m0.018s
```

Or for a whole directory and all it's subs:

``` bash
$ time xlocate /mnt/e/usr/local/bin/ | wc -l
65

real	0m0.741s
user	0m0.705s
sys 	0m0.032s
```

