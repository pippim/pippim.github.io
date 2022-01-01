---
layout:       post
title:        >
    Prevent host shutting down when remotely logged in
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1252628
type:         Answer
tags:         server ssh suspend client
created_date: !!str "2020-06-22 02:15:33"
edit_date:    !!str "2020-06-22 02:52:27"
votes:        !!str "0"
favorites:    
views:        !!str "436"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   true
clipboard:    true
---

I developed a script called `ssh-activity` that:

- Monitors output from `w` command every 60 seconds. 
- If one or more remote logged in users have typed something then simulate user activity with `dbus` call.
- If activity would unblank screen then immediately blank it on server.
- Honor setting for screen blanking time and force blanking at appropriate time.
- If remote user doesn't type anything in terminal, broadcast messages (using `wall` command) warning of shutdown or suspend.



<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## `ssh-activity` script

<!-- Language-all: lang-bash -->

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: ssh-activity
# PATH: /mnt/e/bin
# DESC: When ssh client types in terminal send dbus method for user activity.

# CALL: Must run on host. Shaould be called in startup applications after user
#       logs into host desktop. Broadcast message when inactive that system
#       going down in 60, 30, 15, 10, 5, 3, 2, 1, 0 minute(s).

# PARM: --n (-no-blank-lock) and -d (--debug)

# DATE: June 21, 2020. Modified: Original Version.

# NOTE: After updating run: scp /mnt/e/bin/ssh-activity dell:/mnt/e/bin

#       For Debugging:
#           on host run: ssh-activity -d | tee ssh-activity.log
#           on client run: while : ; do echo "==========  ssh-activity.log $(date)  ==========" ; tail ssh-activity.log ; sleep 60 ; done

# Global constants
export LANG=C       # Force english names for sed & grep searches
SLEEP_SECS=60       # Seconds to sleep between 'w -ish' command usage
REMOTE="192.168.0"  # What we 'grep' for in 'w -ish' output
fDebug=false        # When debug is on issue progress messages
fNoBlankLock=false  # Don't blank or lock screen

ParseParms () {

    while [[ $# -gt 0 ]] ; do
        key="$1"
        case $key in
            -d|--debug)
                fDebug=true
                echo "Development Mode = $fDebug"
                shift # past argument
                ;;
            -n|--no-blank-lock)
                fNoBlankLock=true
                shift # past argument
                ;;
            *)  # unknown option
                echo "Usage: ssh-activity -d (--debug) -n (--no-blank-lock)"
                exit
            ;;
        esac
    done
} # ParseParms

# Must have the xprintidle package.
command -v xprintidle >/dev/null 2>&1 || { echo >&2 \
        "'xprintidle' package required but it is not installed.  Aborting."; \
        exit 3; }

# Global gsettings set by Init () function need to control screen & suspending
GsAcTimeOut=0   # idle seconds until system sleeps (0=never for all settings)
GsIdleDelay=0   # idle seconds until screen blanks (a good thing for server)
GsLockDelay=0   # idle seconds until screen locks (a bad thing if logged in)
GsLockEnabled=0 # is lock screen enabled? ('false' overrides GsLockDelay)
fOneTime=false  # for displaying debugging information one time only

Init () {

    # gsettings required to know when system shuts down due to xidle time
    GsAcTimeOut=$(gsettings get org.gnome.settings-daemon.plugins.power \
                        sleep-inactive-ac-timeout)

    # gsettings required for blanking and locking screen when no host activity
    if [[ $fNoBlankLock == false ]] ; then
        GsIdleDelay=$(gsettings get org.gnome.desktop.session idle-delay)
        # Cut out rightside value from 'uint32 0'
        GsIdleDelay="${GsIdleDelay##* }"
        [[ $GsIdleDelay -eq 0 ]] && GsIdleDelay=999999
        GsLockDelay=$(gsettings get org.gnome.desktop.screensaver lock-delay)
        GsLockDelay="${GsLockDelay##* }"
        [[ $GsLockDelay -eq 0 ]] && GsLockDelay=999999
        GsLockEnabled=$(gsettings get org.gnome.desktop.screensaver lock-enabled)
    fi

    if [[ $fDebug == true && $fOneTime == false ]] ; then
        echo "$0 started at: $(date)"
        echo "GsAcTimeOut: $GsAcTimeOut"
        echo "GsIdleDelay: $GsIdleDelay"
        echo "GsLockDelay: $GsLockDelay"
        echo "GsLockEnabled: $GsLockEnabled"
        fOneTime=true
    fi

} # Init

