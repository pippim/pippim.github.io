---
layout:       post
title:        >
    How to list PIDs (procesees) for one CPU core only?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/950465
type:         Answer
tags:         command-line bash cpu cpu-load multi-core
created_date: 2017-08-28 00:31:59
edit_date:    
votes:        "4 "
favorites:    
views:        "961 "
accepted:     
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-28-How-to-list-PIDs-_procesees_-for-one-CPU-core-only_.md
toc:          false
navigation:   false
clipboard:    true
---

# Use `ps -eLF` to list PIDs by CPU core number

The command `ps -eLF` will list PIDs by CPU core number. Then a script can filter the results to a specific core number.

Create a file called `~/bin/one-cpu-pids` and mark it as executable using `chmod a+x ~/bin/one-cpu-pids`. Copy the following text into the file and save it:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: one-cpu-pids
# PATH: /home/$USER/bin
# DESC: List pids running under one cpu core.
# CALL: one-cpu-pids CPUnumber
# DATE: Created Aug 27, 2017.
# NOTE: CPU number passed is ones based and converted to zero based.


if [[ $# -ne 1 ]]; then
    echo 'One argument required for CPU number, e.g. "1" or "8"'
    exit 1
fi

ZeroCPU=$1
let ZeroCPU--

ps -eLF | head -n 1 # Get heading
ps -eLF | awk -v a="$ZeroCPU" '$9 == a {print;}'
```

# What the output looks like

Here is what the output looks like:

{% include copyHeader.html %}
``` 
$ one-cpu-pids 8
UID        PID  PPID   LWP  C NLWP    SZ   RSS PSR STIME TTY          TIME CMD
root        41     2    41  0    1     0     0   7 Aug26 ?        00:00:00 [watchdog/7]
root        42     2    42  0    1     0     0   7 Aug26 ?        00:00:03 [migration/7]
root        43     2    43  0    1     0     0   7 Aug26 ?        00:00:02 [ksoftirqd/7]
root        45     2    45  0    1     0     0   7 Aug26 ?        00:00:00 [kworker/7:0H]
root        82     2    82  0    1     0     0   7 Aug26 ?        00:00:00 [kthrotld]
root        91     2    91  0    1     0     0   7 Aug26 ?        00:00:00 [bioset]
root       188     2   188  0    1     0     0   7 Aug26 ?        00:00:00 [scsi_tmf_2]
root       221     2   221  0    1     0     0   7 Aug26 ?        00:00:00 [kworker/7:1H]
root       836     2   836  0    1     0     0   7 Aug26 ?        00:00:00 [iwlwifi]
rick       969  2019   971  0    4 167699 28180  7 Aug26 ?        00:00:00 /usr/lib/gnome-terminal/gnome-terminal-server
root      1087     1  1087  0    3 84400  1316   7 Aug26 ?        00:00:00 /usr/sbin/ModemManager
root      1219  1164  1219  0    1 17706    28   7 Aug26 ?        00:00:00 /usr/sbin/CRON -f
whoopsie  1447     1  1500  0    3 111935  468   7 Aug26 ?        00:00:00 /usr/bin/whoopsie -f
rick      1550  2019  1552  0    5 126175 4168   7 Aug26 ?        00:00:00 /usr/lib/gvfs/gvfsd-mtp --spawner :1.4 /org/gtk/gvfs/exec_spaw/6
rick      2008     1  2008  0    1 11312  3316   7 Aug26 ?        00:00:00 /lib/systemd/systemd --user
root      2213     2  2213  0    1     0     0   7 15:01 ?        00:00:00 [kworker/7:0]
rick      2231  2019  2277  0    4 106967 1308   7 Aug26 ?        00:00:00 /usr/lib/ibus/ibus-x11 --kill-daemon
rick      2383  2179  2384  0    3 47098   352   7 Aug26 ?        00:00:00 /usr/lib/ibus/ibus-engine-simple
rick      2401  2019  7819  0    6 300457 12584  7 Aug26 ?        00:00:00 /usr/lib/unity-settings-daemon/unity-settings-daemon
rick      2457  2019  2457  0    4 165937 4704   7 Aug26 ?        00:00:00 /usr/lib/x86_64-linux-gnu/indicator-sound/indicator-sound-service
rick      2485  2019  2485  0    4 314455  256   7 Aug26 ?        00:00:00 /usr/lib/evolution/evolution-source-registry
rick      2485  2019  2493  0    4 314455  256   7 Aug26 ?        00:00:00 /usr/lib/evolution/evolution-source-registry
rick      2594  2019  2597  0    3 89830  8700   7 Aug26 ?        00:00:00 /usr/lib/gvfs/gvfs-udisks2-volume-monitor
root      2598     1  2604  0    5 108271 6300   7 Aug26 ?        00:00:00 /usr/lib/udisks2/udisksd --no-debug
root      2643     1  2648  0    7 157184 7748   7 Aug26 ?        00:00:00 /usr/lib/x86_64-linux-gnu/fwupd/fwupd
rick      2696  2571  2703  0    7 204018  108   7 Aug26 ?        00:00:00 /usr/lib/evolution/evolution-calendar-factory-subprocess --factory contacts --bus-name org.gnome.evolution.dataserver.Subprocess.Backend.Calendarx2571x2 --own-path /org/gnome/evolution/dataserver/Subprocess/Backend/Calendar/2571/2
rick      2713  2571  2718  0    5 216464  376   7 Aug26 ?        00:00:00 /usr/lib/evolution/evolution-calendar-factory-subprocess --factory local --bus-name org.gnome.evolution.dataserver.Subprocess.Backend.Calendarx2571x3 --own-path /org/gnome/evolution/dataserver/Subprocess/Backend/Calendar/2571/3
rick      2930  2019  2933  0    4 106898 1012   7 Aug26 ?        00:00:00 /usr/lib/telepathy/mission-control-5
rick      2967  2019  2984  0   11 137962 5212   7 Aug26 ?        00:00:00 zeitgeist-datahub
rick      2967  2019  2987  0   11 137962 5212   7 Aug26 ?        00:00:00 zeitgeist-datahub
rick      3056 15524  3057  0   14 296507 208432 7 14:45 ?        00:00:00 /opt/google/chrome/chrome --type=renderer --enable-smooth-scrolling --field-trial-handle=14075765731346784657,198534808813688123,131072 --service-pipe-token=9469E58F676BDEF1550E34B4D700CB57 --lang=en-GB --enable-crash-reporter=b0f732a8-ad2f-4a2e-b904-4ab12fecf64e, --enable-offline-auto-reload --enable-offline-auto-reload-visible-only --blink-settings=disallowFetchForDocWrittenScriptsInMainFrame=false,disallowFetchForDocWrittenScriptsInMainFrameOnSlowConnections=true --enable-pinch --num-raster-threads=4 --enable-main-frame-before-activation --content-image-texture-target=0,0,3553;0,1,3553;0,2,3553;0,3,3553;0,4,3553;0,5,3553;0,6,3553;0,7,3553;0,8,3553;0,9,3553;0,10,3553;0,11,3553;0,12,3553;0,13,3553;0,14,3553;0,15,3553;0,16,3553;1,0,3553;1,1,3553;1,2,3553;1,3,3553;1,4,3553;1,5,3553;1,6,3553;1,7,3553;1,8,3553;1,9,3553;1,10,3553;1,11,3553;1,12,3553;1,13,3553;1,14,3553;1,15,3553;1,16,3553;2,0,3553;2,1,3553;2,2,3553;2,3,3553;2,4,3553;2,5,3553;2,6,3553;2,7,3553;2,8,3553;2,9,3553;2,10,3553;2,11,3553;2,12,3553;2,13,3553;2,14,3553;2,15,3553;2,16,3553;3,0,3553;3,1,3553;3,2,3553;3,3,3553;3,4,3553;3,5,3553;3,6,3553;3,7,3553;3,8,3553;3,9,3553;3,10,3553;3,11,3553;3,12,3553;3,13,3553;3,14,3553;3,15,3553;3,16,3553;4,0,3553;4,1,3553;4,2,3553;4,3,3553;4,4,3553;4,5,3553;4,6,3553;4,7,3553;4,8,3553;4,9,3553;4,10,3553;4,11,3553;4,12,3553;4,13,3553;4,14,3553;4,15,3553;4,16,3553 --disable-accelerated-video-decode --service-request-channel-token=9469E58F676BDEF1550E34B4D700CB57 --renderer-client-id=66 --shared-files=v8_natives_data:100,v8_snapshot_data:101
rick      3056 15524  3064  0   14 296507 208432 7 14:45 ?        00:00:00 /opt/google/chrome/chrome --type=renderer --enable-smooth-scrolling --field-trial-handle=14075765731346784657,198534808813688123,131072 --service-pipe-token=9469E58F676BDEF1550E34B4D700CB57 --lang=en-GB --enable-crash-reporter=b0f732a8-ad2f-4a2e-b904-4ab12fecf64e, --enable-offline-auto-reload --enable-offline-auto-reload-visible-only --blink-settings=disallowFetchForDocWrittenScriptsInMainFrame=false,disallowFetchForDocWrittenScriptsInMainFrameOnSlowConnections=true --enable-pinch --num-raster-threads=4 --enable-main-frame-before-activation --content-image-texture-target=0,0,3553;0,1,3553;0,2,3553;0,3,3553;0,4,3553;0,5,3553;0,6,3553;0,7,3553;0,8,3553;0,9,3553;0,10,3553;0,11,3553;0,12,3553;0,13,3553;0,14,3553;0,15,3553;0,16,3553;1,0,3553;1,1,3553;1,2,3553;1,3,3553;1,4,3553;1,5,3553;1,6,3553;1,7,3553;1,8,3553;1,9,3553;1,10,3553;1,11,3553;1,12,3553;1,13,3553;1,14,3553;1,15,3553;1,16,3553;2,0,3553;2,1,3553;2,2,3553;2,3,3553;2,4,3553;2,5,3553;2,6,3553;2,7,3553;2,8,3553;2,9,3553;2,10,3553;2,11,3553;2,12,3553;2,13,3553;2,14,3553;2,15,3553;2,16,3553;3,0,3553;3,1,3553;3,2,3553;3,3,3553;3,4,3553;3,5,3553;3,6,3553;3,7,3553;3,8,3553;3,9,3553;3,10,3553;3,11,3553;3,12,3553;3,13,3553;3,14,3553;3,15,3553;3,16,3553;4,0,3553;4,1,3553;4,2,3553;4,3,3553;4,4,3553;4,5,3553;4,6,3553;4,7,3553;4,8,3553;4,9,3553;4,10,3553;4,11,3553;4,12,3553;4,13,3553;4,14,3553;4,15,3553;4,16,3553 --disable-accelerated-video-decode --service-request-channel-token=9469E58F676BDEF1550E34B4D700CB57 --renderer-client-id=66 --shared-files=v8_natives_data:100,v8_snapshot_data:101
rick      3437  2019  3437  0    4 106685 3916   7 Aug26 ?        00:00:00 /usr/lib/gvfs/gvfsd-network --spawner :1.4 /org/gtk/gvfs/exec_spaw/3
root     15170     2 15170  0    1     0     0   7 16:45 ?        00:00:00 [kworker/7:2]
rick     15441  2019 15527  0   42 347528 234428 7 Aug26 ?        00:00:00 /opt/google/chrome/chrome
rick     15441  2019 15532  0   42 347528 234428 7 Aug26 ?        00:00:00 /opt/google/chrome/chrome
rick     15441  2019 15543  0   42 347528 234428 7 Aug26 ?        00:00:00 /opt/google/chrome/chrome
rick     15441  2019 15553  0   42 347528 234428 7 Aug26 ?        00:00:00 /opt/google/chrome/chrome
rick     15441  2019 21397 52   42 347528 234428 7 15:44 ?        01:20:21 /opt/google/chrome/chrome
rick     15746 15524 21853  0   13 236965 74032  7 Aug26 ?        00:00:00 /opt/google/chrome/chrome --type=renderer --enable-smooth-scrolling --field-trial-handle=14075765731346784657,198534808813688123,131072 --service-pipe-token=B6F0CC243787B18BB0EA42A02C364626 --lang=en-GB --enable-crash-reporter=b0f732a8-ad2f-4a2e-b904-4ab12fecf64e, --extension-process --enable-offline-auto-reload --enable-offline-auto-reload-visible-only --blink-settings=disallowFetchForDocWrittenScriptsInMainFrame=false,disallowFetchForDocWrittenScriptsInMainFrameOnSlowConnections=true --enable-pinch --num-raster-threads=4 --enable-main-frame-before-activation --content-image-texture-target=0,0,3553;0,1,3553;0,2,3553;0,3,3553;0,4,3553;0,5,3553;0,6,3553;0,7,3553;0,8,3553;0,9,3553;0,10,3553;0,11,3553;0,12,3553;0,13,3553;0,14,3553;0,15,3553;0,16,3553;1,0,3553;1,1,3553;1,2,3553;1,3,3553;1,4,3553;1,5,3553;1,6,3553;1,7,3553;1,8,3553;1,9,3553;1,10,3553;1,11,3553;1,12,3553;1,13,3553;1,14,3553;1,15,3553;1,16,3553;2,0,3553;2,1,3553;2,2,3553;2,3,3553;2,4,3553;2,5,3553;2,6,3553;2,7,3553;2,8,3553;2,9,3553;2,10,3553;2,11,3553;2,12,3553;2,13,3553;2,14,3553;2,15,3553;2,16,3553;3,0,3553;3,1,3553;3,2,3553;3,3,3553;3,4,3553;3,5,3553;3,6,3553;3,7,3553;3,8,3553;3,9,3553;3,10,3553;3,11,3553;3,12,3553;3,13,3553;3,14,3553;3,15,3553;3,16,3553;4,0,3553;4,1,3553;4,2,3553;4,3,3553;4,4,3553;4,5,3553;4,6,3553;4,7,3553;4,8,3553;4,9,3553;4,10,3553;4,11,3553;4,12,3553;4,13,3553;4,14,3553;4,15,3553;4,16,3553 --disable-accelerated-video-decode --service-request-channel-token=B6F0CC243787B18BB0EA42A02C364626 --renderer-client-id=5 --shared-files=v8_natives_data:100,v8_snapshot_data:101
rick     17004 15524 17010  0   14 254605 146636 7 Aug26 ?        00:00:03 /opt/google/chrome/chrome --type=renderer --enable-smooth-scrolling --field-trial-handle=14075765731346784657,198534808813688123,131072 --service-pipe-token=B04C26F870675DF1A8643418BED74ECD --lang=en-GB --enable-crash-reporter=b0f732a8-ad2f-4a2e-b904-4ab12fecf64e, --enable-offline-auto-reload --enable-offline-auto-reload-visible-only --blink-settings=disallowFetchForDocWrittenScriptsInMainFrame=false,disallowFetchForDocWrittenScriptsInMainFrameOnSlowConnections=true --enable-pinch --num-raster-threads=4 --enable-main-frame-before-activation --content-image-texture-target=0,0,3553;0,1,3553;0,2,3553;0,3,3553;0,4,3553;0,5,3553;0,6,3553;0,7,3553;0,8,3553;0,9,3553;0,10,3553;0,11,3553;0,12,3553;0,13,3553;0,14,3553;0,15,3553;0,16,3553;1,0,3553;1,1,3553;1,2,3553;1,3,3553;1,4,3553;1,5,3553;1,6,3553;1,7,3553;1,8,3553;1,9,3553;1,10,3553;1,11,3553;1,12,3553;1,13,3553;1,14,3553;1,15,3553;1,16,3553;2,0,3553;2,1,3553;2,2,3553;2,3,3553;2,4,3553;2,5,3553;2,6,3553;2,7,3553;2,8,3553;2,9,3553;2,10,3553;2,11,3553;2,12,3553;2,13,3553;2,14,3553;2,15,3553;2,16,3553;3,0,3553;3,1,3553;3,2,3553;3,3,3553;3,4,3553;3,5,3553;3,6,3553;3,7,3553;3,8,3553;3,9,3553;3,10,3553;3,11,3553;3,12,3553;3,13,3553;3,14,3553;3,15,3553;3,16,3553;4,0,3553;4,1,3553;4,2,3553;4,3,3553;4,4,3553;4,5,3553;4,6,3553;4,7,3553;4,8,3553;4,9,3553;4,10,3553;4,11,3553;4,12,3553;4,13,3553;4,14,3553;4,15,3553;4,16,3553 --disable-accelerated-video-decode --service-request-channel-token=B04C26F870675DF1A8643418BED74ECD --renderer-client-id=8 --shared-files=v8_natives_data:100,v8_snapshot_data:101
```

We can see it is probably `chrome` causing the problem.

