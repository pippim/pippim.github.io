---
layout:       post
title:        >
    Mondo Rescue repository unsigned for apt-get
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/993881
type:         Answer
tags:         14.04 apt 16.04 backup ftp
created_date: 2018-01-09 12:14:43
edit_date:    2018-01-10 00:33:49
votes:        "2 "
favorites:    
views:        "6,194 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-09-Mondo-Rescue-repository-unsigned-for-apt-get.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Install using built in repository

The [Mondo Rescue Website][1] says manually downloading install files is not needed as it natively available for for Debian/Ubuntu, using:

``` 
sudo apt-get install mondo
```

However ***THIS IS BROKEN***

The website goes on to say you can download the [repo file][2] `mondorescue.sources.list` and add it to your `/etc/apt/sources.list.d` directory if you want to use upstream packages. 

However ***THIS IS BROKEN***


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# Deleted answer one year ago

On December 30, 2016 an answer was posted here and deleted because the user lacked reputation to post a comment. That answer tells us a lot:

> I used to use `mondo` for all Linux data center backups about 10 years  
> ago. However, since then, each release has been spotty on installation  
> for distributions that we use (RHEL, Fedora, CentOS, and Ubuntu). On  
> top of that, I have gotten it to install and work on a VM but fail on  
> the same install on a physical box.  
>   
> I'm sorry to rant. I miss this fantastic tool. I just don't have the  
> time to debug each piece of the install only to get to the point where  
> I'm managing compilations, repositories, versions, etc. for it to  
> crash or worse, not restore properly...  


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# One Man Show

On the surface it appears `mondo` development rests primarily on the shoulders of one man: [Bruno Cornec][3] which is a gigantic feat IMO. Unfortunately it seems time is primarily spent in ***Red Hat Linux*** arena first with UEFI recent support and ***Ubuntu*** not having UEFI support yet. But why woudn't you develop for a paying market place first and a free market place second? Not everyone is a Warehouse Receiver with a good wage by day that can help people in Ubuntu for free by night.

The best summary of problems installing `mondo` in Ubuntu I found was this [Source Forge conversation][4] between developer and user on January 8, 2017:

> About dependencies : i did not write down all that happened, sorry :-(  
> I  wil install a new vm from scratch later. But at least :  
>   
> ftp://ftp.mondorescue.org/test/ubuntu/16.04/mondorescue-test.sources.list  
> did not work, so I downloaded the packages by hand :  
>   
> wget \  
> ftp://ftp.mondorescue.org/test/ubuntu/16.04/mondo_3.3.0-0.20161223223857.s3640M_amd64.deb  
> \  
> ftp://ftp.mondorescue.org/test/ubuntu/16.04/mindi_3.3.0-0.20161223223857.s3640M_amd64.deb  
> \  
> ftp://ftp.mondorescue.org/test/ubuntu/16.04/mindi-busybox_1.25.1-1_amd64.deb  
> \  
> ftp://ftp.mondorescue.org/test/ubuntu/16.04/libmondorescue-perl_3.3.0-0.20161223223857.s3640M_all.deb  
>   
> various packages where still missing : from my shell history :  
> - I installed buffer from the Ubuntu repository  
> - I took afio here : ftp://ftp.mondorescue.org/ubuntu/16.04/afio_2.5-1_amd64.deb  
> -  ftp://ftp.mondorescue.org/ubuntu/14.04/libprojectbuilder-perl_0.14.2-1_all.deb  
> was needed too  
>   
> and in the logs, I noticed that lzop was needed too (this one I  
> noticed  !) so I installed it by hand as I installed mondo alone the  
> first time with dpkg, it was left broken.  

**In the end it was finally installed to backup, but restore didn't work**


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

# Just the FAQs Ma'am

There is an older [FAQs][5] page from Ubuntu 12.04 era that describes installing `mondo` manually in Ubuntu:

> If you want to use the packages made upstream for Debian or Ubuntu,  
> you need to know that numbering schema are different between upstream  
> mondo (3.0.x) and Ubuntu / Debian packages (1:2.2.x), so you should  
> adapt your /etc/apt/preferences file to avoid updates of mondo with  
> apt-get with older versions. Do the following:  

``` 
wget ftp://ftp.mondorescue.org/ubuntu/`lsb_release -r|awk '{print $2}'`/mondorescue.sources.list
sudo sh -c "cat mondorescue.sources.list >> /etc/apt/sources.list"
sudo sh -c "cat >> /etc/apt/preferences << EOF
Package: mindi
Pin: version 2.1.*
Pin-Priority: 1001

Package: mondo
Pin: version 3.0.*
Pin-Priority: 1001
EOF
"
```

***I would double check these version numbers***


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">Skip</a></div>

# What can I do to use Mondo?

If you really insist on using Mondo I would contact Bruno in his name link posted above. Offer to test out the install on your Ubuntu system and report back results to get fixes.

Ubuntu 14.04 does have [instructions for installing `mondo`][6] and these might work in version 16.04. Or at least they might be a better starting point that the other instructions above:

``` 
cd /tmp
rm *.list
wget ftp://ftp.mondorescue.org/ubuntu/`lsb_release -r|awk '{print $2}'`/mondorescue.sources.list
sudo cp mondorescue.sources.list /etc/apt/sources.list.d/mondorescue.sources.list
sudo apt-get update
sudo apt-get install mondo afio buffer lzop mindi mindi-busybox
sudo ln -s /sbin/parted2fdisk /usr/sbin/parted2fdisk
sudo ln -s /sbin/mke2fs /usr/sbin/mke2fs
```

Now Mondo Archive v3.2.120150305095420-0 is installed, including the required dependencies (afio buffer lzop mindi mindi-busybox)

Then you can run mondo using the following commands:

``` 
sudo mondoarchive
```

or

``` 
sudo mondorestore
```


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>

# Other Ask Ubuntu Q&As

These other users have asked questions / stated problems with installing `mondo` recently:

- [Mondo Rescue repository unsigned for apt-get][7]
- [Bootable recovery partition or DVD][8]
- [Making an iso backup of my system][9]

# Summary

For myself I just use `cron` to run a [daily backup][10] that creates a `.tar` backup file every morning when I boot up. The `.tar` backup file is then e-mailed to my `gmail.com` account and stored in the cloud.

You can simply search `daily backup` for list of options in Ask Ubuntu or google the search term for multiple Linux sites.

I wish my search had yielded more positive results.


  [1]: http://www.mondorescue.org/downloads.shtml
  [2]: ftp://ftp.mondorescue.org/debian/
  [3]: https://brunocornec.wordpress.com/2016/04/29/mondorescue-3-2-2-is-finally-available/
  [4]: https://sourceforge.net/p/mondo/mailman/message/35591945/
  [5]: http://trac.mondorescue.org/wiki/FAQ#Q11DoesmondoworkwithDebianUbuntudistributions
  [6]: https://help.ubuntu.com/community/MondoMindi
  [7]: https://askubuntu.com/questions/781970/mondo-rescue-repository-unsigned-for-apt-get
  [8]: https://askubuntu.com/questions/962597/bootable-recovery-partition-or-dvd
  [9]: https://askubuntu.com/questions/781738/making-an-iso-backup-of-my-system/781755#781755
  [10]: {% post_url /2017/2017-06-06-Backup-Linux-configuration_-scripts-and-documents-to-Gmail %}


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a></div>

