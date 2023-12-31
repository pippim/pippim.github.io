---
layout:       post
title:        >
    Can booting Windows from GRUB cause BSOD?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1019503
type:         Answer
tags:         boot dual-boot grub2 uefi
created_date: 2018-03-27 02:52:13
edit_date:    
votes:        "0 "
favorites:    
views:        "1,374 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-27-Can-booting-Windows-from-GRUB-cause-BSOD_.md
toc:          false
navigation:   false
clipboard:    false
---

I used this script: [How to display grub menu and options without booting?][1] to look at the Windows boot options used by `grub`:

``` 
menuentry 'Windows Boot Manager (on /dev/nvme0n1p2)' --class windows --class os $menuentry_id_option 'osprober-efi-D656-F2A8' {
savedefault
insmod part_gpt
insmod fat
if [ x$feature_platform_search_hint = xy ]; then
search --no-floppy --fs-uuid --set=root D656-F2A8
else
search --no-floppy --fs-uuid --set=root D656-F2A8
fi
chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
Press <Enter> to continue
```

Using a similar program or manually viewing `/boot/grub/grub.cfg` check what `.efi` program is being loaded on your system. Them compare it to the version that is being used in your BIOS boot up. If different try running `boot-repair` on `grub` to fix.

  [1]: {% post_url /2018/2018-03-26-Display-grub-menu-and-options-without-rebooting_ %}
