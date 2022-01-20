---
layout:       post
title:        >
    Why is my keyboard "raw" as opposed to "translated"?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037199
type:         Answer
tags:         keyboard 18.04 xinput
created_date: 2018-05-17 02:23:09
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "215 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-17-Why-is-my-keyboard-^raw^-as-opposed-to-^translated^^.md
toc:          false
navigation:   false
clipboard:    false
---

## AT = IBM PC/AT (Advanced Technology)

This is what an IBM PC/AT looks like:

[![IBM PC.jpg][1]][1]

*Image credit: Wikipedia*

There are three types of IBM Keyboard scan code sets in the PC world:

- Set 1 IBM PC/XT (had one of those)
- Set 2 IBM PC/AT (yup had one of those too)
- Set 3 IBM PC/3270 (Has 24 function keys like IBM Mainframe, S/36, S/38 and AS/400 terminals).


----------


From [wikipedia][2]:

For computers since the IBM PC AT, the keyboard controller on the motherboard translates AT (set 2) scancodes into XT (set 1) scancodes in so called translation mode.[3] This translation can be disabled in pass-through-mode, allowing the raw scancodes to be seen.[4] Therefore, whether a software developer will encounter AT scancodes or XT scancodes on a modern PC-compatible depends on how the keyboard is being accessed.

A compliant PS/2 keyboard can be told to send scancodes in set 1, 2 or 3.

Your question focuses on the IBM PC/AT as pictured above which BTW is a very nice mechanical keyboard that cost $300 in 1995 when I bought one for a Gateway Tower PC.


----------


  [1]: https://i.stack.imgur.com/LhTUb.jpg
  [2]: https://en.wikipedia.org/wiki/Scancode
