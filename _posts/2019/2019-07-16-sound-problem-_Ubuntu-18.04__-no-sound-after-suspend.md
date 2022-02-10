---
layout:       post
title:        >
    sound problem (Ubuntu 18.04): no sound after suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1158638
type:         Answer
tags:         18.04 sound suspend
created_date: 2019-07-16 11:28:28
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "3,090 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-16-sound-problem-_Ubuntu-18.04__-no-sound-after-suspend.md
toc:          false
navigation:   false
clipboard:    true
---

## Edit: July 18, 2019

Question has been revised with new information:

> after waking up from suspend it says (there‘s only one number  
> different in the third line, don‘t know what that means):  

### The third line has changed from `IRQ 134` to `IRQ 25`. 

**IRQ** stands for **Interrupt Request**. It's basically a telephone number where the device calls the **CPU** (**C**entral **P**rocessing **U**nit) to have work done. Because the telephone number has changed between suspend and resume the sound card can't call the CPU to get work done.

----------


<!-- Language-all: lang-bash -->

Here's a script I used a few years ago `/lib/systemd/system-sleep/sound`:

{% include copyHeader.html %}
``` 
#!/bin/sh

# NAME: sound
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically

# DESC: PulseAudo 8 sets sound to laptop when going to sleep.
#       This script sets sound back to TV.

# DATE: Sep 23 2016. Modified: Oct 28, 2018.

# NOTE: Test psmouse for askubuntu.com "Touchpad not working after suspending laptop"

# Aug 5, 2018  -    Turn off executition bit. As per AU turn off automatic switching:
# https://askubuntu.com/questions/1061414/how-to-disable-pulseaudio-automatic-device-switch/1061578#1061578
#                   Turn execution bit back on as there is no sound at all.
case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    # Place your pre suspend commands here, or `exit 0` if no pre suspend action required
    #    modprobe -r psmouse
    sleep 1
    ;;
  post/*)
    echo "$0: Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` if no post suspend action required
    sleep 2
    # modprobe psmouse
    export PULSE_RUNTIME_PATH="/run/user/1000/pulse/"
    sudo -u UserName -E pacmd set-card-profile 0 output:hdmi-stereo
    ;;
esac
```

- change `UserName` to your user name.
- change `hdmi-stereo` to your output name. See [Configure pulseaudio output via command line ](https://www.whatsdoom.com/posts/2015/12/01/configure-pulseaudio-output-via-command-line/) for `pacmd list-cards`
- make script executable with `sudo chmod a+x /lib/systemd/system-sleep/sound`

**Note** my new system doesn't need to use this script anymore. Not sure if it will work in your case but it might.
