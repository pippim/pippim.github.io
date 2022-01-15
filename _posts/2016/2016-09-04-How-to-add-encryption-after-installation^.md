---
layout:       post
title:        >
    How to add encryption after installation?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/820651
type:         Answer
tags:         encryption .desktop
created_date: 2016-09-04 00:23:32
edit_date:    2016-09-04 01:31:56
votes:        "5 "
favorites:    
views:        "6,824 "
accepted:     Accepted
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-04-How-to-add-encryption-after-installation^.md
toc:          false
navigation:   false
clipboard:    false
---

You can encrypt your data after installation even though you didn't choose to encrypt it during installation.

To encrypt your entire /home directory and, all it's sub-directories, such as Documents, Downloads, Music, etc. read this link: [how-to-encrypt-your-home-folder-after-installing-ubuntu][1] that explains how to encrypt /home after you've installed Ubuntu. There are plenty of screenshots and narrative walking you through the process.

To summarize the link what you need to do is:

 1. Backup your data. Although the migration process uses a working
``` 
backup you want your own just to be safe.
 2. Install the encryption software with `sudo apt-get install
```

``` 
ecryptfs-utils cryptsetup`.
 3. Create a temporary account with sudo privileges. In order to encrypt
```

``` 
your /home directory you can't be logged on as yourself.
 4. Login with temporary account.
```

 5. Migrate your data from unencrypted /home directory to an encrypted
``` 
/home directory using the command `sudo ecryptfs-migrate-home -u
user` where "user" is your regular user name.
 6. Please note besides encrypting /home your swap partition can also be
```

``` 
encrypted for maximum protection.
 7. DO NOT REBOOT
```

 8. Login with your regular user name. A random passphrase can be
``` 
generated which you need to write down if something goes wrong in  
the future and you need to access /home folder manually.

```

Some people feel encrypting all of /home is overkill and can be too cumbersome when moving /home to another computer or different drive on the same computer. I tried encryption when I installed Ubuntu for the first time in 2014 but when I messed things up and had to reinstall Ubuntu I skipped the encryption option after reading problems other users encountered (although I never did have encryption problems).

If you don't want to encrypt /home and all the sub-directories. You can have a single encrypted ~/.Private directory where you can keep certain files that need encryption such as "things I don't want the NSA to know" or "wife's surprise birthday party planning". This is described here: [EncryptedPrivateDirectory][2]


  [1]: http://www.howtogeek.com/116032/how-to-encrypt-your-home-folder-after-installing-ubuntu/
  [2]: https://help.ubuntu.com/community/EncryptedPrivateDirectory
