---
layout:       post
title:        >
    Is there a way to control the JACK Output volume via terminal or get a PulseAudio Input?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159742
type:         Answer
tags:         sound pulseaudio alsa volume-control jack
created_date: 2019-07-20 18:18:25
edit_date:    2019-07-21 15:54:39
votes:        "2 "
favorites:    
views:        "8,010 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-20-Is-there-a-way-to-control-the-JACK-Output-volume-via-terminal-or-get-a-PulseAudio-Input^.md
toc:          false
navigation:   false
clipboard:    false
---

## Update July 21, 2019

From a professional music website for Linux:

- [Jack Master Volume?][1]

> Sorry for posting non-ardour question but I need your guidance. When  
> Jack takes control over audio, many apps, including flashplayer, act  
> very loud i.e in VLC I have volume set to 5%. I would like to control  
> the master volume like in alsamixer instead of setting levels for each  
> app individually. How can I do that?  

There are two answers posted and this one is the most helpful:

> there is no such concept. JACK is designed for pro-audio and music  
> creation workflows. Its not a desktop sound server, even though some  
> of use it in that way. If you need such a thing, you will need to  
> route all your JACK clients via a mixing client which could be  
> something as simply as JackMix or as complex as Ardour. JACK itself  
> does not provide this facility, and its totally out of the scope of  
> its design.  

The simplest solution then is to install [JackMix][2]:

*"Ever struggled with a number of jack applications on your desktop everyone using its own master volume-fader but not one common place for all the volumes directly accessible?"*

*"The solution to your problem is JackMix, a mixer app for jack that looks exactly like the mixer you would use if you had to connect your analog equipment."*

There are other applications for **Jack** which you can find listed [here][3].

----------

## Original answer

I must confess to be musically-challenged but I think [this script][4] is where you are heading:

> You can get a list of all sinks with `pacmd list-sinks, and set the  
> volume with `pacmd set-sink-volume`, so you need to do something like  
>   
>     VOLUME='+5%'  
>     for SINK in `pacmd list-sinks | grep 'index:' | cut -b12-`  
>     do  
>       pacmd set-sink-volume $SINK $VOLUME  
>     done  
>   
> where `$VOLUME` can be absolute (150%) or relative (+5%, -5%), and  
> possibly other formats, too.  
>   
> Most window managers can be configured to launch scripts or programs,  
> complete with arguments, when you press keys. That's the best method,  
> but if your WM doesn't, there are tools like `xbindkeys`. So you can  
> customize in any way you want.  
>   
> Note that Pulseaudio will start using hardware mixers if the sink  
> volume goes over 100%, and that can distort the sound.  
>   
> Also note that Pulseaudio allows to set the volume for each  
> application ("audio stream") with pamcd set-sink-input-volume. You can  
> list them with pacmd list-sink-inputs and set them in a similar way.  
>   
> That allows you have the sink volumes at a fixed level so they are  
> about equal, without using hardware mixers, and when you switch sinks,  
> it will automatically have the "right" volume. That's the setup I  
> prefer.  


  [1]: https://discourse.ardour.org/t/jack-master-volume/84650
  [2]: http://www.arnoldarts.de/jackmix/.
  [3]: http://jackaudio.org/applications/
  [4]: https://unix.stackexchange.com/questions/374085/lower-or-increase-pulseaudio-volume-on-all-outputs
