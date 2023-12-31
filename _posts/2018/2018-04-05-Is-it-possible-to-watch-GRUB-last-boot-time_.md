---
layout:       post
title:        >
    Is it possible to watch GRUB last boot time?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022213
type:         Answer
tags:         16.04 grub2
created_date: 2018-04-05 10:44:20
edit_date:    
votes:        "0 "
favorites:    
views:        "69 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-05-Is-it-possible-to-watch-GRUB-last-boot-time_.md
toc:          false
navigation:   false
clipboard:    false
---

### Each Operating System has to maintain a log

In Ubuntu (and most modern Linux distributions) `systemd` maintains boot logs accessed via `journalctl --list-boots`:

``` 
-28 4416533bb027475e8589a57d0802aefc Sun 2018-03-25 08:30:09 MDT—Sun 2018-03-25 17:33:54 MDT
-27 d13eb5e7796540199762f71624ce86a2 Sun 2018-03-25 17:34:21 MDT—Sun 2018-03-25 18:18:46 MDT
-26 d4631088004845e893d6298e68880263 Sun 2018-03-25 18:19:09 MDT—Sun 2018-03-25 18:19:35 MDT
-25 429ba89a0b0c429eb9ff362ed633c415 Sun 2018-03-25 18:20:05 MDT—Mon 2018-03-26 07:44:35 MDT
-24 a220a9b415a64d25957cd69927dd449c Mon 2018-03-26 07:45:03 MDT—Mon 2018-03-26 07:50:03 MDT
-23 5c1df993a3b540cd911e0b5d6918e9a1 Mon 2018-03-26 07:50:30 MDT—Mon 2018-03-26 11:15:48 MDT
-22 c28ff5b2f1c3453dbb1f095f9caf2dec Mon 2018-03-26 13:14:09 MDT—Mon 2018-03-26 13:22:42 MDT
-21 737d5b753e7b4a46b132968a00e02164 Mon 2018-03-26 13:23:08 MDT—Mon 2018-03-26 22:09:41 MDT
-20 394066eb2d9a43629f7b532d4ffb7dce Tue 2018-03-27 03:54:23 MDT—Tue 2018-03-27 16:46:32 MDT
-19 e9eef9c57f3543d09223d720290e0c4b Tue 2018-03-27 16:47:13 MDT—Tue 2018-03-27 17:16:48 MDT
-18 77c66f077f0e47a5b63f96d0e26fa9da Tue 2018-03-27 17:17:52 MDT—Fri 2018-03-30 11:17:30 MDT
-17 320ccedf358b4aba8b4786a1bec35b96 Fri 2018-03-30 11:52:18 MDT—Fri 2018-03-30 16:29:28 MDT
-16 d80a4dfc777b41fe86ae6f32c9a29aa1 Sat 2018-03-31 08:45:57 MDT—Sun 2018-04-01 10:18:56 MDT
-15 d3b5765cd8bc4f4ba3f999a3be7f1513 Sun 2018-04-01 10:26:00 MDT—Sun 2018-04-01 10:48:30 MDT
-14 a420aa9411ca44898116213d3df24de3 Sun 2018-04-01 10:50:21 MDT—Sun 2018-04-01 10:51:23 MDT
-13 7c6c6c36f5844a7b9b2466f7c77b25dd Sun 2018-04-01 10:55:45 MDT—Mon 2018-04-02 11:23:36 MDT
-12 bcd8fa0cec85493c9ccbf0af568d0fad Mon 2018-04-02 11:23:58 MDT—Mon 2018-04-02 11:26:26 MDT
-11 2368ad0c28e4445d8184e1d54640e808 Mon 2018-04-02 11:26:45 MDT—Mon 2018-04-02 11:27:18 MDT
-10 4fca0a5a02c848dd99524d1f9eb772d0 Mon 2018-04-02 11:27:35 MDT—Mon 2018-04-02 12:34:34 MDT
 -9 a7e150634d1f434b968f16c796af92db Mon 2018-04-02 12:34:52 MDT—Mon 2018-04-02 15:04:36 MDT
 -8 587b4fb2389c4db6a25f9479ae3f9760 Mon 2018-04-02 15:04:54 MDT—Mon 2018-04-02 15:06:50 MDT
 -7 d4179e05d5e549a1b4716367d03f665e Mon 2018-04-02 15:07:08 MDT—Mon 2018-04-02 15:14:23 MDT
 -6 04266157375945bdbea59de41ced790b Mon 2018-04-02 15:14:40 MDT—Mon 2018-04-02 15:19:56 MDT
 -5 4437106dd6de46588eeb0a7323623393 Mon 2018-04-02 15:20:14 MDT—Mon 2018-04-02 18:23:05 MDT
 -4 6a95ca1b033448499e6679b6dd4ffdfe Mon 2018-04-02 18:23:23 MDT—Mon 2018-04-02 18:24:19 MDT
 -3 a85f3bfe206e42c28d461f45d95cb24b Mon 2018-04-02 18:24:36 MDT—Mon 2018-04-02 18:27:10 MDT
 -2 5f655f5b26154b63a57fb5403914db32 Mon 2018-04-02 18:27:28 MDT—Tue 2018-04-03 05:35:55 MDT
 -1 95c80eb0ac8944ba814e7af410171c14 Tue 2018-04-03 05:36:13 MDT—Tue 2018-04-03 05:39:34 MDT
  0 3d4074f4e65c4a519294563e4e531afe Tue 2018-04-03 05:39:52 MDT—Thu 2018-04-05 04:30:07 MDT
lines 24-52/52 (END)
```

Although `systemd` has been around for a long time, boot logs are only created for new installs after January 2018. For older installations you need to turn on boot logs: [How to find previous boot log after Ubuntu 16.04 restarts?][1]

In Ubuntu, you can also [track boot times][2] using:

``` 
$ last -x | grep boot | head -n 10
reboot   system boot  4.14.31-041431-g Tue Apr  3 05:39   still running
reboot   system boot  4.14.31-041431-g Tue Apr  3 05:36 - 05:39  (00:03)
reboot   system boot  4.14.31-041431-g Mon Apr  2 18:27 - 05:35  (11:08)
reboot   system boot  4.14.31-041431-g Mon Apr  2 18:24 - 18:27  (00:02)
reboot   system boot  4.14.31-041431-g Mon Apr  2 18:23 - 18:27  (00:03)
reboot   system boot  4.14.31-041431-g Mon Apr  2 15:20 - 18:27  (03:06)
reboot   system boot  4.14.31-041431-g Mon Apr  2 15:14 - 18:27  (03:12)
reboot   system boot  4.14.31-041431-g Mon Apr  2 15:07 - 15:14  (00:07)
reboot   system boot  4.14.31-041431-g Mon Apr  2 15:04 - 15:06  (00:01)
reboot   system boot  4.14.31-041431-g Mon Apr  2 12:34 - 15:06  (02:31)
```

In [Windows][3] you can use:

``` 
systeminfo | find /i "Boot Time"
```


  [1]: https://askubuntu.com/questions/765315/how-to-find-previous-boot-log-after-ubuntu-16-04-restarts
  [2]: https://askubuntu.com/questions/37132/how-do-i-find-the-last-logged-system-boot-and-shutdown-times
  [3]: https://superuser.com/questions/523726/how-can-i-find-out-when-windows-was-last-restarted?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
