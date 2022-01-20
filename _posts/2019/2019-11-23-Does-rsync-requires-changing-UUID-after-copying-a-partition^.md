---
layout:       post
title:        >
    Does rsync requires changing UUID after copying a partition?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191198
type:         Answer
tags:         partitioning rsync uuid grub
created_date: 2019-11-23 23:25:05
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "1,338 "
accepted:     
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-23-Does-rsync-requires-changing-UUID-after-copying-a-partition^.md
toc:          false
navigation:   false
clipboard:    false
---

## `rsync` can clone your entire `/`

But with both `rsync` and `dd` or another cloning method you must change `/etc/fstab` and `/etc/default/grub` and by extension `/boot/grub/grub.cfg` for Ubuntu to work properly.

From this script: [Bash script to backup/clone Ubuntu to another partition]({% post_url /2018/2018-04-27-Bash-script-to-backup^clone-Ubuntu-to-another-partition %})

`rsync` is called like this:

``` 
rsync -haxAX --stats --delete --info=progress2 --info=name0 --inplace  \
      /* "$TargetMnt"                                                   \
      --exclude={/dev/*,/proc/*,/sys/*,/tmp/*,/run/*,/mnt/*,/media/*,/lost+found}
```

Notice the many directories that you **do not** want to copy specified with the `--exclude` directive. These directories are either recreated at boot time (virtual file system) or are pointers to other partitions (like `/mnt` and `/media`). You might also want to exclude the Trash folder from copying too.

After `rsync` completes you need to change the aforementioned files like this:

``` 
sudo sed -i "s/$SourceUUID/$TargetUUID/g" "$TargetMnt"/etc/fstab
sudo sed -i "s/$SourceUUID/$TargetUUID/g" "$TargetMnt"/boot/grub/grub.cfg
sudo sed -i "s/quiet splash/nosplash/g" "$TargetMnt"/boot/grub/grub.cfg
```

Where:

- `SourceUUID=` The UUID of your current partition
- `TargetUUID=` The UUID of your target / clone partition
- `TargetMnt=` The mount point of your clone partition
- `s/quiet splash/nosplash/g` line is optional so that when you boot your clone you see a difference with system messages displayed and no splash screen.

Finally to add a GRUB menu option pointing to your new cloned Ubuntu use:

``` 
sudo update grub
```
