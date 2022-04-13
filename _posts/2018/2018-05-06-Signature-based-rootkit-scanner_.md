---
layout:       post
title:        >
    Signature-based rootkit scanner?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032588
type:         Answer
tags:         software-recommendation security malware rootkit signature
created_date: 2018-05-06 01:44:40
edit_date:    
votes:        "3 "
favorites:    
views:        "1,092 "
accepted:     Accepted
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-06-Signature-based-rootkit-scanner_.md
toc:          false
navigation:   false
clipboard:    false
---

**AIDE** (**A**dvanced **I**ntruder **D**etection **E**nvionment) is a replacement to `tripwire` mentioned in another answer here. From [wikipedia][1]: 

> The Advanced Intrusion Detection Environment (AIDE) was initially  
> developed as a free replacement for Tripwire licensed under the terms  
> of the GNU General Public License (GPL).  
>   
> The primary developers are named as Rami Lehti and Pablo Virolainen,  
> who are both associated with the Tampere University of Technology,  
> along with Richard van den Berg, an independent Dutch security  
> consultant. The project is used on many Unix-like systems as an  
> inexpensive baseline control and rootkit detection system.  


----------


## Functionality

AIDE takes a "snapshot" of the state of the system, register hashes, modification times, and other data regarding the files defined by the administrator. This "snapshot" is used to build a database that is saved and may be stored on an external device for safekeeping.

When the administrator wants to run an integrity test, the administrator places the previously built database in an accessible place and commands AIDE to compare the database against the real status of the system. Should a change have happened to the computer between the snapshot creation and the test, AIDE will detect it and report it to the administrator. Alternatively, AIDE can be configured to run on a schedule and report changes daily using scheduling technologies such as cron, which is the default behavior of the Debian AIDE package.[2]

This is mainly useful for security purposes, given that any malicious change which could have happened inside of the system would be reported by AIDE.


----------

Since the wikipedia article was written the then current maintainer **Richard van den Berg** (2003-2010) has been replaced by a new maintainer **Hannes von Haugwitz** from 2010 to present.

The [AIDE homepage][2] states Debian is supported which means the application can be installed in ubuntu with the predicatable:

``` 
sudo apt install aide
```

As far as portability and USB pen drive support the homepage goes on to say:

> It creates a database from the regular expression rules that it finds  
> from the config file(s). Once this database is initialized it can be  
> used to verify the integrity of the files. It has several message  
> digest algorithms (see below) that are used to check the integrity of  
> the file. All of the usual file attributes can also be checked for  
> inconsistencies. It can read databases from older or newer versions.  
> See the manual pages within the distribution for further info.  

This implies to me you could have the signature database on your pen drive along with the application on live USB persistent storage. I'm not sure AIDE suits your needs but as it's a replacement to `tripwire` your current favorite it bears looking into.

  [1]: https://en.wikipedia.org/wiki/Advanced_Intrusion_Detection_Environment
  [2]: http://aide.sourceforge.net/
