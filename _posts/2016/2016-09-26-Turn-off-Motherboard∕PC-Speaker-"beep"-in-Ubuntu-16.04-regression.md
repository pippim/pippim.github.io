---
layout:       post
title:        >
    Turn off Motherboard∕PC Speaker "beep" in Ubuntu 16.04 regression
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/829657
type:         Answer
tags:         16.04 sound xorg pulseaudio teminal-bell
created_date: 2016-09-26 02:00:45
edit_date:    2017-04-13 12:24:56
votes:        "1 "
favorites:    
views:        "2,660 "
accepted:     Accepted
uploaded:     2022-01-09 16:04:07
toc:          false
navigation:   false
clipboard:    true
---

After much searching I found typing this in the Terminal works:

``` 
pactl upload-sample /usr/share/sounds/ubuntu/stereo/message.ogg bell.ogg

```

It will give a soft bubble popping sound instead of annoying beep. All the other `.ogg` files can be used from `/usr/share/sounds/ubuntu/stereo` and `/usr/share/sounds/ubuntu/notifications`.

The next step is to make it persistent but at least after long hours of searching progress has been made!


----------


## Edit 1 - Making it persistent


Internet searches suggest putting:

``` 
pactl upload-sample /usr/share/sounds/ubuntu/stereo/message.ogg bell.ogg

```

into the file `~/.profile` but that didn't work. Perhaps **pulseaudio** wasn't running at that time?

So I ended up putting it in `Startup Applications` in this screen:

[![enter image description here][1]][1]

Now it the annoying **beeping** is gone and a soft bubble popping sound works like a charm in the `terminal` and `gedit`.


----------


## Edit 2 - Create bash playall, default and menu scripts


Rather than switching directories to select the ***bell de jour*** I created a new directory and copied sound candidates from `/usr/share/sounds/.../...` there:

``` 
$ ls /usr/local/bin/bell/sounds
Amsterdam.ogg  Blip.ogg     Mallet.ogg   Positive.ogg  Slick.ogg
bell.ogg       default.ogg  message.ogg  Rhodes.ogg

```

Next I created a script to sample all sounds in a directory. If a given sound file plays to long you can skip to the end with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

{% include copyHeader.html %}
``` 
$cat /usr/local/bin/playall-bells
#! /bin/bash

# NAME: playall-bells
# PATH: /usr/local/bin
# DESC: Play all songs in directory /usr/local/bin/bell/sounds.
#       Parameter 1 can override to different directory.
# CALL: Typically call with "playall-bells" (no parameters).
# DATE: Created Sep 30 2016.

DIRNAME="$1"

# if no parameters set DIRNAME to bell/sounds
if [ $# == 0 ]; then
    DIRNAME=/usr/local/bin/bell/sounds
fi

# Cookie cutter debug section. Remove # from echo's
#echo "********************************************************"
#echo "*                                                      *"
#echo "*  THE DIRECTORY IS: $DIRNAME"
#echo "*                                                      *"
#echo "********************************************************"

for file in $DIRNAME
do
    printf $DIRNAME
    ogg123 $DIRNAME # If a sound plays too long <Ctrl>+C for next
done

```

A special sound file called `default.ogg` is used to set the bell sound during boot. To set the default a new script was created.

{% include copyHeader.html %}
``` 
$cat /usr/local/bin/load-default-bell
#! /bin/bash

# NAME: load-default-bell
# PATH: /usr/local/bin
#      `.ogg` sound files are stored in `/usr/local/bin/bell/sounds`
# DESC: Load bell sound to pulseaudio.
# CALL: Call with "load-default-bell" (no parameters)
#       Does not work in "~/.profile" as some users suggest
#       Works in "Startup Applications" locatable by "Dash"
# DATE: Created Sep 30 2016.
# UPDT: Oct 1 2016 - Play new bell sound after load to pulseaudio.
#       Oct 2 2016 - bell-select-menu has been created to manage default.

# NOTE: Use Nautilus or Terminal Menu to copy desired <sound>.ogg to
#       default.ogg. This sound in turn is uploaded to pulse-audio.
#       New script `bell-select-menu` will update default sound file.
#       Name of the game is to replace annoying motherboard speaker
#       beep which is a regression in Ubuntu 16.04.

pactl upload-sample /usr/local/bin/bell/sounds/default.ogg bell.ogg
printf '\a' # play new bell sound

```

Coinciding with the new script above the `Startup Applications` described above was changed to look like this:

[![Startup Applications Bell][2]][2]

The final step was to create a bash menu to play all sounds, listen to a single sound and update last listened to single sound to the default. The menu design was taken from this askubuntu quesiton: [Create bash menu based on file list (map files to numbers)][3]. If you like my menu you should go to that question and up-vote that author's answer.

{% include copyHeader.html %}
``` 
$cat /usr/local/bin/bell-select-menu
#! /bin/bash

# NAME: bell-select-menu
# PATH: /usr/local/bin
# DESC: Present menu of bell sounds to listen to all, listen to one and update default.
# CALL: bell-select-menu
# DATE: Created Oct 1, 2016.

echo "The following /usr/local/bin/bell/sounds were found"

# set the prompt used by select, replacing "#?"
PS3="'a' to hear to all files, use number to hear a single file, 
'u' to update last single file heard as new default, or 'q' to quit: "

lastfile="none"

# allow the user to choose a file
select filename in /usr/local/bin/bell/sounds/*.ogg

do

    # leave the loop if the user types 'q'
    if [[ "$REPLY" == q ]]; then break; fi

    # play all if the user types 'a'
    if [[ "$REPLY" == a ]] 
    then 
        playall-bells
        continue
    fi

    # update last file name as new default if the user types 'u'
    if [[ "$REPLY" == u ]]
    then
        if [[ "$lastfile" == none ]]
        then
	        echo "No file was selected."
	        break
        fi
        echo "$lastfile selected"
        cp $lastfile /usr/local/bin/bell/sounds/default.ogg
     	load-default-bell
        break
    fi

    # complain if no file was selected, and loop to ask again
    if [[ "$filename" == "" ]]
    then
        echo "'$REPLY' is not a valid number"
        continue
    else
        lastfile="$filename"
    fi

    # listen to the selected file
    ogg123 "$filename"

    # loop back to ask for another
    continue
done

```

The drawback of this design is when you select `play all` the menu scrolls off the screen and you need to scroll back the window to see the options again.

**Phew** that's it.


  [1]: http://i.stack.imgur.com/Klm1i.png
  [2]: http://i.stack.imgur.com/6E62e.png
  [3]: https://askubuntu.com/questions/682095/create-bash-menu-based-on-file-list-map-files-to-numbers
