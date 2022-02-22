---
layout:       post
title:        >
    How to extract a backup from old 1993 files from an IBM PS2?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/960926
type:         Answer
tags:         backup extract
created_date: 2017-10-01 00:27:14
edit_date:    
votes:        "5 "
favorites:    
views:        "311 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-10-01-How-to-extract-a-backup-from-old-1993-files-from-an-IBM-PS2_.md
toc:          false
navigation:   false
clipboard:    false
---

This was much too large to write in a comment. 

You have 25 disks likely 1.44 MB format totaling 36 MB of backup. If they are compressed from the hard drive it was likely 60+ MB which was very large for that era. I remember around that time a pair of SCSI 150MB drives (the size of toasters) setup in RAID 1 with were $5,000.

Looking at this [PC Magazine review from 1993][1], there were five popular backup programs:

- Central Point Backup
- DOS 5
- DOS 6
- Fastback Plus
- The Norton Backup

When you have 25 disks it's almost certainly in compressed format making it unreadable to the human eye.

You have to do some digging into internals to find out which compression format the archives are in. Then you need to find the program which can decompress them. Luckily in 1993 there weren't too many compression algorithms so there are probably only 3 or 4 possibilities. Also data encryption was rare which is good because that would make it next to impossible for you to decompress the data.

The catalog for the backup files is almost certainly on the last diskette. Somewhere on each diskette their should be a file containing the disk number plus other control information.

Good luck in your endeavors and keep us posted if you can.

  [1]: https://books.google.ca/books?id=kjyIOLYr7yMC&pg=PA111&lpg=PA111&dq=hard%20disk%20backup%20programs%20popular%20in%201993&source=bl&ots=COr2VSAOWQ&sig=8HAmUbDMwwkcVUzJ-JKJ1OBmW7w&hl=en&sa=X&ved=0ahUKEwj0qqjMkc7WAhUJ2mMKHfCGAGsQ6AEIUDAH#v=onepage&q=hard%20disk%20backup%20programs%20popular%20in%201993&f=false
