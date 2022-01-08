---
layout:       post
title:        >
    Ubuntu doesn't reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/941353
type:         Answer
tags:         boot dual-boot grub2
created_date: 2017-07-30 22:45:19
edit_date:    
votes:        "1 "
favorites:    
views:        "1,146 "
accepted:     Accepted
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

Your laptop has the **Intel i7-6700HQ** 6th generation CPU known as "Skylake". It also has a **NVidia Geforce GTX 970M** GPU. To eliminate the dedicated Nvidia GPU from the equation you can temporarily work with only the integrated Intel GPU in the short term.

When using Skylake you made need updates:

- [Ubuntu 15.10: Various &quot;types&quot; of freezes and now unexpected shutdown](Ubuntu 15.10: Various &quot;types&quot; of freezes and now unexpected shutdown)
- ["W: Possible missing firmware for module i915_bpo" when updating initramfs]({% post_url /2017/2017-02-03-"W:-Possible-missing-firmware-for-module-i915_bpo"-when-updating-initramfs %})
- [Ubuntu doesn&#39;t reboot](Ubuntu doesn&#39;t reboot)

These are some of the answers I've written but there are many great answers others have written:

- [No version of Ubuntu can be installed with any Skylake 6th generation Intel processor](No version of Ubuntu can be installed with any Skylake 6th generation Intel processor)
- [16.04: How to get the recommended intel-microcode package to fix hyper-threading issue?](16.04: How to get the recommended intel-microcode package to fix hyper-threading issue?)
- [Ubuntu 16.04 Skylake 6th Generation Screen Flickering](Ubuntu 16.04 Skylake 6th Generation Screen Flickering)
- [Ubuntu 16.04 Skylake overheating](Ubuntu 16.04 Skylake overheating)

Unfortunately not enough is known about your specific problems to point your question as a duplicate of an existing one.

One last thing to change is the Intel c-state max idle:

- [How to set intel_idle.max_cstate=1](How to set intel_idle.max_cstate=1)
- [System freezes completely with Intel Bay Trail](System freezes completely with Intel Bay Trail)

Although targeted at Intel BayTrail users it seems to have improved things for other Intel CPU users as well. If these fixes work I regard them as a work-around to make life better in the short term until a real solution is found.

