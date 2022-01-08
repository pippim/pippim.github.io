---
layout:       post
title:        >
    How to update kernel to the latest mainline version without any Distro-upgrade?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885165
type:         Answer
tags:         upgrade kernel updates grub
created_date: 2017-02-20 00:23:47
edit_date:    2018-02-25 15:14:36
votes:        "18 "
favorites:    
views:        "567,292 "
accepted:     
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    false
---

Contrary to some answers here Ubuntu releases the new kernel within a day or two of the main kernel team. I used to upgrade the hard way like some of the answers here suggest but I found this is an easier way.

# Implications of manually installing Kernels

Manually installing kernels requires extra work.

There are reasons why you want to install the latest mainline kernel:

- A bug in the last Ubuntu LTS kernel update and you can't downgrade
- You have new hardware not supported in the current Ubuntu LTS kernel update stream or HWE updates
- You want a security upgrade or new feature only available in the latest mainline kernel version.

As of January 15, 2018 the latest stable mainline kernel is `4.14.13`. At the time of writing many are interested to install it for protection against Meltdown security hole. If you choose to manually install it you should know:

- Older LTS kernels will not [get updated][10] until they are greater than  the main menu first option titled **Ubuntu**.
- Manually installed kernels are not removed with the usual `sudo apt auto-remove` command. You need to follow this: [How do I remove old kernel versions to clean up the boot menu?][11]
- Monitor developments in the older kernels for when you want to get back on the regular LTS kernel update method. Then delete the manually installed mainline kernel as described in the previous bullet point link.
- After manually removing the newest mainline kernel run `sudo update-grub` and then Ubuntu's latest LTS kernel will be the first option called **Ubuntu** on Grub's main menu.

# Finding the latest kernel

Go to ([kernel.ubuntu.com - Kernel PPA Mainline][1]) and press the <kbd>End</kbd> key:

[![Mainline kernel 1][2]][2]

Now click on the link `4.9.8` (or a newer one if available when you read this) and the following appears:

[![mainline kernel 2][3]][3]

Note the links with the black airbrush marks. These are the three we will download for ***Ubuntu 16.04 64-Bit*** using ***Intel or AMD*** processors.

# Installing using Terminal

Open a terminal session with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and use:

``` 
cd ~/Downloads # Change to your downloads directory
ll linux*.deb  # Check if any previous downloads still exist
rm linux*.deb  # Use this command if any previous downloads found

```

Now switch back to the download screen above and single-click on all three of the `.deb` kernel downloads. After downloads complete (you'll see status in your browser) switch back to terminal session and use:

``` 
sudo dpkg -i linux*.deb
rm linux*.deb
sudo reboot

```

Voila! - you are running the latest kernel when the first option in grub boot menu is selected. Your older kernel versions are still available under grub's **Advanced Options** menu.

After installing the newest kernel a dozen times you will ask the question "*How do I remove older kernel versions?*" and you will find those answers here in ***Ask Ubuntu***.

  [1]: http://kernel.ubuntu.com/~kernel-ppa/mainline/
  [2]: https://i.stack.imgur.com/0aGxt.png
  [3]: https://i.stack.imgur.com/BnsVG.png
  [10]: https://askubuntu.com/questions/763360/does-manual-kernel-update-affect-the-next-regular-automatic-update
  [11]: https://askubuntu.com/questions/2793/how-do-i-remove-old-kernel-versions-to-clean-up-the-boot-menu
