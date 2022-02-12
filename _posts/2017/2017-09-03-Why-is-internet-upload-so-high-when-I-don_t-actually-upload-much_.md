---
layout:       post
title:        >
    Why is internet upload so high when I don't actually upload much?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/952431
type:         Answer
tags:         networking firefox google-chrome monitoring bandwidth vnstat conky
created_date: 2017-09-03 16:51:09
edit_date:    2018-01-07 20:55:09
votes:        "2 "
favorites:    
views:        "3,571 "
accepted:     
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-09-03-Why-is-internet-upload-so-high-when-I-don_t-actually-upload-much_.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Problem persists January 7, 2018 in Firefox

*skip to bottom, **"Edit 6"** to see Firefox only problem*


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Problem solved December 13, 2017

*skip to bottom, **"Edit 5"** to see Chrome solution*

# Answering 4 of the 5 W's

I was able to isolate Who, What, Where and When data is being uploaded:

- **Who** = rt.com / on-the-air.
- **What** = Flashplayer plug-in
- **Where** = in Google Chrome and Mozilla Firefox
- **When** = Morning and Evenings when I watch international news

The "Why" could be a bug or it could be spyware or it could simply be Flashplayer has been configured to collect information streams for crash reporting purposes.

The next section details the steps to isolate Who, What, Where and When.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Use `vnstat -l` to track upload traffic

Apologies in advance for screen images below rather than text copy and paste. I had taken snapshots not knowing if the information was relevant until after all tests were done.

The first step in testing is to close down all 10 Chrome tabs and 3 Firefox tabs.

Next open a terminal with <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> and type `vnstat -l`. This assumes you have already installed the vnstat command. If not, see this [answer][1] about `vnstat` in Ask Ubuntu.

Then open up one Chrome or Firefox tab at a time and monitor the usage rates:

## Watching 80 minute documentary on lead singer/producer from ELO:

[![vnstat -l 720p movie putlockerhd.png][2]][2]

Content is in 720p format. One Gigabyte downloaded and 40 Megabytes uploaded is a 4% tx to rx ratio and appears normal.



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Watching 5 minute live news broadcast in Flashplayer format using Google Chrome:

[![vnstat chrome flash player rt on air.png][3]][3]

Content is in 1080p format. 103.37 MiB was downloaded which is normal but almost twice that amount (192.62 MiB = 186%) was uploaded which is **not normal**.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Watching 30 minutes of recorded news downloadable from same international news broadcaster:

[![vnstat -l rt.com-shows rt america.png][4]][4]

I paused the 1/2 hour pre-recorded downloadable broadcast many times while it was playing. Elapsed time was actually 72 minutes. Nonetheless total downloads (they are recorded at 720p) is 508.12 MiB and uploads are 21.63 MiB for a tx to rx ratio of 4%.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

# Summary

Unless you are a software developer constantly uploading to `github` or a freelance graphic artist constantly uploading your work to clients, the normal tx to rx ratio should be about **4%**.

In this case the monthly internet accounting was 275.79 GiB downloaded and 70.54 GiB uploaded for a tx/rx ratio of **26%**. The culprit was Flashplayer live news broadcast where the tx/rx ratio is **186%**!

The paranoid pandas living in the bamboo forests around us might think the  CIA or NSA is behind these large uploads. I think it is just a design flaw in FlashPlayer. 

It could perhaps be the Russian broadcaster (RT) based in Moscow using Israeli software with glitches. I say this because I previously discovered a glitch on their news website where the comment section would [eat up 1 GB of RAM in a few hours][5] until the tab was refreshed. Unfortunately my original Q&A appears to have been deleted but after posting my original Q&A here in AU someone read it and fixed that problem. Hopefully similar people will find this thread and fix this problem too.

This is important because as consumers we are paying to **watch** media. We are not paying to have what we watch **uploaded at twice the bandwidth** to "only Google knows where".


----------


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

# Edit - Tests under Kernel 4.12.10

Previous tests were conducted under kernel `4.4.0-93`. I fresh installed kernel `4.12.10` and rebooted a couple of times and conducted new tests. For both Firefox and Chrome the results are greatly improved but still tx/rx ratios are unacceptable.

- Firefox for 5.33 minutes has 108.04 MiB downloaded and 57.71 MiB uploaded for tx/rx ratio of **53.4%**
- Chrome for 5.57 minutes has 117.34 MiB downloaded and 59.75 MiB uploaded for a tx/rx ratio of **50.9%**

Data collected show below. In light of these results I will redo `4.4.0-93` tests after rebooting a couple of times.

## Firefox Flashplayer 5 minutes live news at 1080p:

{% include copyHeader.html %}
``` 
rick@dell:~$ vnstat -l
Monitoring eth0...    (press CTRL-C to stop)

   rx:        1 kbit/s     1 p/s          tx:        1 kbit/s     1 p/s^C


 eth0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                   108.04 MiB  |       57.71 MiB
--------------------------------------+------------------
          max           14.72 Mbit/s  |    10.64 Mbit/s
      average            2.77 Mbit/s  |     1.48 Mbit/s
          min               0 kbit/s  |        0 kbit/s
--------------------------------------+------------------
  packets                     133538  |          104640
--------------------------------------+------------------
          max               1395 p/s  |        1219 p/s
      average                417 p/s  |         327 p/s
          min                  0 p/s  |           0 p/s
--------------------------------------+------------------
  time                  5.33 minutes
```


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

