---
layout:       post
title:        >
    printers not working after distribution upgrade
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1082797
type:         Answer
tags:         18.04 printing
created_date: 2018-10-11 01:57:43
edit_date:    
votes:        "2 "
favorites:    
views:        "2,707 "
accepted:     
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-11-printers-not-working-after-distribution-upgrade.md
toc:          false
navigation:   false
clipboard:    false
---

From [accepted answer][1] which author will hopefully post here:

I encountered the same problem. To track back its origin I looked into 
"/var/log/cups/error_log" 
In my case, I discovered that the problem was caused by icc profiles used by ghostscript. I had the following error:
> Started filter pstops (PID 26489)    
> ./base/gsicc_manage.c:1244: gsicc_open_search(): Could not find default_gray.icc    
> ./base/gsicc_manage.c:2261: gsicc_init_iccmanager(): cannot find default icc profile   
> ./base/gsicc_manage.c:1244: gsicc_open_search(): Could not find default_rgb.icc    
> ./base/gsicc_manage.c:2025: gsicc_set_device_profile(): cannot find device profile   
> **** Unable to open the initial device, quitting.   

So what worked out for me has been to manually remove the icc profiles and then re-install libgs9-common (following [Broken ghostscript configuration](Broken ghostscript configuration)) : 
> sudo rmdir /usr/share/ghostscript/9.25/iccprofiles   
> sudo apt-get install --reinstall libgs9-common   

Hope this helps 


  [1]: https://askubuntu.com/a/1080926/307523