GetWish () {
    # 'w' command '-ish' arguments (--ip-adddr, --short, --no-header) returns:
    #       rick     pts/21   192.168.0.12      4.00s sshd: rick [priv] 

    local ArrEntCnt ArrCols ArrRows CheckSum i

    ArrCols=5
    WishArr=( $(w -ish | grep "$REMOTE" | tr -s " " | \
             cut -d' ' -f1-"$ArrCols") )
    # The fifth column on each row repurposed to be idle time seconds
    ArrEntCnt="${#WishArr[@]}"
    [[ $ArrEntCnt -lt "$ArrCols" ]] && return 1  # No remote users

    ArrRows=$(( $ArrEntCnt / ArrCols ))
    CheckSum=$(( ArrRows * ArrCols ))
    # Error possible if 'w -ish' command breaks down
    [[ $ArrEntCnt -ne "$CheckSum" ]] && { echo CheckSum failed ; \
                                                return 2 ; }

    LowestSeconds=999999

    for (( i=0; i<ArrEntCnt; i=i+ArrCols )) ; do
        # Time formatted as DDdays, HH:MMm, MM:SSs & SS.CC convert to Seconds
        WishSeconds "${WishArr[i+3]}" Seconds
        WishArr[i+4]=$Seconds   # Store in repurposed array column # 5
        [[ $Seconds -lt "$LowestSeconds" ]] && LowestSeconds="$Seconds"

        [[ $fDebug == true ]] && echo "${WishArr[i]} ${WishArr[i+1]} \
${WishArr[i+2]} Wish Time: ${WishArr[i+3]} Seconds: ${WishArr[i+4]} "
    done

    return 0

} # GetWish

: <<'END'
/* ------------ NOTES  --------------------------------------------------------

$ w -ish

rick     tty7     :0                2days /sbin/upstart --user
rick     pts/21   192.168.0.12      4.00s sshd: rick [priv] 
AND THEN LATER ON....
rick     pts/21   192.168.0.12     44.00s sshd: rick [priv]
rick     pts/21   192.168.0.12      1:24  sshd: rick [priv]
rick     pts/21   192.168.0.12      2:04  sshd: rick [priv]

From: https://serverfault.com/questions/302455/
      how-to-read-the-idle-column-in-the-output-of-the-linux-w-command/
      302462#302462

From the man page:

    The standard format is DDdays, HH:MMm, MM:SS or SS.CCs .
    if the times are greater than 2 days, 1hour, or 1 minute respectively.
    so your output is MM:SS (>1m and <1 hour).

---------------------------------------------------------------------------- */
END

WishSeconds () {

    # PARM 1: 'w -ish' command idle time 44.00s, 5:10, 1:28m, 3days, etc.
    #      2: Variable name (no $ is used) to receive idle time in seconds

    # NOTE: Idle time resets to zero when user types something in terminal.
    #       A looping job calling a command doesn't reset idle time.

    local Wish Unit1 Unit2
    Wish="$1"
    declare -n Seconds=$2

    # Leading 0 is considered octal value in bash. Change ':09' to ':9'
    Wish="${Wish/:0/:}"

    if [[ "$Wish" == *"days"* ]] ; then
        Unit1="${Wish%%days*}"
        Seconds=$(( Unit1 * 86400 ))
    elif [[ "$Wish" == *"m"* ]] ; then
        Unit1="${Wish%%m*}"
        Unit2="${Unit1##*:}"
        Unit1="${Unit1%%:*}"
        Seconds=$(( (Unit1 * 3600) + (Unit2 * 60) ))
    elif [[ "$Wish" == *"s"* ]] ; then
        Seconds="${Wish%%.*}"
    else
        Unit1="${Wish%%:*}"
        Unit2="${Wish##*:}"
        Seconds=$(( (Unit1 * 60) + Unit2 ))
    fi

} # WishSeconds

