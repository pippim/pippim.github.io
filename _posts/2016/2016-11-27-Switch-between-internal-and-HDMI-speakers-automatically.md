---
layout:       post
title:        >
    Switch between internal and HDMI speakers automatically
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854079
type:         Answer
tags:         16.04 sound pulseaudio alsa hdmi
created_date: !!str "2016-11-27 02:34:12"
edit_date:    !!str "2017-02-08 00:15:52"
votes:        !!str "9"
favorites:    
views:        !!str "10,730"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   true
clipboard:    true
---




<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Background

I had a similar problem during suspend/resume when sound would switch from HDMI TV to laptop speakers. Upon resume sound would stay on Laptop speakers and I would have to manually reset output device to TV in `System Settings` -> `Sound`.

This was one of my first annoying experiences with upgrade from **Ubuntu 14.04** to **16.04** and the root was upgrade to PulseAudio 8 that comes with **16.04 LTS**

After much searching I created a script called `TV-sound`. Although I don't plug and unplug the TV like yourself, I did some google searches and create a variation of the script to work in your situation. I've tested it and it works.

## Step 1: Create script to switch audio between connected devices

We'll create a script called `hotplugtv` which udev calls. This same script can be called in many places though. For example, during testing I used it in `lock-screen-timer` where sound reverted back to Laptop during screen lock.

``` bash
cd /usr/local/bin
sudo touch hotplugtv
sudo chmod +x hotplugtv
gksu gedit hotplugtv

```

When the editor opens with a blank screen, copy and paste the following into it:

``` bash
#! /bin/bash

```

{% include copyHeader.html %}
``` bash
# NAME: hotplugtv
# PATH: /usr/local/bin
# DESC: Update pulseaudio output device when HDMI TV plugged / unplugged
# CALL: called from /etc/udev/rules.d/99-monitor-hotplug.rules
# DATE: Created Nov 26, 2016.
# NOTE: logs output using log-file
# UPDT: Dec 14, 2016 - Sometimes /sys/class/drm/card0 & sometimes /sys/class/drm/card1
#       so use /sys/class/dmcard* instead.

if [[ $(cat /sys/class/drm/card*-HDMI-A-1/status | grep -Ec "^connected") -eq 1 ]]; then
#        log-file "HDMI TV connected" ~/bin/log-hotplugtv;
        /bin/sleep 2;
        export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";
        sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo;
else
#        log-file "HDMI TV disconnected" ~/bin/log-hotplugtv;
        export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";
        sudo -u rick -E pacmd set-card-profile 0 output:analog-stereo;
fi

exit 0

```

You will need to replace the two occurrences of `rick` with your own user id, ie `UTF-8`, etc.

I know this can be more professional with user name automatically set to a bash variable but I'm not that skilled yet :( Anyway, save the file and exit `gedit`.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Step 2: Create udev rules

udev monitors hotplug events when you plug in and unplug your HDMI monitor. Type the following to create a new rule.

``` bash
cd /etc/udev/rules.d
sudo cp 70-persistent-net.rules 99-hotplugtv.rules
gksu gedit 99-hotplugtv.rules

```


**NOTE:** If the file `70-persistent-net.rules` doesn't exist in your directory copy any other file there. We don't need the file contents,
just the file permissions to ensure ours are the same.

The editor will show a bunch of irrelevant text, highlight it and delete it.  Then highlight the code below and paste it into the editor:

``` bash
# NAME: 99-hotplugtv.rules
# PATH: /etc/udev/rules.d
# DESC: Update pulseaudio output device when HDMI TV plugged / unplugged
# CALL: automatically called on system events
# DATE: Created Nov 26, 2016.
# NOTE: in future may requre systemd service hooks

ACTION=="change", SUBSYSTEM=="drm", ENV{HOTPLUG}=="1", RUN+="/usr/local/bin/hotplugtv"

```

Save the file and exit.

To enable the rule (without rebooting) we need to reload udev:

``` bash
sudo udevadm control --reload-rules

```

Now you can plug and unplug your HDMI monitor / TV and the sound switches appropriately.


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Caveat

On my system the sound automatically reverts to the Laptop speakers when HDMI is unplugged. On your system it did not. Further enhancements to the code may be required if sound doesn't go to your Laptop speakers when HDMI is unplugged. Please reply via comment below how things work / don't work out.

## Quick testing in CLI

You can quickly test the code at the terminal by using:

``` bash
    export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";

```

 - Switch to HDMI / TV:

``` bash
        sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo;

```

 - Switch back to built in speakers:

``` bash
        sudo -u rick -E pacmd set-card-profile 0 output:analog-stereo;

```

 - Remember to replace `rick` with your user name. 
 - The initial `export` line probably isn't necessary but I've included it just to be safe. 
 - If you have multiple sound cards, or something other than `hdmi-stereo` tweaks are obviously needed to find out the correct parameters before writing your script.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Deciphering your device name within PulseAudio

The code below uses the same command twice. Once when the sound is set to external HDMI TV. A second time when the sound is set to the Laptop's built in speakers. Each time you see the name PulseAudio uses:

``` bash
$ pacmd list-sinks | grep -e 'name:' -e 'index'
  * index: 28
	name: <alsa_output.pci-0000_00_1b.0.hdmi-stereo>
───────────────────────────────────────────────────────────────────────────────
$ pacmd list-sinks | grep -e 'name:' -e 'index'
  * index: 30
	name: <alsa_output.pci-0000_00_1b.0.analog-stereo>

```


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## When you have multiple sound cards

Use the command `aplay -l` to see if you have cards greater than number 0. If so you will need to use appropriate card number in your scripts. For example:

``` bash
$ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: PCH [HDA Intel PCH], device 0: 92HD91BXX Analog [92HD91BXX Analog]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 0: PCH [HDA Intel PCH], device 3: HDMI 0 [HDMI 0]
  Subdevices: 0/1
  Subdevice #0: subdevice #0

```

In the above example all card numbers are 0 with different output sources. If you have USB speakers they can have a different card number than 0.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Edit December 2, 2016

For some unknown reason the script was broken today. Above code used to read: "$(cat /sys/class/drm/card0-HDMI-A-1/status" but I had to change `card0` to `card1` and the code above has been revised as such. I can't explain what changed on my system other than regular Ubuntu updates since November 26, 2016.

## Edit December 14, 2016

Above code needed to be switched again back to: "$(cat /sys/class/drm/card0-HDMI-A-1/status". Instead of revising code between `card0` and `card1` depending on boot, revise program to reference `card*` to capture both scenarios.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a></div>

