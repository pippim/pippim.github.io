---
layout:       post
title:        >
    Migrating from Windows 10 to Ubuntu 16.04 LTS without loosing data in "D:" drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007400
type:         Answer
tags:         partitioning mount migration
created_date: 2018-02-18 14:22:19
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "160 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-18-Migrating-from-Windows-10-to-Ubuntu-16.04-LTS-without-loosing-data-in-_D__-drive.md
toc:          false
navigation:   false
clipboard:    false
---

# You can dual boot with Windows and Ubuntu

The advantage of keeping Windows is:

- You can install BIOS and firmware updates for your hardware from Windows which aren't available from Linux/Ubuntu.
- You can keep a working copy of Windows to access Internet for support if Ubuntu is broken.
- You can have a transition period of working with files in Windows that haven't been converted to Ubuntu yet.

## Shrink Windows 10 from 149 GB

In order to make space for Ubuntu you can shrink your Windows partition (from within Windows Explorer) from 149 GB to about 40 GB. This will leave you with more than 100 GB for Ubuntu which, for most users, is more than enough for the short term.

## Keep your Windows 10 data files on D: partition.

You can keep your D: drive as is with Windows data files. Over time you can convert them (if necessary) into Ubuntu/Linux format. Ubuntu can access the files on D: partition via `nautilius` (file manager called `Files` in newer versions of Ubuntu).

Later on if your 100 GB of Ubuntu programs and data on C: drive hits 80% you can use Windows Explorer to shrink the size of D: from 315 GB to say 100 GB and make way for a new Ubuntu partition of 215 GB on D: drive. 

A new partition is usually possible because over time you discover Windows data files on D: that are no longer needed and you have deleted to free up space. For example you have a Windows Excel spreadsheet called *Monthly_Payroll_hours.xls* which you convert to Ubuntu LibreOffice Calc spreadsheet called *Monthly_Payroll_hours.ods*. After conversion you delete the Windows spreadsheet freeing up more space on D: for future "shrinking"
