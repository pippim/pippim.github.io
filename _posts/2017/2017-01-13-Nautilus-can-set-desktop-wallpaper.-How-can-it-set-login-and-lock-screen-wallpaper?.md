---
layout:       post
title:        >
    Nautilus can set desktop wallpaper. How can it set login and lock screen wallpaper?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/871313
type:         Answer
tags:         scripts nautilus login wallpaper lock-screen
created_date: 2017-01-13 04:15:36
edit_date:    2018-07-08 19:01:51
votes:        "3 "
favorites:    
views:        "2,419 "
accepted:     Accepted
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    true
---

After using Nautilus to navigate and view an appropriate .png or .jpg file to use as login screen and lock screen wallpaper, Nautilus can set this for you using a script:

[![Set Login Wallpaper.gif][1]][1]


**Note:** In Ubuntu 18.04 only the lock screen wallpaper is changed. A different technique will be required to change the login wallpaper.

To create the script use:

``` 
cd ~/.local/share/nautilus/scripts/
gedit set-login-wallpaper

```

Paste in these lines:



{% include copyHeader.html %}
``` bash
#!/bin/bash

## Set login wallpaper

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
    if [ -f "${FILENAME}" ]; then
        : # Bash noop
    else
        zenity --error --text "${FILENAME} is not a file!";
        exit 2
    fi
fi

# Build working file in /tmp
echo "[com.canonical.unity-greeter]" > /tmp/set-login-wallpaper.tmp
echo "draw-user-backgrounds=false" >> /tmp/set-login-wallpaper.tmp
echo "background='$FILENAME'" >> /tmp/set-login-wallpaper.tmp

# Must run as sudo
if [ "$EUID" -ne 0 ] ; then

    # Get sudo password
    PASSWORD=$(zenity --password --title="Set Login Wallpaper" --timeout=20)

    # copy working file to real file using sudo
    echo $PASSWORD | sudo -S cp /tmp/set-login-wallpaper.tmp \
/usr/share/glib-2.0/schemas/10_unity_greeter_background.gschema.override

    # compile using sudo
    echo $PASSWORD | sudo -S glib-compile-schemas /usr/share/glib-2.0/schemas

else
    # Already sudo so simply copy and compile
    # copy working file to real file
    cp /tmp/set-login-wallpaper.tmp \
/usr/share/glib-2.0/schemas/10_unity_greeter_background.gschema.override

    # compile
    glib-compile-schemas /usr/share/glib-2.0/schemas
fi

exit 0

```

Save the file and exit the `gedit` editor.

Now mark the script as executable using:

``` bash
chmod +x set-login-wallpaper

```

Open Nautilus and navigate to your directory with wallpaper images. Find an appropriate image and right-click on it. This drop-down menu appears:

[![Nautilus Right Click Drop Down][2]][2]

Click on the third option `Scripts`. Another drop down menu appears with all your scripts:

[![Nautilus set-login-wallpaper Drop Down][3]][3]

Select `set-login-wallpaper`.

When the script runs you will have to enter your `sudo` password.

Reboot and enjoy your new login wallpaper.


  [1]: https://i.stack.imgur.com/ysvFg.gif
  [2]: https://i.stack.imgur.com/EleRC.png
  [3]: https://i.stack.imgur.com/CsQ9O.png
