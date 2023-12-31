---
layout:       post
title:        >
    Cross-installing programs to share them between Windows and Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1015331
type:         Answer
tags:         python kubuntu partitioning programming grub
created_date: 2018-03-15 23:28:48
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "547 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-15-Cross-installing-programs-to-share-them-between-Windows-and-Ubuntu.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# You can do it for Ubuntu Bash on Windows

Here is my partition setup:

``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL
NAME        FSTYPE LABEL            MOUNTPOINT   SIZE MODEL
sda                                            931.5G HGST HTS721010A9
├─sda4      ntfs   WINRETOOLS                    450M 
├─sda2                                           128M 
├─sda5      ntfs   Image                        11.4G 
├─sda3      ntfs   HGST_Win10       /mnt/d       919G 
└─sda1      vfat   ESP                           500M 
nvme0n1                                          477G Samsung SSD 960 PRO 512GB           
├─nvme0n1p5 ext4   NVMe_Ubuntu_16.0 /           44.6G 
├─nvme0n1p3                                       16M 
├─nvme0n1p1 ntfs                                 450M 
├─nvme0n1p6 swap   Linux Swap       [SWAP]       7.9G 
├─nvme0n1p4 ntfs   NVMe_Win10       /mnt/c     414.9G 
├─nvme0n1p2 vfat                    /boot/efi     99M 
└─nvme0n1p7 ntfs   Shared_WSL+Linux /mnt/e         9G 
```


----------


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# `nvme0n1p7` is shared between Windows and Ubuntu

I setup a 9 GB partition that both WSL (Windows Subsystem for Linux) and Ubuntu can have in their paths and run programs. Here is the tree for it:

``` 
$ sudo tree /mnt/e -d 
/mnt/e
├── bin
├── boot
│   └── grub
│       ├── fonts
│       ├── i386-pc
│       └── locale
├── Desktop
├── Documents
├── Downloads
│   └── WinScreeny-master
├── etc
│   ├── apt
│   │   ├── sources.list.d
│   │   └── trusted.gpg.d
│   ├── cron.d
│   │   └── test-directory
│   ├── cron.daily
│   ├── cron.hourly
│   ├── cron.monthly
│   ├── cron.weekly
│   ├── default
│   ├── ssmtp
│   └── systemd
│       ├── network
│       ├── system
│       │   ├── bluetooth.target.wants
│       │   ├── default.target.wants
│       │   ├── display-manager.service.wants
│       │   ├── final.target.wants
│       │   ├── getty.target.wants
│       │   ├── graphical.target.wants
│       │   ├── hibernate.target.wants
│       │   ├── hybrid-sleep.target.wants
│       │   ├── multi-user.target.wants
│       │   ├── network-online.target.wants
│       │   ├── paths.target.wants
│       │   ├── printer.target.wants
│       │   ├── sleep.target.wants
│       │   ├── sockets.target.wants
│       │   ├── suspend.target.wants
│       │   ├── sysinit.target.wants
│       │   └── timers.target.wants
│       └── user
├── lib
│   └── systemd
│       └── system-sleep
├── $RECYCLE.BIN
│   └── S-1-5-21-1568003092-1971238075-3041751339-1001
├── System Volume Information
├── Temporary Work
├── usr
│   ├── local
│   │   └── bin
│   │       ├── bell
│   │       │   └── sounds
│   │       ├── startup-scripts
│   │       └── zap
│   │           └── Assembly-Intro-hello
│   │               ├── BeOS
│   │               ├── FreeBSD
│   │               └── Linux
│   └── share
│       └── plymouth
│           └── themes
│               ├── details
│               ├── earth-sunrise
│               ├── text
│               ├── tribar
│               ├── ubuntu-logo
│               └── ubuntu-text
└── wsl-linux-tmp

71 directories
```


----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# Making a hybrid program

I took one of my bash programs: [Application that will lock screen after a set amount of time for Ubuntu][1] and modified it to recognize when running under Windows 10 and issue `powershell` commands instead of the Ubuntu commands for message bubbles and system sounds.

For example, here's a code snippet for checking if the environment is Windows and using a different command than in Ubuntu:



``` bash
if [[ $WSL_running == true ]]; then  
    powershell.exe -c '(New-Object Media.SoundPlayer "C:\Windows\Media\notify.wav").PlaySync();'
