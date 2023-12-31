---
layout:       post
title:        >
    Set initial startup background brightness depending on daytime
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/887249
type:         Answer
tags:         boot laptop brightness backlight eyesome
created_date: 2017-02-25 18:52:40
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "1,426 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-25-Set-initial-startup-background-brightness-depending-on-daytime.md
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# eyesome

Eyesome is a bash script running as a daemon and sleeping most of the time 24/7. It automatically adjusts screen brightness (and optionally gamma too) for your laptop display via hardware interface and up to two other monitors using `xrandr` software control.

At sunrise (the time is automatically obtained from the internet each day), your screen brightness and gamma (aka color temperature, hue or tint) is adjusted gradually. Before sunset gradual adjustments are made for nighttime settings. In between these periods they eyesome daemon sleeps many hours.

What distinguishes eyesome from Redshift, Night Light and similar products is the ability to simultaneously control three monitors with unique settings. Also notable is eyesome controls brightness (both hardware and software) in addition to color temperature.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Eyesome Setup - Main Menu

When you run `sudo eyesome-cfg.sh` this main menu appears:

[![eyesome main menu.png][1]][1]


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

## Edit Configuration - General tab

When you click the ***Edit*** button from the main menu the edit configuration general tab initially appears as shown below.

[![eyesome configuration general tab.png][2]][2]

If the "brightness update interval" too short can cause too small hardware brightness adjustments that some laptops will ignore. If your screen isn't dimming before sunset, increase the interval to 60 seconds or more. You can watch the current brightness level change on the Monitor Tab. If for example you see the level changing by less than 21 each update interval, it's too short for a Dell Alienware 17R3 laptop. Yet a brightness change of 1 works fine on a Dell Inspiron 17" 7720 SE laptop.

Your "country/city name" should automatically appear. If necessary you can override it.

The check box for "Watch external monitor plugging / power switching" also applies for random times where some application invokes the color management dbus daemon that resets `xrandr` to 100% brightness and gamma. Unless there is a good reason not to, you should check this box.

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

## Edit Configuration - Monitor 1 tab

Clicking on Monitor 1 tab reveals this panel in my configuration (yours may be different):

[![eyesome-edit-configuration-monitor-1.png][3]][3]

Don't be daunted by these settings because most are automatically obtained by eyesome. You will need to set the daytime and night brightness/levels though.

If the gamma values for Red, Green and Blue are intimidating, you can fine tune them later with the ***Override*** button from the Main Menu. There you have access to a slider control for color temperature where 3500 is typical nighttime setting and 6500 is typical daytime setting. Typical daytime setting is 1.0 for Red, Green and Blue channels which is every systems default.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

## Edit Configuration - Monitor 3 Tab

Clicking on Monitor 3 Tab reveals this panel in my configuration (yours may be different):

Monitor 2 Tab is not shown because it is a new TV with adaptive brightness and Smart OS. It requires no overrides by Eyesome.

[![enter image description here][4]][4]

When eyesome is installed configuration is automatically created for the most part. If later on you attach a different monitor you may have to enter the `xrandr` monitor name.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## Eyesome Setup - 5 second test

From the main menu you can test your daytime and nighttime brightness and gamma settings for 5 seconds by clicking the ***Daytime*** and ***Nighttime*** buttons respectively. You can change the duration of the test from 1 second up to 20 seconds from the Edit Configuration - General Tab.

Here's what the 5 second Nighttime test looks like:

[![eyesome nighttime test.gif][5]][5]

In real life you see the screen dim dramatically if you run the test in the daytime. Screen recorders used to make above .gif animation cannot record the brightness or color temperature (gamma) change though.


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

## Eyesome Override

When you click the ***Override*** button from the Main Menu this window appears:

[![eyesome override main window.png][6]][6]

No doubt your first step would be to click the ***Help using this window*** button:

[![eyesome override help button.png][7]][7]

Assume we click the ***Get*** button and select Monitor 3, Nighttime setting:

[![eyesome override monitor 3 nightime.png][8]][8]

Now that we have default values in memory click the ***Color*** button:

[![eyesome override color temperature to gamma.png][9]][9]

Grab the slider and move it left to for warmer/redish color setting at night. Move the slider right for colder/bluish color setting at day. Click the ***Convert*** button to calculate Red, Green, Blue gamma channels or ***Quit*** button if you changed your mind.

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

# Unusual event handling

Assume that you suspend your laptop in the morning before heading to work and the screen is at full dim. You come home after work when the sun is high in the sky and open your laptop. Now the screen is so dim it's hard to read.

To address this scenario a systemd control file is provided:

- `/etc/systemd/system-sleep/systemd-wake-eyesome` control file is called whenever the system suspends or resumes.
- The control file calls the bash script `/usr/local/bin/wake-eyesome.sh` to set brightness according to time and then sleep until next transition period.

You are watching a movie on your external TV at night and close your laptop lid for better viewing. Ubuntu / Lightdm / xrandr takes a few seconds and then resets your external TV to full full brightness. OUCH to your eyes.

To address this scenario an acpi event control file is provided:

- `/etc/acpi/event/lid-event-eyesome` control file is called whenever the laptop lid is opened or closed.
- The control file calls the bash script `/etc/acpi/acpi-lid-eyesome.sh` to handle the lid opening and closing.
- In turn the eyesome bash script calls `/usr/local/bin/wake-eyesome.sh` to reset brightness for nighttive viewing and then sleeps until sunset transition.


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

# Summary

This answer is almost two years to the day after the question was posted. There was an early version of this answer deleted in February 2017 which I've just undeleted and revised.

Eyesome can be downloaded from: [https://github.com/WinEunuuchs2Unix/eyesome](https://github.com/WinEunuuchs2Unix/eyesome)

Eyesome was released in September 2018. Then it revised in June 2020 with color temperature features to ease burden of entering red, green and blue gamma channels. Even more changes are planned to enter sunrise and sunset times manually.

  [1]: https://i.stack.imgur.com/pP4Ey.png
  [2]: https://i.stack.imgur.com/ByT5c.png
  [3]: https://i.stack.imgur.com/q0rF6.png
  [4]: https://i.stack.imgur.com/hiPhl.png
  [5]: https://i.stack.imgur.com/n4xTL.gif
  [6]: https://i.stack.imgur.com/Qgscd.png
  [7]: https://i.stack.imgur.com/HHhwz.png
  [8]: https://i.stack.imgur.com/reat5.png
  [9]: https://i.stack.imgur.com/0IYJE.png


<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a></div>

