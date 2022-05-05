---
layout:       post
title:        >
    Could not find valid key in user session keyring for sig specified in mount option after upgrade from 16.04 to 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1079802
type:         Answer
tags:         upgrade password encryption ecryptfs
created_date: 2018-09-30 19:35:53
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "6,961 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-30-Could-not-find-valid-key-in-user-session-keyring-for-sig-specified-in-mount-option-after-upgrade-from-16.04-to-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

It looks like this bug first reported in Ubuntu 17.10: [ecryptfs-mount-private fails to initialize ecryptfs keys][1]

The error there is like your own:

``` 
[ 1265.695388] Could not find key with description: [<correct key ID>]
[ 1265.695393] process_request_key_err: No key
[ 1265.695394] Could not find valid key in user session keyring for sig specified in mount option: [<correct key ID>]
[ 1265.695395] One or more global auth toks could not properly register; rc = [-2]
[ 1265.695396] Error parsing options; rc = [-2]
```

You should subscribe to the bug report and make sure you mark it affects you too.

Read the messages posted by other users. There are solutions that work for some and not others.

  [1]: https://bugs.launchpad.net/ubuntu/+source/ecryptfs-utils/+bug/1718658
