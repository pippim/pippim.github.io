---
layout:       post
title:        >
    Does the size of your home directory affect startup performance?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187274
type:         Answer
tags:         startup performance home-directory
created_date: 2019-11-08 13:31:16
edit_date:    
votes:        "1 "
favorites:    
views:        "99 "
accepted:     Accepted
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-08-Does-the-size-of-your-home-directory-affect-startup-performance_.md
toc:          false
navigation:   false
clipboard:    false
---

During boot your `/home` partition is mounted which takes a fraction of a second regardless of it's size.

After logging in there are programs which will index (or process) the files in your home partition. This will effect performance the first time the program is used. If properly designed, such programs should not lag your screen or keyboard. After files are indexed the first time, subsequent program usage will only incrementally update new files added.

Some example programs would be:

- [Nautilus not generating thumbnails for GIF images](Nautilus not generating thumbnails for GIF images)
- [How to stop a file or folder from being indexed in GNOME?](How to stop a file or folder from being indexed in GNOME?)

With a large home directory some commands will be slower such as `find` but the similar command `locate` will not be noticeably slower. `find` searches every file but `locate` has an index of every file stored in it's own database.
