---
layout:       post
title:        >
    How do i Create a Zenity form with a check list in it
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/853717
type:         Answer
tags:         16.04 bash zenity
created_date: 2016-11-26 02:07:07
edit_date:    2017-04-13 12:37:16
votes:        "1 "
favorites:    
views:        "15,343 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-26-How-do-i-Create-a-Zenity-form-with-a-check-list-in-it.md
toc:          false
navigation:   false
clipboard:    false
---

It would appear the `--add-entry` option is not supported when `--list  --checklist` are used. I adapted your code to create:

``` bash
#!/bin/bash

zenity --list --checklist --title="Options"\
    --text="Select your features"\
    --column="Use"\
    --column="Feature"\
    TRUE A\
    False B\

zenity --forms --title="Create user" --text="Add new user" \
   --add-entry="First Name" \
   --add-entry="Last Name" \
   --add-entry="Username" \
   --add-password="Password" \
   --add-password="Confirm Password" \
   --add-calendar="Expires"
```

The first section you know what it looks like already. The second section looks like this:

[![Zenity Add Entry][1]][1]

The `--add-entry` works on `--forms` dialog box type but not on `--list` dialog box type.

**Credit for --forms** code to: ([Post on Stack Exchange][2])


  [1]: https://pippim.github.io/assets/img/posts/2016/Yq6c4.png
  [2]: https://unix.stackexchange.com/questions/103277/how-do-i-create-a-dialog-with-multiple-text-fields-using-zenity
