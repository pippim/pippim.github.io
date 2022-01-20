---
layout:       post
title:        >
    Code completion for gedit
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1084697
type:         Answer
tags:         gedit plugins programming
created_date: 2018-10-17 23:24:36
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "3,713 "
accepted:     
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-17-Code-completion-for-gedit.md
toc:          false
navigation:   false
clipboard:    false
---

# Snippets plug-in for gedit

`gedit` has more plug-ins than I can remember but one of them is called `snippets` and it is very popular.

## Supported languages

I do most of my coding in `bash` but `c` is also supported along with dozens of other languages including `HTML` and `CSS` which are also on your shopping list. 

[Installation][1] of `gedit` plug-ins and the `snippets` one in particular is straight forward. 

Review the default auto-completion options from the top menu by selecting `Tools` -> `Manage Snippets...`:

[![gedit snippets show languages.gif][2]][2]

You can add many more auto-complete options and even assign them shortcut keys.

## Auto-completion using <kbd>Tab</kbd> key

When using `bash` I almost always forget the syntax for certain commands. One of them is the `for` loop with C-like syntax option. In this GIF animation why type the letters `for` followed by the <kbd>Tab</kbd> key for auto complete:

[![gedit snippets for loop.gif][3]][3]

There are other `gedit` plug-ins active in the GIF animation above. The bottom of the screen is the `external terminal` interface where you can type shell commands. The right hand slide is the thumbnail slider. The grey area in between warns you when your typing is longer than 80 characters, or whatever size you choose.

`Tool Output` at the very bottom means `external tools` is enabled. This allows you to launch commands via hot keys and see the output. Handy if for example you want to pass your file to a LINT checker or compiler.

  [1]: https://askubuntu.com/questions/728306/how-to-debug-c-programs-by-gedit/1082769#1082769
  [2]: https://i.stack.imgur.com/ZPjaW.gif
  [3]: https://i.stack.imgur.com/dmXLo.gif