else
    ogg123 '/usr/share/sounds/ubuntu/stereo/phone-outgoing-calling.ogg' ;
fi
```

Here's the complete bash code after the application was made a Windows / Ubuntu hybrid:

``` bash
$ cat /mnt/e/bin/lock-screen-timer
#!/bin/bash

# NAME: lock-screen-timer
# PATH: $HOME/bin
# DESC: Lock screen in x minutes
# CALL: Place on Desktop or call from Terminal with "lock-screen-timer 99"
# DATE: Created Nov 19, 2016. Last revision Nov 12, 2017.
# UPDT: Updated to support WSL (Windows Subsystem for Linux)

# NOTE: Time defaults to 30 minutes.
#       If previous version is sleeping it is killed.
#       Zenity is used to pop up entry box to get number of minutes.
#       If zenity is closed with X or Cancel, no screen lock timer is launched.
#       Pending lock warning displayed on-screen at set intervals.
#       Write time remaining to ~/.lock-screen-timer-remaining

MINUTES="$1" # Optional parameter 1 when invoked from terminal.

# if no parameters set default MINUTES to 30
if [ $# == 0 ]; then
    MINUTES=30
fi

DEFAULT="$MINUTES" # When looping, minutes count down to zero. Save deafult for subsequent timers.

# Check if lock screen timer already running
pID=$(pgrep -f "${0##*/}") # All PIDs matching lock-screen-timer name
PREVIOUS=$(echo "$pID" | grep -v ^"$$") # Strip out this running copy ($$$)
if [ "$PREVIOUS" != "" ]; then
    kill "$PREVIOUS"
    rm ~/.lock-screen-timer-remaining
    zenity --info --title="Lock screen timer already running" --text="Previous lock screen timer has been terminated."
fi

# Running under WSL (Windows Subsystem for Linux)?
if cat /proc/version | grep Microsoft; then
    WSL_running=true
else
    WSL_running=false
fi


while true ; do # loop until cancel

    # Get number of minutes until lock from user
    MINUTES=$(zenity --entry --title="Lock screen timer" --text="Set number of minutes until lock" --entry-text="$DEFAULT")

    RESULT=$? # Zenity return code
    if [ $RESULT != 0 ]; then
        break ; # break out of timer lock screen loop and end this script.
    fi

    DEFAULT="$MINUTES" # Save deafult for subsequent timers.
    if [[ $MINUTES == 0 ]] || [[ $MINUTES == "" ]]; then
        break ; # zero minutes considered cancel.
    fi

    # Loop for X minutes, testing each minute for alert message.
    (( ++MINUTES )) 
    while (( --MINUTES > 0 )); do
        case $MINUTES in 1|2|3|5|10|15|30|45|60|120|480|960|1920)
            notify-send --urgency=critical --icon=/usr/share/icons/gnome/256x256/status/appointment-soon.png "Locking screen in ""$MINUTES"" minute(s)." ;
            if [[ $WSL_running == true ]]; then  
                powershell.exe -c '(New-Object Media.SoundPlayer "C:\Windows\Media\notify.wav").PlaySync();'
            else
               ogg123 '/usr/share/sounds/ubuntu/stereo/phone-outgoing-calling.ogg' ;
            fi
           ;;
        esac;

        # Record number of minutes remaining to file other processes can read.
        echo "$MINUTES Minutes" > ~/.lock-screen-timer-remaining

        sleep 60

    done

    rm ~/.lock-screen-timer-remaining # Remove work file others can see our progress with

    if [[ $WSL_running == true ]]; then  
        # Call lock screen for Windows 10
        rundll32.exe user32.dll,LockWorkStation
    else
        # Call screen saver lock for Ubuntu versions > 14.04.
        dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock
    fi

    # Reset sound to Laptop or HDMI TV - Uncomment to fix sound device changing
    #    sleep 5 # HDMI deactivates when screen turned off. Give 5 seconds for TV to resync screen.
    #    hotplugtv

done # End of while loop getting minutes to next lock screen

exit 0 # Closed dialog box or "Cancel" selected.
```


  [1]: {% post_url /2016/2016-10-14-Application-that-will-lock-screen-after-a-set-amount-of-time-for-Ubuntu %}


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

