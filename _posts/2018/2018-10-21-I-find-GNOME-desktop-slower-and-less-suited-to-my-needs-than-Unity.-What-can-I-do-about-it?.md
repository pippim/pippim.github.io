---
layout:       post
title:        >
    I find GNOME desktop slower and less suited to my needs than Unity. What can I do about it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1085850
type:         Answer
tags:         unity gnome 18.04
created_date: 2018-10-21 14:06:29
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "249 "
accepted:     
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

## You can still use Unity in 18.04

[This detailed article][1] has a screen shot-filled tutorial for installing Unity in Ubuntu 18.04. To summarize:

``` 
sudo apt install ubuntu-unity-desktop

```

When installation starts you are asked if you want to switch to the Unity `lightdm` greeter. You will likely want this as you get the familiar login screen with the ability of easily changing login screen wallpaper.

Reboot and next to your User password field you will have either:

- a Ubuntu logo if you picked Lightdm greeter
- a Gear logo if you picked Gnome login

Click the Ubuntu Logo or Gear and now you can pick between the Gnome Desktop or Unity Desktop at login time. The next time you login the last choice is defaulted and you don't have to change it again.


----------


## Speed decreases

As for speed decrease, this is common in software generations adding more features as hardware becomes more powerful. The extra features slows response time on older hardware but new hardware usually provides acceptable response time.

Programmers will fine-tune their code after release to improve performance. Sometimes shortcuts are made to rush the project out the door to meet marketing's deadlines. After release extra time can be spent researching slow response times. 

No one has a crystal ball but I'd say around the time 14.04 hits end of life (EOL) that's the time to seriously consider moving from 16.04 to 18.04. 

Those making brand new hardware purchases today though would be better off installing 18.04 first as it has better support for new hardware with default kernel chain `4.15.0-XX-generic`. Additionally it will save the pain of upgrading from 16.04 to 18.04 down the road.

  [1]: https://itsfoss.com/use-unity-ubuntu-17-10/
