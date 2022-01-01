---
layout:       post
title:        >
    The brightness of laptop screen cannot be adjusted with either the buttons or the slider. Edit
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1011557
type:         Answer
tags:         nvidia 17.10 brightness settings backlight
created_date: !!str "2018-03-03 15:58:50"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "3"
favorites:    
views:        !!str "7,520"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

# NVIDIA doesn't work with Wayland

As others have discovered, nVidia doesn't play well with Wayland: [Ubuntu 17.10 on Wayland - (How) can I install the NVIDIA drivers?][1]. The solution is to switch to Xorg. To summarize the answer from **cl-net** use these steps:

- To install the NVIDIA drivers, execute `sudo apt install nvidia-384`.  

- Additionally you can force the GDM login screen to use Xorg by default.  
To achieve this, just execute `sudo nano /etc/gdm3/custom.conf`.  
Remove the character `#` from the line `# WaylandEnable=false`.  
Now press <kbd>Ctrl</kbd>+<kbd>X</kbd>, then <kbd>Y</kbd> and <kbd>Enter</kbd> to save that change.  

- Restart the Ubuntu operating system, execute `sudo reboot`.  


----------


Another problem you will likely encounter is no sound over HDMI to external monitor. To solve this problem see this Q&A: [No Audio Over HDMI on NVIDIA GeForce GTX 1050 Ti][2]


  [1]: https://askubuntu.com/questions/967955/ubuntu-17-10-on-wayland-how-can-i-install-the-nvidia-drivers
  [2]: https://askubuntu.com/questions/1008599/no-audio-over-hdmi-on-nvidia-geforce-gtx-1050-ti
