---
layout:       post
title:        >
    Why is exit code 0 a Success and 1 a Failure
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1040914
type:         Answer
tags:         scripts
created_date: !!str "2018-05-27 14:37:23"
edit_date:    !!str "2018-05-27 16:04:12"
votes:        !!str "6"
favorites:    
views:        !!str "2,853"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
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
