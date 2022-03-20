---
layout:       post
title:        >
    How to get real uptime?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186845
type:         Answer
tags:         uptime
created_date: 2019-11-07 02:14:38
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "1,286 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-07-How-to-get-real-uptime_.md
toc:          false
navigation:   false
clipboard:    true
---

On one hand this answer is six years late, on the other hand it's a blink of the eye if the internet is eternal! 

You can get the real uptime with this little bash script:



``` bash
$ suspendtime

Apr 07 05:53:34 to Apr 07 17:07:17 suspended 11 hours, 13 minutes, 43 seconds
Apr 07 21:56:34 to Apr 08 04:20:57 suspended 6 hours, 24 minutes, 23 seconds
      (... SNIP ...)
May 08 05:55:20 to May 08 16:32:37 suspended 10 hours, 37 minutes, 17 seconds
May 08 23:21:00 to May 09 07:02:05 suspended 7 hours, 41 minutes, 5 seconds

Linux uptime 2,813,939 seconds (4 weeks, 4 days, 13 hours, 38 minutes, 59 seconds)
64 Suspends 1,715,196 seconds (2 weeks, 5 days, 20 hours, 26 minutes, 36 seconds)
Real uptime 1,098,743 seconds (1 week, 5 days, 17 hours, 12 minutes, 23 seconds)
```

Linux will report uptime as 8 days and 40 minutes. The real uptime (after subtracting suspend time) is about 2 days and 18 hours.

----------

## `suspendtime` bash script

Here's the code you can copy to your system:
{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: suspendtime
# PATH: $HOME/askubuntu/
# DESC: For: https://askubuntu.com/questions/321855/how-to-get-real-uptime
# DATE: November 6, 2019.

# NOTE: Calculate suspend time from systemd's journalctl

# UPDT: 2019-11-07 Fine-tune removing 0 Units in DaysMinutesStr
#       2020-05-09 Add "weeks" unit measure to DaysMinutes() function

# Duplicate DaysMinutes from ~/.bashrc for Ask Ubuntu
DaysMinutes () {

    local w d h m s
    (( w = ${1} / 604800 ))
    (( d = ${1}%604800 / 86400 ))
    (( h = (${1}%86400) / 3600 ))
    (( m = (${1}%3600) / 60 ))
    (( s = ${1}%60 ))
    DaysMinutesStr="$w weeks, $d days, $h hours, $m minutes, $s seconds"
    
    # Convert 1's to singular
    [[ ${DaysMinutesStr:0:2} = "1 " ]] && \
        DaysMinutesStr="${DaysMinutesStr/weeks/week}"
    DaysMinutesStr="${DaysMinutesStr/ 1 days/ 1 day}"
    DaysMinutesStr="${DaysMinutesStr/ 1 hours/ 1 hour}"
    DaysMinutesStr="${DaysMinutesStr/ 1 minutes/ 1 minute}"
    DaysMinutesStr="${DaysMinutesStr/ 1 seconds/ 1 second}"

    # Suppress zero strings
    [[ ${DaysMinutesStr:0:1} = "0" ]] &&
        DaysMinutesStr="${DaysMinutesStr/0 weeks, / }"
    DaysMinutesStr="${DaysMinutesStr/ 0 days, / }"
    DaysMinutesStr="${DaysMinutesStr/ 0 hours, / }"
    DaysMinutesStr="${DaysMinutesStr/ 0 minutes, / }"
    DaysMinutesStr="${DaysMinutesStr/, 0 seconds/}"
} # DaysMinutes

# Build array of suspend cycles from Systemd
IFS=$'\n' Arr=( $(journalctl -b-0 | \
                grep -E 'systemd\[1]: Start.*Suspend' | cut -c1-15) )

[[ ${#Arr[@]} -gt 0 ]] && upper=$(( ${#Arr[@]} - 1 ))
[[ $upper -gt 0 ]] && for (( i=0; i<upper; i=i+2 )) ; do
    (( SuspendCount++ ))
    Time=$(( $(date +%s -d "${Arr[i+1]}") - $(date +%s -d "${Arr[i]}") ))
    SuspendTime=$(( SuspendTime + Time ))
    DaysMinutes "$Time"
    printf "%s to %s suspended%s\n" "${Arr[i]}" "${Arr[i+1]}" \
          "$DaysMinutesStr"
done

echo
LinuxTime=$(( $(date +%s -d "Now") - $(date +%s -d "$(uptime -s)") ))
DaysMinutes "$LinuxTime"
printf "Linux uptime %'d seconds (%s)\n" "$LinuxTime" "$DaysMinutesStr"
DaysMinutes "$SuspendTime"
printf "%s Suspends %'d seconds (%s)\n" \
        "$SuspendCount" "$SuspendTime" "$DaysMinutesStr"
RealTime=$(( LinuxTime - SuspendTime ))
DaysMinutes "$RealTime"
printf "Real uptime %'d seconds (%s)\n" "$RealTime" "$DaysMinutesStr"
```

About half the program is converting seconds to human readable format in weeks, days, hours, minutes and seconds. The function `DaysMinutes` does this and was copied from my `~/.bashrc` file where you may want to put that function yourself.

----------

## How it works

The key component is getting suspend start and end times from `journalctl`:

``` bash
$ journalctl -b-0 | grep -E 'systemd\[1]: Start.*Suspend'
Oct 31 05:55:19 alien systemd[1]: Starting Suspend...
Oct 31 16:54:26 alien systemd[1]: Started Suspend.
 (... SNIP ...)
Nov 07 21:07:28 alien systemd[1]: Starting Suspend...
Nov 08 05:08:52 alien systemd[1]: Started Suspend.
```

- The `journalctl -b-0` command reads all the system messages for the current boot. You could enhance the function to look at the previous boot using `-b-1` the boot before that with `-b-2`, etc.
- The `grep` command with regex does the heavy lifting returning 32 system messages pertaining to suspend from the 19,330 system messages recorded (on my system)
