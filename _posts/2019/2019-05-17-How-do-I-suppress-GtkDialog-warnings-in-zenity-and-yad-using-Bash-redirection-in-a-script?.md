---
layout:       post
title:        >
    How do I suppress GtkDialog warnings in zenity and yad using Bash redirection in a script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144080
type:         Question
tags:         command-line bash redirect yad
created_date: 2019-05-17 16:54:07
edit_date:    2019-05-18 10:31:15
votes:        "3 "
favorites:    
views:        "1,978 "
accepted:     Accepted
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

<!-- Language-all: lang-bash -->

I'm trying to suppress `GtkDialog` warnings in `zenity` and `yad`:

``` 
$ zenity --error --text hello
Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged.

```

Error redirection and filtering works:

``` 
$ zenity --error --text hello 2> >(grep -v GtkDialog >&2)

```

**YEAH...** Annoying warning message disappears!!

This can be placed in `~/.bashrc` for development work as answered here:

- [How to make zenity “transient parent” warning disappear permanently (using function)][1]

and here:

- [How to make zenity “transient parent” warning disappear permanently (using alias)][2]

When creating a script for others to use though, you don't want the burden of them changing their `~/.bashrc`.

----------


I'm having trouble creating a typing shortcut for: `2> >(grep -v GtkDialog >&2)` to be used inside script.

For many reasons variable assignment `GTK_SPAM="2> >(grep -v GtkDialog >&2)"` followed later by variable usage `"$GTK_SPAM"` doesn't work.

`alias zenity="zenity 2> >(grep -v GtkDialog >&2)"` before calling script works  but, I can't use this within a script. 

Using an array to hold the typing shortcut isn't working:

``` 
$ aGtkSpam=(2\> \>\(grep -v GtkDialog \>\&2\))

$ DumpArray "${aGtkSpam[@]}"
Array Elements:
0: 2>
1: >(grep
2: -v
3: GtkDialog
4: >&2)

$ zenity --error --text hello "${aGtkSpam[@]}"
This option is not available. Please see --help for all possible usages.

$ yad --text hello 2> >(grep -v GtkDialog >&2)

$ yad --text hello "${aGtkSpam[@]}"
Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged.

```

I found many excellent generic answers on word-splitting and parameters which ***should*** solve my problem but a specific syntax eludes me.

***Any clues?***


  [1]: https://askubuntu.com/a/896940/307523
  [2]: https://askubuntu.com/a/1110850/307523
