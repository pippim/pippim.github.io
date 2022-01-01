---
layout:       post
title:        >
    How can I prevent line wrapping and instead allow horizontal scrolling in Gedit?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1103573
type:         Answer
tags:         gedit scrolling
created_date: !!str "2018-12-21 11:30:12"
edit_date:    !!str "2018-12-21 11:36:47"
votes:        !!str "6"
favorites:    
views:        !!str "1,127"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

On the window bottom of `gedit` click on the Line number / Column number section:

[![gedit text wrapping.png][1]][1]

Uncheck the `Text wrapping` option and a horizontal scroll box will then appear. Lines will no longer be wrapped.


----------


If you want the setting to be permanent change your preferences. Use: `Edit` => `Preverences` => `View` => `Enable text wrapping`:

[![gedit preferences menu.png][2]][2]

----------


You can't access preferences if you are using `sudo -H gedit` though. You need to do this with regular user using `gedit` only. Then you can have `sudo` inherit your user preferences with a script such as this: https://askubuntu.com/questions/92655/how-can-i-sync-my-root-gedit-with-my-user-gedits-preferences/1047405#1047405


  [1]: https://i.stack.imgur.com/UPHVs.png
  [2]: https://i.stack.imgur.com/roiojm.png
