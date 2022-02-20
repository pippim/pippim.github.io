---
layout:       post
title:        >
    Screen brightness changes when moving mouse to certain areas (XPS13 9379 - Ubuntu)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1005664
type:         Answer
tags:         16.04 graphics mouse screen brightness
created_date: 2018-02-13 03:11:06
edit_date:    2018-02-13 08:32:56
votes:        "2 "
favorites:    
views:        "1,769 "
accepted:     
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-13-Screen-brightness-changes-when-moving-mouse-to-certain-areas-_XPS13-9379---Ubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

I believe it's caused by [adaptive brightness][1]:

> 01-25-2017 07:40 AM RE: Dell XPS 13 (9360) FHD, Adaptive Brightness  
> Issue ?  
>   
> There is no "issue".  
>   
> The Dell XPS 13 9360 ships with a design feature called  
> "content-adaptive brightness control" (CABC). This feature will change  
> the brightness of the screen depending on the content that is rendered  
> on the screen.  
>   
> A number of customers do not like this design feature (me included, by  
> the way). As a result, Dell have made available a tool which allows  
> turning off / turning on of CABC ( [www.dell.com/.../DriversDetails][2] ).  
> This tool is \_only\_ available for systems with the QHD display, as,  
> apparently, the tool reconfigures the screen panel firmware.  
>   
> For the record: personally, I am very happy with CABC turned off on my  
> QHD display. I am also very happy that there is no dynamic brightness  
> control (reacting to environment brightness) is implemented either.  


  [1]: https://www.dell.com/community/General/Dell-XPS-13-9360-FHD-Adaptive-Brightness-Issue/td-p/5147488
  [2]: http://www.dell.com/support/home/ch/de/chbsdt1/Drivers/DriversDetails?driverId=PWD5K&osCode=WT64A&productCode=xps-13-9350-laptop&categoryId=AP
