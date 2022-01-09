---
layout:       post
title:        >
    Secondary monitor not recognized under Ubuntu 16.04 with kernel 4.7.4
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/827197
type:         Answer
tags:         16.04 kernel external-monitor grub
created_date: 2016-09-20 00:48:08
edit_date:    
votes:        "1 "
favorites:    
views:        "712 "
accepted:     Accepted
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

**KASLR** - *Kernel Address Space Layout Randomizer* - has been around for a long time but is not implemented in most Linux distributions by default. Starting with Kernel 4.7 large text messages started appearing telling you it wasn't installed during the boot. When you install it however hibernation is not allowed.

Most of the world's media servers are running Linux (facebook too, etc) and the security hole was discovered in Kernel version > 2.6 but kept under wraps until just this year when it was announced on international media web sites such as Russia Today. I believe this is the security hole the OP was alluding to. I believe KASLR is the answer to that security hole.

The technique of KASLR security is each time the kernel is loaded modules are in a different memory location making it harder to hack because a snooper program can expect code to always be at a given location in RAM.

To enable KASLR as parameter to the Kernel type:

``` 
gksu gedit /etc/default/grub

```

Search for the line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="nosplash vt.handoff=7 kaslr"

```

As you can see `kaslr` option has already been added to the end of mine. Simply add those five characters to yours, save the file and exit. Please note most people have "quiet splash" as options and you should **leave existing options as is** the point here is to add `kaslr`. 

`kaslr` may break hibernation if you use that feature, or kaslr may be ignored if Hibernation is used. Simply put, they do not work together (in kernel 4.7 at least). Personally I don't like hibernation because it takes 15 seconds which is small savings from 45 second boot and pales in comparison to 2 second suspend to RAM. Suspend does work with KASLR enabled.

After saving the grub kernel changes, you need to recompile your boot strap loader by typing:

``` 
sudo update-grub

```

Now you will have the best, easiest security fix available for Linux, other than unplugging the internet.

As far as the OP is concerned feel free to use the Kernel version that makes your hardware work. Even though 4.6 is no longer going to be updated the fact it works now for your projector is what is important. Keep checking on future kernel versions once a month see if 4.7.x projector problems are fixed. If not file a bug report when you feel you've waited long enough.

Please post a comment if I've missed something or if clarification is needed. Otherwise mark qusetion as solved & up vote so others can see the answer works.
