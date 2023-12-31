---
layout:       post
title:        >
    Force GNOME Night Light to stay on and never turn off
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1198225
type:         Answer
tags:         gnome 18.04 display
created_date: 2019-12-24 04:22:26
edit_date:    2019-12-24 04:35:08
votes:        "1 "
favorites:    
views:        "10,390 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-24-Force-GNOME-Night-Light-to-stay-on-and-never-turn-off.md
toc:          false
navigation:   false
clipboard:    false
---

The question can be reframed to "How can I have screen color temperature at 5000 all the time?".

In this case you can use `xrandr` to set the color temperature. From these notes:

``` 
/* -----------------------------------------------------------------------------
    Dec 9, 2018 - Future Help Screen? Below taken from `sct` C source code:
    
/* cribbed from redshift, but truncated with 500K steps */
static const struct { float r; float g; float b; } whitepoints[] = {
	{ 1.00000000,  0.18172716,  0.00000000, }, /* 1000K */
	{ 1.00000000,  0.42322816,  0.00000000, },
	{ 1.00000000,  0.54360078,  0.08679949, }, /* 2000K */
	{ 1.00000000,  0.64373109,  0.28819679, },
	{ 1.00000000,  0.71976951,  0.42860152, }, /* 3000K */
	{ 1.00000000,  0.77987699,  0.54642268, },
	{ 1.00000000,  0.82854786,  0.64816570, }, /* 4000K */
	{ 1.00000000,  0.86860704,  0.73688797, },
	{ 1.00000000,  0.90198230,  0.81465502, }, /* 5000K */
	{ 1.00000000,  0.93853986,  0.88130458, },
	{ 1.00000000,  0.97107439,  0.94305985, }, /* 6000K */
	{ 1.00000000,  1.00000000,  1.00000000, },             /* 6500K */
	{ 0.95160805,  0.96983355,  1.00000000, }, /* 7000K */
	{ 0.91194747,  0.94470005,  1.00000000, },
	{ 0.87906581,  0.92357340,  1.00000000, }, /* 8000K */
	{ 0.85139976,  0.90559011,  1.00000000, },
	{ 0.82782969,  0.89011714,  1.00000000, }, /* 9000K */
	{ 0.80753191,  0.87667891,  1.00000000, },
	{ 0.78988728,  0.86491137,  1.00000000, }, /* 10000K */
	{ 0.77442176,  0.85453121,  1.00000000, },
};

----------------------------------------------------------------------------- */
```

You can see 5000K is:

``` 
{ 1.00000000,  0.90198230,  0.81465502, }, /* 5000K */
```

So you can use `xrandr` like this

``` 
xrandr --output DP-1 --gamma 1:.90:.81
```

Do this on startup and forget about Night Light or any other add on.


----------

Ironically looking at the code `redshift` (at night) mostly entails **blue shift** + **green shift** (reduction).
