---
layout:       post
title:        GNOME choose audio device headphones over headset automatically
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1245605
type:         Answer
tags:         gnome sound 18.04 headphones
created_date: 2020-05-31 20:59:34
edit_date:    
votes:        2
favorites:    
views:        969
accepted:     
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

Gnome developers have been talking about this problem for over a year:

- [Don't ask to "Select Audio Device" every time an audio device is plugged in](https://gitlab.gnome.org/GNOME/gnome-settings-daemon/-/issues/96)

The person making the request states:

> Here's my drive-by-design thoughts:  
>   
> The broad answer is indeed NOT to ask. If I explicitly plug in a  
> device, I expect the sound to come out of it. There is an immediate  
> direct interaction happening. Even if there are scenarios where this  
> is not the case, asking every time you plug in an unknown device makes  
> a bad common case experience. Of course there will be a ginormous long  
> tail of special use cases.  

Someone else rationalizes the reason for asking:

> If you have a plug that can be a microphone or a washing machine and  
> you can't tell which, I can't think of any other way but ask. :)  

The last comment a developer concedes the pop-up window is poorly designed:

> Oh, seems like you're right indeed: The first time I plug in a  
> headphone, after a few seconds the output gets muted, while the dialog  
> shows way before that for some reason (those seconds could probably  
> already destroy a microphone), and every time after that, audio just  
> doesn't get muted and continues while the dialog is visible. Also I'm  
> seeing that sometimes we fail to show the dialog if the headphone is  
> plugged in rather carefully (the loose connection seems to trigger the  
> dialog multiple times). So we should either fix those issues or maybe  
> consider those bug a "field test", since so far nobody complained  
> about a broken microphone to us ;)  

With some programming you could monitor for new windows being opened on your screen every two or three seconds. If the offending window opens you can send a mouse click to automatically select the headphones. I do this for example with some windows that have slide in bubble messages that lead to undesired advertising sites.

Another option would be to get the program name for the offending window and replace it with a new program that does nothing but unmute the sound.

In either case, unless you have some free time and the skills yourself, you will need to wait for a developer to create something.

----------

There is something you can quickly try with no guarantee of success. There is a `pulseaudio` feature called `module-switch-on-connect` that enables automatic switching of an audio device on connection. To test if this works issue the following command in a terminal:

``` 
pacmd load-module module-switch-on-connect

```

Now plug in your headphones. If that works make it permanent by adding the following line to your `/etc/pulse/default.pa`:

``` 
load-module module-switch-on-connect

```

save the file and it will work on future reboots.
