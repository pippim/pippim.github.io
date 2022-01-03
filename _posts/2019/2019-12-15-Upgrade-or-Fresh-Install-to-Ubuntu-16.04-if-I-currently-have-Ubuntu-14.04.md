---
layout:       post
title:        >
    Upgrade or Fresh Install to Ubuntu 16.04 if I currently have Ubuntu 14.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196392
type:         Answer
tags:         14.04 16.04 upgrade
created_date: 2019-12-15 19:02:15
edit_date:    2020-06-12 14:37:07
votes:        "5 "
favorites:    
views:        "841 "
accepted:     
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    false
---

Because 14.04 is EOL (End of Life) there are [special considerations][1]:

> # Upgrade or fresh install?  
>   
> The advantage of upgrading is that you get to keep your current  
> configuration as is. This is often desirable on production  
> environments which you want to keep as stable as possible. At the same  
> time, configuration applicable for older versions might not always  
> work with newer versions.  
>   
> If you format partitions when installing a newer version, you have the  
> option to select a new file system, which might have benefits and  
> required features compared to the old one. The new installation also  
> gives you a clean platform to start building your system from; no old  
> configuration files and potential upgrade-related bugs.  
>   
> Reinstalling is usually easier and faster, especially if you would  
> have to upgrade through several releases. It might also help you save  
> some bandwidth, if that is a concern.  

That said if you were to do a clean install you might want to do it on a new partition and keep your old partition intact. This is helpful for migrating settings set many years ago on the old partition but unknown for the new partition. For example you may have custom scripts in `/usr/local/bin` or custom settings in `/etc` which you setup many years ago and then forgot about until the new installation isn't working properly.

If you want to upgrade you should consider [cloning your old partition][2] to the new partition and run the upgrade on the clone. Then if the upgrade fails, you can reclone, fix the error condition and run the upgrade again.

Please note an upgrade can take 40 minutes (in my case) to a few hours (reported by other users) depending on your system.

A few times a day, a few times a week, month and year I will change different system settings. Over the course of five years I forget all that I've changed. The advantage of upgrading is none get lost. The disadvantage of reinstalling is all get lost.

  [1]: https://help.ubuntu.com/community/EOLUpgrades
  [2]: {% post_url /2018/2018-04-27-Bash-script-to-backup∕clone-Ubuntu-to-another-partition %}
