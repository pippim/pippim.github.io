---
layout:       post
title:        >
    Nautilus doesn't remember sorting options in Ubuntu 19.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159965
type:         Answer
tags:         nautilus 19.04
created_date: !!str "2019-07-21 17:39:24"
edit_date:    !!str ""
votes:        !!str "4"
favorites:    
views:        !!str "633"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

This should work in all supported Ubuntu releases. First get default sort order:

``` 
$ gsettings get org.gnome.nautilus.preferences default-sort-order
'name'

```

Now change it to new sort order by modification date:

``` 
$ gsettings set org.gnome.nautilus.preferences default-sort-order 'mtime'

```

The list of all sort values allowed:

- by Name = `'name'`
- by Size = `'size'`
- by Type = `'type'`
- by Modification Date = `'mtime'`
- by Access Date = `'atime'`
- by Trashed Date = `'trash-time'`
