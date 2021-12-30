---
layout:       post
title:        Can I make a "choice image list" in MAAS UBUNTU?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885142
type:         Answer
tags:         maas grub
created_date: 2017-02-19 22:57:22
edit_date:    2020-06-12 14:37:07
votes:        4
favorites:    
views:        318
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    true
---

# Grub multi-boot MAAS feature Request

I've submitted a feature request ([Feature Request Allow grub to multi-boot MAAS images][1]) referencing this Q&A.

## History

I've spent hours looking into this using google and it appears a good ole grub menu is the way to do it. Unfortunately I can't find official Ubuntu MAAS (Metal as a Service) documentation on doing it. Indeed the only thing I can find about grub with MAAS are bug reports where grub shouldn't show up.

For example from ([Feature Request Allow grub to multi-boot MAAS images][2]) this:

{% include copyHeader.html %}
``` 
John George (jog) wrote on 2016-05-20:  #18
Ran into this issue multiple times while using Landscape Autopilot to 
deploy Openstack, which was never able to complete due to at least one 
machine failing to deploy, after getting stuck at the grub menu. Juju 
1.25.5 and MAAS 1.9.2 were being used.

Once stopped at the grub menu I was able to bring the system up for 
inspection by doing the following:

    - Reboot the server and drop into the boot menue (F11 on HP)
    - Select the UEFI module option
    - Use the file explorer to drill down to and run shimx64.efi
    - grub> cat /boot/grub/menu.lst (to see configured kernel and initrd paths)
    - grub> linux /boot/vmlinuz-3.13.0-86-generic root=LABEL=root ro console=ttyS1,38400 1
    - grub> initrd /boot/initrd.img-3.13.0-86-generic
    - grub> boot
    - Boot would stop at run level 1 and drop to a root shell prompt
    - /etc/init.d/networking start
    - service ssh start
    - ifconfig (to find configured IP)
    - ssh into the system as the ubuntu user

```

Also there is this complaining how MAAS installs grub to `/dev/sda` instead of the real boot drive which is `/dev/sdb` ([MAAS always installs GRUB to /dev/sda, even when that's inappropriate][3]):

So grub is part of the MAAS boot up process the question is how to make the grub menu active and give you the various images to choose from like how we choose different Ubuntu versions and Windows versions now.

I think the Ubuntu MAAS team might help if a nicely worded email were sent to the right channels. Additionally a [tag:feature-request] can be posted somewhere.


  [1]: https://bugs.launchpad.net/maas/+bug/1666478
  [2]: https://bugs.launchpad.net/maas/+bug/1532935
  [3]: https://bugs.launchpad.net/maas/+bug/1319966