## Chrome Flashplayer 5 minutes live news at 1080p:

{% include copyHeader.html %}
``` 
rick@dell:~$ vnstat -l
Monitoring eth0...    (press CTRL-C to stop)

   rx:        0 kbit/s     0 p/s          tx:        0 kbit/s     0 p/s^C


 eth0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                   117.34 MiB  |       59.75 MiB
--------------------------------------+------------------
          max           25.13 Mbit/s  |     9.92 Mbit/s
      average            2.88 Mbit/s  |     1.47 Mbit/s
          min               0 kbit/s  |        0 kbit/s
--------------------------------------+------------------
  packets                     139174  |          126372
--------------------------------------+------------------
          max               2363 p/s  |        1441 p/s
      average                416 p/s  |         378 p/s
          min                  0 p/s  |           0 p/s
--------------------------------------+------------------
  time                  5.57 minutes
```


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr11" class ="hdr-btn">Skip</a></div>

# Edit 2 - Things get worse the more tabs you have open

I was a little premature with my kernel version `4.12.10` hypothesis. Doing further investigation watching a Flashplayer live broadcast in Chrome with 6 tabs open the tx/rx ratio got much worse. I have to surmise that somehow Flashplayer is gathering and transmitting data for other tabs other than it's own.

## Chrome 26 minute Flashplayer live broadcast with 5 other tabs open:

{% include copyHeader.html %}
``` 
rick@dell:~$ vnstat -l
Monitoring eth0...    (press CTRL-C to stop)

   rx:        1 kbit/s     1 p/s          tx:        1 kbit/s     1 p/s^C


 eth0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                   718.79 MiB  |        1.13 GiB
--------------------------------------+------------------
          max           30.10 Mbit/s  |    12.72 Mbit/s
      average            3.73 Mbit/s  |     6.00 Mbit/s
          min               0 kbit/s  |        0 kbit/s
--------------------------------------+------------------
  packets                    1100634  |         1396530
--------------------------------------+------------------
          max               2616 p/s  |        1774 p/s
      average                696 p/s  |         883 p/s
          min                  0 p/s  |           0 p/s
--------------------------------------+------------------
  time                 26.33 minutes
```

As can be expected at 1080p the total download is 718.79 MiB. What is shocking is the 1.13 GiB uploaded! This gives a tx/rx ratio of **157%**. This leads me to conclude my test results from 2 days ago and those screen snapshots had my usual 10 Chrome tabs and 3 Firefox tabs open.

The next test will be 7 tabs open and doing normal surfing / Ask Ubuntu questions and answers for 1/2 hour and get non-Flashplayer totals only.


<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr10" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr12" class ="hdr-btn">Skip</a></div>

# Edit 3 - Using conky to monitor in real time

First the test results of 7 taps open answering a Ubuntu question (the one above):

{% include copyHeader.html %}
``` 
rick@dell:~$ vnstat -l
Monitoring eth0...    (press CTRL-C to stop)

   rx:        1 kbit/s     1 p/s          tx:        2 kbit/s     3 p/s^C


 eth0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                     1.14 MiB  |         454 KiB
--------------------------------------+------------------
          max            2.40 Mbit/s  |      136 kbit/s
      average            9.35 kbit/s  |     3.64 kbit/s
          min               0 kbit/s  |        0 kbit/s
--------------------------------------+------------------
  packets                       3699  |            2776
--------------------------------------+------------------
          max                257 p/s  |         163 p/s
      average                  3 p/s  |           2 p/s
          min                  0 p/s  |           0 p/s
--------------------------------------+------------------
  time                 16.63 minutes
```

Next a test with 7 tabs open doing nothing for 1/2 hour on the machine:

{% include copyHeader.html %}
``` 
rick@dell:~$ vnstat -l
Monitoring eth0...    (press CTRL-C to stop)

   rx:        1 kbit/s     1 p/s          tx:        2 kbit/s     2 p/s^C


 eth0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                      766 KiB  |         529 KiB
--------------------------------------+------------------
          max             121 kbit/s  |      164 kbit/s
      average            3.33 kbit/s  |     2.30 kbit/s
          min               0 kbit/s  |        0 kbit/s
--------------------------------------+------------------
  packets                       4752  |            3772
--------------------------------------+------------------
          max                256 p/s  |          24 p/s
      average                  2 p/s  |           2 p/s
          min                  0 p/s  |           0 p/s
--------------------------------------+------------------
  time                 30.70 minutes
```

So we can see even when nothing is happening on your machine it's normal for Chrome to transmit packets but the size is small (529 KiB or so).


<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr11" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr13" class ="hdr-btn">Skip</a></div>

## Conky text

I added this conky text to monitor network real time usage:

