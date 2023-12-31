---
layout:       post
title:        >
    WiFi disables after suspending
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180976
type:         Answer
tags:         networking wireless suspend
created_date: 2019-10-15 00:53:48
edit_date:    
votes:        "0 "
favorites:    
views:        "1,961 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-15-WiFi-disables-after-suspending.md
toc:          false
navigation:   false
clipboard:    false
---

The driver isn't mentioned but I'll assume it is `ath10k_pci` like mine. To verify use:



``` bash
$ sudo lshw -c network

  *-network
       description: Wireless interface
       product: QCA6174 802.11ac Wireless Network Adapter
       vendor: Qualcomm Atheros
       physical id: 0
       bus info: pci@0000:3c:00.0
       logical name: wlp60s0
       version: 32
       serial: 9c:b6:d0:10:37:f7
       width: 64 bits
       clock: 33MHz
       capabilities: pm msi pciexpress bus_master cap_list ethernet physical wireless
       configuration: broadcast=yes driver=ath10k_pci driverversion=4.14.140-0414140-generic firmware=WLAN.RM.4.4.1-00079-QCARMSWPZ-1 ip=192.168.0.10 latency=0 link=yes multicast=yes wireless=IEEE 802.11
       resources: irq:137 memory:dd200000-dd3fffff
```

Notice second last line "configuration" reveals `driver=ath10k_pci`. Using this information create the script:

``` bash
sudo -H gedit /lib/systemd/system-sleep/ath10k-reset
```

with these lines:

``` sh
#!/bin/sh

# NAME: /lib/systemd/system-sleep/ath10k-reset
# DESC: Resets  QCA6174 802.11ac WiFi after a long suspend.
# DATE: October 14. 2019.

MYNAME=$0

restart_wifi() {
    /usr/bin/logger $MYNAME 'restart_wifi BEGIN'
    /sbin/modprobe -v -r ath10k_pci
    /sbin/modprobe -v ath10k_pci
#    systemctl restart NetworkManager.service
    /usr/bin/logger 'systemctl restart NetworkManager.service (SUPPRESSED)'
    /usr/bin/logger $MYNAME 'restart_wifi END'
}

/usr/bin/logger $MYNAME 'case=[' ${1}' ]'
case "${1}/${2}" in
    hibernate|suspend|pre*)
      ;;
    resume|thaw|post*)
      restart_wifi;;
esac
```

Save the script and mark it executable with:

``` bash
sudo chmod a+x /lib/systemd/system-sleep/ath10k-reset
```

After the next reboot the script will automatically run during suspend/resume.



