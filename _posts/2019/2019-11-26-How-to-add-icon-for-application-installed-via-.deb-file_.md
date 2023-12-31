---
layout:       post
title:        >
    How to add icon for application installed via .deb file?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191688
type:         Answer
tags:         software-installation icons deb
created_date: 2019-11-26 00:19:12
edit_date:    
votes:        "0 "
favorites:    
views:        "3,924 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-26-How-to-add-icon-for-application-installed-via-.deb-file_.md
toc:          false
navigation:   false
clipboard:    false
---

Probably related to this bug reported by Linux Mint user and confirmed by Ubuntu 18.04 users:

- [Blank Icon in Linux Mint 19][1]

The accepted solution there:

> So, I tried a few things just to learn a bit more about how icons work  
> in desktop Linux and here's what I found.  
>   
> First, I edited `/usr/share/applications/tusk.desktop` and changed the  
> `Icon=` line back to simply `Icon=tusk` Then, I ran:  
>   
>     sudo gtk-update-icon-cache -f /usr/share/icons/hicolor/  
> I wanted to see if  
> the icon cache just hadn't gotten updated after Tusk was installed.  
> But, it seems that the icon in the `/usr/share/icons/hicolor/0x0/apps`  
> folder is ignored by `gtk-update-icon-cahce` because after updating  
> the cache there was still no icon in the Mint start menu or taskbar  
> when (when Tusk is running). Curiously, the Tusk icon in the "system  
> tray" part of the Mint taskbar works.  
>   
> So, leaving `Icon=tusk` in the `.desktop` file, I installed imagemagick  
> and did the following:  
>   
> -    `cd /usr/share/icons/hicolor/0x0/apps`  
> -    `sudo convert tusk.png -resize 512x512 /usr/share/icons/hicolor/512x512/apps/tusk.png`  
> -    `sudo gtk-update-icon-cache -f /usr/share/icons/hicolor/`  
>   
> After using those commands to make a 512x512 version of the icon in  
> the appropriate folder and updating the icon cache, the Tusk icon is  
> appearing in the Mint start menu and taskbar.  


  [1]: https://github.com/klaussinani/tusk/issues/143
