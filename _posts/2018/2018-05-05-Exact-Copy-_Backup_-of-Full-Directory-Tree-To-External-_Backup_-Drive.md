---
layout:       post
title:        >
    Exact Copy (Backup) of Full Directory Tree To External (Backup) Drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032562
type:         Answer
tags:         hard-drive backup external-hdd
created_date: 2018-05-05 22:13:26
edit_date:    
votes:        "5 "
favorites:    
views:        "409 "
accepted:     Accepted
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-05-Exact-Copy-_Backup_-of-Full-Directory-Tree-To-External-_Backup_-Drive.md
toc:          false
navigation:   false
clipboard:    false
---

Most backup programs compress data to specialized backup archives. Special search tools are required to locate files withing backup archives and special commands must be used to retrieve backup files.

If you only want an exact copy of files consider the `rsync` command.

Borrowing from this answer: [Bash script to clone Ubuntu to new partition for testing 18.04 LTS upgrade][1] here is how to clone a full 16.04 installation:

``` 
rsync -haxAX --stats --delete --info=progress2 --info=name0 /* "$TargetMnt" \
      --exclude={/dev/*,/proc/*,/sys/*,/tmp/*,/run/*,/mnt/*,/media/*,/lost+found}
```

Some notable comments about parameters:

- `--stats` gives information on files added, changed and deleted from the clone (called backup in your case).
- `--delete` instructs rsync to delete files in the clone that no longer exist in the source directory.
- `info=progress2` gives a modern looking progress display whilst cloning directories.
- `--info=name0` prevents every single filename from being displayed as it is being copied. This gives less screen clutter but you may want to omit this parameter.
- `/*` tells `rsync` where to start synchronizing files. In this example it's the root directory but you want to change it to `/media/user1/DATA4/FolderA`.
- `"$TargetMnt"` tells `rscync` where to clone to. In your case change it to `"/media/ivan/Seagate Backup Plus Drive/FolderA"`. The double quotes are important because your directory names contain spaces in them.
- The second line starting with `--exclude={/dev/*` you don't need at all because these directories aren't in the list. Don't use this line and drop the line continuation character `\` at the end of the first line.

As with all backup scenarios **always test** the backups to make sure all files are there and contain the appropriate information.

  [1]: {% post_url /2018/2018-04-27-Bash-script-to-backup_clone-Ubuntu-to-another-partition %}
