---
layout:       post
title:        >
    Alternatives for f.lux/redshift
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1077891
type:         Answer
tags:         redshift f.lux eyesome
created_date: 2018-09-24 04:29:46
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "4,590 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-24-Alternatives-for-f.lux_redshift.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# eyesome

Eyesome is a bash script running as a deamon and sleeping most of the time 24/7. It automatically adjusts screen brightness (and optionally gamma too) for your laptop display via hardware interface and up to two other monitors using xrandr's software control.

At sunrise (the time is automatically obtained from the internet each day), your screen brightness (and optionally gamma too) is adjusted gradually. The gradual adjustment is defined by you but, 120 minutes works for me. To keep the adjustments unnoticeable set a sleep interval between adjustments. Anywhere between 15 and 60 seconds is probably best and the default is 60.

After sunrise transition is complete, eyesome daemon sleeps many hours until sunset transition starts. I'm using 90 minutes before sunset but you can set any period you like.

Inversely to sunrise transition, the sunset transition gradually decreases screen brightness (and optionally gamma too) so it is unnoticeable.

Note that during nighttime transition gamma may increase. For example Red gamma may be defined as 1.0 during day and 1.2 during night to reduce eye strain. Blue gamma in turn may be defined as 1.0 during day and .8 during night so it will decrease instead.

To reduce resources, eyesome sleeps the entire period between sunset and sunrise. Depending on where you live and the season of the year, the average sleep will be 12 hours.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# Eyesome Setup - Main Menu

To configure eyesome, a main menu is provided:

[![eyesome main menu.png][1]][1]


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Edit Configuration - General tab

When you click the ***Edit*** button from the main menu the edit configuration general tab initially appears as shown below.

[![eyesome configuration general tab.png][2]][2]

Your country/city name should automatically appear. If necessary you can override it.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

## Edit Configuration - Monitor 1 tab

Clicking on Monitor 1 tab above will reveal this panel in my configuration (yours may be different):

[![eyesome-edit-configuration-monitor-1.png][3]][3]

Don't be daunted by these settings they are for the most part automatically obtained by eyesome. You will need to set the daytime and night brightness/levels though.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">Skip</a></div>

## Edit Configuration - Monitor 3 Tab

Clicking on Monitor 3 Tab reveals this panel in my configuration (yours may be different):

Monitor 2 Tab is not shown because it is a new TV with adaptive brightness and Smart OS. It requires no overrides by Eyesome.

[![enter image description here][4]][4]

If after eyesome is installed you attach a different monitor to your system you may have to enter the `xrandr` monitor name.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>

## Eyesome Setup - 5 second test

From the main menu you can test your daytime and nighttime brightness and gamma settings for 5 seconds by clicking the ***Daytime*** and ***Nighttime*** buttons respectively. You can change the duration of the test from 5 seconds up to 20 seconds from the Edit Configuration - General Tab.

Here's what the 5 second Nighttime test looks like:

[![eyesome nighttime test.gif][5]][5]


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr8">Skip</a></div>

# Unusual event handling

Assume you suspend your laptop when it's morning before work and the screen is at full dim. You come home after work when the sun is high in the sky and open your laptop. The screen is so dim you can't read it.

To address this scenario a systemd control file is provided:

- `/etc/systemd/system-sleep/systemd-wake-eyesome` control file is called whenever the system suspends or resumes.
- The control file calls the bash script `/usr/local/bin/wake-eyesome.sh` to reset brightness to full and then sleep until sunset transition.

You are watching a movie on your external TV at night and close your laptop lid for better viewing. Ubuntu / Lightdm / xrandr takes a few seconds and then resets your external TV to full full brightness. OUCH to your eyes.

To address this scenario an acpi event control file is provided:

- `/etc/acpi/event/lid-event-eyesome` control file is called whenever the laptop lid is opened or closed.
- The control file calls the bash script `/etc/acpi/acpi-lid-eyesome.sh` to handle the lid opening and closing.
- In turn the eyesome bash script calls `/usr/local/bin/wake-eyesome.sh` to reset brightness for nighttive viewing and then sleeps until sunset transition.


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr9">Skip</a></div>

# Summary

Eyesome can be downloaded from: [https://github.com/WinEunuuchs2Unix/eyesome](https://github.com/WinEunuuchs2Unix/eyesome)

This program was just released in September 2018 so please let me know if you find any problems or have suggestions for improvement.

The documentation phase is just starting so don't hesitate to ask any questions. Your questions may even result in documentation improvements.


  [1]: https://i.stack.imgur.com/6GNDi.png
  [2]: https://i.stack.imgur.com/VsnEL.png
  [3]: https://i.stack.imgur.com/q0rF6.png
  [4]: https://i.stack.imgur.com/hiPhl.png
  [5]: https://i.stack.imgur.com/n4xTL.gif


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a></div>

