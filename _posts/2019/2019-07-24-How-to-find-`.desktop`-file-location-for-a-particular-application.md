---
layout:       post
title:        >
    How to find `.desktop` file location for a particular application
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160753
type:         Answer
tags:         configuration .desktop ftp default-programs image-viewers
created_date: 2019-07-24 16:22:34
edit_date:    
votes:        "6 "
favorites:    
views:        "2,886 "
accepted:     Accepted
uploaded:     2022-01-23 11:36:46
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-24-How-to-find-`.desktop`-file-location-for-a-particular-application.md
toc:          false
navigation:   false
clipboard:    false
---

A much faster and more universal search is with `locate` command:

``` 
$ locate *image*desktop
/usr/share/app-install/desktop/gimagereader:gimagereader-gtk.desktop
/usr/share/app-install/desktop/gnome-disk-utility:gnome-disk-image-mounter.desktop
/usr/share/app-install/desktop/gnome-disk-utility:gnome-disk-image-writer.desktop
/usr/share/app-install/desktop/imagej:imagej.desktop
/usr/share/app-install/desktop/imagemagick-6.q16:display-im6.q16.desktop
/usr/share/app-install/desktop/imagemagick:display-im6.desktop
/usr/share/app-install/desktop/imagevis3d:imagevis3d.desktop
/usr/share/app-install/desktop/kimagemapeditor:kde4__kimagemapeditor.desktop
/usr/share/app-install/desktop/simple-image-reducer:simple-image-reducer.desktop
/usr/share/app-install/desktop/trimage:trimage.desktop
/usr/share/applications/gnome-disk-image-mounter.desktop
/usr/share/applications/gnome-disk-image-writer.desktop
/usr/share/applications/screensavers/tessellimage.desktop
```

`locate` can search millions of files in a few seconds where it would take `find` many many minutes:

``` 
$ time find / -name '*image*.desktop'
real	0m52.563s
user	0m6.271s
sys	    0m9.002s

$ time locate *image*desktop
real	0m0.705s
user	0m0.693s
sys	    0m0.012s
```

Notice how `grep` was eliminated from original method and `find` command was ammended.

The disadvantage of `locate` is the database is updated daily. If you just installed the application you are searching for today, you will first need to run:

``` 
sudo updatedb
```
