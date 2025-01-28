---
layout:       post
title:        >
    Which Folders To Include In backup?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157150
type:         Answer
tags:         backup directory grub eyesome
created_date: 2019-07-10 01:00:27
edit_date:    
votes:        "2 "
favorites:    
views:        "49,947 "
accepted:     
uploaded:     2025-01-28 05:54:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-10-Which-Folders-To-Include-In-backup_.md
toc:          false
navigation:   false
clipboard:    false
---



I backup what is important to me which can loosely be defined as my intellectual property plus efforts spent configuring Ubuntu to work perfectly (for me).

I have the backup run every morning at 4:00 am or whenever Laptop resumes from suspend. It is controlled through `/etc/cron.daily` script.

The best kind of backup is off-site in case of fire or flood where computer sits so I take advantage of free 15GB gmail.com account and send a compressed daily backup there.

After a couple of years I hit my 15 GB "free" quota so wrote a script to recycle backups into 180 days, 78 weeks, 36 months and 100 yearly backups.

Here is the [daily backup script][1] of what's important to me:

``` bash
#!/bin/bash

# NAME: daily-backup.sh
# PATH: /mnt/e/bin
# DESC: Backup scripts, documents and configuration files to .tar

# DATE: July 11, 2017. Modified July 7, 2019.

HomeDir="/home/USER_NAME"                    # Required for cron compatibility
EmailAddr="EMAIL_NAME@gmail.com"

# PARM: 1=backup file name. Extension .tar.gz automatically appended.

# NOTE: To include MBR (Master Boot Record) in backup create an image using:
#       sudo dd if=/dev/sda of="$HOME/.mbr.sav" bs=512 count=1

# NOTE: CLONE CURRENT INSTALLATION TO NEW MACHINE
#       =========================================

#       To restore use Live USB to install Ubuntu alongside Windows 10
#       Connect to network with password xxxxxxxxx

#       Install Google Chrome
#       (https://askubuntu.com/questions/510056/how-to-install-google-chrome):

#           wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub 
#               | sudo apt-key add
#           echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/
#               stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
#           sudo apt update
#           sudo apt install google-chrome-stable

#       Open gmail.com and download attachment `$1` which is usually called
#           Backup-yymmdd-DayOfWeekName.tar

#       Make missing home/bin directory which tar doesn't create automatically:
#           mkdir ~/bin

#       Restore the daily backup using:
#           sudo tar -xvf Backup-yymmdd-DayFfWeekName.tar -C /
#           yar -xvf Backup-yymmdd-DayFfWeekName.tar -C /

#       Patch /etc/default/grub with new machine parameters, ie for nvme use:
#           acpiphp.disable=1

#       Use `sudo apt install aptitude-common`
#       Clone packages using `aptitude-create-state-bundle` on Source
#       Copy state-bundle.tar file from Source to Target machine
#       Restore packages using `aptitude-run-state-bundle` on Target

#       Manually copy ~/Pictures, ~/Videos, etc. not in daily backup.

#       sudo update-grub        # NVMe suspend/resume acpiphp.disable=1
#       sudo update-initramfs   # to get plymouth sunrise splash screen

if [[ $# -ne 1 ]]; then
    echo 'One argument required for file name, e.g. "Backup-2017-10-21-Saturday"'
    echo '.tar will automatically be added as a file extension'
    exit 1
fi

Filename="$1.tar"

cd $HomeDir ||
    exit 1

dpkg --get-selections > .packages       # List of installed applications

tar -cvpf "$Filename" bin               # create .tar & add user scripts
tar -rvpf "$Filename" .config/autostart # autostart programs configuration
tar -rvpf "$Filename" /usr/local/bin    # add global root-based scripts
tar -rvpf "$Filename" /etc/cron*        # crontab, cron.d, cron.daily, etc
tar -rvpf "$Filename" /etc/system*      # systemd files: login.conf, etc.
tar -rvpf "$Filename" /lib/systemd/system-sleep
tar -rvpf "$Filename" /etc/rc.local     # Startup script: calls zaprestore.
tar -rvpf "$Filename" /etc/sudoers      # 120 minute sudo, stars in password
tar -rvpf "$Filename" /etc/environment  # PATH backup
tar -rvpf "$Filename" /etc/default/grub # bootstrap loader
#July 20, 2018 - /boot/grub takes 5MB+
#tar -rvpf "$Filename" /boot/grub        # Custom grub fonts and splash...
tar -rvpf  "$Filename" /usr/share/plymouth   # ... screen (plymouth)
#included above tar -rvpf "$Filename" /usr/share/plymouth/themes/earth-sunrise/
tar -rvpf "$Filename" /usr/share/grub/themes/Tuxkiller2/
tar -rvpf "$Filename" /etc/grub.d       # 00_header, etc. changes
tar -rvpf "$Filename" Desktop           # files and links on desktop
tar -rvpf "$Filename" Documents/*.od*   # Libre Office: *.ods, *.odt, etc.

# Trusted keys to install from third party PPAs
tar -rvpf "$Filename" /etc/apt/trusted.gpg
tar -rvpf "$Filename" /etc/apt/trusted.gpg.d

# Sources for repositories - 1) Main single file - 2) directory of files
tar -rvpf "$Filename" /etc/apt/sources.list
tar -rvpf "$Filename" /etc/apt/sources.list.d

# find all $HOME/.config files and add to .tar
find .* -maxdepth 0 -type f -exec tar -rvf "$Filename" {} +

# Nautilus custom scripts
tar -rvpf "$Filename" .local/share/nautilus/scripts

# /etc/udev rules
tar -rvpf "$Filename" /etc/udev/rules.d

# /etc/rc.local
tar -rvpf "$Filename" /etc/rc.local

# /etc/X11/xorg.conf.d
tar -rvpf "$Filename" /etc/X11/xorg.conf.d

# /mnt/e - shared WSL + Linux
tar -rvpf "$Filename" /mnt/e/bin
tar -rvpf "$Filename" /mnt/e/Documents

# ~/eyesome - Development version
tar -rvpf "$Filename" eyesome

# ~/gmail - Python and Bash scripts but NOT huge data files
tar -rvpf "$Filename" gmail/*.py
tar -rvpf "$Filename" gmail/*.sh
tar -rvpf "$Filename" gmail/go
tar -rvpf "$Filename" gmail/BackupSets
tar -rvpf "$Filename" gmail/BackupDays

echo "Complete file list with sizes..."
tar -tvf "$Filename" > BackupLog    # list filenames and sizes
chmod a+w BackupLog                 # give user delete access

echo "Compressing with gzip..."
gzip "$Filename"
Filename="$Filename.gz"

echo "Emailing: $EmailAddr"

# From: https://internetlifeforum.com/gmail/2251-gmail-some-file-types-blocked-fix-how-go-around/
# cat archive.tar.gz | base64 > file
# then i sent the file via email:
# echo "Base64 encoded file" | mutt -a file -s subject -- mymail@gmail.com
# then mail was delivered properly! Then when one need to get readable archive 
# again, he need to decode it by base64. In my case i do it via linux command line:
# cat file | base64 -d > decodedarchive.tar.gz

Filename64="$Filename.64"
cat "$Filename" | base64 > "$Filename64"
mail -a "$Filename64" -s "$Filename64" "$EmailAddr" < BackupLog

ls -la "$Filename" "$Filename64"
rm     "$Filename" "$Filename64"

exit 0
```

  [1]: {% post_url /2017/2017-06-06-Backup-Linux-configuration_-scripts-and-documents-to-Gmail %}
