---
layout:       post
title:        >
    How can I move down one directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1276376
type:         Answer
tags:         command-line bash
created_date: 2020-09-20 00:09:48
edit_date:    2023-09-04 23:06:36
votes:        "0 "
favorites:    
views:        "65,399 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-09-20-How-can-I-move-down-one-directory.md
toc:          false
navigation:   false
clipboard:    false
---

`cdd` is a small bash script that's a power tool for the `cd` command. Visit the link below for a one minute video and copy the code below if you like what you see.

[cdd - a Change Directory (cd) Power Tool 🔗](https://www.pippim.com/programs.html#cdd "See 1 minute video demonstrating power of cdd. Hold Ctrl then click to open in new window")

It's annoying have to type out long sub-directory names with spaces. So I created a little function in `~/.bashrc` that automatically changes down one sub-directory level if there is only one sub-directory. If there is more than one sub-directory then `zenity` is used to pick one to change to.


``` Bash
cdd () {

    OFS="$IFS"                                  # Save Input File Separator
    IFS=$'\n'
    # Bash array of directories names
    dirs=( $(find . -maxdepth 1 -type d | grep './' | cut -c 3- | sort) )

    # If no directories exit
    if [ "${#dirs}" -eq 0 ] ; then
        echo "No subdirectories"
        IFS="$OFS"                              # Restore Input File Separator
        return
    fi

    # Only one directory then change to it and exit
    if [ "${#dirs[@]}" -eq 1 ] ; then
        cd "${dirs[0]}"
        IFS="$OFS"                              # Restore Input File Separator
        return
    fi

    # Zenity to pick one of the directories
    result=$(zenity --list --width=600 --height=400 --title="down" \
             --column="Sub-Directories" "${dirs[@]}" \
             2> >(grep -v 'GtkDialog' >&2))     # Suppress Gtk annoying message
    IFS="$OFS"                                  # Restore Input File Separator
             
    if [ ! -z "$result" ] ; then                # Did they select an item?
        cd "$result"
    fi
}
```

Copy above code into your `~/.bashrc` file and then open a terminal and type `cdd` to use it.

If terminal is already open, you can resource your revised `~/.bashrc` file with:

``` 
source ~/.bashrc
```

or

``` 
. ~/.bashrc
```


----------


# Usage

When you call `cdd` and there is more than one sub-directory you need to pick one:

[![cdd.png][1]][1]

In this screen if you click **OK** button it is equivalent to:

``` none
cd Seven\ Mary\ Three
```

or:

``` none
cd "Seven Mary Three"
```

When you call `cdd` and there is only one sub-directory it automatically changes to it:

``` none
rick@alien:~/Music/Seven Mary Three$ cdd
rick@alien:~/Music/Seven Mary Three/American Standard$ 
```

When you call `cdd` and there are no sub-directories an error is displayed:

``` none
rick@alien:~/Music/Seven Mary Three/American Standard$ cdd
No subdirectories
rick@alien:~/Music/Seven Mary Three/American Standard$ 
```


  [1]: https://i.stack.imgur.com/0qG4p.png
