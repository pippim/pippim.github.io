---
layout:       post
title:        >
    How to enable: Switch back to running GUI from TTY in 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157668
type:         Answer
tags:         18.04 gui gnome-shell tty
created_date: 2019-07-11 22:54:48
edit_date:    2019-07-12 01:56:22
votes:        "12 "
favorites:    
views:        "18,007 "
accepted:     
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-11-How-to-enable:-Switch-back-to-running-GUI-from-TTY-in-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

The part you are look for is at the bottom from: [Switch to Console in Ubuntu 18.04 - How to Leave GUI?](Switch to Console in Ubuntu 18.04 - How to Leave GUI?)

> In Ubuntu 18.04, they have changed things around and you cannot get to  
> tty1, it is always showing the display manager / login screen. If you  
> log in, you then cannot get to tty2 because it becomes the GUI for the  
> first logged in user. The tradition of both GUIs showing on tty7 has  
> ended.  
>   
> You can get to tty3 by pressing  
> <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F3</kbd>, tty4 by pressing  
> <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F4</kbd>, tty5 by pressing  
> <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F5</kbd> and tty6 by pressing  
> <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F6</kbd>.  
>   
> You can then switch between tty3-6 by pressing <kbd>Alt</kbd> with the  
> appropriate F-key.  
>   
> ***Finally, you can get back to the GUI*** with <kbd>Alt</kbd>+<kbd>F1</kbd> for the login chooser or  
> <kbd>Alt</kbd>+<kbd>F2</kbd> for the logged-in user's desktop.  

To make a long story short use: <kbd>Alt</kbd>+<kbd>F2</kbd>


----------

If the function keys don't work you can try [these instructions][1].

In summary you can type:

``` 
sudo chvt 2
```

to switch to TTY2.

There is a lot more you can do with commands to bypass the function keys. Please read the link.


  [1]: https://www.ostechnix.com/how-to-switch-between-ttys-without-using-function-keys-in-linux/
