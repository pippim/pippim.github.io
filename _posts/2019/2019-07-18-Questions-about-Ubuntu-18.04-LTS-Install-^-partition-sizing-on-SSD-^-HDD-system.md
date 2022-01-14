---
layout:       post
title:        >
    Questions about Ubuntu 18.04 LTS Install / partition sizing on SSD / HDD system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159345
type:         Answer
tags:         dual-boot 18.04 partitioning ssd
created_date: 2019-07-18 23:40:08
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,021 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-18-Questions-about-Ubuntu-18.04-LTS-Install-^-partition-sizing-on-SSD-^-HDD-system.md
toc:          false
navigation:   false
clipboard:    false
---

## Unallocated SSD space for provisioning

Addressing this part of the question:

> Plans are to shrink my Windows ntfs partitions down to 450 GB, and  
> expand the Ubuntu ext4 partitions up to 500 GB, leaving 50GB  
> unallocated. I read that it is helpful not to allocate SSD’s fully as  
> it improves performance / error correction /stability.  

From: [SSD: keep unallocated space?][1]:

> Second, most SSDs are overprovisioned internally. Your 256GB SSD  
> likely has something like 256+16GB of actual space in it. The SSD  
> controller hides this from the OS, but it will internally use that  
> extra room when needed.  
>   
> SSDs can write to free, erased space faster than rewriting existing  
> data. As long as the SSD and OS have TRIM support (all do these days),  
> deleted data will be "erased" and future writes will be fast.  

Therefore I wouldn't keep 50GB unallocated. I would allocate it to Ubuntu and increase 450 GB to **500 GB**.

----------

## Separate `/home`

I would simply keep 100 GB `/` and 350GB `/home` together to lessen chance of either one running out. Similarly I would never have a separate `/boot` partition.

I keep my `/swap` in 8 GB SSD partition instead of HDD so it will be faster but it is never used so if ever wanted the space back I could relocate it to nearly empty HDD.

Plans for HDD is to store large windows projects (60 GB). Then in the weeks/months I'm working on a given project it is moved into SSD. After project is over it's moved back to HDD and a different project is moved from HDD to SSD.

  [1]: https://superuser.com/questions/1251440/ssd-keep-unallocated-space
