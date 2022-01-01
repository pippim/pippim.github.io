---
layout:       post
title:        >
    My wifi cuts out after awhile
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035412
type:         Answer
tags:         networking wireless 18.04 connection
created_date: 2018-05-12 18:02:46
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "749 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

Turn off or enable power savings as illustrated below:

``` 
$ cat /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
[connection]
wifi.powersave = 3
# Slow sleep fix: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1670041
#wifi.powersave = 2

```

- Edit the Network Manager file shown above.
- Change `WiFi.powersave` from `2` to `3`.
- If it's already set to `3` try setting it to `2`.
- After saving the file run `sudo systemctl restart NetworkManager`

### What the values represent?

-  NM_SETTING_WIRELESS_POWERSAVE_DISABLE (2): disable powersave
-  NM_SETTING_WIRELESS_POWERSAVE_ENABLE (3): enable powersave

[Source][1]


----------

### Intel specific answer

From this [answer][2] you can try:

You can fix it by running in terminal

``` 
sudo tee /etc/modprobe.d/iwlwifi-opt.conf <<< "options iwlwifi 11n_disable=1"

```

then reboot.

You can revert it by `sudo rm /etc/modprobe.d/iwlwifi-opt.conf`.

To keep the 802.11n, you can try the `11n_disable=8` option.


----------

From this [Q&A][3] you can try:

``` 
sudo modprobe -r iwlwifi
sudo modprobe iwlwifi

```

If this works for the current session, it can be setup to run automatically on startup.


  [1]: https://gist.github.com/jcberthon/ea8cfe278998968ba7c5a95344bc8b55
  [2]: https://askubuntu.com/a/663328/307523
  [3]: https://forums.bunsenlabs.org/viewtopic.php?id=1289
