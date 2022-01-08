---
layout:       post
title:        >
    How can I make a detailed report of ClamAv scan results (location of infected files)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/812345
type:         Answer
tags:         security scanner log malware clamav
created_date: 2016-08-14 23:59:43
edit_date:    2016-08-16 13:50:31
votes:        "6 "
favorites:    
views:        "30,208 "
accepted:     
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

Apparently you have to tell ClamAv where to put your report of infected files. Looking at wiki it appears the software isn't stellar and there might be better packages to use if security is your first concern. However ClamAV is open source and free so if budget is priority it is probably the best.

As far as seeing a report of infected files this is what I found [in the Community Help Wiki][1]:

> ## Infected files reporting  
>   
> In case you are recursively scanning the whole /home folder (or even  
> the whole system) from a terminal emulator on your GUI, possibly there  
> will be lots of files. In that case, as the output you will get is not  
> infinite, it probably will help to generate a report containing the  
> paths to all infected files. In that case you can do the following:  
>   
>     sudo clamscan -r /folder/to/scan/ | grep FOUND >> /path/to/save/report/file.txt  
>   
> Be patient if you run that command and it doesn't seem to be working  
> because even if you don't see the complete output it is really  
> scanning the files. When you see the prompt again, that will mean the  
> scan is finished and that you can open the file it has created to  
> check any infected file detected in your system.  
>   
> As Clamav doesn't disinfect the files, sometimes will be better to  
> just know what are the infected files before putting it on quarantine  
> or removing it. For example, you could be using Wine and by deleting  
> an infected file you could break a program without having saved some  
> data.  

  [1]: https://help.ubuntu.com/community/ClamAV
