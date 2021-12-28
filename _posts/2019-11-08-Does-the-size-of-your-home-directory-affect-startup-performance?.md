---
layout:       post
title:        Does the size of your home directory affect startup performance?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187274
type:         Answer
tags:         startup performance home-directory
created_date: 2019-11-08 13:31:16
edit_date:    
votes:        1
favorites:    
views:        93
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

During boot your `/home` partition is mounted which takes a fraction of a second regardless of it's size.

After logging in there are programs which will index (or process) the files in your home partition. This will effect performance the first time the program is used. If properly designed, such programs should not lag your screen or keyboard. After files are indexed the first time, subsequent program usage will only incrementally update new files added.

Some example programs would be:

- https://askubuntu.com/questions/627088/nautilus-not-generating-thumbnails-for-gif-images
- https://askubuntu.com/questions/722664/how-to-stop-a-file-or-folder-from-being-indexed-in-gnome

With a large home directory some commands will be slower such as `find` but the similar command `locate` will not be noticeably slower. `find` searches every file but `locate` has an index of every file stored in it's own database.
