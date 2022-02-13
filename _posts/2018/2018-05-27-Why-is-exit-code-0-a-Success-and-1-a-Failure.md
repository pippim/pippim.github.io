---
layout:       post
title:        >
    Why is exit code 0 a Success and 1 a Failure
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1040914
type:         Answer
tags:         scripts
created_date: 2018-05-27 14:37:23
edit_date:    2018-05-27 16:04:12
votes:        "6 "
favorites:    
views:        "2,945 "
accepted:     Accepted
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-27-Why-is-exit-code-0-a-Success-and-1-a-Failure.md
toc:          false
navigation:   false
clipboard:    false
---

There can be many reasons for an error and a parent process will often know what specifically went wrong with a child process. As such 0 is used for success and 1 to 255 provides flexibility for failure reason(s).

For example a child process could return:

- `1` File not found
- `2` User not authorized
- `3` File locked by another process
- `4` Connection not active
- `5` Configuration incomplete
- `6` Process cancelled by user

etc, etc.
