---
layout:       post
title:        >
    Overriding a kernel module blacklisting that's reinstated during apt full-upgrade
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138978
type:         Answer
tags:         apt 18.04 kernel lubuntu udev
created_date: 2019-04-28 22:04:50
edit_date:    2019-04-28 22:12:37
votes:        "2 "
favorites:    
views:        "457 "
accepted:     
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---

From ServerFault:

- [Automatically keep current version of config files when apt-get install][1]

This answer:

``` 
apt-get install -o Dpkg::Options::="--force-confold" --force-yes -y udev

```

Read the comments below the answer though. It suggests `--force-yes` is sometimes an extreme option although it's not explained clearly.


----------

An even better ServerFault answer is found here:

- [Prevent update-manager from overwriting my Configs][2]

This Answer:

> You can pass options to dpkg from apt. Interesting for you would be  
> the option --force-confold. The command looks like this:  
>   
>     apt-get -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade  
>   
> Setting `--force-confdef` as well makes apt-get still update the  
> config file if it hasn't been edited, while `--force-confold` will  
> keep edited configuration files without asking.  
>   
> To make this permanent, you can also set these options in your  
> apt.conf file:  
>   
>     Dpkg::Options {  
>        "--force-confdef";  
>        "--force-confold";  
>     }  
>   
> Check e.g.  
> http://debian-handbook.info/browse/wheezy/sect.package-meta-information.html#sidebar.questions-conffiles  


  [1]: https://serverfault.com/questions/259226/automatically-keep-current-version-of-config-files-when-apt-get-install
  [2]: https://serverfault.com/questions/557979/prevent-update-manager-from-overwriting-my-configs
