---
layout:       post
title:        >
    Considerations for using `∕tmp` directory on multi-user systems
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/882608
type:         Question
tags:         bash directory tmp multi-user single-user
created_date: 2017-02-12 16:45:03
edit_date:    
votes:        "4 "
favorites:    
views:        "376 "
accepted:     Accepted
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

As I've been learning more about Ubuntu and bash programming I've been storing variables in `/tmp`. For example in-between calls to the same bash script I want to record the previous state.

On my current single user system there is no danger of conflicts in `/tmp` directory. However I want my code to be future-proof and wonder if I should get in the habit of using a directory called `~/tmp`?

Perhaps it should be `~/.tmp` and hidden. Perhaps it should be `~/temp` so as not to be confused with conventional `/tmp` directory.

Any ideas / suggestions are appreciated. Thank you.
