---
layout:       post
title:        >
    Permanently unset environment variable SUMO_HOME
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1185463
type:         Answer
tags:         command-line package-management environment-variables
created_date: 2019-11-01 11:51:15
edit_date:    
votes:        "0 "
favorites:    
views:        "925 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-01-Permanently-unset-environment-variable-SUMO_HOME.md
toc:          false
navigation:   false
clipboard:    false
---

Before grabbing a coffee, run this command:

``` 
sudo time grep -rnw --exclude-dir={media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e "SUMO_HOME"
```

It will search your entire partition for all occurrences of `SUMO_HOME` in all files. It omits files on other drives/partitions (`mnt`) and in temporary system directories.

On a HDD the command will take the longest time but on an SSD it with 20 GB of files it takes 3 minutes:

``` 
$ sudo time grep -rnw --exclude-dir={media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e "SUMO_HOME"
[sudo] password for rick:          
Binary file /home/rick/.mozilla/firefox/9fu0cuql.default/places.sqlite matches
Binary file /home/rick/.mozilla/firefox/9fu0cuql.default/sessionstore-backups/recovery.jsonlz4 matches
Binary file /home/rick/.mozilla/firefox/9fu0cuql.default/sessionstore-backups/recovery.baklz4 matches
Binary file /home/rick/.mozilla/firefox/9fu0cuql.default/places.sqlite-wal matches
Binary file /home/rick/.cache/mozilla/firefox/9fu0cuql.default/cache2/entries/E883FF0A3B2BE2423996DA9A152C6B85AD52385C matches
53.23user 19.36system 2:09.36elapsed 56%CPU (0avgtext+0avgdata 19632maxresident)k
46678523inputs+0outputs (0major+7578minor)pagefaults 0swaps
```

Ignore the entries that appear from your browser as these were typed into this question and answer thread. The above single entry in `.cache` is unimportant but you might have other important ones.
