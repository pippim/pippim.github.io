---
layout:       post
title:        How to mitigate the Spectre and Meltdown vulnerabilities on Linux systems?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/415479
type:         Answer
tags:         linux x86 vulnerability
created_date: 2018-01-08 00:12:49
edit_date:    2018-01-27 17:17:03
votes:        11
favorites:    
views:        29,208
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# January 27, 2018 Intel Microcode breaks some systems

The [Intel Microcode Update 2018-01-08][1] to address speculative execution branching security holes broke some systems. This effected many Ubuntu systems from January 8th to January 21st. On January 22, 2018 Ubuntu released an update that puts back older Microcode from 2017-07-07.

If you experienced problems with updates, reinstalled Ubuntu and turned off updates between 2018-01-08 and 2018-01-22 you may want to try Ubuntu automatic updates again.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# January 16, 2018 update Spectre in 4.14.14 and 4.9.77

If you are already running Kernel versions 4.14.13 or 4.9.76 like I am it's a no-brainer to install `4.14.14` and `4.9.77` when they come out in a couple of days to mitigate the Spectre security hole. The name of this fix is [Retpoline][2] and doesn't have the severe performance hit previously speculated:

> Greg Kroah-Hartman has sent out the latest patches for the Linux 4.9  
> and 4.14 point releases, which now include the Retpoline support.  
>   
> This X86_FEATURE_RETPOLINE is enabled for all AMD/Intel CPUs. For full  
> support you also need to be building the kernel with a newer GCC  
> compiler containing -mindirect-branch=thunk-extern support. The GCC  
> changes landed in GCC 8.0 yesterday and is in the process of  
> potentially being back-ported to GCC 7.3.  
>   
> Those wanting to disable the Retpoline support can boot the patched  
> kernels with *noretpoline*.  


Without getting into details of JavaScript here is how to immediately avoid the Meltdown hole (and as of January 10 2018, Spectre protection)



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# January 12, 2018 update

Initial protection from ***Spectre*** is here and will be improved in weeks and months to come.

### Linux Kernels 4.14.13, 4.9.76 LTS, and 4.4.111 LTS
 
From this [Softpedia article][3]:

> Linux kernels 4.14.13, 4.9.76 LTS, and 4.4.111 LTS are now available  
> for download from kernel.org, and they include more fixes against the  
> Spectre security vulnerability, as well as some regressions from the  
> Linux 4.14.12, 4.9.75 LTS, and 4.4.110 LTS kernels released last week,  
> as some reported minor issues.  
>   
> These issues appear to be fixed now, so it's safe to update your  
> Linux-based operating systems to the new kernel versions released  
> today, which include more x86 updates, some PA-RISC, s390, and PowerPC  
> (PPC) fixes, various improvements to drivers (Intel i915, crypto,  
> IOMMU, MTD), and the usual mm and core kernel changes.  

Many users had problems with Ubuntu LTS updates on January 4, 2018 and January 10, 2018. I've been using `4.14.13` for a couple of days without any problems however **YMMV**.

----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# January 7, 2018 update

*Greg Kroah-Hartman* wrote a [status update][4] on the Meltdown and Spectre Linux Kernel security holes yesterday. Some may call him the second most powerful man in the Linux world right next to Linus. The article addresses stable kernels (discussed below) and LTS kernels which the majority of Ubuntu users have.


----------


# Linux Kernels 4.14.11, 4.9.74, 4.4.109, 3.16.52, and 3.2.97 Patch Meltdown Flaw

From [this article][5]:

**Users are urged to update their systems immediately**

Jan 4, 2018 01:42 GMT  ·  By Marius Nestor

Linux kernel maintainers Greg Kroah-Hartman and Ben Hutchings have released new versions of the Linux 4.14, 4.9, 4.4, 3.16, 3.18, and 3.12 LTS (Long Term Support) kernel series that apparently patch one of the two critical security flaws affecting most modern processors.

The Linux 4.14.11, 4.9.74, 4.4.109, 3.16.52, 3.18.91, and 3.2.97 kernels are now available to download from the kernel.org website, and users are urged to update their GNU/Linux distributions to these new versions if they run any of those kernel series immediately. Why update? Because they apparently patch a critical vulnerability called Meltdown.

As reported earlier, Meltdown and Spectre are two exploits that affect nearly all devices powered by modern processors (CPUs) released in the past 25 years. Yes, that means almost all mobile phones and personal computers. Meltdown can be exploited by an unprivileged attacker to maliciously obtain sensitive information stored in kernel memory.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Patch for Spectre vulnerability still in the works

While Meltdown is a serious vulnerability which can expose your secret data, including passwords and encryption keys, Spectre is even worse, and it's not easy to fix. Security researchers say it will haunt us for quite some time. Spectre is known to exploit the speculative execution technique used by modern CPUs to optimize performance.

Until the Spectre bug is patched too, it is strongly recommended that you at least update your GNU/Linux distributions to any of the newly released Linux kernel versions. So search the software repositories of your favorite distro for the new kernel update and install it as soon as possible. Don't wait until it's too late, do it now!

----------

I had been using Kernel 4.14.10 for a week so downloading and booting Ubuntu Mainline Kernel version [4.14.11][6] wasn't too much of a concern for me.

Ubuntu 16.04 users might be more comfortable with 4.4.109 or 4.9.74 kernel versions which were released at the same time as 4.14.11.

If your regular updates do not install the Kernel version you desire you can do it manually following this Ask Ubuntu answer: [https://askubuntu.com/questions/879888/how-do-i-update-kernel-to-the-latest-mainline-version/879920#879920][7]


----------


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# 4.14.12 - What a difference a day makes

Less than 24 hours after my initial answer a patch was released to fix 4.14.11 kernel version that they may have rushed out. Upgrading to [4.14.12][8] is recommended for all 4.14.11 users. [Greg-KH says][9]:

> I'm announcing the release of the 4.14.12 kernel.  
>   
> All users of the 4.14 kernel series must upgrade.  
>   
> There are a few minor issues still known with this release that people  
> have run into.  Hopefully they will be resolved this weekend, as the  
> patches have not landed in Linus's tree.  
>   
> For now, as always, please test your in environment.  

Looking at this update not very many lines of source code were changed. 


  [1]: https://askubuntu.com/questions/998471/razer-blade-stealth-disk-corruption-fsck-needed-probably-samsung-ssd-bug-afte/1000454#1000454
  [2]: https://www.phoronix.com/scan.php?page=news_item&px=Linux-4.9-4.14-Retpoline
  [3]: http://news.softpedia.com/news/linux-kernels-4-14-13-4-9-76-and-4-4-111-bring-more-security-fixes-update-now-519321.shtml
  [4]: http://www.kroah.com/log/blog/2018/01/06/meltdown-status/
  [5]: http://news.softpedia.com/news/linux-kernels-4-14-11-4-9-74-4-4-109-3-16-52-and-3-2-97-patch-meltdown-flaw-519215.shtml
  [6]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.14.11/
  [7]: https://askubuntu.com/questions/879888/how-do-i-update-kernel-to-the-latest-mainline-version/879920#879920
  [8]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.14.12/
  [9]: https://lkml.org/lkml/2018/1/5/337


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a></div>

