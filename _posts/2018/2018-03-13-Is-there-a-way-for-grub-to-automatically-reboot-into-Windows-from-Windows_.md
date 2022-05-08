---
layout:       post
title:        >
    Is there a way for grub to automatically reboot into Windows from Windows?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014491
type:         Answer
tags:         dual-boot grub2 windows
created_date: 2018-03-13 10:34:15
edit_date:    2018-03-30 17:17:19
votes:        "20 "
favorites:    
views:        "10,631 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-13-Is-there-a-way-for-grub-to-automatically-reboot-into-Windows-from-Windows_.md
toc:          false
navigation:   false
clipboard:    false
---

# Easiest way is with Grub

It is cumbersome controlling `grub` from Windows. A third party application to access Ubuntu from Windows and some hacking is required. However from the top part of this post: [How to change the order on my dual booting distros][1], you can setup `grub` to automatically reboot to the last menu option. So when you initially boot with windows, and it wakes up at 2 am to run updates, `grub` will reload Windows so it can gracefully finish updates. 

When you manually reboot and pick Ubuntu from `grub` all your next reboots automatically load Ubuntu. This feature works equally well if you have bugs in the current kernel and want `grub` to automatically reboot into an older kernel version you selected.

# How to get Grub to repeat last boot selection

This is fairly straight forward. Using `sudo` powers edit `/etc/default/grub` and change the following:

``` 
#GRUB_DEFAULT=0 # Rather than option #1, we'll always default to last boot choice.
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

The first line you will be commenting out and right below that insert the next two lines.

Save the file and type in the terminal:

``` 
sudo update-grub
```

# Ubuntu command line to reboot into Windows

Currently you use something like this:

``` 
sudo grub-reboot x # Where x is Windows zero-based grub menu number
sudo reboot now
```

From this modified Stack Exchange [answer][2] you can use the grub default to reboot into Windows. Copy this code into your `~/.bashrc` file:

``` 
function reboot-to-windows {
    WINDOWS_TITLE=`grep -i "^menuentry 'Windows" /boot/grub/grub.cfg|head -n 1|cut -d"'" -f2`
    sudo grub-set-default "$WINDOWS_TITLE"
    sudo reboot
}
```

- Save the `~/.bashrc` file with new `reboot-to-windows` function.
- Close your current terminal session.
- Open a new terminal session for changed `~/.bashrc` to be loaded.
- You could type `: ~/.bashrc` to reload it into the existing terminal session but some people recommend against do this.

To reboot into Windows from the command line use:

``` 
reboot-to-windows
```

If Windows automatically restarts when you aren't looking, Windows is rebooted. This allows Windows automatic updates to be processed normally over multiple-reboot cycles Windows sometimes uses.

  [1]: {% post_url /2018/2018-02-04-How-to-change-the-order-on-my-dual-booting-distros %}
  [2]: https://unix.stackexchange.com/a/112284/200094
