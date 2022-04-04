---
layout:       post
title:        >
    Modeless/stateless layout language switching with Caps Lock, again (18.04 LTS Bionic Beaver)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1125584
type:         Answer
tags:         18.04 gnome keyboard-layout input-language accessibility
created_date: 2019-03-14 11:00:00
edit_date:    
votes:        "6 "
favorites:    
views:        "1,272 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-03-14-Modeless_stateless-layout-language-switching-with-Caps-Lock_-again-_18.04-LTS-Bionic-Beaver_.md
toc:          false
navigation:   false
clipboard:    false
---

There is a bug report you can subscribe to:

- [keyboard panel does not allow to set up Caps as input switch][1]

The bug report reads:

> Keyboard panel has options for input switching, but it does not allow  
> to use Caps as language switch.  
>   
> Steps to reproduce:  
>   
> 1. gnome-control-center keyboard  
> 2. Scroll down to 'Typing' section  
> 3. Click on Switch to next input source  
> 4. Press Caps  
>   
> Expected result: Caps Lock key is accepted as switch key Actual  
> results: Caps key is ignored in the selection window.  
>   
> P.S. Same goes for 'Switch to previous input source' and Shift-Caps  
> key combination.  

# Bug Workarounds

The bug is currently on the "Wishlist". These workarounds are proposed:

## Workaround 1

Found a workaround for this bug:

1. Install dconf-editor (sudo apt-get install dconf-editor)
2. Go to /org/gnome/desktop/wm/keybindings/
3. Select key switch-input-source, turn off "Use default value" and set "Custom value" to ['Caps_Lock']
4. (Optional) You can also change value for switch-input-source-backward to something like ['<Shift>Caps_Lock'] (again, turning off "Use default value")


## Workaround 2

Another way to do this:
1. Install GNOME Tweaks (gnome-tweak-tool)
2. Open the Tweaks app
3. Switch to the Keyboard & Mouse panel
4. Click Additional Layout Options
5. Use the "Switching to another layout" section

# Subscribe to bug report

I would recommend subscribing to the bug report and adding your own experiences. The more people subscribing to the bug report, the faster the solution comes (usually).
  [1]: https://bugs.launchpad.net/ubuntu/+source/gnome-control-center/+bug/1709562
