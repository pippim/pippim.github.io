---
layout:       post
title:        >
    I got this error when upgrading from 16.04 to 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1162109
type:         Answer
tags:         18.04 unity gnome upgrade updates
created_date: 2019-07-30 11:05:33
edit_date:    
votes:        "0 "
favorites:    
views:        "977 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-30-I-got-this-error-when-upgrading-from-16.04-to-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I received the same error testing 16.04 to 18.04 upgrade yesterday. This is a relatively vanilla installation of Ubuntu 16.04.6 LTS. A summary appears at the end:

``` 
Errors were encountered while processing:
 unity-settings-daemon
 rhythmbox-plugin-zeitgeist
 unity
 gnome-icon-theme
 ubuntu-session
 hud
 libnautilus-extension1a:amd64
 python3-gdbm:amd64
 python3-reportlab-accel:amd64
 python3-cairo:amd64
 dh-python
 nautilus
 onboard
 python3-renderpm:amd64
 totem-plugins
 unity-tweak-tool

Upgrade complete 
```

The solution is to run `sudo apt install -f` **TWICE**. The first time fixes some errors, the second time fixes the rest of them.

Possibly related this morning I fixed an error I noticed during the upgrade and ran the answer here on the live 16.04.6 system:

- [how I can fix &quot;AppStream cache update completed, but some metadata was ignored due to errors.&quot;?&quot;](how I can fix &quot;AppStream cache update completed, but some metadata was ignored due to errors.&quot;?&quot;)

**Note:** There are other issues so I'll likely run the upgrade again on a clone using this script:

- [Backup/clone live to a new partition which can be booted]({% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %})

I encourage everyone to run the upgrade on a Ubuntu clone to work out all the bugs.
