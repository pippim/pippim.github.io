---
layout:       post
title:        >
    nvidia backlight brightness problem
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/937133
type:         Answer
tags:         16.04 nvidia xorg brightness backlight grub
created_date: 2017-07-17 23:26:12
edit_date:    2020-06-12 14:37:07
votes:        "13 "
favorites:    
views:        "19,655 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-17-nvidia-backlight-brightness-problem.md
toc:          false
navigation:   false
clipboard:    false
---

## Update June 16, 2019

Last month, 2 years after problem was reported, OP discovered LightDM (Ubuntu Unity Desktop Manager) was source of problem. That said, in addition to the list below, there is another `grub` parameter that can be tried:

``` 
video.use_native_backlight=1
```

See [this answer][1] for more.

----------

## Original Answer

The ultimate reference seems to be in [Arch Linux][2] which is a site I've turned to many times to fix difficult problems.

# Kernel Parameters

Looking at your `cat /proc/cmdline` there are no extra kernel parameters passed. The above link states:

Sometimes, ACPI does not work well due to different motherboard implementations and ACPI quirks. This includes some laptops with dual graphics (e.g. Nvidia/Radeon dedicated GPU with Intel/AMD integrated GPU). On Nvidia Optimus laptops, the kernel parameter nomodeset can interfere with the ability to adjust the backlight. Additionally, ACPI sometimes needs to register its own `acpi_video0 backlight` even if one already exists (such as `intel_backlight`), which can be done by adding one of the following kernel parameters:

``` 
acpi_backlight=video
acpi_backlight=vendor
acpi_backlight=native
```

If you find that changing the `acpi_video0` backlight does not actually change the brightness, you may need to use `acpi_backlight=none`.

***Try each of the `acpi_backlight=xxxx` options on your grub kernel paremeters line***

# When `xbacklight` doesn't work

You've tried `xbacklight` already and the link above addresses this:

On some systems, the brighness hotkeys on your keyboard correctly modify the values of the acpi interface in `/sys/class/backlight/acpi_video0/actual_brightness` (***As we tried in comments***) but the brightness of the screen is not changed. Brigthness applets from **desktop environments** (ie ***Ubuntu brightness setting slider bar***) may also show changes to no effect.

If you have tested the recommended kernel parameters and only `xbacklight` works, then you may be facing an incompatibility between your BIOS and kernel driver.

In this case the only solution is to wait for a fix either from the BIOS or GPU driver manufacturer.

A workaround is to use the `inotify` kernel api to trigger `xbacklight` each time the value of  `/sys/class/backlight/acpi_video0/actual_brightness` changes.

First install inotify-tools. Then create a script around inotify that will be launched upon each boot or through autostart.

Below is script you need to create called: `/usr/local/bin/xbacklightmon`



``` sh
#!/bin/sh

path=/sys/class/backlight/acpi_video0

luminance() {
    read -r level < "$path"/actual_brightness
    factor=$((100 / max))
    printf '%d\n' "$((level * factor))"
}

read -r max < "$path"/max_brightness

xbacklight -set "$(luminance)"

inotifywait -me modify --format '' "$path"/actual_brightness | while read; do
    xbacklight -set "$(luminance)"
done
```

There is a lot more in the link above but these steps are a good place to start.


----------

# Dedicated Forums

For additional support there are dedicated Linux Graphics forums:

 - [Phoronix Linux/AMD/Nvidia support with many Ubuntu users][3]
 - [Nvidia Linux Developers Forum (with many Ubuntu specific topics)][4]


  [1]: https://askubuntu.com/questions/476664/cannot-change-backlight-brightness-ubuntu-14-04
  [2]: https://wiki.archlinux.org/index.php/backlight
  [3]: https://www.phoronix.com/forums/
  [4]: https://devtalk.nvidia.com/default/board/98/linux/