HostShutDownMessage () {

    # Send wall message 60, 30, 15, 10, 5, 3, 2 and 1 minute(s) before shutdown

    [[ $GsAcTimeOut == 0 ]] && return           # System never shuts down
    MinutesLeft=$(( ( GsAcTimeOut / 60 ) - ( IdleSeconds / 60 ) ))
    case $MinutesLeft in
        60|30|15|10|5|3|2|1)
            [[ $fDebug == true ]] && \
                echo "'wall' broadcast: shutdown in: $MinutesLeft minute(s)."
            wall "If no activity, shutdown in: $MinutesLeft minute(s)." ;;
        0)
            [[ $fDebug == true ]] && \
                echo "Host system shutdown at: $(date)"
            wall "HOST SYSTEM SHUTDOWN at: $(date)" ;;
    esac

} # HostShutDownMessage

SSC_Result=""
ScreenSaverCommand () {

    # Send dbus method to screen saver
    Parm1="$1"  # GetActiveTime, Inhibit, Throttle, Lock, UnThrottle, Unihibit,
                # GetActive, SetActive (requires true), SimulateUserActivity,
                # GetSessionIdleTime (broken!)
    Parm2="$2"  # Optional, a value like 'true'

    # If parameter 2 not passed force it to be unset, instead of null parm    
    SSC_Result=$(gdbus call --session --dest org.gnome.ScreenSaver \
                  --object-path /org/gnome/ScreenSaver \
                  --method org.gnome.ScreenSaver."$Parm1" ${Parm2:+"$Parm2"})
    [[ $fDebug == true ]] &&  echo Screen Saver Command: $Parm1 $Parm2   \
                                   Result: $SSC_Result

} # ScreenSaverCommand

CheckToBlankOrLock () {

    # Comments from above
    # GsAcTimeOut=0   # idle seconds until system sleeps (0=never for all settings)
    # GsIdleDelay=0   # idle seconds until screen blanks (a good thing for server)
    # GsLockDelay=0   # idle seconds until screen locks (a bad thing if logged in)
    # GsLockEnabled=0 # is lock screen enabled? ('false' overrides GsLockDelay)

    [[ $fDebug == true ]] && echo IdleSeconds: $IdleSeconds \
                                  ResetIdleSeconds: $ResetIdleSeconds

    # Is screen blanked ?
    ScreenSaverCommand "GetActive"
    if [[ $SSC_Result == *"false"* ]] ; then
        # Screen is not blanked. We may have to blank it though
        ScreenSaverCommand "SimulateUserActivity"
        NewIdle="$(xprintidle)"
        [[ $NewIdle -gt 1000 ]] && echo "ERROR: Idle time not reset: $NewIdle"
        # Screen is not blanked, check if we should blank it
        if [[ $ResetIdleSeconds -gt $GsIdleDelay ]] ; then
            [[ $fDebug == true ]] && echo Forcing screen blank
            ScreenSaverCommand "SetActive" true
        else
            : # We didn't blank screen but it is blank now from host inactivity
            # No need to simulate activity while user is active
        fi
    else
        : # Screen is blanked before simulation, blank it afterwards
#        [[ $fDebug == true ]] && echo Simiulating activity and blanking screen
        ScreenSaverCommand "SimulateUserActivity"
        ScreenSaverCommand "SetActive" true
        NewIdle="$(xprintidle)"
        [[ $NewIdle -gt 1000 ]] && echo "ERROR: Idle time not reset: $NewIdle"
    fi
    
    # TODO: Check if screen is locked.    

} # CheckToBlankOrLock

ResetIdleSeconds=0  # Total idle seconds we've invoked not host activity
SavedBlankSetting=false

