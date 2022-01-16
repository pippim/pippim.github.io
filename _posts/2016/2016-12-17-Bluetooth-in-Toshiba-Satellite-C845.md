---
layout:       post
title:        >
    Bluetooth in Toshiba Satellite C845
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/861641
type:         Answer
tags:         drivers bluetooth 15.10 toshiba-satellite
created_date: 2016-12-17 12:25:38
edit_date:    2017-04-13 12:23:41
votes:        "3 "
favorites:    
views:        "1,433 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-17-Bluetooth-in-Toshiba-Satellite-C845.md
toc:          false
navigation:   false
clipboard:    false
---

Similar problems were reported last year here ([kernel 4.1.1: Bluetooth: hci0: Failed to load rtl_bt/rtl8723b_fw.bin][1]) on Ubuntu forums.

Summary of steps to solve it there (**which you probably shouldn't use!**):

``` 
sudo dpkg -i  linux-firmware_1.145_all.deb
sudo updatedb
rfkill list all; hciconfig -a
```

Updated steps for your Ubuntu 15.10 on the other hand would be:

``` 
sudo apt update
sudo apt install linux_firmware
rfkill list all; hciconfig -a
```

This is based on instructions for 15.10 found here ([https://www.howtoinstall.co/en/ubuntu/wily/linux-firmware][2])

Additional information that may prove helpful can be found here ([Bluetooth not detecting any devices][3]) where Pilot6 wrote an answer for an `rtl8723au-bt` driver.

As far as Toshiba's suitability for Linux... historically it has been very good however recently I've read comments some new machines are `Windows only`. In this case however it's more a reflection of RealTek / Broadcom hardware installed inside which Dell's could also have. Either manufacturer could also have Intel hardware WiFi / Bluetooth as well though.

FTR I have a Dell Laptop with Intel inside and haven't had any real bluetooth problems to date (fingers crossed). Hopefully your problems get solved soon!

  [1]: https://ubuntuforums.org/showthread.php?t=2286433
  [2]: https://www.howtoinstall.co/en/ubuntu/wily/linux-firmware
  [3]: https://askubuntu.com/questions/644073/bluetooth-not-detecting-any-devices
