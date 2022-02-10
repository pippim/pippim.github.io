---
layout:       post
title:        >
    Kernel suspends too quickly, upon resume continues suspend tasks
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/828486
type:         Question
tags:         16.04 kernel suspend systemd-logind
created_date: 2016-09-23 01:31:11
edit_date:    2019-06-29 16:20:32
votes:        "11 "
favorites:    5
views:        "4,447 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-23-Kernel-suspends-too-quickly_-upon-resume-continues-suspend-tasks.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Jun 29/2019 Update

From deleted answer below (poster didn't have enough reputation points to post a comment), a bug report was filed in **Kernel.org Bugzilla**:

- [Bug 203791 - s2idle is happening before user space processes are frozen](https://bugzilla.kernel.org/show_bug.cgi?id=203791)

Another bug report was filed in **Launchpad**:

- [Battery drain during sleep. System suspended before kernel suspends all tasks](https://bugs.launchpad.net/ubuntu/+source/linux-signed-hwe/+bug/1825636)


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Oct 21/2018 Update

The problem is still here and no matter how much research I've done (mostly repeating previous research) a solution is no closer. Another user reported the same problem today: [Sleep mode drains battery very fast]({% post_url /2018/2018-10-21-Sleep-mode-drains-battery-very-fast %})

In a nutshell you can see my `journalctl -xe` log:

``` 
Oct 21 16:12:28 alien kernel: PM: Syncing filesystems ... done.
Oct 21 16:12:28 alien kernel: PM: Preparing system for sleep (mem)
Oct 21 16:12:29 alien whoopsie[1129]: [16:12:29] Cannot reach: https://daisy.ubuntu.com
Oct 21 16:12:29 alien whoopsie[1129]: [16:12:29] Cannot reach: https://daisy.ubuntu.com
Oct 21 16:12:29 alien nm-dispatcher[14659]: req:2 'down' [enp59s0]: start running ordered scripts...
Oct 21 16:13:14 alien kernel: Freezing user space processes ... (elapsed 0.002 seconds) done.
```

- At `16:12:28` system begins to suspend.
- At `16:13:14` system is resumed but suspend continues by freezing tasks


----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Feb 25/2018 Update

When this question was originally posted I had a laptop that was upgraded from 14.04 to 16.04. Since then I have a new laptop with a 16.04 fresh install. The issue still remains though:

{% include copyHeader.html %}
``` 
    (... Feb 24/2018 laptop lid closed system suspends ...)
Feb 24 23:20:39 alien systemd[1]: Starting TLP suspend/resume...
Feb 24 23:20:39 alien systemd[1]: Started TLP suspend/resume.
Feb 24 23:20:39 alien systemd[1]: Reached target Sleep.
Feb 24 23:20:39 alien systemd[1]: Starting Suspend...
Feb 24 23:20:39 alien systemd-sleep[9105]: /lib/systemd/system-sleep/sound: Going to suspend...
Feb 24 23:20:39 alien systemd-sleep[9105]: /lib/systemd/system-sleep/display-auto-brightness: Going to suspend...
Feb 24 23:20:39 alien systemd-sleep[9105]: Failed to connect to non-global ctrl_ifname: (nil)  error: No such file or directory
Feb 24 23:20:39 alien systemd-sleep[9106]: /lib/systemd/system-sleep/wpasupplicant failed with error code 255.
Feb 24 23:20:39 alien root: /lib/systemd/system-sleep/r8169-reset case=[ pre ]
Feb 24 23:20:40 alien systemd-sleep[9105]: Suspending system...
Feb 24 23:20:40 alien kernel: [32114.051624] PM: suspend entry (deep)
    (... Feb 25/2018 laptop lid open system resumes and immediately sleeps ...)
Feb 25 07:40:14 alien kernel: [32114.051627] PM: Syncing filesystems ... done.
Feb 25 07:40:14 alien kernel: [32114.071584] Freezing user space processes ... (elapsed 0.001 seconds) done.
Feb 25 07:40:14 alien kernel: [32114.073493] OOM killer disabled.
Feb 25 07:40:14 alien kernel: [32114.073494] Freezing remaining freezable tasks ... (elapsed 0.001 seconds) done.
Feb 25 07:40:14 alien kernel: [32114.074945] Suspending console(s) (use no_console_suspend to debug)
Feb 25 07:40:14 alien kernel: [32114.075534] sd 2:0:0:0: [sdb] Synchronizing SCSI cache
Feb 25 07:40:14 alien kernel: [32114.076006] sd 1:0:0:0: [sda] Synchronizing SCSI cache
Feb 25 07:40:14 alien kernel: [32114.076471] sd 1:0:0:0: [sda] Stopping disk
Feb 25 07:40:14 alien kernel: [32116.375342] ACPI: Preparing to enter system sleep state S3
Feb 25 07:40:14 alien kernel: [32116.376678] ACPI: EC: event blocked
Feb 25 07:40:14 alien kernel: [32116.376679] ACPI: EC: EC stopped
Feb 25 07:40:14 alien kernel: [32116.376680] PM: Saving platform NVS memory
Feb 25 07:40:14 alien kernel: [32116.376821] Disabling non-boot CPUs ...
Feb 25 07:40:14 alien kernel: [32116.394624] smpboot: CPU 1 is now offline
Feb 25 07:40:14 alien kernel: [32116.413577] IRQ 137: no longer affine to CPU2
Feb 25 07:40:14 alien kernel: [32116.414597] smpboot: CPU 2 is now offline
Feb 25 07:40:14 alien kernel: [32116.437543] IRQ 127: no longer affine to CPU3
Feb 25 07:40:14 alien kernel: [32116.438566] smpboot: CPU 3 is now offline
Feb 25 07:40:14 alien kernel: [32116.461504] IRQ 122: no longer affine to CPU4
Feb 25 07:40:14 alien kernel: [32116.461511] IRQ 124: no longer affine to CPU4
Feb 25 07:40:14 alien kernel: [32116.463298] smpboot: CPU 4 is now offline
Feb 25 07:40:14 alien kernel: [32116.486420] smpboot: CPU 5 is now offline
Feb 25 07:40:14 alien kernel: [32116.509384] IRQ 123: no longer affine to CPU6
Feb 25 07:40:14 alien kernel: [32116.510409] smpboot: CPU 6 is now offline
Feb 25 07:40:14 alien kernel: [32116.533331] IRQ 1: no longer affine to CPU7
Feb 25 07:40:14 alien kernel: [32116.533337] IRQ 8: no longer affine to CPU7
Feb 25 07:40:14 alien kernel: [32116.533341] IRQ 9: no longer affine to CPU7
Feb 25 07:40:14 alien kernel: [32116.533345] IRQ 12: no longer affine to CPU7
Feb 25 07:40:14 alien kernel: [32116.534378] smpboot: CPU 7 is now offline
    (... Feb 25/2018 suspend started last night now complete, system resumes ...)

Feb 25 07:40:14 alien kernel: [32116.537314] ACPI: Low-level resume complete
Feb 25 07:40:14 alien kernel: [32116.537405] ACPI: EC: EC started
Feb 25 07:40:14 alien kernel: [32116.537406] PM: Restoring platform NVS memory
Feb 25 07:40:14 alien kernel: [32116.538161] Enabling non-boot CPUs ...
Feb 25 07:40:14 alien kernel: [32116.538217] x86: Booting SMP configuration:
Feb 25 07:40:14 alien kernel: [32116.538218] smpboot: Booting Node 0 Processor 1 APIC 0x2
Feb 25 07:40:14 alien kernel: [32116.539597]  cache: parent cpu1 should not be sleeping
Feb 25 07:40:14 alien kernel: [32116.539750] CPU1 is up
Feb 25 07:40:14 alien kernel: [32116.539773] smpboot: Booting Node 0 Processor 2 APIC 0x4
Feb 25 07:40:14 alien kernel: [32116.541154]  cache: parent cpu2 should not be sleeping
Feb 25 07:40:14 alien kernel: [32116.541312] CPU2 is up
    (... SNIP ....)
Feb 25 07:40:15 alien systemd[1]: Started Daily apt upgrade and clean activities.
Feb 25 07:40:16 alien systemd[1]: Started Suspend.
Feb 25 07:40:16 alien systemd[1]: sleep.target: Unit not needed anymore. Stopping.
Feb 25 07:40:16 alien systemd[1]: Stopped target Sleep.
Feb 25 07:40:16 alien systemd[1]: tlp-sleep.service: Unit not needed anymore. Stopping.
Feb 25 07:40:16 alien systemd[1]: Stopping TLP suspend/resume...
Feb 25 07:40:16 alien systemd[1]: Reached target Suspend.
Feb 25 07:40:16 alien systemd[1]: suspend.target: Unit is bound to inactive unit systemd-suspend.service. Stopping, too.
Feb 25 07:40:16 alien systemd[1]: Stopped target Suspend.
Feb 25 07:40:16 alien systemd[1]: Started Run anacron jobs at resume.
Feb 25 07:40:16 alien NetworkManager[904]: <info>  [1519569616.5268] manager: wake requested (sleeping: yes  enabled: yes)
Feb 25 07:40:16 alien NetworkManager[904]: <info>  [1519569616.5268] manager: waking up...
Feb 25 07:40:16 alien NetworkManager[904]: <info>  [1519569616.5269] device (enp59s0): state change: unmanaged -> unavailable (reason 'managed') [10 20 2]
Feb 25 07:40:16 alien NetworkManager[904]: <info>  [1519569616.5283] device (wlp60s0): state change: unmanaged -> unavailable (reason 'managed') [10 20 2]
Feb 25 07:40:16 alien kernel: [32122.065301] IPv6: ADDRCONF(NETDEV_UP): enp59s0: link is not ready
Feb 25 07:40:16 alien kernel: [32122.065783] IPv6: ADDRCONF(NETDEV_UP): enp59s0: link is not ready
Feb 25 07:40:16 alien kernel: [32122.066900] alx 0000:3b:00.0 enp59s0: NIC Up: 1 Gbps Full
Feb 25 07:40:16 alien kernel: [32122.067126] IPv6: ADDRCONF(NETDEV_CHANGE): enp59s0: link becomes ready
Feb 25 07:40:16 alien kernel: [32122.067303] IPv6: ADDRCONF(NETDEV_UP): wlp60s0: link is not ready
Feb 25 07:40:16 alien systemd[1]: Started Run anacron jobs.
Feb 25 07:40:16 alien anacron[9772]: Anacron 2.3 started on 2018-02-25
Feb 25 07:40:16 alien anacron[9772]: Will run job `cron.daily' in 5 min.
Feb 25 07:40:16 alien anacron[9772]: Will run job `cron.weekly' in 10 min.
```

Notice how the system is suspended Feb 24 at 11:30pm then resumed on Feb 25 at 7:40 am. Upon resuming the system immediately goes to "sleep" and then "wakes up".


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Background

**NOTE:** In Ubuntu 16.04 power settings lid close is set to "Suspend" for both battery and Plugged In. 

Within `/etc/systemd/logind.conf` the defaults of "ignore" were changed to `HandleLidSwitch=suspend` and `HandleLidSwitchDocked=suspend`. The reason being an HDMI external TV is connected and if any of these options (or Ubuntu power settings) are set to "ignore" or "do nothing" the system keeps running when lid closed but TV goes blank. Under Ubuntu 14.04 (with no systemd) suspending when lid closed worked as expected.

There has been lots of historical tinkering of acpi-events, pm-utils, gnome-??? and possibly dbus-???. Also experimenting with various suspend methods of freeze and memory.

I honestly can't recall all the different things tried but it seems like I've searched for everything under the sun.

## Relevant contents of /var/log/syslog

Looking at `/var/log/syslog` at 5:05am the system was suspended (by systemd?). At 4:46pm (16:46) systemd resumed but then kernel put laptop to sleep and immediate wakeup. There are lots of weird messages such as "**parent CPU should not be sleeping**".

My concern is other things are starting to break 6 months after this question was originally posted in October 2016. For example, ethernet isn't reconnecting upon waking from suspend and wifi takes over. I've downgraded r8169 driver to r8168 but that hasn't helped things. I've setup network restart but that hasn't helped things, indeed sometimes DNS gets lost.

Here's relevant `/var/log/syslog`:

{% include copyHeader.html %}
``` 
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8097] manager: sleep requested (sleeping: no  enabled: yes)
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8098] manager: sleeping...
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8100] device (18:4F:32:8D:AA:98): state change: disconnected -> unmanaged (reason 'sleeping') [30 10 37]
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8104] manager: NetworkManager state is now ASLEEP
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8110] device (wlan0): state change: activated -> deactivating (reason 'sleeping') [100 110 37]
Apr 11 05:05:47 dell whoopsie[1081]: [05:05:47] offline
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8159] device (eth0): state change: activated -> deactivating (reason 'sleeping') [100 110 37]
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8236] device (wlan0): state change: deactivating -> disconnected (reason 'sleeping') [110 30 37]
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for 2001:56a:f114:bf00:9466:976d:8bf9:9cc2 on wlan0.
Apr 11 05:05:47 dell avahi-daemon[1169]: Leaving mDNS multicast group on interface wlan0.IPv6 with address 2001:56a:f114:bf00:9466:976d:8bf9:9cc2.
Apr 11 05:05:47 dell avahi-daemon[1169]: Joining mDNS multicast group on interface wlan0.IPv6 with address fe80::6d92:f19f:f5c3:f173.
Apr 11 05:05:47 dell avahi-daemon[1169]: Registering new address record for fe80::6d92:f19f:f5c3:f173 on wlan0.*.
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for fe80::6d92:f19f:f5c3:f173 on wlan0.
Apr 11 05:05:47 dell gnome-session[2394]: (deja-dup-monitor:11605): GLib-CRITICAL **: Source ID 957 was not found when attempting to remove it
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8266] dhcp4 (wlan0): canceled DHCP transaction, DHCP client pid 21469
Apr 11 05:05:47 dell avahi-daemon[1169]: Leaving mDNS multicast group on interface wlan0.IPv6 with address fe80::6d92:f19f:f5c3:f173.
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8267] dhcp4 (wlan0): state changed bound -> done
Apr 11 05:05:47 dell avahi-daemon[1169]: Interface wlan0.IPv6 no longer relevant for mDNS.
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8273] dhcp6 (wlan0): canceled DHCP transaction
Apr 11 05:05:47 dell kernel: [17371.316039] wlan0: deauthenticating from 70:f1:96:42:5f:02 by local choice (Reason: 3=DEAUTH_LEAVING)
Apr 11 05:05:47 dell wpa_supplicant[1631]: wlan0: CTRL-EVENT-DISCONNECTED bssid=70:f1:96:42:5f:02 reason=3 locally_generated=1
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for 192.168.1.68 on wlan0.
Apr 11 05:05:47 dell avahi-daemon[1169]: Leaving mDNS multicast group on interface wlan0.IPv4 with address 192.168.1.68.
Apr 11 05:05:47 dell avahi-daemon[1169]: Interface wlan0.IPv4 no longer relevant for mDNS.
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8572] dns-mgr: Writing DNS information to /sbin/resolvconf
Apr 11 05:05:47 dell dnsmasq[21738]: setting upstream servers from DBus
Apr 11 05:05:47 dell dnsmasq[21738]: using nameserver 2001:568:ff09:10c::53#53(via eth0)
Apr 11 05:05:47 dell dnsmasq[21738]: using nameserver 2001:568:ff09:10b::122#53(via eth0)
Apr 11 05:05:47 dell dnsmasq[21738]: using nameserver 2001:568:ff09:10c::53#53(via wlan0)
Apr 11 05:05:47 dell dnsmasq[21738]: using nameserver 2001:568:ff09:10b::122#53(via wlan0)
Apr 11 05:05:47 dell wpa_supplicant[1631]: wlan0: CTRL-EVENT-REGDOM-CHANGE init=CORE type=WORLD
Apr 11 05:05:47 dell kernel: [17371.351376] cfg80211: World regulatory domain updated:
Apr 11 05:05:47 dell kernel: [17371.351381] cfg80211:  DFS Master region: unset
Apr 11 05:05:47 dell kernel: [17371.351383] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
Apr 11 05:05:47 dell kernel: [17371.351388] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
Apr 11 05:05:47 dell kernel: [17371.351391] cfg80211:   (2457000 KHz - 2482000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
Apr 11 05:05:47 dell kernel: [17371.351394] cfg80211:   (2474000 KHz - 2494000 KHz @ 20000 KHz), (N/A, 2000 mBm), (N/A)
Apr 11 05:05:47 dell kernel: [17371.351398] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz, 160000 KHz AUTO), (N/A, 2000 mBm), (N/A)
Apr 11 05:05:47 dell kernel: [17371.351402] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz, 160000 KHz AUTO), (N/A, 2000 mBm), (0 s)
Apr 11 05:05:47 dell kernel: [17371.351406] cfg80211:   (5490000 KHz - 5730000 KHz @ 160000 KHz), (N/A, 2000 mBm), (0 s)
Apr 11 05:05:47 dell kernel: [17371.351409] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 2000 mBm), (N/A)
Apr 11 05:05:47 dell kernel: [17371.351413] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 0 mBm), (N/A)
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.8990] dns-mgr: Writing DNS information to /sbin/resolvconf
Apr 11 05:05:47 dell dnsmasq[21738]: setting upstream servers from DBus
Apr 11 05:05:47 dell dnsmasq[21738]: using nameserver 2001:568:ff09:10c::53#53(via eth0)
Apr 11 05:05:47 dell dnsmasq[21738]: using nameserver 2001:568:ff09:10b::122#53(via eth0)
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.9082] device (eth0): state change: deactivating -> disconnected (reason 'sleeping') [110 30 37]
Apr 11 05:05:47 dell dbus[1234]: [system] Activating via systemd: service name='org.freedesktop.nm_dispatcher' unit='dbus-org.freedesktop.nm-dispatcher.service'
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for 2001:56a:f114:bf00:1513:4a3e:2ff6:2764 on eth0.
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for 2001:56a:f114:bf00:1baa:569:8a37:6121 on eth0.
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.9130] dns-mgr: Writing DNS information to /sbin/resolvconf
Apr 11 05:05:47 dell avahi-daemon[1169]: Registering new address record for 2001:56a:f114:bf00:9e2a:fb78:b1f:606 on eth0.*.
Apr 11 05:05:47 dell NetworkManager[21298]: <warn>  [1491908747.9273] sup-iface[0x275ac00,wlan0]: connection disconnected (reason -3)
Apr 11 05:05:47 dell avahi-daemon[1169]: Registering new address record for fe80::44a5:819f:4f44:182d on eth0.*.
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.9274] device (wlan0): supplicant interface state: completed -> disconnected
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for 2001:56a:f114:bf00:9e2a:fb78:b1f:606 on eth0.
Apr 11 05:05:47 dell systemd[1]: Starting Network Manager Script Dispatcher Service...
Apr 11 05:05:47 dell avahi-daemon[1169]: Leaving mDNS multicast group on interface eth0.IPv6 with address 2001:56a:f114:bf00:9e2a:fb78:b1f:606.
Apr 11 05:05:47 dell avahi-daemon[1169]: Joining mDNS multicast group on interface eth0.IPv6 with address fe80::44a5:819f:4f44:182d.
Apr 11 05:05:47 dell avahi-daemon[1169]: Withdrawing address record for fe80::44a5:819f:4f44:182d on eth0.
Apr 11 05:05:47 dell avahi-daemon[1169]: Leaving mDNS multicast group on interface eth0.IPv6 with address fe80::44a5:819f:4f44:182d.
Apr 11 05:05:47 dell avahi-daemon[1169]: Interface eth0.IPv6 no longer relevant for mDNS.
Apr 11 05:05:47 dell dnsmasq[21738]: setting upstream servers from DBus
Apr 11 05:05:47 dell dbus[1234]: [system] Successfully activated service 'org.freedesktop.nm_dispatcher'
Apr 11 05:05:47 dell nm-dispatcher: req:1 'down' [wlan0]: new request (2 scripts)
Apr 11 05:05:47 dell nm-dispatcher: req:1 'down' [wlan0]: start running ordered scripts...
Apr 11 05:05:47 dell systemd[1]: Started Network Manager Script Dispatcher Service.
Apr 11 05:05:47 dell nm-dispatcher: req:2 'down' [eth0]: new request (2 scripts)
Apr 11 05:05:47 dell NetworkManager[21298]: <info>  [1491908747.9503] device (wlan0): state change: disconnected -> unmanaged (reason 'sleeping') [30 10 37]
Apr 11 05:05:48 dell rtkit-daemon[1815]: Supervising 1 threads of 1 processes of 1 users.
Apr 11 05:05:48 dell rtkit-daemon[1815]: Successfully made thread 6828 of process 2517 (n/a) owned by '1000' RT at priority 5.
Apr 11 05:05:48 dell rtkit-daemon[1815]: Supervising 2 threads of 1 processes of 1 users.
Apr 11 05:05:48 dell NetworkManager[21298]: <info>  [1491908748.4032] device (eth0): state change: disconnected -> unmanaged (reason 'sleeping') [30 10 37]
Apr 11 05:05:48 dell wpa_supplicant[1631]: nl80211: deinit ifname=wlan0 disabled_11b_rates=0
Apr 11 05:05:48 dell NetworkManager[21298]: <info>  [1491908748.4417] device (eth0): link disconnected
Apr 11 05:05:48 dell systemd[1]: Starting TLP suspend/resume...
Apr 11 05:05:48 dell nm-dispatcher: req:2 'down' [eth0]: start running ordered scripts...
Apr 11 05:05:48 dell systemd[1]: Started TLP suspend/resume.
Apr 11 05:05:48 dell systemd[1]: Reached target Sleep.
Apr 11 05:05:48 dell systemd[1]: Starting Suspend...
Apr 11 05:05:48 dell systemd-sleep[7020]: /lib/systemd/system-sleep/sound: Going to suspend...
Apr 11 05:05:48 dell systemd-sleep[7020]: Failed to connect to non-global ctrl_ifname: (nil)  error: No such file or directory
Apr 11 05:05:48 dell systemd-sleep[7022]: /lib/systemd/system-sleep/wpasupplicant failed with error code 255.
Apr 11 05:05:49 dell systemd-sleep[7020]: Suspending system...
Apr 11 16:46:51 dell kernel: [17373.370197] PM: Syncing filesystems ... done.
Apr 11 16:46:51 dell kernel: [17373.391541] PM: Preparing system for sleep (mem)
Apr 11 16:46:51 dell kernel: [17373.391987] Freezing user space processes ... (elapsed 0.003 seconds) done.
Apr 11 16:46:51 dell kernel: [17373.395058] Freezing remaining freezable tasks ... (elapsed 0.001 seconds) done.
Apr 11 16:46:51 dell kernel: [17373.396500] PM: Suspending system (mem)
Apr 11 16:46:51 dell kernel: [17373.396521] Suspending console(s) (use no_console_suspend to debug)
Apr 11 16:46:51 dell kernel: [17373.398621] sd 2:0:0:0: [sdc] Synchronizing SCSI cache
Apr 11 16:46:51 dell kernel: [17373.398748] sd 1:0:0:0: [sdb] Synchronizing SCSI cache
Apr 11 16:46:51 dell kernel: [17373.398842] sd 0:0:0:0: [sda] Synchronizing SCSI cache
Apr 11 16:46:51 dell kernel: [17373.398999] sd 1:0:0:0: [sdb] Stopping disk
Apr 11 16:46:51 dell kernel: [17373.399653] sd 0:0:0:0: [sda] Stopping disk
Apr 11 16:46:51 dell kernel: [17373.400760] sd 2:0:0:0: [sdc] Stopping disk
Apr 11 16:46:51 dell kernel: [17373.782939] PM: suspend of devices complete after 386.188 msecs
Apr 11 16:46:51 dell kernel: [17373.798944] PM: late suspend of devices complete after 15.999 msecs
Apr 11 16:46:51 dell kernel: [17373.800622] ehci-pci 0000:00:1d.0: System wakeup enabled by ACPI
Apr 11 16:46:51 dell kernel: [17373.800930] ehci-pci 0000:00:1a.0: System wakeup enabled by ACPI
Apr 11 16:46:51 dell kernel: [17373.800980] xhci_hcd 0000:00:14.0: System wakeup enabled by ACPI
Apr 11 16:46:51 dell kernel: [17373.815056] PM: noirq suspend of devices complete after 16.108 msecs
Apr 11 16:46:51 dell kernel: [17373.815505] ACPI: Preparing to enter system sleep state S3
Apr 11 16:46:51 dell kernel: [17373.827032] ACPI : EC: EC stopped
Apr 11 16:46:51 dell kernel: [17373.827033] PM: Saving platform NVS memory
Apr 11 16:46:51 dell kernel: [17373.827039] Disabling non-boot CPUs ...
Apr 11 16:46:51 dell kernel: [17373.827534] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.828570] smpboot: CPU 1 is now offline
Apr 11 16:46:51 dell kernel: [17373.839988] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.839993] Broke affinity for irq 30
Apr 11 16:46:51 dell kernel: [17373.841017] smpboot: CPU 2 is now offline
Apr 11 16:46:51 dell kernel: [17373.851875] Broke affinity for irq 16
Apr 11 16:46:51 dell kernel: [17373.851879] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.851882] Broke affinity for irq 30
Apr 11 16:46:51 dell kernel: [17373.852900] smpboot: CPU 3 is now offline
Apr 11 16:46:51 dell kernel: [17373.863836] Broke affinity for irq 16
Apr 11 16:46:51 dell kernel: [17373.863841] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.863845] Broke affinity for irq 30
Apr 11 16:46:51 dell kernel: [17373.864873] smpboot: CPU 4 is now offline
Apr 11 16:46:51 dell kernel: [17373.875982] Broke affinity for irq 16
Apr 11 16:46:51 dell kernel: [17373.875987] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.875990] Broke affinity for irq 30
Apr 11 16:46:51 dell kernel: [17373.877020] smpboot: CPU 5 is now offline
Apr 11 16:46:51 dell kernel: [17373.891692] Broke affinity for irq 16
Apr 11 16:46:51 dell kernel: [17373.891700] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.891707] Broke affinity for irq 27
Apr 11 16:46:51 dell kernel: [17373.891710] Broke affinity for irq 30
Apr 11 16:46:51 dell kernel: [17373.892762] smpboot: CPU 6 is now offline
Apr 11 16:46:51 dell kernel: [17373.907749] Broke affinity for irq 1
Apr 11 16:46:51 dell kernel: [17373.907759] Broke affinity for irq 9
Apr 11 16:46:51 dell kernel: [17373.907764] Broke affinity for irq 12
Apr 11 16:46:51 dell kernel: [17373.907769] Broke affinity for irq 16
Apr 11 16:46:51 dell kernel: [17373.907774] Broke affinity for irq 23
Apr 11 16:46:51 dell kernel: [17373.907777] Broke affinity for irq 25
Apr 11 16:46:51 dell kernel: [17373.907779] Broke affinity for irq 27
Apr 11 16:46:51 dell kernel: [17373.907781] Broke affinity for irq 28
Apr 11 16:46:51 dell kernel: [17373.907783] Broke affinity for irq 30
Apr 11 16:46:51 dell kernel: [17373.908817] smpboot: CPU 7 is now offline
Apr 11 16:46:51 dell kernel: [17373.924754] ACPI: Low-level resume complete
Apr 11 16:46:51 dell kernel: [17373.924793] ACPI : EC: EC started
Apr 11 16:46:51 dell kernel: [17373.924794] PM: Restoring platform NVS memory
Apr 11 16:46:51 dell kernel: [17373.925803] microcode: CPU0 microcode updated early to revision 0x1c, date = 2015-02-26
Apr 11 16:46:51 dell kernel: [17373.925825] Enabling non-boot CPUs ...
Apr 11 16:46:51 dell kernel: [17373.944779] x86: Booting SMP configuration:
Apr 11 16:46:51 dell kernel: [17373.944780] smpboot: Booting Node 0 Processor 1 APIC 0x1
Apr 11 16:46:51 dell kernel: [17373.948142]  cache: parent cpu1 should not be sleeping
Apr 11 16:46:51 dell kernel: [17373.948292] CPU1 is up
Apr 11 16:46:51 dell kernel: [17373.964863] smpboot: Booting Node 0 Processor 2 APIC 0x2
Apr 11 16:46:51 dell kernel: [17373.965785] microcode: CPU2 microcode updated early to revision 0x1c, date = 2015-02-26
Apr 11 16:46:51 dell kernel: [17373.968640]  cache: parent cpu2 should not be sleeping
Apr 11 16:46:51 dell kernel: [17373.968795] CPU2 is up
Apr 11 16:46:51 dell kernel: [17373.988826] smpboot: Booting Node 0 Processor 3 APIC 0x3
Apr 11 16:46:51 dell kernel: [17373.992163]  cache: parent cpu3 should not be sleeping
Apr 11 16:46:51 dell kernel: [17373.992310] CPU3 is up
Apr 11 16:46:51 dell kernel: [17374.008879] smpboot: Booting Node 0 Processor 4 APIC 0x4
Apr 11 16:46:51 dell kernel: [17374.009697] microcode: CPU4 microcode updated early to revision 0x1c, date = 2015-02-26
Apr 11 16:46:51 dell kernel: [17374.012573]  cache: parent cpu4 should not be sleeping
Apr 11 16:46:51 dell kernel: [17374.012722] CPU4 is up
Apr 11 16:46:51 dell kernel: [17374.033044] smpboot: Booting Node 0 Processor 5 APIC 0x5
Apr 11 16:46:51 dell kernel: [17374.036644]  cache: parent cpu5 should not be sleeping
Apr 11 16:46:51 dell kernel: [17374.036796] CPU5 is up
Apr 11 16:46:51 dell kernel: [17374.073039] smpboot: Booting Node 0 Processor 6 APIC 0x6
Apr 11 16:46:51 dell kernel: [17374.073925] microcode: CPU6 microcode updated early to revision 0x1c, date = 2015-02-26
Apr 11 16:46:51 dell kernel: [17374.076895]  cache: parent cpu6 should not be sleeping
Apr 11 16:46:51 dell kernel: [17374.077046] CPU6 is up
Apr 11 16:46:51 dell kernel: [17374.101162] smpboot: Booting Node 0 Processor 7 APIC 0x7
Apr 11 16:46:51 dell kernel: [17374.104861]  cache: parent cpu7 should not be sleeping
Apr 11 16:46:51 dell kernel: [17374.105012] CPU7 is up
Apr 11 16:46:51 dell kernel: [17374.111893] ACPI: Waking up from system sleep state S3
Apr 11 16:46:51 dell kernel: [17374.169369] ehci-pci 0000:00:1d.0: System wakeup disabled by ACPI
Apr 11 16:46:51 dell kernel: [17374.170294] ehci-pci 0000:00:1a.0: System wakeup disabled by ACPI
Apr 11 16:46:51 dell kernel: [17374.170310] xhci_hcd 0000:00:14.0: System wakeup disabled by ACPI
Apr 11 16:46:51 dell kernel: [17374.170418] PM: noirq resume of devices complete after 17.795 msecs
```

Is this normal? (Note lid-close does same thing except systemd suspends faster and does fewer tasks).




<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a></div>

