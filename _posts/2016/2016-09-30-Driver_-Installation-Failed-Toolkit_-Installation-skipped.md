---
layout:       post
title:        >
    Driver: Installation Failed Toolkit: Installation skipped
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/831407
type:         Answer
tags:         14.04 drivers nvidia cuda gpu
created_date: 2016-09-30 01:37:58
edit_date:    2016-09-30 01:42:05
votes:        "1 "
favorites:    
views:        "8,327 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-30-Driver_-Installation-Failed-Toolkit_-Installation-skipped.md
toc:          false
navigation:   false
clipboard:    false
---

Firstly pay heed to the warning:

``` 
This option should not be used on systems that require a custom
X configuration, such as systems with multiple GPU vendors.
```

On my laptop I have an Intel HD4000 GPU and Nvidia GT650M so it could be a warning for me. Be sure of what you are installing!

As far as the error message, you have to run the installation through the console when X-Server isn't running. Reboot your machine. At the normal Ubuntu gooey (GUI) login prompt press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> and the console (text based) login will appear. Enter your user ID and password.

Then type:

``` 
sudo ./cuda_8.0.44_linux.run
```

Then reboot by typing:

``` 
sudo reboot
```

Login normally at the regular GUI prompt.

If there still is a problem post comment below.
