---
layout:       post
title:        >
    Backup Linux configuration, scripts and documents to Gmail
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/922493
type:         Answer
tags:         bash backup cloud gmail eyesome grub
created_date: 2017-06-06 00:00:07
edit_date:    2021-05-07 21:29:49
votes:        "8 "
favorites:    
views:        "4,759 "
accepted:     Accepted
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-06-Backup-Linux-configuration_-scripts-and-documents-to-Gmail.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Edit May 7, 2021


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Historical posts in next sections

The original part of the answer and first major edit are left intact in the next sections for historical references about trial and error.

April 29, 2021 was the last successful time the older script ran. Starting on April 30, 2021 google started scanning the backup archive to see if any filenames ended with `.exe`, `.js`, etc. This caused google to reject the attachment.

The solution now is to encrypt the backup archive file with a password.

## Updated script

Remember to replace capitalized words below with your real words:



``` bash
HomeDir="/home/USER_NAME"               # Required for cron compatibility
EmailAddr="EMAIL_ADDR@gmail.com"        #  where $HOME is not setup for us.
```

### daily-backup.sh

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: daily-backup.sh
# PATH: /mnt/e/bin
# DESC: Backup scripts, documents and configuration files to .tar
# PARM: $1 = Filename for backup (without .tar extension)

# DATE: July 11, 2017. Modified May 7, 2021.

# NOTE: Requires zip package because pbzip2 doesn't provide encryption:
#           sudo apt install zip


HomeDir="/home/USER_NAME"               # Required for cron compatibility
EmailAddr="EMAIL_ADDR@gmail.com"        #  where $HOME is not setup for us.

# tar removes leading / to make restores painless, suppress this error for cron
exec 2> >(grep -v "Removing leading '/' from member names" >&2)


# NOTE: To recover backup, download .64 backup format from google and use:
#       base64 -di backup.tar.gz.64 > backup.tar.gz

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

#       Create home/ sub-directories which tar doesn't create automatically:
#           mkdir ~/bin
#           mkdir ~/eyesome
#           mkdir ~/python
#           mkdir ~/gmail
#           mkdir ~/roboto
#           mkdir ~/sony

#       Restore the daily backup using:
#           download .64 backup format from google and use:
#           base64 -di backup.tar.gz.64 > backup.tar.gz
#           sudo tar -xvf Backup-yymmdd-DayOfWeekName.tar -C /

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

cd $HomeDir || exit 1                   # Change to homedir, exit on failure

dpkg --get-selections > .packages       # List of installed applications

