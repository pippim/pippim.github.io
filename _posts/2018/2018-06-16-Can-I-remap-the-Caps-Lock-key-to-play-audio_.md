---
layout:       post
title:        >
    Can I remap the Caps Lock key to play audio?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047224
type:         Answer
tags:         sound keyboard capslock
created_date: 2018-06-16 23:09:24
edit_date:    2020-06-12 14:37:07
votes:        "8 "
favorites:    
views:        "1,568 "
accepted:     
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-16-Can-I-remap-the-Caps-Lock-key-to-play-audio_.md
toc:          false
navigation:   false
clipboard:    false
---

In Ubuntu 16.04 after spending hours googling & fiddling with `dconf-editor` and `xbindkeys` I found an extremely easy solution:

- Very quick setup in 2 minutes
- Only xdotool needs to be installed
- No scripts necessary
- Caps lock is still recognized but doesn't toggle letter case
- Works with standard Ubuntu Keyboard Custom Shortcut Settings

----------


If you need Gnome `XF86AudioPlay` support you need `xdotool` (not needed for **VLC** as OP stipulates):

``` 
sudo apt install xdotool
```

Now here's the tricky part. Every time you press the <kbd>Caps LocK</kbd> key to toggle the music between Play and Pause, capital letters also toggle off and on.

Use this method to turn off Caps Lock toggling while still keeping key active:

``` 
setxkbmap -option caps:none
```


----------


## Music players that adhere to Gnome

Then in Ubuntu 16.04 go into *Settings >> Keyboard >> Shortcuts >> Custom Shortcuts*:

[![audio pause-play shortcut.png][1]][1]

- Set the *name* to `Audio Play`
- Set the *command* to `xdotool key XF86AudioPlay`
- Then click the <kbd>Apply</kbd> button

After adding the new option the assigned shortcut key will read **Disabled**. Click on **Disabled** and when prompted for key to assign press the <kbd>Caps LocK</kbd> key.


----------


## Music players like VLC

Follow the steps for Gnome in the previous section but for the *command* use this instead:

``` 
qdbus org.mpris.MediaPlayer2.vlc /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause
```

**VLC** won't recognize media keys: [How to make the keyboard media keys to work with VLC globally?](How to make the keyboard media keys to work with VLC globally?)y even when built into the keyboard. Therefor the custom keyboard shortcut to XF86AudioPlay is useless with `xdotool`.


----------

## Setting custom keyboard shortcuts from command line

This Q&A discusses how to set custom keyboard shortcuts from the command line: [How to set custom keyboard shortcuts from terminal?](How to set custom keyboard shortcuts from terminal?)

----------


## Deactivating caps lock permanently

Next step is to make this `setxkbmap -option caps:none` persistent across reboots. Googling results in this answer by Terdon: [Save setxkbdmap settings][2]:



An easy way would be to add the command to your `$HOME/.profile` file (you can create it if it doesn't exist):

``` 
setxkbmap -option caps:none
```

That should make it run every time you log in.

**Note** that you should use `$HOME/.profile` rather than `$HOME/.bash_profile`, `$HOME/.bashrc` or some other similar file. This is because this setting should be read by your login manager.



  [1]: https://i.stack.imgur.com/imuvb.png
  [2]: https://unix.stackexchange.com/a/99090/200094
