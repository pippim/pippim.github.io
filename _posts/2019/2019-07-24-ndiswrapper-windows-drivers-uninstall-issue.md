---
layout:       post
title:        >
    ndiswrapper windows drivers uninstall issue
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160789
type:         Answer
tags:         xubuntu uninstall ndiswrapper
created_date: !!str "2019-07-24 18:44:46"
edit_date:    !!str "2019-07-24 18:55:16"
votes:        !!str "0"
favorites:    
views:        !!str "140"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

Uninstalling (for the most part) is simply reversing the installation method. For example, if to install it you used:

``` 
sudo apt-get install ndisgtk

```

Then to uninstall it you would use:

``` 
sudo apt-get remove ndisgtk

```

There are additional details you might want to read:

- https://askubuntu.com/questions/96557/how-do-i-cleanly-remove-ndiswrapper
- https://askubuntu.com/questions/19013/how-do-i-remove-ndiswrapper-completely
- [How to Uninstall Ndiswrapper](https://sourceforge.net/p/ndiswrapper/ndiswrapper/Uninstall_HowTo/)

The last link deals with the windows wrapped drivers that are created in `/lib/modules/uname -r/misc`, `/etc/ndiswrapper` and `/etc/modprobe.d/ndiswrapper`.

That said I'm often one of those "Leave well enough alone" guys and even if I wasn't using Windows Wrapped Drivers anymore I might be tempted to just leave them be. On the other hand if `dkms` was compiling the new drivers with each kernel update and the time was distracting me, I probably would purge it all.
