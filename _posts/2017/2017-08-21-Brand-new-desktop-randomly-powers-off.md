---
layout:       post
title:        >
    Brand new desktop randomly powers off
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/948181
type:         Answer
tags:         dual-boot xubuntu
created_date: 2017-08-21 00:24:42
edit_date:    
votes:        "2 "
favorites:    
views:        "158 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-21-Brand-new-desktop-randomly-powers-off.md
toc:          false
navigation:   false
clipboard:    false
---

Your processor is the "Apollo Lake" Intel family and may be effected by the Intel "Bay Trail" bug: [System freezes completely with Intel Bay Trail][1].

Here is one summary of Intel CPU families starting with "Bay Trail" by an [Intel employee][2]:

> Disclaimer: I work for Intel Corporation. The information I'm using to  
> answer this question comes from publicly-available sources.  
>   
> When looking for information on Intel’s hardware products, Intel®  
> Product Specifications should be your first stop. Especially for  
> comparing features or launch/discontinuance dates, this site should  
> have what you're looking for.  
>   
> Bay Trail: Launched Q3 2013  
>   
> Cherry Trail: Launched Q1 2016  
>   
> Braswell: Launched Q1 2016  
>   
> Apollo Lake: Launched Q3 2016  

Based on OP comments it appears likely the Pentium J4205 suffers from the same Bay Trail bug.

  [1]: https://askubuntu.com/questions/803640/system-freezes-completely-with-intel-bay-trail
  [2]: https://www.quora.com/What-are-the-differences-between-Bay-Trail-Cherry-Trail-Braswell-and-Apollo-Lake
