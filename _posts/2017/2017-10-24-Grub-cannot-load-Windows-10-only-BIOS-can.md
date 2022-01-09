---
layout:       post
title:        >
    Grub cannot load Windows 10 only BIOS can
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/968324
type:         Answer
tags:         16.04 grub2 uefi windows-10 nvme
created_date: 2017-10-24 00:20:11
edit_date:    2017-10-24 00:46:03
votes:        "1 "
favorites:    
views:        "291 "
accepted:     Accepted
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

On a Dell based Skylake using UEFI and NVMe with AMI BIOS this can be fixed by changing `Firmware TPM` from `enabled` to `disabled` on this screen:

[![Cropped Firmware TPM][1]][1]


----------

**NOTE:** I thought someone had asked this last month before I got my new laptop. I searched in vane for that question to post this answer there. This problem will affect many people going forward as NVMe and USB-C ThunderBolt3 become more prevalent (they seem to go hand-in-hand) so I decided to post this Q&A so others could benefit. If you can find the original question please close this as a duplicate and I'll post this answer under the original question.


  [1]: https://i.stack.imgur.com/6LTNd.jpg
