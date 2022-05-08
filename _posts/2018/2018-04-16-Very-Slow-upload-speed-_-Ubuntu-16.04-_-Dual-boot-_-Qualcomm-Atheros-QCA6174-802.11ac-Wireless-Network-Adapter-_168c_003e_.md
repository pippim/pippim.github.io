---
layout:       post
title:        >
    Very Slow upload speed | Ubuntu 16.04 | Dual-boot | Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter [168c:003e]
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1025654
type:         Answer
tags:         16.04 networking dual-boot atheros xps
created_date: 2018-04-16 23:42:49
edit_date:    2019-05-04 23:53:16
votes:        "2 "
favorites:    
views:        "2,101 "
accepted:     
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-16-Very-Slow-upload-speed-_-Ubuntu-16.04-_-Dual-boot-_-Qualcomm-Atheros-QCA6174-802.11ac-Wireless-Network-Adapter-_168c_003e_.md
toc:          false
navigation:   false
clipboard:    false
---

You appear to be effected by this [bug][1]. There are 68 posts of problems and suggestions. The latest one suggests to:

- Disable power saving
- Use latest kernel version - I'm using 4.14.34 and have had no problems on the 4.14 chain which is LTS (Long Term Support) for 6 years.


----------

## May 4, 2019 update

Over a year ago, but after the original answer was posted, a bug fix came out. It happened during the kernel `4.16-rc5` release and the [source code change comments][2] state:

> Achieved throughput for different values of sk_pacing_shift (average  
> of 5 iterations of 10-sec netperf runs to a host on the other side of  
> the WiFi hop):  
>   
> - sk_pacing_shift 10: 43.21 Mbps (pre-patch)  
> - sk_pacing_shift 9:  78.17 Mbps  
> - sk_pacing_shift 8:  123.94 Mbps  
> - sk_pacing_shift 7:  128.31 Mbps  
>   
> Latency for competing flows increases from ~3 ms to ~10 ms with this  
> change. This is about the same magnitude of queueing latency induced  
> by flows that are not originated on the WiFi device itself (and so are  
> not limited by TSQ).   
>   
> Signed-off-by: Toke Høiland-Jørgensen  

Instinctively you think a kernel greater than `4.15` is required to get the bug fix. This is not so as the next section explains.

## Kernel 4.16-rc5 through Kernel 5.0 bug fixes are in `4.14.114` LTS

I'm still on kernel `4.14.xxx` LTS (Long Term Support) which has another 5 years of updates coming for it **including** the `4.16` patch above and recent kernel `5.0` bug fixes.

To prove the bug fix is there go to where my current kernel `4.14.114` is: 

- [https://kernel.ubuntu.com/~kernel-ppa/mainline/v4.14.114/](https://kernel.ubuntu.com/~kernel-ppa/mainline/v4.14.114/)

It says:

> To obtain the source from which they are built fetch the commit below:  
>   
>     git://git.launchpad.net/~ubuntu-kernel-test/ubuntu/+source/linux/+git/mainline-crack v4.14.114  

- Copy and paste the address into your web browser and press <kbd>Enter</kbd>
- Google search comes up
- Click the first link
- A web page appears: [https://code.launchpad.net/~ubuntu-kernel-test/ubuntu/+source/linux/+git/mainline-crack/+ref/master](https://code.launchpad.net/~ubuntu-kernel-test/ubuntu/+source/linux/+git/mainline-crack/+ref/master)
- Scroll to the bottom and select `All commits`
- The commit we are looking for is 10,000 messages back which is a lot of scrolling and searching. 
- To speed the process up type `Adjust TSQ pacing shift` into the search field.
- An abbreviated result appears so click `Expand` and you will see:

[![ubuntu kernel commits][3]][3]


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1670041
  [2]: https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=36148c2bbfbe50c50206b6f61d072203c80161e0
  [3]: https://i.stack.imgur.com/mFcB2.png
