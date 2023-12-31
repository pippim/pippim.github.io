---
layout:       post
title:        >
    Switching from nautilus to nemo not working 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047470
type:         Answer
tags:         nautilus 18.04 nemo gnome-session-fallback
created_date: 2018-06-18 00:43:21
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "1,845 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-18-Switching-from-nautilus-to-nemo-not-working-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

## Update June 8, 2019

There is a tutorial on installing `nemo` in Ubuntu:

- [How to Install Nemo in Ubuntu Without Cinnamon Dependencies][1] 

First install `nemo`:

``` 
sudo add-apt-repository ppa:webupd8team/nemo3
sudo apt update
sudo apt install nemo
```

Then set `nemo` as the preference over `nautilus`:

``` 
gsettings set org.gnome.desktop.background show-desktop-icons false
xdg-mime default nemo.desktop inode/directory application/x-gnome-saved-search
```

If you change your mind or find `nemo` lacking in some way:

``` 
gsettings set org.gnome.desktop.background show-desktop-icons true
xdg-mime default nautilus.desktop inode/directory application/x-gnome-saved-search
sudo apt remove nemo
## ```




## Original answer

There is currently a bug report filed on `exo-utils` [here][2].

You can try this:

``` 
sudo apt install exo-utils
```

Then run:

``` 
exo-preferred-applications
```

then switch to **Utilities** tab and select File Manager you prefer.


  [1]: https://www.linuxslaves.com/2017/07/how-to-install-nemo-in-ubuntu-unity.html
  [2]: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=892010


