---
layout:       post
title:        How do you uninstall Ubuntu completely and re download windows
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/990521
type:         Answer
tags:         system-installation windows uninstall ubuntu-gnome
created_date: 2017-12-29 11:57:20
edit_date:    
votes:        3
favorites:    
views:        168
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

You'll need to get your Windows 8 product key from your BIOS and write it down for future installation. In the terminal type:

``` 
sudo cat /sys/firmware/acpi/tables/MSDM

```

Which will reveal something like this:

``` 
MSDMUoDELL  QA09   LOHR#####-#####-#####-#####-#####%

```

You can read other techniques of accomplishing key extraction [here][1].

The next step of erasing Ubuntu and installing Windows is documented here: [How to remove Ubuntu and put Windows back on?][2].


  [1]: https://superuser.com/questions/637971/how-do-i-get-out-my-embedded-windows-8-key-from-a-linux-environment
  [2]: https://askubuntu.com/questions/133533/how-to-remove-ubuntu-and-put-windows-back-on
