---
layout:       post
title:        >
    How to mount Android external storage over WiFi instead of USB
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1179873
type:         Answer
tags:         command-line wireless usb mount android
created_date: 2019-10-10 02:08:11
edit_date:    
votes:        "0 "
favorites:    
views:        "1,520 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    true
---

First I tried two of the most popular Android apps for sharing files over WiFi *FTP server* and *WiFi FTP Server*:

- [https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver&amp;hl=en_CA](https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver&amp;hl=en_CA)
- [https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver&amp;hl=en_CA](https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver&amp;hl=en_CA)

Both worked great with Nautilus. Except neither one relayed "Last Access Date" to Nautilus like my projected needed. Both showed "Unknown" instead of a valid date.

As mentioned in other answer `curlftpfs` doesn't work so I tried:

``` 
sudo apt-get install sshfs

```

However neither of the Android WiFi file sharing apps would let me signon. An email to tech support confirmed they don't support Secure Shell, only FTP which is notoriously insecure.

No matter which app you use you need to create a directory to mount the remote folder in. I used:

``` 
mkdir /mnt/phonesudo
chown rick:rick /mnt/phone

```

"rick" being the User ID.

You will want to sign onto your router and make the IP address (in my case **192.168.0.11**) static so it doesn't change each time your phone connects to your router. Here is a link to give you an idea but, yours will no doubt be different:

- [https://business.shaw.ca/support/business-router-settings-dhcp-reservation](https://business.shaw.ca/support/business-router-settings-dhcp-reservation)

Since FTP Servers on Android don't support SSH the next step try SimpleSSH as recommended here:

-  [https://www.techrepublic.com/article/how-to-install-an-ssh-server-on-your-android-phone/](https://www.techrepublic.com/article/how-to-install-an-ssh-server-on-your-android-phone/)

However SimpleSSH doesn't seem recommended in Google Play Store that well? Use this instead with very high ratings *SSH/SFTP Server - Terminal* from **Banana Studio**:
- [https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver&amp;hl=en_CA](https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver&amp;hl=en_CA)

During testing and crashes you'll need to unmount your drive:

``` 
$fusermount -u /mnt/phone

```

After installing *SSH/SFTP Server - Terminal* use this command:

{% include copyHeader.html %}
``` 
$ echo rick | sshfs -o password_stdin -p 2222 rick@192.168.0.11:/ /mnt/phone

$ cd "/mnt/phone/Music/Uriah Heep/The Magician's Birthday"

rick@alien:/mnt/phone/Music/Uriah Heep/The Magician's Birthday$ ll
total 79000
-rw-rw-rw- 1 root root  8204186 Mar 10  2016 01 Sunrise.m4a
-rw-rw-rw- 1 root root  5375331 Mar 10  2016 02 Spider Woman.m4a
-rw-rw-rw- 1 root root  7599684 Mar 10  2016 03 Blind Eye.m4a
-rw-rw-rw- 1 root root 10355301 Mar 10  2016 04 Echoes In The Dark.m4a
-rw-rw-rw- 1 root root  8087257 Mar 10  2016 05 Rain.m4a
-rw-rw-rw- 1 root root  9605474 Mar 10  2016 06 Sweet Lorraine.m4a
-rw-rw-rw- 1 root root  9141838 Mar 10  2016 07 Tales.m4a
-rw-rw-rw- 1 root root 22511187 Mar 10  2016 08 The Magician's Birthday.m4a

$ stat "07 Tales.m4a"
  File: '07 Tales.m4a'
  Size: 9141838   	Blocks: 17856      IO Block: 4096   regular file
Device: 31h/49d	Inode: 11          Links: 1
Access: (0666/-rw-rw-rw-)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2016-03-10 17:22:24.000000000 -0700
Modify: 2016-03-10 17:22:24.000000000 -0700
Change: 2016-03-10 17:22:24.000000000 -0700
 Birth: -

```

**Voila!** I can now see the Last Access Date like my project needs. Unfortunately I discover Android has the biggest security hole in the history of Mankind. Although based on the Linux Kernel Google decided to disable the date a file was opened and read.

*I welcome all comments / questions about this answer*


