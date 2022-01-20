---
layout:       post
title:        >
    Is there some way that I can see performance in Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/931394
type:         Answer
tags:         software-recommendation performance conky
created_date: 2017-07-02 23:42:59
edit_date:    2017-07-03 00:11:57
votes:        "5 "
favorites:    
views:        "746 "
accepted:     Accepted
uploaded:     2022-01-19 20:21:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-02-Is-there-some-way-that-I-can-see-performance-in-Ubuntu^.md
toc:          false
navigation:   false
clipboard:    false
---

The Windows architecture is built around a central database called "the Registry" which overtime as programs are added and deleted becomes insanely large and the system bogs down. As such every few years many users find deleting Windows and reinstalling it along with all currently used programs makes things seem 2 to 10 times faster.

Within Linux there is no Registry, and such performance penalties aren't suffered. Hence there is no need for a program like IObit Advanced Systemcare.

If your web browser slows down in Windows or in Linux (or Mac for that matter) because of too many extensions, Google and Firefox have methods of dealing with that differently.

The annoying malware pop-ups you find in Windows web browsers do not seem to occur (to me at least) with Linux web browsers. Free programs you download in Windows often come with embedded pop-up advertising malware that slows down your system. In Ubuntu almost everything is free and  designed to be downloaded via `sudo apt-get install`, instead of via the web browser.

Like any other system, if you have limited RAM, buying more RAM will speed up Linux. Also if you have an HDD (hard disk drive), spending $100+ on an SSD (solid state dive) will speed things up tremendously.


----------

Your question body is primarily about speeding up the system however your question title is about monitoring system performance. To monitory the system I personally like to use `conky` but other people have their own preferences. 

Here is what my Conky display looks like:

[![ConkyCPU.gif][1]][1]

When the image first starts you see what operation looks like under low load. The CPU's have low percentage utilization ~6%. The CPU speed is low ~1300 Mhz.

After opening Google Chrome (with 10 tabs) CPU utilization spikes up across all 8 CPUs to ~40% and the CPU speed jumps to maximum of 3400 Mhz. 

Below the CPU information the names of the 10 top CPU consuming programs (processes) appear on my Conky display. Below that are displayed the amount of RAM used (26%) and amount of disk space (really an SSD) used (73%). Below that (but cut off from this picture) it shows the amount of ISP gigabytes consumed for the month. This helps prevent over billing.

If you would like to learn more about Conky I recommend this site: [Post your .conkyrc files w/ screenshots][2]

If you are looking for off-the-shelf system performance monitoring tools in general here is one thread: [What can replace system monitoring in the top Gnome Panel in Unity?][3]

You will find other system monitoring tools recommended in Ask Ubuntu if you do a search.

Hope this helps.


  [1]: https://i.stack.imgur.com/COa1i.gif
  [2]: https://ubuntuforums.org/showthread.php?t=281865
  [3]: https://askubuntu.com/questions/29757/what-can-replace-system-monitoring-in-the-top-gnome-panel-in-unity/35733#35733