``` 
${color1}Network real-time monitoring
${color}Down: ${color green}${downspeed eth0}/s ${color}${goto 220}Up: ${color green}${upspeed eth0}/s
${downspeedgraph eth0 25,190 000000 ff0000} ${alignr}${upspeedgraph eth0
25,190 000000 00ff00}$color
Total: ${color green}${totaldown eth0} $color${alignr}Total: ${color green}${totalup eth0}
${color orange}${voffset 2}${hr 1}
```


<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr12" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr14" class ="hdr-btn">Skip</a></div>

## Conky display

[![conky network real time 4.gif][6]][6]

The totals at the bottom are since the last boot, not since conky was turned on.


<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr13" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr15" class ="hdr-btn">Skip</a></div>

# Edit 4 - HTML5 doesn't upload like Flashplayer does

I ran a 27.5 minute test under Kernel 4.12.10 of a youtube.com live news channel (with 4 hour time shift) at 1080p:

{% include copyHeader.html %}
``` 
rick@dell:~$ vnstat -l
Monitoring eth0...    (press CTRL-C to stop)

   rx:       12 kbit/s     4 p/s          tx:        3 kbit/s     2 p/s^C


 eth0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                   474.04 MiB  |       19.49 MiB
--------------------------------------+------------------
          max           17.27 Mbit/s  |     2.16 Mbit/s
      average            2.35 Mbit/s  |    96.76 kbit/s
          min               0 kbit/s  |        0 kbit/s
--------------------------------------+------------------
  packets                     346609  |          198883
--------------------------------------+------------------
          max               1481 p/s  |        1047 p/s
      average                210 p/s  |         120 p/s
          min                  0 p/s  |           0 p/s
--------------------------------------+------------------
  time                 27.50 minutes
```

474.04 MiB were downloaded and 19.49 MiB were uploaded giving the average tx/rx ratio of **4%**. This test was done using Chrome browser but I expect the Firefox browser results would be the same. Therefore it's safe to assume the massive data uploads are limited to Flashplayer and not HTML5.

Hopefully other users can test to confirm my findings and comment below. 

In the meantime I've being holding discussions with Doug Smythies (who posted the other answer here) in the Ask Ubuntu General Chat Room about his solution. Using Doug's answer I hope to discover the physical IP addresses my data is going to.


----------


<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr14" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr16" class ="hdr-btn">Skip</a></div>

# Edit 5 - Dec 13 2017 - Problem solved Kernel 4.14.4

In the last couple of days the problem has gone away on it's own. Likely a Flashplayer update or kernel update:

- Upload rate is now 8.33 MiB / 224.78 MiB = 4%
- Chrome bug of taking ~5 seconds to maximize screen is fixed
- Chrome bug of image being ~1 second behind voice is fixed

## vnstat -l results

``` 
 enp59s0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                   224.78 MiB  |        8.33 MiB
--------------------------------------+------------------
          max           10.26 Mbit/s  |      799 kbit/s
      average            2.48 Mbit/s  |    92.00 kbit/s
          min               2 kbit/s  |        4 kbit/s
--------------------------------------+------------------
  packets                     162124  |           95039
--------------------------------------+------------------
          max                886 p/s  |         408 p/s
      average                218 p/s  |         128 p/s
          min                  1 p/s  |           1 p/s
--------------------------------------+------------------
  time                 12.37 minutes
```

**Note:** Last month I got a new laptop where the problem persisted. However in the last couple of days the problem went away on it's own either from a Chrome update *Version 63.0.3239.84 (Official Build) (64-bit)* and/or because *Kernel 4.14.4* is being used.


----------



<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr15" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr17" class ="hdr-btn">Skip</a></div>

# Edit 6 - Jan 07 2018 - Problem persists Firefox version 57.0.4

In the last couple of days I had problems using Chrome so started using Firefox full time. I also installed kernel `4.14.12` to test Meltdown kernel patches:

- Upload rate is now 254.76 MiB / 364.83 MiB = 70%
- Chrome bug of taking ~5 seconds to maximize screen came back

## vnstat -l results

``` 
 enp59s0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                   364.83 MiB  |      254.76 MiB
--------------------------------------+------------------
          max           15.23 Mbit/s  |     9.88 Mbit/s
      average            3.58 Mbit/s  |     2.50 Mbit/s
          min             195 kbit/s  |      100 kbit/s
--------------------------------------+------------------
  packets                     429358  |          364510
--------------------------------------+------------------
          max               1450 p/s  |        1229 p/s
      average                513 p/s  |         436 p/s
          min                147 p/s  |          94 p/s
--------------------------------------+------------------
  time                 13.93 minutes
```

So.... full circle :(

  [1]: {% post_url /2016/2016-11-20-Any-good-application-for-data-usage-monitor_ %}
  [2]: https://i.stack.imgur.com/2oqXi.png
  [3]: https://i.stack.imgur.com/xKq1O.png
  [4]: https://i.stack.imgur.com/PJsgg.png
  [5]: {% post_url /2016/2016-11-03-What_s-eating-all-the-RAM-and-swap_ %}
  [6]: https://i.stack.imgur.com/4GhNh.gif
  [7]: https://bugzilla.kernel.org/show_bug.cgi?id=109051



<a id="hdr17"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr16" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

