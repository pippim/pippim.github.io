---
layout:       post
title:        >
    Is it necessary to keep records of my backups?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/998121
type:         Answer
tags:         backup restore deja-dup
created_date: 2018-01-20 19:33:24
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "118 "
accepted:     Accepted
uploaded:     2022-01-19 20:21:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-20-Is-it-necessary-to-keep-records-of-my-backups^.md
toc:          false
navigation:   false
clipboard:    false
---

# Generational backups

I started doing [daily backups][1] about six months ago to my email account at gmail.com. gamil limits email backups to 25 MB per archive. The "free" account is limited to 15 GB and is currently 14% full. Soon I will have to start sifting through the archives with a backup strategy to keep:

- Monday to Sunday (*Daily backups*) that get purged after 14 days
- Sunday backups (*Weekly backups*) purged after 8 weeks
- Last day of month backups (*Monthly backups*) purged after 18 months
- Last day of year backups (*Yearly backups*) kept forever

The backup strategy follows the [Grandfather-father-son][2] theme.

Writing a script to access a gamil.com account to copy an existing daily backup to a Weekly backup, Monthly backup and/or a Yearly backup based on date will be no easy task. It might be easier to email the backup multiple times, depending on date, to create the Weekly, Monthly and Yearly backups in real time instead of copying them in the future.

The script to manage Weekly, Monthly and Yearly backups has to account for the fact a backup may not be available for Friday of week, Last day of Month or Last day of Year in which case the next earlier backup has to be selected.

Finally a script to purge Daily, Weekly and Monthly backups based on expiry dates has to be written.

Until script(s) are written, manual copying and renaming of backup archives is required.

----------


# Notes

Large backups of say 60GB of music files will be a separate process to a large enough USB stick or pair of alternating USB sticks.

Programs are not backed up but a list of installed programs (package names) is backed up daily.

It is extremely important that you test your backups from time to time. You can do this by restoring them to an empty partition and then running `diff` command between the backup restored partition and real partition.


  [1]: {% post_url /2017/2017-06-06-Backup-Linux-configuration^-scripts-and-documents-to-Gmail %}
  [2]: https://en.wikipedia.org/wiki/Backup_rotation_scheme
