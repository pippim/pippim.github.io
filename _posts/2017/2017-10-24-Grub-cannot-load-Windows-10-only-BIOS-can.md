---
layout:       post
title:        >
    Grub cannot load Windows 10 only BIOS can
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/968323
type:         Question
tags:         16.04 grub2 uefi windows-10 nvme
created_date: 2017-10-24 00:20:11
edit_date:    2017-10-24 01:21:29
votes:        "0 "
favorites:    
views:        "415 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-10-24-Grub-cannot-load-Windows-10-only-BIOS-can.md
toc:          false
navigation:   false
clipboard:    false
---

Dell based Intel i7 6700HQ (Skylake) laptop with HM170 chipset and M.2 PCIe Gen 3.0 x 4 NVMe Samsung Pro 960 SSD formatted with GPT and booting with UEFI. 

Cannot boot Windows 10 from grub menu. When option below is chosen the Grub menu goes away, the background says up and the Laptop just freezes.

[![Grub][1]][1]

The only solution is to reboot, invoke the BIOS by pressing `F2`, select the Windows EFI and elevate it to a higher boot priority. Screen sample below. After that rebooting automatically takes you into Windows unless you again press F2 at BIOS screen and elevate Ubuntu EFI to higher boot priority.

[![Boot order][2]][2]


  [1]: https://i.stack.imgur.com/ze7uH.jpg
  [2]: https://i.stack.imgur.com/RylpH.jpg
