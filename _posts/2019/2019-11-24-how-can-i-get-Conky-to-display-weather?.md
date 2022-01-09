---
layout:       post
title:        >
    how can i get Conky to display weather?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191205
type:         Answer
tags:         18.04 conky weather eyesome
created_date: 2019-11-24 00:53:55
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "8,707 "
accepted:     Accepted
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    false
---

## Edit June 7, 2020

I have conky on a 4K TV now so there is ample space to expand the height with weather information.

It is very important to select a mono spaced font that supports arrow signs for wind direction. I choose **GE Inspira Mono** 12 point but had to restore to **Ubuntu** 10.5 point afterwards:

``` 
#------------+
# Brightness |
#------------+
${color orange}${voffset 2}${hr 1}
${color1}${goto 5}Sun Rise: ${color green}${execpi 300 cat /usr/local/bin/.eyesome-sunrise} ${goto 175}${color1}Set: ${color green}${execpi 300 cat /usr/local/bin/.eyesome-sunset} ${alignr}${color1}Level: ${color green}${execpi 10 cat /sys/class/backlight/intel_backlight/brightness}
#------------+
# Weather    |
#------------+
${color orange}${voffset 2}${hr 1}
#${font GE Inspira Mono:size=12}${alignc}${color green}${execpi 300 curl wttr.in/Edmonton?T0 --silent --max-time 3}${font ubuntu:size=10.5}
${font Dejavu Sans Mono:size=12}${alignc}${color green}${execpi 300 curl wttr.in/Edmonton?T0 --silent --max-time 3}${font ubuntu:size=10.5}
```

This is what it looks like now:

[![conky weather.png][1]][1]

Yes it is unusually cold for 6 pm on June 7. Worse yet all the rain caused a 20 block power outage a couple hours ago! It was a mixed blessing because I got to install the 32 GB RAM upgrade I bought in March 2020 but was procrastinating on. System is snappier now!

**NOTE:** Sunrise and Sunset times are fake. I was testing a new function in `eyesome` today to override the daily automatic retrieval off the internet of Sun Times (aka Twilight times).

----------

## Original Answer

Weather is too much information to squeeze into my conky display which is already pretty full. So instead I put it in my [terminal splash screen][2]:

[![terminal splash screen.png][3]][3]

You can get the same information from the command line which you can call from conky:

``` 
$ curl wttr.in/Edmonton?0 --silent --max-time 3

Weather report: Edmonton

     \   /     Clear
      .-.      7..8 °C        
   ― (   ) ―   → 6 km/h       
      `-’      10 km          
     /   \     0.0 mm         

```

To get your city name for `wttr.in` see:

- [The right way to check the weather https://wttr.in][4]


----------


# Display an image in conky

I saved a picture of today's weather from darksky.net and displayed it in conky with the `${image}` command:

[![Weather in conky.png][5]][5]

The relevant conky commands are:

``` 
#------------+
# Brightness |
#------------+
${color orange}${voffset 2}${hr 1}
${color1}${goto 5}Rise: ${color green}${execpi 300 cat /usr/local/bin/.eyesome-sunrise} ${goto 155}${color1}Set: ${color green}${execpi 300 cat /usr/local/bin/.eyesome-sunset} ${alignr}${color1}Level: ${color green}${execpi 10 cat /sys/class/backlight/intel_backlight/brightness}

#------------+
# Image      |
#------------+
${image /home/rick/Pictures/Weather.png -p 0,1080 -s 400x120}

```

- I included the section just before for reference
- Notice all the blank lines to make conky window taller to fit in the image
- See: [Variables in Conky][6] for more details on `${image}` command.


  [1]: https://i.stack.imgur.com/EqapD.png
  [2]: {% post_url /2018/2018-03-30-Terminal-splash-screen-with-Weather,-Calendar,-Time-&-Sysinfo? %}
  [3]: https://i.stack.imgur.com/tYXAo.png
  [4]: https://github.com/chubin/wttr.in
  [5]: https://i.stack.imgur.com/8ovPb.png
  [6]: http://conky.sourceforge.net/variables.html
