---
layout:       post
title:        >
    Is there a command to display a Calendar in the terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/895530
type:         Answer
tags:         command-line calendar yad
created_date: 2017-03-22 04:56:25
edit_date:    
votes:        "6 "
favorites:    
views:        "34,904 "
accepted:     
uploaded:     2022-07-17 08:13:45
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-22-Is-there-a-command-to-display-a-Calendar-in-the-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

# Programmable Calendars

Although these are GUI calendars you can still call them from the terminal. They allow you to navigate through the months and years. They are designed to be called from your Bash scripts but like all Bash commands you can call them from the terminal too.

## `YAD` (Yet Another Dialog) super-charged fork of `Zenity`

[![calendar yad][1]][1]

## `Zenity` GUI fork of text-based `dialog`

[![calendar zenity][2]][2]

Do not be concerned by the Gtk warning message. You see that a lot when running GUI programs from the terminal. eg. `gedit` and `nautilus` display similar warnings.


  [1]: https://i.stack.imgur.com/Ojiwe.png
  [2]: https://i.stack.imgur.com/HdFeF.png
