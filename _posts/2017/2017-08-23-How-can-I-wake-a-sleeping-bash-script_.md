---
layout:       post
title:        >
    How can I wake a sleeping bash script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/948852
type:         Answer
tags:         command-line bash
created_date: 2017-08-23 01:21:18
edit_date:    
votes:        "2 "
favorites:    
views:        "25,211 "
accepted:     
uploaded:     2023-11-04 11:19:12
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-23-How-can-I-wake-a-sleeping-bash-script_.md
toc:          false
navigation:   false
clipboard:    false
---

I have a sleeping bash script started by `cron` on boot. The script wakes every minute and sets the laptop display brightness based on sunrise and sunset obtained from the internet. A user configurable transition phase between full bright and full dim requires stepping up and stepping down values by 3, 4, 5 or whatever is calculated every minute.

Oli briefly touched on `pstree` in his answer but rejected it because it would kill all `sleep` instances. This can be avoided by narrowing the search using pstree options.

Using `pstree -h` we see the entire heirarchy:

``` 
$ pstree -h
systemd─┬─ModemManager─┬─{gdbus}
        │              └─{gmain}
        ├─NetworkManager─┬─dhclient
        │                ├─dnsmasq
        │                ├─{gdbus}
        │                └─{gmain}
        ├─accounts-daemon─┬─{gdbus}
        │                 └─{gmain}
        ├─acpid
        ├─agetty
        ├─atd
        ├─avahi-daemon───avahi-daemon
        ├─cgmanager
        ├─colord─┬─{gdbus}
        │        └─{gmain}
        ├─cron───cron───sh───display-auto-br───sleep
        ├─cups-browsed─┬─{gdbus}
        │              └─{gmain}
        ├─dbus-daemon
        ├─fwupd─┬─3*[{GUsbEventThread}]
        │       ├─{fwupd}
        │       ├─{gdbus}
        │       └─{gmain}
        ├─gnome-keyring-d─┬─{gdbus}
        │                 ├─{gmain}
        │                 └─{timer}
        ├─irqbalance
        ├─lightdm─┬─Xorg───3*[{Xorg}]
        │         ├─lightdm─┬─upstart─┬─at-spi-bus-laun─┬─dbus-daemon
        │         │         │         │                 ├─{dconf worker}
        │         │         │         │                 ├─{gdbus}
        │         │         │         │                 └─{gmain}
        │         │         │         ├─at-spi2-registr─┬─{gdbus}
        │         │         │         │                 └─{gmain}
        │         │         │         ├─bamfdaemon─┬─{dconf worker}
        │         │         │         │            ├─{gdbus}
        │         │         │         │            └─{gmain}
        │         │         │         ├─chrome─┬─2*[cat]
        │         │         │         │        ├─chrome─┬─chrome─┬─2*[chrome─┬─{Chrome_ChildIOT}]
        │         │         │         │        │        │        │           ├─5*[{CompositorTileW}]]
        │         │         │         │        │        │        │           ├─{Compositor}]
        │         │         │         │        │        │        │           ├─{GpuMemoryThread}]
        │         │         │         │        │        │        │           ├─{MemoryInfra}]
        │         │         │         │        │        │        │           ├─{Renderer::FILE}]
        │         │         │         │        │        │        │           ├─{TaskSchedulerRe}]
        │         │         │         │        │        │        │           └─{TaskSchedulerSe}]
        │         │         │         │        │        │        ├─7*[chrome─┬─{Chrome_ChildIOT}]
        │         │         │         │        │        │        │           ├─5*[{CompositorTileW}]]
        │         │         │         │        │        │        │           ├─{Compositor}]
        │         │         │         │        │        │        │           ├─{GpuMemoryThread}]
        │         │         │         │        │        │        │           ├─{MemoryInfra}]
        │         │         │         │        │        │        │           ├─{Renderer::FILE}]
        │         │         │         │        │        │        │           ├─{ScriptStreamerT}]
        │         │         │         │        │        │        │           ├─{TaskSchedulerRe}]
        │         │         │         │        │        │        │           └─{TaskSchedulerSe}]
        │         │         │         │        │        │        ├─chrome─┬─{Chrome_ChildIOT}
        │         │         │         │        │        │        │        ├─5*[{CompositorTileW}]
        │         │         │         │        │        │        │        ├─{Compositor}
        │         │         │         │        │        │        │        ├─{GpuMemoryThread}
        │         │         │         │        │        │        │        ├─{Media}
        │         │         │         │        │        │        │        ├─{MemoryInfra}
        │         │         │         │        │        │        │        ├─{Renderer::FILE}
        │         │         │         │        │        │        │        ├─{ScriptStreamerT}
        │         │         │         │        │        │        │        ├─{TaskSchedulerRe}
        │         │         │         │        │        │        │        └─{TaskSchedulerSe}
        │         │         │         │        │        │        └─2*[chrome─┬─{Chrome_ChildIOT}]
        │         │         │         │        │        │                    ├─5*[{CompositorTileW}]]
        │         │         │         │        │        │                    ├─{Compositor}]
        │         │         │         │        │        │                    ├─{GpuMemoryThread}]
        │         │         │         │        │        │                    ├─{Renderer::FILE}]
        │         │         │         │        │        │                    ├─{ScriptStreamerT}]
        │         │         │         │        │        │                    ├─{TaskSchedulerRe}]
        │         │         │         │        │        │                    └─{TaskSchedulerSe}]
        │         │         │         │        │        └─nacl_helper
        │         │         │         │        ├─chrome─┬─chrome
        │         │         │         │        │        ├─{Chrome_ChildIOT}
        │         │         │         │        │        ├─{MemoryInfra}
        │         │         │         │        │        ├─{TaskSchedulerSe}
        │         │         │         │        │        └─{Watchdog}
        │         │         │         │        ├─{AudioThread}
        │         │         │         │        ├─{BrowserWatchdog}
        │         │         │         │        ├─{Chrome_CacheThr}
        │         │         │         │        ├─{Chrome_DBThread}
        │         │         │         │        ├─{Chrome_FileThre}
        │         │         │         │        ├─{Chrome_FileUser}
        │         │         │         │        ├─{Chrome_HistoryT}
        │         │         │         │        ├─{Chrome_IOThread}
        │         │         │         │        ├─{Chrome_ProcessL}
        │         │         │         │        ├─{Chrome_SyncThre}
        │         │         │         │        ├─{CompositorTileW}
        │         │         │         │        ├─{CrShutdownDetec}
        │         │         │         │        ├─{D-Bus thread}
        │         │         │         │        ├─{Geolocation}
        │         │         │         │        ├─{IndexedDB}
        │         │         │         │        ├─{LevelDBEnv}
        │         │         │         │        ├─{MemoryInfra}
        │         │         │         │        ├─{NetworkChangeNo}
        │         │         │         │        ├─{Networking Priv}
        │         │         │         │        ├─4*[{TaskSchedulerBa}]
        │         │         │         │        ├─6*[{TaskSchedulerFo}]
        │         │         │         │        ├─{TaskSchedulerSe}
        │         │         │         │        ├─{WorkerPool/3166}
        │         │         │         │        ├─{WorkerPool/5824}
        │         │         │         │        ├─{WorkerPool/5898}
        │         │         │         │        ├─{WorkerPool/6601}
        │         │         │         │        ├─{WorkerPool/6603}
        │         │         │         │        ├─{WorkerPool/7313}
        │         │         │         │        ├─{chrome}
        │         │         │         │        ├─{dconf worker}
        │         │         │         │        ├─{extension_crash}
        │         │         │         │        ├─{gdbus}
        │         │         │         │        ├─{gmain}
        │         │         │         │        ├─{gpu-process_cra}
        │         │         │         │        ├─{inotify_reader}
        │         │         │         │        ├─{renderer_crash_}
        │         │         │         │        ├─{sandbox_ipc_thr}
        │         │         │         │        └─{threaded-ml}
        │         │         │         ├─compiz─┬─{dconf worker}
        │         │         │         │        ├─{gdbus}
        │         │         │         │        ├─{gmain}
        │         │         │         │        └─8*[{pool}]
        │         │         │         ├─conky───6*[{conky}]
        │         │         │         ├─2*[dbus-daemon]

( .... many lines deleted to fit in 30k limit .... )

        ├─vnstatd
        ├─whoopsie─┬─{gdbus}
        │          └─{gmain}
        └─wpa_supplicant
```

