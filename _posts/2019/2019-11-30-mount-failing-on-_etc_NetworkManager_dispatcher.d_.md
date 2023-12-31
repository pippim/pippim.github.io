---
layout:       post
title:        >
    mount failing on /etc/NetworkManager/dispatcher.d/
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192781
type:         Answer
tags:         bash network-manager vpn cifs
created_date: 2019-11-30 17:19:46
edit_date:    2019-12-01 13:43:07
votes:        "1 "
favorites:    
views:        "885 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-30-mount-failing-on-_etc_NetworkManager_dispatcher.d_.md
toc:          false
navigation:   false
clipboard:    false
---

One possibility is the mount is occurring too fast so you can try this:



``` bash
#!/bin/bash

INTERFACE="$1"
STATUS="$2"

if [ "$STATUS" = "up" ]; then
        if [ "$INTERFACE" = "vpn0" -o "$INTERFACE" = "cscotun0" ]; then
        sleep 30
        mount /home/eekfonky/homeDrive
        fi
fi
```

However Network Manager might kill a script that takes too long to run so you can spin off a sleeping child and have the parent exit immediately:

``` bash
#!/bin/bash

INTERFACE="$1"
STATUS="$2"

if [ "$STATUS" = "up" ]; then
        if [ "$INTERFACE" = "vpn0" -o "$INTERFACE" = "cscotun0" ]; then
        sleepmount &
        fi
fi
```

Contents of `sleepmount`:

``` bash
#!/bin/bash

sleep 30
mount /home/eekfonky/homeDrive
```

If either scenario works for sleeping 30 seconds then start cutting the sleeping time in half until it breaks again. Then bump up the sleep time from there until it works again.


----------

# Edit: `_netdev` needed in `/etc/fstab`

From [Amazon Elastic File System User Guide][1]:

> ##Automatic Mounting Fails and the Instance Is Unresponsive  
>   
> This issue can occur if the file system was mounted automatically on  
> an instance and the `_netdev` option wasn't declared. If `_netdev` is  
> missing, your EC2 instance might stop responding. This result is  
> because network file systems need to be initialized after the compute  
> instance starts its networking.  
>   
> ###Action to Take  
>   
> If this issue occurs, contact AWS Support.  


  [1]: https://docs.aws.amazon.com/efs/latest/ug/troubleshooting-efs-mounting.html#automount-fails
