---
layout:       post
title:        >
    How does the Grub menu actually Works?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160442
type:         Answer
tags:         grub-legacy
created_date: 2019-07-23 14:53:57
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "516 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-23-How-does-the-Grub-menu-actually-Works_.md
toc:          false
navigation:   false
clipboard:    false
---

This explains [how grub boots multiple drives and partitions][1]:

## 5.3.4 DOS/Windows

GRUB cannot boot DOS or Windows directly, so you must chain-load them (see [Chain-loading][2]). However, their boot loaders have some critical deficiencies, so it may not work to just chain-load them. To overcome the problems, GRUB provides you with two helper functions.

If you have installed DOS (or Windows) on a non-first hard disk, you have to use the disk swapping technique, because that OS cannot boot from any disks but the first one. The workaround used in GRUB is the command drivemap (see [drivemap][3]), like this:

``` 
drivemap -s (hd0) (hd1)
```

This performs a virtual swap between your first and second hard drive.

Caution: This is effective only if DOS (or Windows) uses BIOS to access the swapped disks. If that OS uses a special driver for the disks, this probably won’t work.

Another problem arises if you installed more than one set of DOS/Windows onto one disk, because they could be confused if there are more than one primary partitions for DOS/Windows. Certainly you should avoid doing this, but there is a solution if you do want to do so. Use the partition hiding/unhiding technique.

If GRUB hides a DOS (or Windows) partition (see [parttool][4]), DOS (or Windows) will ignore the partition. If GRUB unhides a DOS (or Windows) partition, DOS (or Windows) will detect the partition. Thus, if you have installed DOS (or Windows) on the first and the second partition of the first hard disk, and you want to boot the copy on the first partition, do the following:

``` 
parttool (hd0,1) hidden-
parttool (hd0,2) hidden+
set root=(hd0,1)
chainloader +1
parttool ${root} boot+
boot
```

## Notes from `parttool`:


> ### ‘boot’ (boolean)  
>   
> -   When enabled, this makes the selected partition be the active (bootable) partition on its disk, clearing the active flag on all  
> other partitions. This command is limited to primary partitions.  
>   
> ### ‘type’ (value)  
>   
> -   Change the type of an existing partition. The value must be a number in the range 0-0xFF (prefix with ‘0x’ to enter it in  
> hexadecimal).  
>   
> ### ‘hidden’ (boolean)  
>   
> -   When enabled, this hides the selected partition by setting the hidden bit in its partition type code; when disabled, unhides the  
> selected partition by clearing this bit. This is useful only when  
> booting DOS or Windows and multiple primary FAT partitions exist in  
> one disk. See also DOS/Windows.  


  

[1]: [how grub boots multiple drives and partitions](how grub boots multiple drives and partitions)
  [2]: https://www.gnu.org/software/grub/manual/grub/html_node/Chain_002dloading.html#Chain_002dloading
  [3]: https://www.gnu.org/software/grub/manual/grub/html_node/drivemap.html#drivemap
  [4]: https://www.gnu.org/software/grub/manual/grub/html_node/parttool.html#parttool