tar -cpf "$Filename" bin                # create .tar & add user scripts
# find all "$HOME/." files using "-maxdepth" to skip ".config" directory
# Fpr example this includes .roboto
find .* -maxdepth 0 -type f -exec tar -rpf "$Filename" {} +
tar -rpf "$Filename" .config/autostart  # autostart programs configuration
tar -rpf "$Filename" .config/mserve     # music library and location playlists
tar -rpf "$Filename" .local/share/nautilus/scripts
tar -rpf "$Filename" Desktop            # files and links on desktop
tar -rpf "$Filename" Documents/*.od*    # Libre Office: *.ods, *.odt, etc.
tar -rpf "$Filename" eyesome            # ~/eyesome - Development version
tar -rpf "$Filename" gmail/*.py         # gmail daily backup management scripts
tar -rpf "$Filename" gmail/*.sh         #  and configuration files. Excludes
tar -rpf "$Filename" gmail/go           #  message data files 
tar -rpf "$Filename" gmail/BackupSets   #  which exceed 8 MB and can be
tar -rpf "$Filename" gmail/BackupDays   #  downloaded if needed again.
tar -rpf "$Filename" python/*.py        # Python scripts
tar -rpf "$Filename" roboto/roboto      # Script only, no download files
tar -rpf "$Filename" sony               # Sony TV via REST API over HTTP
#July 20, 2018 - /boot/grub takes 5MB+
#tar -rpf "$Filename" /boot/grub        # Custom grub fonts and splash...
tar -rpf "$Filename" /etc/apt           # 3rd party keys, repositories, etc.
tar -rpf "$Filename" /etc/cron*         # crontab, cron.d, cron.daily, etc
tar -rpf "$Filename" /etc/default/grub  # bootstrap loader
tar -rpf "$Filename" /etc/environment   # PATH backup
tar -rpf "$Filename" /etc/fstab         # UUID partitions
tar -rpf "$Filename" /etc/grub.d        # 00_header, etc. changes
tar -rpf "$Filename" /etc/hosts         # IP configuration
tar -rpf "$Filename" /etc/NetworkManager # .conf and .dispatcher.d
tar -rpf "$Filename" /etc/rc.local      # Startup script: calls zaprestore.
tar -rpf "$Filename" /etc/sudoers       # 120 minute sudo, stars in password
tar -rpf "$Filename" /etc/systemd       # systemd files: login.conf, etc.
tar -rpf "$Filename" /etc/udev/rules.d
tar -rpf "$Filename" /etc/X11/xorg.conf # /etc/X11/xorg.conf.d crashes
tar -rpf "$Filename" /lib/systemd/system-sleep
tar -rpf "$Filename" /lib/systemd/system/rc.local.service
tar -rpf "$Filename" /mnt/e/bin         # /mnt/e - shared WSL + Linux scripts
tar -rpf "$Filename" /mnt/e/Documents
tar -rpf "$Filename" /usr/local/bin     # add global root-based scripts
tar -rpf "$Filename" /usr/share/plymouth   # ... screen (plymouth)
tar -rpf "$Filename" /usr/share/grub/themes/Tuxkiller2/

# gsettings modified from default. To restore see answer at:
# https://askubuntu.com/questions/420527/how-to-dump-all-the-manully-altered-gsettings-keys
dconf dump / > dump.dconf
tar -rpf "$Filename" dump.dconf

# Get list of all filenames in backup archive (tar file).
tar -tvf "$Filename" > BackupLog    # list filenames and sizes
chmod a+w BackupLog                 # give user delete access

# From: https://internetlifeforum.com/gmail/2251-gmail-some-file-types-blocked-fix-how-go-around/
#   to create base64 file:
#       cat archive.tar.gz | base64 > file
#   then i sent the file via email:
#   then mail was delivered properly! Then when one need to get readable archive 
#   again, he need to decode it by base64. In my case i do it with:
#       cat file | base64 -d > decodedarchive.tar.gz

# NOTE: To recover backup, download .64 backup format from google and use:
#       base64 -di backup.tar.gz.64 > backup.tar.gz     # < May 6, 2021
#       base64 -di backup.tar.zip.64 > backup.tar.zip   # > May 6, 2021

# https://support.google.com/mail/answer/6590?hl=en#zippy=%2Cmessages-that-have-attachments
# May 6 2021 - Google has started scanning contents and rejecting zipped files
#              If they contain certain file extensions. It reports an error
#              without giving the filename. Solution is to use zip with 
#              password protection emcryption. Filename is backup.tar.zip
zip --password daily-backup --quiet "$Filename.zip" "$Filename"

# Attachment has to be base64 to avoid google errors: backup.tar.zip.64
# NOtE: prior to May 7, 2021 gzip was used and file extenion was '.gz.64'
Filename64="$Filename.zip.64"
cat "$Filename.zip" | base64 > "$Filename64"

#echo "Compare size to 24 MB"
size=$(stat --printf="%s" "$Filename64")
if [[ $size -gt 24000000 ]] ; then
    echo "=================== Backup > 24 MB aborting. ========================"
    ls -la "$Filename64"    # list backup file attributes
    tar -tvf "$Filename"    # list backup file contents with total size below
    tar -tvf "$Filename" | awk '{sum += $3} END {print sum}'
    exit 1                  # Abort backup
fi

# email the backup as base64 attachment with list of files in message body
mail -a "$Filename64" -s "$Filename64" "$EmailAddr" < BackupLog

rm "$Filename" "$Filename64" "$Filename.zip"

exit 0
```

----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Edit July 9, 2019

## Historical post in next section

The original part of the answer is left intact in the next section for historical reference to trial and error

## Backup script to create .tar file

This is the current backup script:




{% include copyHeader.html %}
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

Replace `USER_NAME` above with your user name. Replace `EMAIL_NAME@gamil.com` with your actual gmail address. Change the directory `/mnt/e/bin` to the directory you store your bash scripts. Save the file and exit. Then use:

``` bash
chmod a+x /mnt/e/bin/backup
```

This makes the script executable.

Notice how the MBR (Master Boot Record) is saved to backup. A separate earlier step to create `~/.mbr.sav` using `sudo dd ...` is required as described in script comments.

Notice the `dpkg --get-selections` line. This creates backs up a list of all installed application names.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Simplest way to automate sending email

From [Send email alerts using ssmtp][1] we find the simplest way of sending email automated from terminal or script. The installation steps are straight forward:

``` bash
sudo apt install ssmtp
sudo nano /etc/ssmtp/ssmtp.conf
# Change "MyEmailAddress" and "MyPassword" to your own.
```

There  is one step not mentioned; Google will send you an email confirming you want to allow a "less secure" application to send mail with your account:

[![gmail turns on less secure apps for email][2]][2]

After installing and configuring `ssmpt` one more package is required in order to attach your .tar backup file to an email message:

``` bash
sudo apt install sharutils
```

This package contains the program `uuencode` which is need to convert binary files for transmission.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Setup `cron` daily to call backup script

Create the file `/etc/cron.daily/daily-backup` containing:

{% include copyHeader.html %}
``` bash
#!/bin/sh
#
# NAME: daily-backup
# DESC: A .tar backup file is created, emailed and removed.
# DATE: Nov 25, 2017.
# CALL: WSL or Ubuntu calls from /etc/cron.daily/daily-backup
# PARM: No parameters but /etc/ssmtp/ssmtp.conf must be setup

# NOTE: Backup file name contains machine name + Distro
#       Same script for user with multiple dual boot laptops
#       Single machine should remove $HOSTNAME from name
#       Single distribution should remove $Distro

sleep 30 # Wait 30 seconds after boot

# Running under WSL (Windows Subsystem for Ubuntu)?
if cat /proc/version | grep Microsoft; then
    Distro="WSL"
else
    Distro="Ubuntu"
fi

today=$( date +%Y-%m-%d-%A )
/mnt/e/bin/daily-backup.sh Daily-$(hostname)-$Distro-backup-$today
```

Save the file, exit and use:

``` bash
chmod a+x /etc/cron.daily/daily-backup
```

This makes the script executable.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## What cron emails you every morning

Every morning after `/etc/cron.daily/daily-backup` is run `cron` sends you two emails. One is the backup `Backup-YYYY-MM-DD.tar` file which in my case is 5.2 MB that I cannot show you. The other is a listing off all the files in the backup which the `tar` command had reported to `cron`:

``` bash
Anacron <Me@gmail.com>
6:58 AM (1 hour ago)

to root, bcc: me 
/etc/cron.daily/daily-backup:
bin/
bin/.websync.new
bin/log-gsu-del
bin/now
  (... SNIP ...)
.xscreensaver
.xsession-errors
.xsession-errors.old
```



<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

## Summary

It took a month waiting for an answer and then a month writing an answer but, now the project is finished. Going forward it's simply a matter of adding additional directories to the backup script.

The next project will be a full backup but it is 6 GB large and will be copied to gdrive (Google Drive) because gmail is limited to 25 MB. That script is called `/usr/local/bin/full-backup` and is included here if you are interested:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: full-backup
# PATH: $HOME/bin
# DESC: Full system backup - must call with SUDO

# DATE: July 16, 2017. Modified July 26, 2017.

apt autoclean   # reduces size of /var/cache/apt/archives

cd /tmp	        # tar must be created in directory not backed up.

time tar -cvpzf backup.tar.gz \
--exclude=/backup.tar.gz \
--exclude=/proc \
--exclude=/tmp \
--exclude=/mnt \
--exclude=/dev \
--exclude=/sys \
--exclude=/media \
--exclude=/usr/src/linux-headers* \
--exclude=/home/Me/.cache \
--exclude=/var/log \
--exclude=/var/run/ \
--exclude=/run \
--exclude=/var/cache/apt/archives /
## ```



# Historical section

This will be more a "journey" than an answer as available options are explored.

# Backup what is most important to you first

I have two directories where I have invested most of my time since August 2016:

``` bash
/home/rick/bin
/usr/local/bin
```

When I first created a `tar` file (tape archive) using these two directories and tried to email them to myself I received this error:

[![gmail 25MB limit][3]][3]

# gmail.com won't accept files > 25 MB

How can two directories of scripts written over 10 months be larger than 25 MB? On closer examination they are are > 190 MB. Whhaaatttt?

In turns out to be a single file created for testing purposes:

``` bash
-rw-rw-r--  1 rick rick 191143744 Dec 23 17:27 log-gsu-gedit.tst
```

So delete this test file and rerun the commands:

``` bash
tar -cvf scripts-2017-06-05.tar /home/rick/bin
tar -rvf scripts-2017-06-05.tar /usr/local/bin
```

The first command creates the `.tar` file using one directory of script files and the second appends to the `.tar` file using the second directory of script files.

The `.tar` file is now a more respectable size of 1.3 MB:

``` bash
-rw-rw-r-- 1 rick rick 1341440 Jun  5 17:27 scripts-2017-06-05.tar
```

# The simplest way is to email as an attachment

Now that the `.tar` file is created, simply go into `gmail.com` and email the file to yourself as an attachment. In the next step we'll want a `cron` job that creates the file daily and emails it automatically using `MTA` (Mail Transport Agent). An option needs to be setup in gmail.com to delete all these emails older than 30 days. That way only 400 MB or so of total scripts backups will be stored.


----------


# Edit June 25, 2017

I discovered tonight some configuration files difficult to backup until I stumbled across [this thread][4]. The files in question are in my home directory:

``` bash
.bashrc
.conkyrc
.websync # one of my own databases
.bafman* # Another one of my own databases
```

Using the link above I created a script called `~/bin/backup` with:

``` bash

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

# !/bin/bash

if [[ $1 == "" ]] ; then
    echo 'Parameter required for file name, ie "Backup-2017-06-26"'
    echo ".tar will automatically be added as a file extension"
    exit
fi
tar -cvf $1.tar /home/rick/bin
tar -rvf $1.tar /usr/local/bin
find .* -maxdepth 0 -type f -exec tar -rvf $1.tar {} +
```

To view what is in the `.tar` archive use the command:

``` bash
tar -tvf Backup-2017-06-26.tar
```

Remember to replace "Backup-2017-06-26" with the parameter you used when creating the backup.


----------


# Edit July 1, 2017

Similar Q&A was posted in November 2014: [Send backup by email with crontab][5]. The accepted answer is included below:

This following command worked for me when I tested in my machine.

``` bash
echo "This is the message body" | mutt -a "/path/to/file.to.attach" -s "subject of message" -- recipient@domain.com
```

So probably the approach to follow will be something like, 

``` bash
tar -zcf /home/blah/backup.tgz /home/blah/
echo "Please find attached the backup file" | mutt -a "/home/blah/backup.tgz" -s "File attached" -- recipient@domain.com
```

I will save the above script as `backup_email.sh` and schedule the cron job as,

``` bash
0 1 * * * /path/to/backup_email.sh
```

**References**

- [How do I send a file as an email attachment using Linux command line?](https://stackoverflow.com/a/9524359/1742825)


  [1]: https://help.ubuntu.com/community/EmailAlerts
  [2]: https://i.stack.imgur.com/gl693.png
  [3]: https://i.stack.imgur.com/8QOZS.png
  [4]: https://unix.stackexchange.com/questions/24870/tar-files-only-no-directories
  [5]: https://unix.stackexchange.com/questions/167036/send-backup-by-email-with-crontab







<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

