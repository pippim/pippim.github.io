---
layout:       post
title:        >
    How can I scale Windows Individually?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/934633
type:         Answer
tags:         ubuntu-gnome scaling
created_date: 2017-07-10 02:00:46
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "4,452 "
accepted:     Accepted
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-10-How-can-I-scale-Windows-Individually_.md
toc:          false
navigation:   false
clipboard:    false
---

# It's not possible

To the best of my knowledge it's not possible. Updated applications are supposed to query global settings for HDPI (High Dots Per Inch) and behave accordingly.

# Work around with `xrandr`

Luckily (or unluckily) some applications do not query the global settings in `Unity Tweak Tools` (or in your case `Gnome Tweak Tools`) and their settings depending on `xrandr` instead.

Take for example `kid3` which ignores global settings by the tweaking tools. When started it looks like this:

[![kid3 no hdpi][1]][1]

If you open the terminal first and use:

``` 
xrandr --dpi 144
```

then call `kid3` the screen is magnified and easier to read:

[![HDPI kid3 xrandr 144][2]][2]

# Work around with Zoom

Within applications like `LibreOffice` and `Google Chrome` you can zoom in and zoom out to adjust HDPI to your liking.

For example in Chrome you can use <kbd>Ctrl</kbd>+<kbd>+</kbd> to zoom in and <kbd>Ctrl</kbd>+<kbd>-</kbd> to zoom out for an individual tab.

Additionally in Chrome you set the global page zooming factor in system settings:

[![HDPI Chrome page zoom][3]][3]

Notice the last option sets Page Zoom to 110%.

Generally speaking then you can solve most HDPI issues on an application by application basis but not within tweaking tools.

# 17" laptop at 1920x1080

On my 17" 1920x1080 laptop screen I use tweaking tools to set font scaling to 1.5:

[![HDPI tweak tool][4]][4]

In Ubuntu `System Settings` -> `Screen Display` I set monitor scaling to:

[![HDPI Screen Display settings][5]][5]

I spent a lot of time getting my settings just right for me with the laptop 3 feet away. I expect you and others might also have to invest considerable time too.

There are other issues to consider such as icon size in Desktop and Nautilus which you can also experiment with.


  [1]: https://i.stack.imgur.com/AhkJq.png
  [2]: https://i.stack.imgur.com/cep7d.png
  [3]: https://i.stack.imgur.com/nFW6c.png
  [4]: https://i.stack.imgur.com/YSzdX.png
  [5]: https://i.stack.imgur.com/EzsAT.png
