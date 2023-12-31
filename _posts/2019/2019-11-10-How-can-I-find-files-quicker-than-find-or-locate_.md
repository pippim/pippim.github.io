---
layout:       post
title:        >
    How can I find files quicker than find or locate?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187630
type:         Answer
tags:         search find
created_date: 2019-11-10 01:18:33
edit_date:    2019-11-10 01:27:23
votes:        "0 "
favorites:    
views:        "5,425 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-10-How-can-I-find-files-quicker-than-find-or-locate_.md
toc:          false
navigation:   false
clipboard:    false
---

> how to pipe output of locate command in a way that all other  
> information like size, time, etc. can be displayed or redirected to a  
> file.  

Much time and effort was devoted to solving this problem in this answer:

- [How can I count files with a particular extension, and the directories they are in?]({% post_url /2018/2018-04-09-How-can-I-count-files-with-a-particular-extension_-and-the-directories-they-are-in_ %})

This code can be scaled down to your `locate` needs:

``` 
$ time locate -0 *.mp4 | xargs -0 ls -s

     4 /home/rick/askubuntu/subdir-A/1.mp4
     4 /home/rick/askubuntu/subdir-A/2.mp4
         ( ... SNIP ... )
  3684 /mnt/d/Windows/WinSxS/amd64_microsoft-windows-winsatmediafiles_31bf3856ad364e35_10.0.10586.0_none_51eff420121c1922/Clip_480_5sec_6mbps_h264.mp4
 35972 /mnt/old/home/rick/Videos/VID_20180701_233225.mp4

real	0m0.900s
user	0m0.826s
sys 	0m0.084s
```

Breaking down `locate -0 *.mp4 | xargs -0 ls -s`:

- `locate -0` - The locate command usually prints a new line (`\n`) at the end of each entry. `0` instructs locate to separate entries with a null byte instead.
- `*.mp4` Locate all files ending in .mp4 (sound files)
- `|` is the pipe character. Whatever is printed by locate command doesn't go to the screen but is redirected to the next command.
- `xargs -0` - The xargs command takes entry by entry output from previous command (locate) and passes it to the next command. `-0` signifies entries are separated by null byte, rather than newline (`\n`) separator.
- `ls -s` The `ls` command is called by `xargs` and passed the file name to list. The `-s` flag tells `ls` to include the file size.

As you can see the process takes less than 1 second for over a million files in three Ubuntus and two Windows partitions.
