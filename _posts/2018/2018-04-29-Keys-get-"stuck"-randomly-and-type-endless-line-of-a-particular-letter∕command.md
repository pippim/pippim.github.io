---
layout:       post
title:        >
    Keys get "stuck" randomly and type endless line of a particular letter∕command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029791
type:         Answer
tags:         keyboard 18.04
created_date: !!str "2018-04-29 17:39:09"
edit_date:    !!str ""
votes:        !!str "8"
favorites:    
views:        !!str "8,387"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

In Ubuntu 18.04 issue this command:

``` 
$ gsettings get org.gnome.desktop.peripherals.keyboard repeat
true

```

If the result is `true` then turn off keyboard repeat using this command:

``` 
$ gsettings set org.gnome.desktop.peripherals.keyboard repeat false

```

The other related commands you can use are:

``` 
$ gsettings get org.gnome.desktop.peripherals.keyboard delay
uint32 500
$ gsettings get org.gnome.desktop.peripherals.keyboard repeat-interval
uint32 30

```

