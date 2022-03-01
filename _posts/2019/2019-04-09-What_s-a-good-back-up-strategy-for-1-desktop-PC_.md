---
layout:       post
title:        >
    What's a good back-up strategy for 1 desktop PC?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132311
type:         Answer
tags:         system-installation backup administration
created_date: 2019-04-09 02:09:57
edit_date:    2019-04-28 11:46:52
votes:        "2 "
favorites:    
views:        "16,967 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-09-What_s-a-good-back-up-strategy-for-1-desktop-PC_.md
toc:          false
navigation:   false
clipboard:    false
---

Backing up all the programs would be 10 GB or more. It doesn't make much sense to back them up since they can be restored off the internet.

Backing up all your writings would be a couple MB. Unless you write very fast and frequently of course. Backing up your spreadsheets and presentations could be 100's of MBs if you have lots of clip art and images.

Backing up all your photos and songs could take dozens of GBs. An alternative would be to mirror the music and photos on your smartphone with Ubuntu. Chances are good a man made (fire, theft, vandalism, the ex) or Force Majeure (lightning, flood, earthquake) will not effect both devices at the same time.

Backing up your videos could be 100's of GBs. 

You have to know what you have, where it is stored, how big it is and whether or not it needs to be backed up. You will have to think about this and do some research.

----------

For myself I used an automated backup to compressed file (< 25 MB) every morning that is emailed to my gmail.com account. Each morning `cron` only backs up what I've written along with configuration files of Ubuntu settings.

After a year now I'll have to adopt a Father-Son-Grandfather backup strategy for Yearly, Monthly, Weekly and Daily backups to prune the number of backups (365+ days) currently stored in gmail.com which is limited to 15 GB for free to everyone on planet Earth (or theoretically Mars if they have an IP address).

If you are interested in my daily backup to gmail.com script, you can see it here: [Backup Linux configuration, scripts and documents to Gmail]({% post_url /2017/2017-06-06-Backup-Linux-configuration_-scripts-and-documents-to-Gmail %})

----------

You can buy cheap 16 GB, 32 GB or 64 GB USB flash drives (aka thumb drives) and copy your whole Ubuntu image and data files to it.

If you have a 500 GB hard drive or SSD and Ubuntu only takes up 25 to 50 GB you can create a backup partition to store backups. Note these will not be offsite backups nor will they save you if your hard drive crashes. These backup partitions are helpful when you shoot yourself in the foot and delete a whole bunch of files or directories. To clone your Ubuntu partition to another backup partition I wrote this script: [Bash script to backup/clone Ubuntu to another partition]({% post_url /2018/2018-04-27-Bash-script-to-backup_clone-Ubuntu-to-another-partition %})

Additionally there are backup programs you can use but I can't vouch for them.
