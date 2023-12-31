---
layout:       post
title:        >
    Pictures folder disappeared from favorites in file browser
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180712
type:         Answer
tags:         directory filemanager symbolic-link
created_date: 2019-10-13 18:28:50
edit_date:    
votes:        "0 "
favorites:    
views:        "136 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-13-Pictures-folder-disappeared-from-favorites-in-file-browser.md
toc:          false
navigation:   false
clipboard:    false
---

Take a look at this file:

``` 
$ cat ~/.config/user-dirs.dirs

# This file is written by xdg-user-dirs-update
# If you want to change or add directories, just edit the line you're
# interested in. All local changes will be retained on the next run
# Format is XDG_xxx_DIR="$HOME/yyy", where yyy is a shell-escaped
# homedir-relative path, or XDG_xxx_DIR="/yyy", where /yyy is an
# absolute path. No other format is supported.
# 
XDG_DESKTOP_DIR="$HOME/Desktop"
XDG_DOWNLOAD_DIR="$HOME/Downloads"
XDG_TEMPLATES_DIR="$HOME/Templates"
XDG_PUBLICSHARE_DIR="$HOME/Public"
XDG_DOCUMENTS_DIR="$HOME/Documents"
XDG_MUSIC_DIR="$HOME/Music"
XDG_PICTURES_DIR="$HOME/Pictures"
XDG_VIDEOS_DIR="$HOME/Videos"
```

Set the directory for `XDG_PICTURES_DIR` to reflect your recent changes.
