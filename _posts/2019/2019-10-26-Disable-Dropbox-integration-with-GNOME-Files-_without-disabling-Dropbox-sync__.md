---
layout:       post
title:        >
    Disable Dropbox integration with GNOME Files (without disabling Dropbox sync)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184006
type:         Answer
tags:         18.04 nautilus dropbox
created_date: 2019-10-26 15:51:22
edit_date:    2023-03-30 16:51:00
votes:        "2 "
favorites:    
views:        "267 "
accepted:     
uploaded:     2023-12-31 12:29:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-26-Disable-Dropbox-integration-with-GNOME-Files-_without-disabling-Dropbox-sync__.md
toc:          false
navigation:   false
clipboard:    false
---

In Ubuntu 16.04 you can remove the context sensitive menu option for Dropbox with this:

``` 
sudo mv /usr/lib/nautilus/extensions-3.0/libnautilus-dropbox.so{,.bak}
```

A backup is created in case you wish to revert (for example too much functionality is removed).

Next close Nautilus and reopen it:

``` 
nautilus -q
nautilus
```


----------

In [Ubuntu 18.04][1] the directory name has changed to `/usr/share/nautilus-share/interfaces` but I haven't got around to testing 18.04, 19.04 or 19.10 yet.

---

In Ubuntu 22.10 the directory name has changed to:

```bash
/usr/lib/x86_64-linux-gnu/nautilus/extensions-4
```

  [1]: https://askubuntu.com/a/414443/307523
