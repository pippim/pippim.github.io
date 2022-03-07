---
layout:       post
title:        >
    Difference between Legacy BIOS and UEFI
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/993308
type:         Answer
tags:         uefi bios gpt mbr
created_date: 2018-01-07 18:36:55
edit_date:    
votes:        "6 "
favorites:    
views:        "62,698 "
accepted:     
uploaded:     2022-03-06 19:51:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-07-Difference-between-Legacy-BIOS-and-UEFI.md
toc:          false
navigation:   false
clipboard:    true
---

# Legacy (CSM) booting vs UEFI booting

SuperUser has a [highly-upvoted post][1] from 2012 on OP's question that many will find helpful.

CSM (Legacy) and UEFI (Universal Extensible Firmware Interface) are mutually exclusive boot options you choose within BIOS (Basic Input Output System). BIOS applies to much more than legacy (CSM) booting:

- Disk boot format: Legacy (CSM) vs. UEFI
- Disk boot order: hard disk, SSD, USB, NIC (Network Interface Card)
- Disk low level operations: RAID vs AHCI
- USB ports: wake up on input, powered when system off, etc.
- Multiple Graphic Cards: enable/disable Intel or nVidia
- System date and time stored on RTC (Real Time Clock)
- Optional hardware POST (Power On Self Test) checks
- Many other BIOS options that vary depending on computer

Great answers have already been posted by Byte and Ravery here, so I would just summarize:

- Legacy (CSM) and UEFI are different ways to boot from storage disks (which often take the form of SSD these days).
- CSM uses an MBR (Master Boot Record) in a specific format of 512 Bytes to boot the operating system.
- UEFI uses files within a large partition (typically 100 MB) to boot the operating system. Typically they still require the MBR to be present.
- MBR and GPT are different specifications for disk partition formatting. You can have UEFI boot on an MBR formatted disk. You can have MBR boot on a GPT formatted disk (in non-Windows environments).
- The MBR (first 512 bytes of a disk) is typically hidden from user view.
- The EFI partition can be easily viewed, as shown below

It is important to note ambiguities that MBR can refer to disk booting method or disk partition format.

It is also important to note that UEFI is often associated with GPT disk format but MBR booting can use GPT disk format.

## Viewing the EFI partition

Using `lsblk` you can see EFI partition and files:

``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL
NAME        FSTYPE LABEL            MOUNTPOINT   SIZE MODEL
sda                                            931.5G HGST HTS721010A9
├─sda4      ntfs   WINRETOOLS                    450M 
├─sda2                                           128M 
├─sda5      ntfs   Image                        11.4G 
├─sda3      ntfs   HGST_Win10       /mnt/d       919G 
└─sda1      vfat   ESP                           500M 
nvme0n1                                          477G Samsung SSD 960 PRO 512GB           
├─nvme0n1p5 ext4   NVMe_Ubuntu_16.0 /           44.6G 
├─nvme0n1p3                                       16M 
├─nvme0n1p1 ntfs                                 450M 
├─nvme0n1p6 swap   Linux Swap       [SWAP]       7.9G 
├─nvme0n1p4 ntfs   NVMe_Win10       /mnt/c     414.9G 
├─nvme0n1p2 vfat                    /boot/efi     99M 
└─nvme0n1p7 ntfs   Shared_WSL+Linux /mnt/e         9G 
```

There are many files in `/boot/efi` you can see using `ls` command. To see the size of all files within the 99MB partition use:

``` 
$ du -hs /boot/efi
35M	/boot/efi
```

## `gdisk` Information

Whilst researching this answer I found a link to the `gdisk` command which I ran and may regret when I boot into Windows again. This is here so you don't repeat this if it turns out to be a mistake for Windows dual-boot:

{% include copyHeader.html %}
``` 
sudo gdisk -l /dev/sda
[sudo] password for rick:          
GPT fdisk (gdisk) version 1.0.1

The protective MBR's 0xEE partition is oversized! Auto-repairing.

Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.
Disk /dev/sda: 1953525168 sectors, 931.5 GiB
Logical sector size: 512 bytes
Disk identifier (GUID): 8BEC7AEB-4576-42B0-8A8A-D40779A80126
Partition table holds up to 128 entries
First usable sector is 34, last usable sector is 1953525134
Partitions will be aligned on 2048-sector boundaries
Total free space is 3437 sectors (1.7 MiB)

Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048         1026047   500.0 MiB   EF00  EFI system partition
   2         1026048         1288191   128.0 MiB   0C01  Microsoft reserved ...
   3         1288192      1928626175   919.0 GiB   0700  Basic data partition
   4      1928626176      1929547775   450.0 MiB   2700  
   5      1929547776      1953523711   11.4 GiB    2700  
```

I will reboot into Windows 10 and see if Linux `gdisk` had any ramifications of repairing the Windows hard drive `D:` which is `/dev/sda` in my Linux setup. I'm not concerned because it's the original Hard Drive I haven't used yet but you should be careful if it has data on it. I'll update this section after rebooting and testing.

  [1]: https://superuser.com/questions/496026/what-is-the-difference-in-boot-with-bios-and-boot-with-uefi
