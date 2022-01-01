---
layout:       post
title:        >
    Cancel buttons Zenity
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1211685
type:         Answer
tags:         command-line bash scripts notification zenity
created_date: !!str "2020-02-20 01:23:40"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "1,380"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

Assuming that return value is `1` for "cancel" and `0` for "ok" you will want to use:

``` sh
#!/bin/sh
#InputBox1Test

title=$(zenity --entry --text 'Type what you want your Notification Title to Say!' --title 'Notification')
[[ "$?" != "0" ]] && exit 1
text=$(zenity --entry --text 'Type what you want your Notification body to Say!' --title 'Notification')
[[ "$?" != "0" ]] && exit 1
DISPLAY=:0.0 notify-send "$title" "$text"
```

You can make a longer traditional check like this:

``` 
if [[ "$?" != "0" ]] ; then
    exit 1
fi
```

however I like the shortcut of:

``` 
[[ "$?" != "0" ]] && exit 1

```

No matter which method you choose the importance is consistency with your programming style so those that follow in your footsteps and maintain your code can think inside your head.
