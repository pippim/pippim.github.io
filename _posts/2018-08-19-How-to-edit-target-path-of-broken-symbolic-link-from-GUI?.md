---
layout:       post
title:        How to edit target path of broken symbolic link from GUI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1066741
type:         Answer
tags:         gui filemanager symbolic-link
created_date: 2018-08-19 04:06:00
edit_date:    2018-08-19 14:01:57
votes:        3
favorites:    
views:        1,541
accepted:     Accepted
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    true
---

# Edit Symbolic Link in Nautilus

## The script



To do this in Nautilus we need to create a script using:

``` bash
mkdir -p ~/.local/share/nautilus/scripts
gedit ~/.local/share/nautilus/scripts/edit-link

```

Paste in the following:

<!-- lang-bash -->

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: edit-link
# PATH: $HOME/.local/share/nautilus/scripts
# DESC: Edit symbolic link
# CALL: Called from Nautilus file manager.
# DATE: August 18, 2018.

# strip new line char passed by Nautilus
FILENAME=$(echo $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS | sed -e 's/\r//g')

# Multiple files can't be selected.
LINE_COUNT=$(wc -l <<< "$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS")
LINE_COUNT=$((LINE_COUNT-1))

if [[ $LINE_COUNT > 1 ]] ; then
    zenity --error --text "Ony one file can be selected at a time! "
    exit 1
fi

# Object type must be "file..." (ie no directories, etc.)
if [ -d "${FILENAME}" ] ; then
    zenity --error --text "$FILENAME is a directory!";
    exit 1
else
    if [ -L "${FILENAME}" ]; then
        : # Bash noop
    else
        zenity --error --text "${FILENAME} is not a symbolic link!";
        exit 2
    fi
fi

NewLink=$(zenity --entry --text "Enter new symbolic link")
ln -sf "$NewLink" "${FILENAME}"

exit 0

```

and make it executable

``` bash
chmod +x ~/.local/share/nautilus/scripts/edit-link

```

## Sample output

This is the test data used. The second last section shows the broken link. Then our script is run giving a new file name. The last section shows the new good link.

[![Edit Link2][1]][1]

## Sample screen

This is what the script looks like when you run it:

[![edit link 1.png][2]][2]

- Highlight a broken link with Nautilus
- Right click for context menu
- Select `Scripts`
- Select `edit-link`
- Enter new file name above and click <kbd>OK</kbd> button

# Edit Symbolic Link in Caja

The method is similar to Nautilus but with some Caja specifics. We should follow [GNOME2→MATE Migration guide](http://wiki.mate-desktop.org/migrating).

So we need create script in the `~/.config/caja/scripts`:

``` bash
mkdir -p ~/.config/caja/scripts
cat > ~/.config/caja/scripts/edit-link << \EOF
#!/bin/bash

```

{% include copyHeader.html %}
``` bash
# NAME: edit-link
# PATH: $HOME/.config/caja/scripts
# DESC: Edit symbolic link
# CALL: Called from Caja file manager.
# DATE: August 19, 2018.

# strip new line char passed by Caja
FILENAME=$(echo $CAJA_SCRIPT_SELECTED_FILE_PATHS | sed -e 's/\r//g')

# Multiple files can't be selected.
LINE_COUNT=$(wc -l <<< "$CAJA_SCRIPT_SELECTED_FILE_PATHS")
LINE_COUNT=$((LINE_COUNT-1))

if [[ $LINE_COUNT > 1 ]] ; then
    zenity --error --text "Ony one file can be selected at a time! "
    exit 1
fi

# Object type must be "file..." (ie no directories, etc.)
if [ -d "${FILENAME}" ] ; then
    zenity --error --text "$FILENAME is a directory!";
    exit 1
else
    if [ -L "${FILENAME}" ]; then
        : # Bash noop
    else
        zenity --error --text "${FILENAME} is not a symbolic link!";
        exit 2
    fi
fi

NewLink=$(zenity --entry --text "Enter new symbolic link")
ln -sf "$NewLink" "${FILENAME}"

exit 0
EOF

```

and make it executable

``` bash
chmod +x ~/.config/caja/scripts/edit-link

```

Then we can use this script from Caja Scripts drop-down menu. 
  [1]: https://i.stack.imgur.com/0NmbJ.png
  [2]: https://i.stack.imgur.com/7ypms.png

