---
layout:       post
title:        >
    There a quicker way between Ubuntu and my android to send files instead of Bluetooth or cable
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1327733
type:         Answer
tags:         bluetooth files android sharing wifi-direct
created_date: 2021-03-28 14:00:19
edit_date:    
votes:        "2 "
favorites:    
views:        "1,406 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-03-28-There-a-quicker-way-between-Ubuntu-and-my-android-to-send-files-instead-of-Bluetooth-or-cable.md
toc:          false
navigation:   false
clipboard:    false
---

I use [SSH/SFTP Server - Terminal][1] from Banana Studio.

It has advantages:

- No USB cables which can be a pain to find at times.
- No teethering your phone to your comptuer or USB hub.
- No bluetooth which many seem to have problems with.
- KDE Connect requires installing application on phone and in Ubuntu.
- SSH client is already installed in Ubuntu.
- Logon with SSH which provides automatic encryption.
- Use SSHFS to mount phone as "normal" partition.
- Automate file transfers with bash scripts.
- Utilize Nautilus (Files) for browsing directories on phone.

Having the phone as an SSH server is faster for me to use but I'm not sure if file transfer over WiFi is faster than over USB cable or bluetooth. A lot would depend on the WiFi speed of your phone and router.


  [1]: https://play.google.com/store/apps/details?id=net.xnano.android.sshserver&hl=en_CA&gl=US
