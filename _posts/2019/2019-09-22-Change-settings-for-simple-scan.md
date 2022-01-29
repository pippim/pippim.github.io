---
layout:       post
title:        >
    Change settings for simple scan
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1175858
type:         Answer
tags:         settings simplescan
created_date: 2019-09-22 14:09:55
edit_date:    
votes:        "2 "
favorites:    
views:        "2,394 "
accepted:     Accepted
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-22-Change-settings-for-simple-scan.md
toc:          false
navigation:   false
clipboard:    false
---

# Short Answer

To scan from your second scanner:

``` 
simple-scan hpaio:/net/officejet_pro_6970?ip=192.168.8.20
```

# Long Answer

From [Debian's SaneOverNetwork][1]:

> ##Scanning with a Network HP all-in-one (aio)-1  
>   
> To scan over the network from a scanner on an HP aio (one which is not  
> connected by USB to a computer) you need only to install libsane-hpaio  
> (without its recommended packages) and pass the URI of the scanner to  
> the frontend. A non-free plugin might be required for the scanning  
> function.  
>   
> The format of the URI is:  
>   
>     hpaio:/net/<aio_model_name>?ip=<IP_address_of_the_aio>  
>   
> This URI can be given directly to the frontend. It can also be  
> provided automatically to the frontend if either a print queue with  
> the hp:/... backend is set up or mDNS broadcasts for the scanner are  
> done by the aio. Automatic discovery will happen via the print queue  
> if both it and mDNS are available as discovery methods.  
>   
> The IP address could be known from the way the aio's networking was  
> set up; or it could be got from the aio's front panel or deduced from  
> the output of  
>   
>     /usr/bin/lpinfo -v  
>   
> Each printer model supported by the installed verion of libsane-hpaio  
> is listed in /usr/share/hplip/data/models/models.dat. Model names are  
> enclosed in square brackets; like so, [envy_4500_series].  
>   
> A frontend can be started with (for example):  
>   
>     simple-scan <URI>  
>   
> Typing the URI each time can be avoided by exploring what your DE  
> (Desktop Environment) or WM (Window Manager) offers for customising a  
> command. For typing from a terminal you might find a simple alias  
> sufficient.  

There are more options for setup as the link describes. The information on `alias` to save typing might be very helpful.

  [1]: https://wiki.debian.org/SaneOverNetwork#Scanning_with_a_Network_HP_all-in-one_.28aio.29-1
