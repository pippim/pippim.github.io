---
layout:       post
title:        >
    AlienFX on Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1065539
type:         Answer
tags:         drivers alienware keyboard-backlight
created_date: !!str "2018-08-15 10:47:00"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "3"
favorites:    
views:        !!str "12,498"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

## Update: July 20 2019

A deleted answer below points out how AW13R3 is not supported. It appears that **AlienFXLite** and **PyALienFX** have both been abandoned for a number of years.

I've found a github page for **AKBL** (Alienware Keyboard Lights) to control [Alienware Light Effects][1]. **AKBL** was updated just 10 days ago:

[![AKBL GUI.png][2]][2]

Sadly I've had this AW17R3 laptop for almost two years but have never found time to "play with" the light effects. This new program **AKBL** looks promising as it's written in Python and does some cool thing such as change light colors depending on the weather outside.

Some cool ideas off the top of my head would be setting colors based on CPU%:

- <10%=green, 10-20%=blue, 20-30%=yellow, 30-4%0=orange, 40-50%=purple, 50+%=red.

----------

## Original Answer

I found this package: [AlienFxLite][3]

[![AlienFx lite.png][4]][4]

> This software was initially developed for M15x and M17x laptops. The  
> latest modifications were tested on the M14x R2 and R3 laptops.  

Disadvantage as you need to compile it.

----------

There is also a newer package: [alienfx][5]

[![alienfx.png][6]][6]

Advantages:

- Comes with `.deb` package for Ubuntu installation
- Last updated 1 months ago (July 2018).
- Your laptop appears supported  as device #10 and mine as device #14: https://github.com/trackmastersteve/alienfx/blob/master/docs/Knowledgebase/Devicelist.md

I'll try to test this on my AW17R3 soon and report back.


  [1]: https://github.com/rsm-gh/akbl
  [2]: https://i.stack.imgur.com/x8HRc.png
  [3]: https://github.com/bchretien/AlienFxLite
  [4]: https://i.stack.imgur.com/YzA20.png
  [5]: https://github.com/trackmastersteve/alienfx
  [6]: https://i.stack.imgur.com/Ic6f4.png
