---
layout:       post
title:        >
    Can I use cron to chime at top of hour like a grandfather clock?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832266
type:         Answer
tags:         sound scripts cron
created_date: 2016-10-02 15:58:32
edit_date:    2020-06-12 14:37:07
votes:        "8 "
favorites:    
views:        "2,598 "
accepted:     Accepted
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-02-Can-I-use-cron-to-chime-at-top-of-hour-like-a-grandfather-clock_.md
toc:          false
navigation:   false
clipboard:    true
---

[heemayl][1] has provided the correct answer to get `cron` to run at the top of the hour and bottom of the hour. **Thanks again!** However as other users have discovered a `cronjob` cannot play sound files by default:

- [How to make speaking clock ( via cron and festival tts) work while playing music](How to make speaking clock ( via cron and festival tts) work while playing music)
- [Help using crontab to play a sound](Help using crontab to play a sound)

----------



## Configuring `cron` to play sounds

In order for `cron` to play sound files it needs to `export` an environment variable:

``` bash
export XDG_RUNTIME_DIR="/run/user/1000"
```

Once this is done in your script sounds will play.

As pointed out by another answer **your** user ID may not always be `1000`. To find your user ID use:

``` bash
$ id

uid=1000(rick) gid=1000(rick) groups=1000(rick),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),113(lpadmin),128(sambashare)
```

If your user ID is not 1000, then change the script to your ID.

### Configure `cron` to run top of hour and bottom of hour

`crontab -e` setup (last 5 lines only):

``` bash
# For more information see the manual pages of crontab(5) and cron(8)
# 
# m h  dom mon dow   command
00 *    *   *   *    /usr/local/bin/top-of-hour-chime    >/dev/null
00,30 * *   *   *    /usr/local/bin/bottom-of-hour-chime >/dev/null
```

Most users setup `cron` to use the `nano` editor. Use these control keys in `nano` to save your work:

- Add the last two lines above and use <kbd>Ctrl</kbd>+<kbd>O</kbd> to write **O**ut (save) the file. 
- A `/tmp...` filename is presented, but do not be concerned, simply press <kbd>Enter</kbd>.
- Now use <kbd>Ctrl</kbd>+<kbd>X</kbd> to e**X**it the `nano` editor.

The `bottom-of-hour-chime` script runs at the top of the hour too but, that is OK since it's short and sweet.

If you don't have the `>/dev/null` at the end of the lines `cron` tries to email you with the command output. If you don't have the mail server setup an error message appears in your `/var/log/syslog` file:

``` bash
Oct 02 10:00:07 dell CRON[21259]: (CRON) info (No MTA installed, discarding output)
```

## Configuring `cron` to display pop-up notifications

The script  displays a pop-up notification message at the top of every hour. So for this an additional variable needs to be exported:

``` bash
eval "export $(egrep -z DBUS_SESSION_BUS_ADDRESS /proc/$(pgrep -u $LOGNAME gnome-session)/environ)";
```

### Contents of `top-of-hour-chime`

{% include copyHeader.html %}
``` bash
#! /bin/bash

# NAME: top-of-hour-chime
# PATH: /usr/local/bin
# DESC: Play sound called by cron
# CALL: Automatically called by /var/spool/cron/crontabs/<user_name>
# DATE: Created Oct 1, 2016. Modified June 10, 2018.
# UPDT: 2016-11-09 - Add notification bubble with time in text.
#       2018-06-10 - Switch from `ogg123` to `paplay` in default installation.

# exit # uncomment to suppress when watching movies

# paplay needs environment variable exported:
export XDG_RUNTIME_DIR="/run/user/1000"

# needed for notify-send
eval "export $(egrep -z DBUS_SESSION_BUS_ADDRESS /proc/$(pgrep -u $LOGNAME gnome-session)/environ)";

# get hour in 12 hour format
HOUR=$(date +%I)
ZHOUR=$(echo $HOUR | sed 's/^0*//')

pactl set-sink-volume 0 -25%
DISPLAY=:0 notify-send --urgency=critical --icon=/usr/share/icons/gnome/256x256/status/appointment-soon.png "It is ""$ZHOUR"" o'clock"
paplay '/usr/share/sounds/ubuntu/ringtones/Melody piano.ogg'
pactl set-sink-volume 0 +25%
```

The `export XDG_RUNTIME_DIR...` is necessary to get sound to play. This is because `cron` runs in minimal environment. This line should be omitted first if it you use a third party sound player. Then if no sound put the line back. Then still if no sound, well happy hunting!

The two main TV news shows I watch over the net have softer volume than normal so I have the TV turned up higher than normal. Consequentially when `ogg123` plays sound files they sound very loud. So `pactl` is used to reduce volume before chime and increase it afterwards.


### Contents of bottom-of-hour-chime

This is almost a duplicate of `top-of-hour-chime` and perhaps redundant here, but included for full documentation purposes.

``` bash
#! /bin/bash

# NAME: bottom-of-hour-chime
# PATH: /usr/local/bin
# DESC: Play sound called by cron
# CALL: Automatically called by /var/spool/cron/crontabs/<user_name>
# DATE: Oct 1, 2016. Modified June 10, 2018.

# UPDT: 2018-06-10 Switch from `ogg123` to `paplay` installed by default.

# exit # Uncomment to suppress when watching movies.

# paplay needs environment variable exported:
export XDG_RUNTIME_DIR="/run/user/1000"

pactl set-sink-volume 0 -25%
paplay /usr/share/sounds/ubuntu/ringtones/Bliss.ogg
pactl set-sink-volume 0 +25%
```


  [1]: https://askubuntu.com/users/216503/heemayl





