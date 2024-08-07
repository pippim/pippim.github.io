---
layout:       post
title:        >
    how to tell GRUB to show the user preferred names of OS'es. Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1054958
type:         Answer
tags:         grub2
created_date: 2018-07-14 02:11:40
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "0 "
accepted:     Accepted
uploaded:     2024-08-07 06:21:45
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-14-how-to-tell-GRUB-to-show-the-user-preferred-names-of-OS_es.-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I hate to break a taboo but the easiest way is modifying `grub.cfg`.

Create the script `my-update-grub` containing:



``` bash
#!/bin/bash

# NAME: my-update-grub
# PATH: /mnt/e/bin
# DESC: Run update-grub and then rename menu entries
# DATE: July 13, 2018. (yah it's a Friday)

# Must not prefix with sudo when calling script
if [[ $(id -u) != 0 ]]; then
    zenity --error --text "You must call this script using sudo. Aborting."
    exit 99
fi

#sudo update-grub # Optional remove # in column 1

sed -i "s|Windows Boot Manager (on /dev/nvme0n1p2)|Windows 10|g" /boot/grub/grub.cfg
sed -i "s|Windows Boot Manager (on /dev/sda1)|Windows 10 original|g" /boot/grub/grub.cfg
sed -i "s|Ubuntu 18.04 LTS (18.04) (on /dev/nvme0n1p6)|Ubuntu 18.04|g" /boot/grub/grub.cfg

exit 0
```

- Change comment `PATH:` to where you put script, probably `/usr/local/bin`
- Change `Windows Boot Manager (on /dev/nvme0n1p2)` to your menu option.
- Change `Ubuntu 18.04 LTS (18.04) (on /dev/nvme0n1p6)` to your menu option.
- Delete line with `Windows Boot Manager (on /dev/sda1)` which probably isn't needed.
- Remove `#` in front of `# sudo update-grub` so you don't have to type that manually before typing `sudo my-update-grub`.
- Make the script executable. In your case use: `chmod a+x /usr/local/bin/GrubTextEntries`
- After every kernel update, run `sudo my-grub-update`


----------


I tested this on my system first but, if in doubt, backup first using:

``` bash
sudo cp /boot/grub/grub.cfg /boot/grub/grub.sav
```


----------

# Before and After

The images are a little skewed because I'm limited to capturing them at distorted 1600x1200 in Virtualbox in Ubuntu 16.04:

## Before

[![Before][1]][1]

## After

[![ResizedGrub2.png][2]][2]


  [1]: https://i.sstatic.net/tpW3p.jpg
  [2]: https://i.sstatic.net/8AVdX.png
