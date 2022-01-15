---
layout:       post
title:        >
    Suspend temporarily linux update apt for the session until reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1178114
type:         Answer
tags:         command-line apt scripts
created_date: 2019-10-02 11:16:53
edit_date:    
votes:        "1 "
favorites:    
views:        "56 "
accepted:     Accepted
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-02-Suspend-temporarily-linux-update-apt-for-the-session-until-reboot.md
toc:          false
navigation:   false
clipboard:    false
---

You can run a command based on this answer:

- [How to disable `apt-daily.service` on Ubuntu cloud VM image?][1]

Create a script:

``` 
#!/bin/bash

systemctl stop apt-daily.service
systemctl kill --kill-who=all apt-daily.service

# wait until `apt-get updated` has been killed
while ! (systemctl list-units --all apt-daily.service | egrep -q '(dead|failed)')
do
  sleep 1;
done

# now proceed
echo Apt Daily Service has been killed

```

Mark the script as executable in order to call the command:

``` 
sudo chmod /path/to/my_script.sh

```

You need sudo powers to call the command:

``` 
sudo /path/to/my_script.sh

```

When you are away from the hotspot and back to your regular network reboot to reinstate apt services or type:

``` 
sudo systemctl start apt-daily.service

```

Of course you can forgo the fancy script altogether and stop services with:

``` 
sudo systemctl stop apt-daily.service

```

  [1]: https://unix.stackexchange.com/questions/315502/how-to-disable-apt-daily-service-on-ubuntu-cloud-vm-image
