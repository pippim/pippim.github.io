---
layout:       post
title:        >
    Are login passwords saved on the machine or only a hash version of the password?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1491776
type:         Answer
tags:         22.04 password security
created_date: 2023-11-07 00:55:30
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-07-28 15:18:40
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2023/2023-11-07-Are-login-passwords-saved-on-the-machine-or-only-a-hash-version-of-the-password_.md
toc:          false
navigation:   false
clipboard:    false
---

In addition to hashed / salted passwords, some are stored in plain text where no one else can read them.

For example `~/.netrc`:

- `.netrc` file should be located in your home directory and the permissions on the file must be set so that you are the only user who can read it, i.e. it is unreadable to everyone else. It should be set to at least **Read** (`400`), or **Read/Write** (`600`).

For small developers who wish to avoid the complexities of managing passwords with hashing algorithms, the `~/.netrc` methodology can be considered. The methodology is used in SSH to automatically log into remote servers.
