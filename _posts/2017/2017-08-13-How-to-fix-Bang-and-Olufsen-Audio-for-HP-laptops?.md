---
layout:       post
title:        >
    How to fix Bang and Olufsen Audio for HP laptops?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/945969
type:         Answer
tags:         drivers sound pulseaudio speakers
created_date: 2017-08-13 23:37:45
edit_date:    2021-01-07 00:31:36
votes:        "3 "
favorites:    
views:        "24,730 "
accepted:     
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

# Two years later it is possible!

There is a new [answer with a comment confirming it works][1]. The link is included so people are apprised of updates to this issue.


----------


# Original answer

This is no longer true but left her for posterity purposes.

## It doesn't seem possible

I looked on HP website and found this:

- [How to install Bang and Olufsen Audio drivers on Ubuntu 16.04][2] 

The so-called "HP Expert" there said it's like trying to put a jet engine in a car and make it fly like an AirBus A380. So not very promising. He did reference another question here in ***Ask Ubuntu***:

- [How to install Bang and Olufsen Audio drivers for HP laptop?][3]

...however that has no answers either.

## Do a little more digging

I did a little more digging and found this bug report:

- [HP Spectre x360 (Kabylake) just front speakers work][4]

There are 91 comments posted from November 29, 2016 up to yesterday (August 12, 2017). There are various band-aid approaches people have tried. I suggest you subscribe to the bug report and keep abreast of bug fixes / work arounds.

Like your system there are two front speakers powered from motherboard and two back speakers powered by separate amplifier. 

The most successful band-aid to date requires installing a windows update and rebooting into Linux. This "tricks" the amplifier to being powered on. After rebooting into Linux poking in some register configuration values is required. You can read all about it in the 91 comments but I just wanted to summarize it for you.

Hopefully someone will reverse-engineer the Windows driver for Bang & Olufsen and create one for Linux. It doesn't appear HP is willing to do it.


  [1]: https://askubuntu.com/a/1120269/307523
  [2]: https://h30434.www3.hp.com/t5/Notebook-Audio/How-to-install-Bang-and-Olufsen-Audio-drivers-on-Ubuntu-16/td-p/6069282
  [3]: https://askubuntu.com/questions/873881/how-to-install-bang-and-olufsen-audio-drivers-for-hp-laptop
  [4]: https://bugzilla.kernel.org/show_bug.cgi?id=189331
