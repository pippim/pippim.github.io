---
layout:       post
title:        Is there a command to display a Calendar in the terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/895530
type:         Answer
tags:         command-line calendar yad
created_date: 2017-03-22 04:56:25
edit_date:    
votes:        4
favorites:    
views:        30,404
accepted:     
uploaded:     2021-12-29 16:51:17
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
