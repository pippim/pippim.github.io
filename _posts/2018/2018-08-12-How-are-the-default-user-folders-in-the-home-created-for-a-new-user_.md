---
layout:       post
title:        >
    How are the default user folders in the home created for a new user?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064548
type:         Answer
tags:         directory home-directory default
created_date: 2018-08-12 01:16:02
edit_date:    
votes:        "3 "
favorites:    
views:        "5,810 "
accepted:     Accepted
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-How-are-the-default-user-folders-in-the-home-created-for-a-new-user_.md
toc:          false
navigation:   false
clipboard:    false
---

The defaults can be examined using:

``` 
$ cat /etc/xdg/user-dirs.defaults
# Default settings for user directories
#
# The values are relative pathnames from the home directory and
# will be translated on a per-path-element basis into the users locale
DESKTOP=Desktop
DOWNLOAD=Downloads
TEMPLATES=Templates
PUBLICSHARE=Public
DOCUMENTS=Documents
MUSIC=Music
PICTURES=Pictures
VIDEOS=Videos
# Another alternative is:
#MUSIC=Documents/Music
#PICTURES=Documents/Pictures
#VIDEOS=Documents/Videos
```

If you don't want a specific subdirectory created put a `#` in front of it to comment out the line.

The sub-directories aren't created until the user logs in with a GUI: [Create default home directory for existing user in terminal](Create default home directory for existing user in terminal)
