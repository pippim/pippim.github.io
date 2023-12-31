---
layout:       post
title:        >
    Manipulating a continuously changing command output stream
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1194738
type:         Answer
tags:         command-line bash rsync sed
created_date: 2019-12-08 16:55:10
edit_date:    
votes:        "0 "
favorites:    
views:        "132 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-08-Manipulating-a-continuously-changing-command-output-stream.md
toc:          false
navigation:   false
clipboard:    false
---

Another answer might provide a better way:

- [How can I view a progress bar when running rsync?](How can I view a progress bar when running rsync?)

rsync has a `--info` option that can be used to not only output the current progress, but also the transfer rate and elapsed time:

``` 
--info=FLAGS            fine-grained informational verbosity
```

The explanation of how to use it comes under the `-P` option in the man page:

``` 
-P     The -P option is equivalent to --partial --progress.  Its purpose is to
       make it much easier to specify these two options for a long transfer that
       may be interrupted.

       There is also a --info=progress2 option that outputs statistics based on
       the whole transfer, rather than individual files.  Use this flag
       without  out‐putting  a  filename  (e.g. avoid -v or specify --info=name0)
       if you want to see how the transfer is doing without scrolling the screen 
       with  a  lot  of names.   (You  don’t  need  to specify the --progress
       option in order to use --info=progress2.)
```

So trying using:

``` 
rsync -zvh --info=progress2 --info=name0 ubuntu-19.10-desktop-amd64.iso /home/lnxusr/Downloads/
```

**Notes:**

- This gives the progress of the entire transfer, not for individual filenames.
- I do not have your source file nor target directory to test on my system.
