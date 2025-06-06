---
layout:       post
title:        >
    How to use "xrandr --gamma" for Gnome "Night Light"-like usage?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1061304
type:         Answer
tags:         ubuntu-gnome xrandr redshift f.lux gamma eyesome
created_date: 2018-08-01 04:12:55
edit_date:    2021-12-17 11:59:38
votes:        "30 "
favorites:    
views:        "28,249 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-01-How-to-use-_xrandr-gamma_-for-Gnome-_Night-Light_-like-usage_.md
toc:          false
navigation:   false
clipboard:    false
---

## December 9, 2018 Update - `sct`

I found source code for program `sct` which allows user to set color temperature. It has "cribbed the code" from `redshift` and provides mapping for red, green and blue values:



``` c
/* cribbed from redshift, but truncated with 500K steps */
static const struct { float r; float g; float b; } whitepoints[] = {
    { 1.00000000,  0.18172716,  0.00000000, }, /* 1000K */
    { 1.00000000,  0.42322816,  0.00000000, },
    { 1.00000000,  0.54360078,  0.08679949, },
    { 1.00000000,  0.64373109,  0.28819679, },
    { 1.00000000,  0.71976951,  0.42860152, },
    { 1.00000000,  0.77987699,  0.54642268, },
    { 1.00000000,  0.82854786,  0.64816570, },
    { 1.00000000,  0.86860704,  0.73688797, },
    { 1.00000000,  0.90198230,  0.81465502, },
    { 1.00000000,  0.93853986,  0.88130458, },
    { 1.00000000,  0.97107439,  0.94305985, },
    { 1.00000000,  1.00000000,  1.00000000, }, /* 6500K */
    { 0.95160805,  0.96983355,  1.00000000, },
    { 0.91194747,  0.94470005,  1.00000000, },
    { 0.87906581,  0.92357340,  1.00000000, },
    { 0.85139976,  0.90559011,  1.00000000, },
    { 0.82782969,  0.89011714,  1.00000000, },
    { 0.80753191,  0.87667891,  1.00000000, },
    { 0.78988728,  0.86491137,  1.00000000, }, /* 10000K */
    { 0.77442176,  0.85453121,  1.00000000, },
};
```

The three columns above are values for **Red**, **Green** and **Blue**.

## November 4, 2018 Update - Eyesome

I wrote a collection of bash scripts called **Eyesome** that [adjust brightness and gamma gradually][1] at dawn and dusk over a 90 minute to 120 minute period. Although user can change the settings, a good starting point for full brightness setting is:

``` c
xrandr --output DP-1-1 --gamma 1:1:1 --brightness 1.0
```

The nighttime setting (for one of the three monitors) is:

``` c
xrandr --output DP-1-1 --gamma 1.0:0.88:0.76 --brightness 0.55
```

**Note:** Up to three monitors can be defined with separate settings.

----------

## Original Answer

Finally found one answer: [MORE OF XRANDR OR BLUE LIGHT EXPOSURE][2] This script is presented:



``` sh
#!/bin/sh 

night_mode() { 
  for disp in $(xrandr | sed -n 's/^\([^ ]*\).*\<connected>.*/\1/p'); do 
    xrandr --output $disp --gamma $1 --brightness $2 
  done } 
case $1 in 
  off) night_mode 1:1:1 1.0 ;; 
  *) night_mode 1:1:0.5 0.7 ;;
esac
```

The script reduces blue light component and brightness of all Xorg displays attached. Simply save it in your `bin` directory, `chmod +x` it and, if you want to, add a `cron` job or keyboard shortcut to call the function.

How it works? Simply type in the script name without any parameters to reduce blue light. To return to normal setting, add `off` parameter after the command.


  [1]: https://github.com/WinEunuuchs2Unix/eyesome
  [2]: https://blog.onetwentyseven001.com/more-of-xrandr-or-blue-light-exposure/#.W2ExkRRKjb1
