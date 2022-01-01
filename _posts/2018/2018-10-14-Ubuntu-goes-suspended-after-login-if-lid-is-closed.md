---
layout:       post
title:        >
    Ubuntu goes suspended after login if lid is closed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1083730
type:         Answer
tags:         18.04 multiple-monitors suspend power-management laptop
created_date: !!str "2018-10-14 17:47:47"
edit_date:    !!str "2018-10-14 17:54:35"
votes:        !!str "2"
favorites:    
views:        !!str "1,875"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

Edit the file `/etc/systemd/logind.conf`

change the line:

``` 
#HandleLidSwitch=suspend

```

to:

``` 
HandleLidSwitch=ignore

```

Save the file and reboot.


----------

After changes it should match my system:

``` 
$ grep -i lid /etc/systemd/logind.conf
HandleLidSwitch=ignore
#HandleLidSwitchDocked=ignore
#LidSwitchIgnoreInhibited=yes

```

Also check your Ubuntu power settings for what to do when lid is closed. For myself I have to open lid to access power button so the settings there are irrelevant. Since you can access power button with lid closed it may be significant.