SimulateUserActivity () {

    # Is screen blanking and locking check turned off with parameters?
    if [[ $fNoBlankLock == true ]] ; then
        ScreenSaverCommand "SimulateUserActivity"
        NewIdle="$(xprintidle)"
        [[ $NewIdle -gt 1000 ]] && echo "ERROR: Idle time not reset: $NewIdle"
        return 0
    fi

    if [[ $IdleSeconds -lt "$LowestSeconds" ]] ; then
        # User activity on host is resetting idle time so no need for us to.
        ResetIdleSeconds=0
    else
        # xidle seconds is greater than or equal to remote terminal activity
        ResetIdleSeconds=$(( ResetIdleSeconds + IdleSeconds ))
        CheckToBlankOrLock  # Each time called also simulates user activity
    fi

} # SimulateUserActivity

main () {

    ParseParms "$@"

    LowestSeconds=999999
    if [[ $fDebug == true ]] ; then
        LoopCnt=10   # Fake user inactivity for ten minutes
    fi

    while : ; do    # Loop forever
        Init        # Support user changing idle time settings on server
        GetWish     # Get idle times using 'w -ish'

        # Is a local user working at server or did we set last idle activity?
        IdleSeconds=$(( $(xprintidle) / 1000 ))    # returns milliseconds

        [[ $fDebug == true ]] &&  echo IdleSeconds: $IdleSeconds \
                                       LowestSeconds: $LowestSeconds
        # If xprintidle time is less than SLEEP_SECS yes there is
        # If xprintidle time is equal to last override time then no

        # If Wish Seconds < SLEEP_SECS there was activity from remote user
        if [[ $LowestSeconds -lt "$SLEEP_SECS" ]] ; then
            SimulateUserActivity
            IdleSeconds=0
        else
            IdleSeconds=$(( IdleSeconds + SLEEP_SECS ))
            # Send wall message 10, 5, 3, 2 and 1 minutes before disconnect.
            HostShutDownMessage
        fi

        sleep "$SLEEP_SECS"
    done
} # main

main "$@"
```


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Sample results on host when `ssh-activity -d` used

``` 
==========  ssh-activity.log Sun Jun 21 20:09:36 MDT 2020  ==========
IdleSeconds: 300 LowestSeconds: 338
rick pts/1 192.168.0.12 Wish Time: 1:42m Seconds: 6120 
rick pts/19 192.168.0.12 Wish Time: 6:38 Seconds: 398 
IdleSeconds: 360 LowestSeconds: 398
rick pts/1 192.168.0.12 Wish Time: 1:43m Seconds: 6180 
rick pts/19 192.168.0.12 Wish Time: 7:38 Seconds: 458 
IdleSeconds: 420 LowestSeconds: 458
rick pts/1 192.168.0.12 Wish Time: 1:44m Seconds: 6240 
rick pts/19 192.168.0.12 Wish Time: 8:38 Seconds: 518 
IdleSeconds: 480 LowestSeconds: 518
                                                                               
Broadcast message from rick@dell (somewhere) (Sun Jun 21 20:09:43 2020):       
                                                                               
If no activity, shutdown in: 10 minute(s).
```


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Remote terminal output when shutting down

If remote user doesn't type anything in terminal then these messages appears 60, 30, 15, 10, 5, 3, 2, 1 and 0 minute(s) before shutdown (suspend in my case).

{% include copyHeader.html %}
``` 
Broadcast message from rick@dell (somewhere) (Sun Jun 21 20:38:45 2020):       
                                                                               
If no activity, shutdown in: 5 minute(s).
                                                                               
                                                                               
Broadcast message from rick@dell (somewhere) (Sun Jun 21 20:40:45 2020):       
                                                                               
If no activity, shutdown in: 3 minute(s).
                                                                               
                                                                               
Broadcast message from rick@dell (somewhere) (Sun Jun 21 20:41:45 2020):       
                                                                               
If no activity, shutdown in: 2 minute(s).
                                                                               
                                                                               
Broadcast message from rick@dell (somewhere) (Sun Jun 21 20:42:45 2020):       
                                                                               
If no activity, shutdown in: 1 minute(s).
                                                                               
                                                                               
Broadcast message from rick@dell (somewhere) (Sun Jun 21 20:43:45 2020):       
                                                                               
HOST SYSTEM SHUTDOWN at: Sun Jun 21 20:43:45 MDT 2020
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a></div>

