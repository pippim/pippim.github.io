---
layout:       post
title:        >
    Alias to remove folder prefix from `ls` command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/943728
type:         Question
tags:         command-line bash directory alias ls
created_date: 2017-08-07 03:43:20
edit_date:    2017-08-07 03:54:35
votes:        "1 "
favorites:    
views:        "535 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    true
---

Sometimes `ls` will prefix file names with a folder name, other times it will not. The following you can duplicate on your platform:

{% include copyHeader.html %}
``` 
$ ls /var/lib/initramfs-tools
4.10.10-041010-generic  4.4.0-78-generic       4.8.17-040817-generic
4.10.17-041017-generic  4.4.0-89-generic       4.9.0-040900-generic
4.11.12-041112-generic  4.4.33-040433-generic  4.9.21-040921-generic
4.11.3-041103-generic   4.4.8-040408-generic   4.9.40-040940-generic
4.11.9-041109-generic   4.6.3-040603-generic   4.9.8-040908-generic
4.12.0-041200-generic   4.7.5-040705-generic   4.9.9-040909-generic
4.12.4-041204-generic   4.8.12-040812-generic

$ ls /boot/vml*
/boot/vmlinuz-4.10.10-041010-generic  /boot/vmlinuz-4.4.8-040408-generic
/boot/vmlinuz-4.10.17-041017-generic  /boot/vmlinuz-4.6.3-040603-generic
/boot/vmlinuz-4.11.12-041112-generic  /boot/vmlinuz-4.7.5-040705-generic
/boot/vmlinuz-4.11.3-041103-generic   /boot/vmlinuz-4.8.12-040812-generic
/boot/vmlinuz-4.11.9-041109-generic   /boot/vmlinuz-4.8.17-040817-generic
/boot/vmlinuz-4.12.0-041200-generic   /boot/vmlinuz-4.9.0-040900-generic
/boot/vmlinuz-4.12.4-041204-generic   /boot/vmlinuz-4.9.21-040921-generic
/boot/vmlinuz-4.4.0-78-generic        /boot/vmlinuz-4.9.40-040940-generic
/boot/vmlinuz-4.4.0-89-generic        /boot/vmlinuz-4.9.8-040908-generic
/boot/vmlinuz-4.4.33-040433-generic   /boot/vmlinuz-4.9.9-040909-generic

```

I like the format of the first version that doesn't include the directory prefix `initramfs-tools/`. I feel the second version where `boot/` is added as a prefix is redundant.

I found this [Unix & Linux question][1] with a similar request but the answers there are convoluted. 

An alias would be preferable because I already have four `ls` aliases setup in `~/.bashrc`:

``` 
alias ls='ls --color=auto'
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

```

Even if the alias was called `dir` I'd still use it :)

  [1]: https://unix.stackexchange.com/questions/124887/is-it-possible-to-remove-folder-prefix-from-a-ls-command
