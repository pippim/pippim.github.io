---
layout:       post
title:        >
    How can I prevent line wrapping and instead allow horizontal scrolling in Gedit?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1103573
type:         Answer
tags:         gedit scrolling
created_date: 2018-12-21 11:30:12
edit_date:    2018-12-21 11:36:47
votes:        "6 "
favorites:    
views:        "1,154 "
accepted:     Accepted
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-21-How-can-I-prevent-line-wrapping-and-instead-allow-horizontal-scrolling-in-Gedit_.md
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


You can't access preferences if you are using `sudo -H gedit` though. You need to do this with regular user using `gedit` only. Then you can have `sudo` inherit your user preferences with a script such as this: [How can I sync my root gedit with my user gedit&#39;s preferences?](How can I sync my root gedit with my user gedit&#39;s preferences?)


  [1]: https://i.stack.imgur.com/UPHVs.png
  [2]: https://i.stack.imgur.com/roiojm.png
