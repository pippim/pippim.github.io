---
layout:       post
title:        >
    gedit "Manage External Tools" menu option doesn't appear
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045114
type:         Question
tags:         16.04 gedit
created_date: 2018-06-09 16:02:02
edit_date:    2018-06-09 18:36:20
votes:        "3 "
favorites:    
views:        "798 "
accepted:     Accepted
uploaded:     2022-01-19 20:21:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-09-gedit-^Manage-External-Tools^-menu-option-doesn^t-appear.md
toc:          false
navigation:   false
clipboard:    false
---

This is not the same question as: [&quot;Manage external tools&quot; not popping up dialog](&quot;Manage external tools&quot; not popping up dialog)g where the dialog box doesn't pop-up after selecting *Manage External Tools* from the gedit *Tools* menu.

My problem is the *Manage External Tools* option doesn't appear in the *Tools* menu at all.

I've checked off to use the plug-in within the *Preferences* sub-menu:

[![gedit external tools.png][1]][1]

I've even quit and reloaded *gedit* after enabling the plug-in.

My current version is:

``` 
$ gedit --version
gedit - Version 3.18.3
```

**Does anyone know why the *Manage External Tools* option isn't appearing?**


----------

Results of `namei`:

``` 
$ namei -l ~/.config/gedit/tools
f: /home/rick/.config/gedit/tools
drwxr-xr-x root root /
drwxr-xr-x root root home
drwxr-xr-x rick rick rick
drwx------ rick rick .config
drwxr-xr-x root root gedit
                     tools - No such file or directory
```


----------

Based on steeldriver's comment I ran:

``` 
sudo chown -cR rick:rick /home/rick
```

and all is well now.

  [1]: https://i.stack.imgur.com/pjD41.png

