---
layout:       post
title:        >
    How to change Gnome-Terminal title?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1164880
type:         Answer
tags:         command-line gnome-terminal titlebar
created_date: 2019-08-11 00:45:50
edit_date:    2023-06-15 15:31:39
votes:        "31 "
favorites:    
views:        "296,719 "
accepted:     
uploaded:     2024-09-15 11:08:07
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-11-How-to-change-Gnome-Terminal-title_.md
toc:          false
navigation:   false
clipboard:    false
---


# Works on Ubuntu 16.04 to 22.10

This answer is simpler than most others. To use it, you would just type:

## `title "My new title"`

- Easier to remember than most other answers.
- The accepted answer and others do not work on modern versions of Ubuntu (from **16.04** on up).
- This answer doesn't require 3rd party packages like `wmctrl` and `xdotool`.
- Version 2 allows running multiple times in the same session.


----------

## One-time function creation

Create the `title` function in your `~/.bashrc` file:

``` bash
function title() {
    # Set terminal tab title. Usage: title "new tab name"
    prefix=${PS1%%\\a*}                  # Everything before: \a
    search=${prefix##*;}                 # Eeverything after: ;
    esearch="${search//\\/\\\\}"         # Change \ to \\ in old title
    PS1="${PS1/$esearch/$@}"             # Search and replace old with new
}
```

Save the `~/.bashrc` file. After opening a new terminal tab use:

``` bash
title "Special Projects"
```

or:

``` bash
title Special\ Projects
```

A phrase with spaces must be wrapped in double quotes (`"`) or each space must be escaped with `\`.