As you can see a typical Ubuntu login contains many many PIDs (Process ID's).

We can narrow it down to our running script using:

``` 
$ pstree -g -p | grep display-auto
  |-cron(1198,1198)---cron(1257,1198)---sh(1308,1308)---display-auto-br(1321,1308)---sleep(26552,1308)
```

We see:

- `cron` started a shell (process ID 1308 and session ID 1308)
- The shell calls our program running under process ID 1321 and session ID 1308 (matching the shell)
- Our program calls `sleep` under process ID 26552 and again session ID 1308

At this point we can use `pkill -s 1308` and it would kill the entire session which includes the shell, our program `display-auto-brightness` and the `sleep` command. Instead we will use `kill 26552` to only kill the sleep command forcing our program to wake up and adjust the brightness.

Typing this manually in the terminal you see:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ pstree -g -p | grep display-auto
             |-cron(1198,1198)---cron(1257,1198)---sh(1308,1308)---display-auto-br(1321,1308)---sleep(32362,1308)
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ sudo kill 32362
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ pstree -g -p | grep display-auto
             |-cron(1198,1198)---cron(1257,1198)---sh(1308,1308)---display-auto-br(1321,1308)---sleep(1279,1308)
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ sudo kill 1279
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ pstree -g -p | grep display-auto
             |-cron(1198,1198)---cron(1257,1198)---sh(1308,1308)---display-auto-br(1321,1308)---sleep(4440,1308)
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ 
```

The next step is to do it when the laptop wakes up from suspend. For example when lid closed it was full dark and screen brightness was set at "300". When lid is opened it is daylight and brightness needs to be set to "2000". Of course the program would wake up on it's own in 1 to 59 seconds but it's more comfortable for the brightness to be set instantly.

I'll post the suspend/resume code after it's written. Hopefully this weekend.


