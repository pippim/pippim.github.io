---
layout:       post
title:        >
    xrandr not working on crontab
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1102436
type:         Answer
tags:         cron xrandr eyesome
created_date: 2018-12-16 23:32:17
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "2,466 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-16-xrandr-not-working-on-crontab.md
toc:          false
navigation:   false
clipboard:    false
---

# You can use Startup Applications

`xrandr` doesn't require `sudo` permissions so you can place your script in [Startup Applications][1]. Generally only use `cron` boot scripts for jobs requiring `sudo` powers.


----------


# New Script

The original answer was a *reference*. This new answer uses the reference and takes out unnecessary code. Then OP code is added to the bottom of the new answer.



Use `sudo -H gedit /etc/cron.d/start_screen` and insert these lines:

``` bash
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    /usr/local/bin/screen.sh
```

Save the file. There is no need to mark it as executable.

**Note:** The `PATH` command is very important as `cron` has limited PATH knowledge and may not find the commands such as `/usr/bin/who` or `/usr/bin/awk`.


## Contents of `/usr/local/bin/screen.sh`

``` bash
#! /bin/bash

# NAME: screen.sh
# PATH: /usr/local/bin
# DESC: Set screen to brightness .5 to confirm it can be done.
#       Ask Ubuntu question: https://askubuntu.com/questions/1102389/xrandr-not-working-on-crontab/1102436?noredirect=1#comment1817209_1102436
# CALL: called from `/etc/cron.d/start-screen`
# DATE: Created December 17, 2018.

#!/bin/bash

export DISPLAY=:0       # For xrandr commands to work.

# wait until user signs on to get .Xauthority file settings.
UserName=""
while [[ $UserName == "" ]]; do
    sleep 2
    logger "screen.sh slept 2 seconds waiting for login"
    UserName="$(who -u | grep -F '(:0)' | head -n 1 | awk '{print $1}')"
done

sleep 30
logger "screen.sh slept 30 seconds waiting for other xrandr tasks to finish"

xhost local:root
export XAUTHORITY="/home/$UserName/.Xauthority"

xrandr --output eDP-1-1 --brightness .5
```

I have tested this on my machine and it works perfectly. You will want to make the following changes:

- Change `/usr/local/bin/` to `/avvio/`
- Remove or reduce `sleep 30`. I need it because I have existing `eyesome.sh` cron job that sets brightness based on internet daily sunrise and sunset times for my city.
- Replace the last `xrandr` line with your three `xrandr` lines of code

## Verify results

There are `logger` commands in the script. This will let you see it is working by using:

``` bash
$ journalctl -b -xe | grep screen.sh
Dec 17 14:25:56 alien CRON[1170]: (root) CMD (   /usr/local/bin/screen.sh)
Dec 17 14:25:58 alien root[1728]: screen.sh slept 2 seconds waiting for login
Dec 17 14:26:00 alien root[1790]: screen.sh slept 2 seconds waiting for login
Dec 17 14:26:02 alien root[1973]: screen.sh slept 2 seconds waiting for login
Dec 17 14:26:04 alien root[2070]: screen.sh slept 2 seconds waiting for login
Dec 17 14:26:06 alien root[2300]: screen.sh slept 2 seconds waiting for login
Dec 17 14:26:36 alien root[5355]: screen.sh slept 30 seconds waiting for other xrandr tasks to finish
## ```



# Original Answer

Cron's `@reboot` option runs soon after machine is booted and before user is logged in. `xrandr` commands won't work until user is logged on. You can use this code from [eyesome][2] and adapt to your purposes:



``` bash
export DISPLAY=:0       # For xrandr commands to work.
SpamOn=0                # > 0 = number of times to spam in loop.
SpamCount=5             # How many times we will spam (perform short sleep)
SpamLength=2            # How long spam lasts (how many seconds to sleep)
SpamContext=""          # Why are we spamming? (Login, Suspend or Lid Event)
                        # Future use: "DPMS Change" ie Monitor on or off.
WaitForSignOn () {

    # eyesome daemon is loaded during boot. The user name is required
    # for xrandr external monitor brightness and gamma control. We must
    # wait until user signs on to get .Xauthority file settings.

    SpamOn=10       # Causes 10 iterations of 2 second sleep
    SpamContext="Login"
    TotalWait=0
    [[ ! -f "$CurrentBrightnessFilename" ]] && rm -f \
            "$CurrentBrightnessFilename"

    # Wait for user to sign on then get Xserver access for xrandr calls
    UserName=""
    while [[ $UserName == "" ]]; do

        sleep "$SpamLength"
        TotalWait=$(( TotalWait + SpamLength ))

        # Find UserName currently logged in.
        UserName="$(who -u | grep -F '(:0)' | head -n 1 | awk '{print $1}')"
    done

    log "Waited $TotalWait seconds for $UserName to login."

    xhost local:root
    export XAUTHORITY="/home/$UserName/.Xauthority"

    if [[ "$fUseDbusMonitor" == true ]] ; then
        echo "$UserName" > "$EyesomeUser"
        sync -d "$EyesomeUser"      # Flush buffer immediately
    fi

} # WaitForSignOn
```


  [1]: {% post_url /2016/2016-09-19-How-can-I-display-text-from-a-file-automatically-after-powering-up-my-computer_-in-text-editor-or-terminal_ %}
  [2]: https://github.com/WinEunuuchs2Unix/eyesome
