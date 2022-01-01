---
layout:       post
title:        >
    Ubuntu doesn't reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/941353
type:         Answer
tags:         boot dual-boot grub2
created_date: !!str "2017-07-30 22:45:19"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "1,138"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

Your laptop has the **Intel i7-6700HQ** 6th generation CPU known as "Skylake". It also has a **NVidia Geforce GTX 970M** GPU. To eliminate the dedicated Nvidia GPU from the equation you can temporarily work with only the integrated Intel GPU in the short term.

When using Skylake you made need updates:

- https://askubuntu.com/questions/827939/ubuntu-15-10-various-types-of-freezes-and-now-unexpected-shutdown/828027#828027
- https://askubuntu.com/questions/811453/w-possible-missing-firmware-for-module-i915-bpo-when-updating-initramfs/879250#879250
- https://askubuntu.com/questions/941252/ubuntu-doesnt-reboot

These are some of the answers I've written but there are many great answers others have written:

- https://askubuntu.com/questions/691216/no-version-of-ubuntu-can-be-installed-with-any-skylake-6th-generation-intel-proc
- https://askubuntu.com/questions/929274/16-04-how-to-get-the-recommended-intel-microcode-package-to-fix-hyper-threading
- https://askubuntu.com/questions/752743/ubuntu-16-04-skylake-6th-generation-screen-flickering
- https://askubuntu.com/questions/830404/ubuntu-16-04-skylake-overheating

Unfortunately not enough is known about your specific problems to point your question as a duplicate of an existing one.

One last thing to change is the Intel c-state max idle:

- https://askubuntu.com/questions/749349/how-to-set-intel-idle-max-cstate-1
- https://askubuntu.com/questions/803640/system-freezes-completely-with-intel-bay-trail

Although targeted at Intel BayTrail users it seems to have improved things for other Intel CPU users as well. If these fixes work I regard them as a work-around to make life better in the short term until a real solution is found.

