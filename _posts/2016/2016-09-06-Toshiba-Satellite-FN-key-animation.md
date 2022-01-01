---
layout:       post
title:        >
    Toshiba Satellite FN key animation
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/821894
type:         Answer
tags:         16.04 gui toshiba-satellite
created_date: !!str "2016-09-06 23:57:03"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "986"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

I have that Windows feature with my Satellite too. My Dell has a little applet for Windows called QuickSet. Neither manufacturer made anything similar for Linux that I know of.

If you are interested you can press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> to open a Terminal window. Then type:

``` 
acpi_listen

```

Now use your <kbd>Fn</kbd>+<kbd>F3</kbd> to turn brightness up and then <kbd>Fn</kbd>+<kbd>F2</kbd> to turn brightness down. The terminal will look similar to this:

``` 
XXXX@dell:~$ acpi_listen
video/brightnessup BRTUP 00000086 00000000
 PNP0C14:00 000000d0 00000000
video/brightnessdown BRTDN 00000087 00000000
 PNP0C14:00 000000d0 00000000

```

By listening to these events you can trigger actions that run scripts can pop a window up on your screen or many other things. For example, I developed event -> action scripts for `lid-close` (to go to sleep) and `lid-open` (to change sound back to TV when waking up).

So to answer your question no mfg solution in Linux that I know of but, quite easy to write your nifty things in Ubuntu / Linux if you spend a little time. If you don't mind a touch of bias doing the same in Windows would be a lot more difficult.

Now that you made it this far press <kbd>Ctrl</kbd>+<kbd>C</kbd> to end the `acpi_listen` program and then type `exit` to close the Terminal.
