---
layout:       post
title:        >
    No sound on wake, Dummy Output always takes over. 'pulseaudio -k' the fix
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191684
type:         Answer
tags:         sound suspend pulseaudio wakeup
created_date: 2019-11-25 23:32:27
edit_date:    
votes:        "4 "
favorites:    
views:        "3,129 "
accepted:     
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-25-No-sound-on-wake^-Dummy-Output-always-takes-over.-^pulseaudio--k^-the-fix.md
toc:          false
navigation:   false
clipboard:    true
---

It be caused by a new kernel introduced in 19.10 like this case:

- [Lagging after update to 19.10 from 19.04]({% post_url /2019/2019-10-28-Lagging-after-update-to-19.10-from-19.04 %})

<!-- Language-all: lang-bash -->

If not then you can use this script `/etc/systemd/system-sleep/reloadpulse`:

{% include copyHeader.html %}
``` sh
#!/bin/sh

# NAME: reloadpulse
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically

# DESC: PulseAudo 8 sets sound to dummy ouput when going to sleep.
#       This script kills and reloads pulse audio.

# DATE: November 25, 2019.

# NOTE: Written for ask ubuntu question:
#       https://askubuntu.com/questions/1191649/why-no-sound-on-wake-dummy-output-takes-over-pulseaudio-k-the-fix

case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    ;;
  post/*)
    echo "$0: Waking up from $2..."
    pulseaudio -k
    ;;
esac
```

Mark the script executable with `chmod a+x /etc/systemd/system-sleep/reloadpulse`

After updates deactivate it with `chmod a-x /etc/systemd/system-sleep/reloadpulse`

Then if the update didn't fix the problem make it executable again.

You need to reboot for changes to take effect.
