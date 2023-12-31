---
layout:       post
title:        >
    Trouble with Wake-On-Lan (Ubuntu 16.04)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189646
type:         Answer
tags:         16.04 networking lan
created_date: 2019-11-18 00:26:46
edit_date:    
votes:        "0 "
favorites:    
views:        "1,473 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-18-Trouble-with-Wake-On-Lan-_Ubuntu-16.04_.md
toc:          false
navigation:   false
clipboard:    false
---

The Arch Linux bible on WOL has many chapters. Making settings persistant is often overlooked in **Ask Ubuntu** answers:

[systemd.link][1]


``` 
/etc/systemd/network/50-wired.link

[Match]
MACAddress=aa:bb:cc:dd:ee:ff

[Link]
NamePolicy=kernel database onboard slot path
MACAddressPolicy=persistent
WakeOnLan=magic
```

[systemd service][2]

``` 
/etc/systemd/system/wol@.service

[Unit]
Description=Wake-on-LAN for %i
Requires=network.target
After=network.target

[Service]
ExecStart=/usr/bin/ethtool -s %i wol g
Type=oneshot

[Install]
WantedBy=multi-user.target
```

[udev][3]

``` 
/etc/udev/rules.d/81-wol.rules

ACTION=="add", SUBSYSTEM=="net", NAME=="enp*", RUN+="/usr/bin/ethtool -s $name wol g"
```

[cron][4]

``` 
@reboot /usr/bin/ethtool -s interface wol g
```

## [TLP can disable WOL by default][5]

When using TLP for suspend/hibernate, the `WOL_DISABLE` setting should be set to `N` in `/etc/default/tlp` to allow resuming the computer with WoL. 

  [1]: https://wiki.archlinux.org/index.php/Wake-on-LAN#systemd.link
  [2]: https://wiki.archlinux.org/index.php/Wake-on-LAN#systemd_service
  [3]: https://wiki.archlinux.org/index.php/Wake-on-LAN#udev
  [4]: https://wiki.archlinux.org/index.php/Wake-on-LAN#cron
  [5]: https://wiki.archlinux.org/index.php/Wake-on-LAN#Enable_WoL_in_TLP
