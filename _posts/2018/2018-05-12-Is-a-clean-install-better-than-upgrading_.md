---
layout:       post
title:        >
    Is a clean install better than upgrading?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035368
type:         Answer
tags:         upgrade system-installation grub
created_date: 2018-05-12 15:22:51
edit_date:    
votes:        "11 "
favorites:    
views:        "42,267 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-12-Is-a-clean-install-better-than-upgrading_.md
toc:          false
navigation:   false
clipboard:    false
---

### There are no guarantees in life

You can have crashes in a fresh install or in an upgrade. Most people will not experience a crash. If you are in that unlucky minority it is best to:

- have a backup you can restore or,
- test the install/upgrade on a separate partition.

### Clean install advantages and disadvantages

For a clean install all that old garbage you've installed over two years between LTS versions is gone. This however can be a disadvantage as you often forget the good stuff you've added in `/usr` and `/etc` subdirectories.

### Upgrade advantages and disadvantages

In the process of upgrading you are told for each configuration file what each new package version will be changing. You can select to keep the old or take the new version. For example during **Ubuntu 16.04 LTS** to **18.04 LTS** upgrade these changed on my system:

- Scanner configuration - `/etc/sane.d/dll.conf`
- `/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf`
- Sound override to keep HDMI TV active - `/etc/pulse/default.pa`
- Grub override to hide menu at boot unless <kbd>Escape</kbd> pressed - `/etc/grub.d/30_os-prober`
- Cron(you would loose all on fresh install!) - `/etc/cron.d/anacron`
- Total network traffic monitoring utility - `/etc/vnstat.conf`

Running the upgrade on May 6, 2018 I was told that **203 packages** will be removed. Over time support for more packages will be added so fewer will be dropped during upgrade. It is best to ensure all your critical needs packages are there or you have alternatives from other developers to use.

### Backup first or run upgrade on cloned partition

Backing up and restoring is a pain. It's time consuming and often times your restore doesn't proceed as planned. An alternative is to clone your 16.04 LTS (or whichever version) to a new test partition and upgrade to 18.04 LTS (or whichever version) there.

I use a script to clone Ubuntu to a test partition for upgrading: [Backup/clone live to a new partition which can be booted]({% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %})

The script will:

- Use `rsync` to ensure mirror image from real partition to test partition
- Update test partition `/boot/grub/grub.cfg` with proper UUID's for booting
- Update test partition `/etc/fstab` with proper UUID's for booting
- Run `sudo update-grub` to add test partition to boot menu
- Allow you now reboot and run upgrade on test partition

After upgrade on test partition you can take your time exploring all the new features and checking for bugs. You still have your original Ubuntu installation for day to day work. If you find bugs in the new version, you can rerun the cloning and upgrade a week or two later after they have been fixed. You would also re-clone and re-upgrade if packages critical to your work were not supported but now support has been added.
