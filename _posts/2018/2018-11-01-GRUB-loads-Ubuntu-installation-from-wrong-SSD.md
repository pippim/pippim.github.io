---
layout:       post
title:        >
    GRUB loads Ubuntu installation from wrong SSD
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089060
type:         Answer
tags:         boot dual-boot grub2 live-usb dd
created_date: 2018-11-01 00:06:53
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "1,249 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-01-GRUB-loads-Ubuntu-installation-from-wrong-SSD.md
toc:          false
navigation:   false
clipboard:    false
---

# `clone-ubuntu.sh` Bash Script

Using [`clone-ubuntu.sh`][1] will quickly do what you want. Relevant code snippets to address your problem are included below but visit the link for the complete picture.

## Clone like `dd`

Clone like `dd` but do it without rebooting into a Live USB. Virtual file systems are automatically skipped to save time and eliminate errors. The script can be rerun if need be (you are testing Ubuntu upgrades/updates for example) and is faster the second time:

``` 
rsync -haxAX --stats --delete --info=progress2 --info=name0 --inplace  \
      /* "$TargetMnt"                                                   \
      --exclude={/dev/*,/proc/*,/sys/*,/tmp/*,/run/*,/mnt/*,/media/*,/lost+found}
```

## Update `/etc/fstab`

Using `lsblk` to ascertain source and target UUID's the changes are made automatically in the new clone:

``` 
# Update /etc/fstab on clone partition with clone's UUID
echo ""
echo "====================================================================="
echo "Making changes in: $TargetMnt/etc/fstab"
echo "        from UUID: $SourceUUID"
echo "          to UUID: $TargetUUID"
sed -i "s/$SourceUUID/$TargetUUID/g" "$TargetMnt"/etc/fstab
```

## Update `grub` menu with new entries

Grub needs to know the correct UUID's and `clone-ubuntu.sh` automatically makes them for you:

``` 
# Update /boot/grub/grub.cfg on clone partition with clone's UUID
echo ""
echo "====================================================================="
echo "Making changes in: $TargetMnt/boot/grub/grub.cfg"
echo "        from UUID: $SourceUUID"
echo "          to UUID: $TargetUUID"
echo "Also change 'quiet splash' to 'nosplash' for environmental awareness"
echo "Suggest first time booting clone you make wallpaper unique"
sed -i "s/$SourceUUID/$TargetUUID/g" "$TargetMnt"/boot/grub/grub.cfg
sed -i "s/quiet splash/nosplash/g" "$TargetMnt"/boot/grub/grub.cfg
```


----------

## Summary

The relevant bash / shell commands are included so you can do the same steps manually for a successful clone that boots and operates as expected.


  [1]: {% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %}

