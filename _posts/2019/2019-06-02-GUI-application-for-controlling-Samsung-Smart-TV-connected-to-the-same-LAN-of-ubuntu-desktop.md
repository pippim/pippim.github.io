---
layout:       post
title:        >
    GUI application for controlling Samsung Smart TV connected to the same LAN of ubuntu desktop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1148133
type:         Answer
tags:         software-recommendation samsung remote smart-tv yad
created_date: !!str "2019-06-02 20:37:08"
edit_date:    !!str "2019-06-04 23:16:26"
votes:        !!str "3"
favorites:    
views:        !!str "2,706"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

You can use YAD to create GUI front end to CLI commands.

As a comment points out there is a CLI controller for the Samsung Smart TV:

- [https://github.com/Ape/samsungctl][1]

You just need to install Yad with `sudo apt install yad` and create a GUI window like this:

[![yad remote control][2]][2]

Using this command:

``` 
yad --title "Remote Control" --text "Samsung Smart TV" --width 250 --height 400 --form --columns 2 --field "Power:FBTN"  --field "Vol +:FBTN" --field "Vol -:FBTN" --field "Input:FBTN"  --field "Chan +:FBTN" --field "Chan -:FBTN"

```

Additional code is required to link each button to the Samsung Control program:

``` 
samsungctl --host <host> [options] <key> [key ...]

```

If I had a Samsung Smart TV I would enjoy writing the full script. However my Smart TVs are Sony and Toshiba. I will try to write a remote control GUI script soon for those TVs.


----------


### Seeing it in action

I created a little demo where instead of calling the Samsung Smart TV commands are echoed to the screen.

[![yad TV remote controller.gif][3]][3]

The one-liner code is a little longer now:

``` 
yad --title "Remote Control" --text "Samsung Smart TV" --width 250 --height 400 --form --columns 2 --field "Power:FBTN" 'bash -c "echo Power"'  --field "Vol +:FBTN" 'bash -c "echo Volume Up"' --field "Vol -":FBTN 'bash -c "echo Volume Down"' --field "Input:FBTN" "bash -c 'echo "Input"'"  --field "Chan +:FBTN" 'echo "Channel up"' --field "Chan -:FBTN" 'bash -c "echo Channel Down"'

```

As mentioned in comments if you have a Samsung TV newer than 2016 you will also need to download the [`websocket-client`][4]


  [1]: https://github.com/Ape/samsungctl
  [2]: https://i.stack.imgur.com/Ra9kN.png
  [3]: https://i.stack.imgur.com/gUWo2.gif
  [4]: https://github.com/websocket-client/websocket-client
