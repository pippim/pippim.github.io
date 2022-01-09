---
layout:       post
title:        >
    What is the best way to install Ubuntu on cloud
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1026264
type:         Answer
tags:         virtualbox virtualization cloud virtual-console
created_date: 2018-04-19 03:31:57
edit_date:    2018-04-21 22:46:43
votes:        "1 "
favorites:    
views:        "178 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

It depends on your Internet connection speed and the time slice the cloud server allocates to you. Compare this to the speed of your own hardware.

In my case although I have a 1000 Mbps Ethernet and router my ISP limits me to 50Mbps download and 10 Mbps upload speed.

On the other hand my NVMe SSD delivers 3,000 MBps which is to say 24,000 Mbps read access and 2,000 MBps which is to say 16,000 Mbps write speed.

So for reading/downloading my SSD is (24,000 / 50) **480 times faster** and for writing/uploading it is (16,000 / 10) **1,600 times faster**.

This assumes the cloud computer finishes its computations instantaneously, has no other clients using it and the backing storage responds without delay. Otherwise assume your own PC with NVMe drive is 5000 times faster at reading and 16,000 times faster at writing.

That said these are purely technical measurements and the human eye can only notice changes at 1/30th of a second. So if the difference was waiting .001 second and .000001 second you would not notice. But if it was waiting .1 second vs. 100 seconds you sure would notice.

I'm using an NVMe SSD, which is 8 to 12 times faster than an SSD which in turn is 4 to 8 times faster than a hard drive which in turn is 10 times faster than your USB (estimated).

So you might very well see the same performance if not better on a fast expensive cloud server.

But what I would really suggest is upgrading your $10 USB to a $50 HDD or a $200 SSD or better yet a $400 NVMe SSD for the best cost/benefit ratio.
