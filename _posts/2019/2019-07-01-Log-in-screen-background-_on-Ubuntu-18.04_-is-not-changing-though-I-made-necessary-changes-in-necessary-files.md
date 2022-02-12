---
layout:       post
title:        >
    Log-in screen background (on Ubuntu 18.04) is not changing though I made necessary changes in necessary files
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155300
type:         Answer
tags:         login-screen
created_date: 2019-07-01 20:25:32
edit_date:    
votes:        "1 "
favorites:    
views:        "200 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-01-Log-in-screen-background-_on-Ubuntu-18.04_-is-not-changing-though-I-made-necessary-changes-in-necessary-files.md
toc:          false
navigation:   false
clipboard:    false
---

The technique you followed has worked for most people: 

- [How to change Ubuntu Budgie login screen background?](How to change Ubuntu Budgie login screen background?)

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

