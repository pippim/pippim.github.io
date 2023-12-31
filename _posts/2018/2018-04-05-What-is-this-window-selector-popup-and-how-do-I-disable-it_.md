---
layout:       post
title:        >
    What is this window selector popup and how do I disable it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022233
type:         Answer
tags:         16.04
created_date: 2018-04-05 11:47:34
edit_date:    2018-04-05 12:33:51
votes:        "0 "
favorites:    
views:        "216 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-05-What-is-this-window-selector-popup-and-how-do-I-disable-it_.md
toc:          false
navigation:   false
clipboard:    false
---

This is the windows switcher usually accessed with <kbd>Alt</kbd>+<kbd>Tab</kbd> key combination. To turn off the keyboard method this [answer][1] states:

> Install CompizConfig Settings Manager, find the Ubuntu unity plugin,  
> Switcher tab, Set `Key to start switcher` to `disabled`  

My touchpad doesn't invoke the windows switcher so I cannot test this on my system.

If this method doesn't work another method is editing Unity source and recompiling: [How can I disable arbitrary default multitouch gestures in Unity?][2]


  [1]: https://askubuntu.com/questions/212164/how-do-i-disable-the-alt-tab-switcher?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  [2]: https://askubuntu.com/questions/57586/how-can-i-disable-arbitrary-default-multitouch-gestures-in-unity
