---
layout:       post
title:        >
    Log-in screen background (on Ubuntu 18.04) is not changing though I made necessary changes in necessary files
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155300
type:         Answer
tags:         login-screen
created_date: !!str "2019-07-01 20:25:32"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "199"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

The technique you followed has worked for most people: 

- https://askubuntu.com/questions/1042942/how-to-change-ubuntu-budgie-login-screen-background/1071765#1071765

However it didn't work for everyone and there is a lesser known technique in the same thread where they simply copy over the pre-packaged image filename with a new image:

> I tried all of those and none worked. This does, for sure:  
>   
> As root user, just copy your_image.png to /usr/share/backgrounds and  
> ....  
>   
>     # cd /usr/share/backgrounds  
>     # cp warty-final-ubuntu.png warty-final-ubuntu.png.stock  
>     # rm warty-final-ubuntu.png  
>     # ln -s your_image.png warty-final-ubuntu.png  
>     # reboot  
>   
> ...where your_image.png is the name of the actual image you want to  
> display. The warty one is big: 4096 x 2304. I matched mine to the same  
> size.  

