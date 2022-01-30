---
layout:       post
title:        >
    How do I add up file sizes in Bash by pattern into array / list?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/891096
type:         Question
tags:         command-line bash kernel files
created_date: 2017-03-09 02:54:25
edit_date:    2017-03-09 03:23:00
votes:        "3 "
favorites:    1
views:        "188 "
accepted:     Accepted
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-09-How-do-I-add-up-file-sizes-in-Bash-by-pattern-into-array-_-list_.md
toc:          false
navigation:   false
clipboard:    true
---

I have these kernel versions installed which via cron reboot job have been "touched" with the last access date:

{% include copyHeader.html %}
``` 
/boot$ ll vmlinuz*
-rw------- 1 root root 5836336 Jan  8 20:00 vmlinuz-3.13.0-92-generic
-rw------- 1 root root 5017584 Oct 18 13:28 vmlinuz-3.2.0-113-generic
-rw------- 1 root root 7069136 Jan 25 16:58 vmlinuz-4.4.0-59-generic
-rw------- 1 root root 7070992 Feb  8 19:38 vmlinuz-4.4.0-62-generic
-rw------- 1 root root 7087088 Feb 21 04:26 vmlinuz-4.4.0-63-generic
-rw------- 1 root root 7087152 Feb 20 06:40 vmlinuz-4.4.0-64-generic
-rw------- 1 root root 7087024 Mar  3 11:25 vmlinuz-4.4.0-66-generic
-rw------- 1 root root 6988624 Nov 19 21:01 vmlinuz-4.4.33-040433-generic
-rw------- 1 root root 7046080 Jun 24  2016 vmlinuz-4.6.3-040603-generic
-rw------- 1 root root 3974752 Aug 16  2016 vmlinuz-4.7.1-040701-generic
-rw------- 1 root root 4134688 Aug 20  2016 vmlinuz-4.7.2-040702-generic
-rw------- 1 root root 4134688 Sep  7  2016 vmlinuz-4.7.3-040703-generic
-rw------- 1 root root 4138784 Jan  8 20:17 vmlinuz-4.7.5-040705-generic
-rw------- 1 root root 7431968 Nov 28 08:03 vmlinuz-4.8.10-040810-generic
-rw------- 1 root root 4994848 Oct  7 08:50 vmlinuz-4.8.1-040801-generic
-rw------- 1 root root 7415584 Jan  8 19:58 vmlinuz-4.8.11-040811-generic
-rw------- 1 root root 7431968 Jan  8 19:57 vmlinuz-4.8.12-040812-generic
-rw------- 1 root root 7427872 Oct 22 05:46 vmlinuz-4.8.4-040804-generic
-rw------- 1 root root 7427872 Nov 19 11:24 vmlinuz-4.8.5-040805-generic
-rw------- 1 root root 7485216 Jan  2 15:12 vmlinuz-4.9.0-040900-generic
-rw------- 1 root root 7419680 Feb 24 04:26 vmlinuz-4.9.10-040910-generic
-rw------- 1 root root 7485216 Jan 10 04:15 vmlinuz-4.9.1-040901-generic
-rw------- 1 root root 7419680 Mar  5 17:40 vmlinuz-4.9.12-040912-generic
-rw------- 1 root root 7419680 Mar  8 04:16 vmlinuz-4.9.13-040913-generic
-rw------- 1 root root 7403296 Jan 25 18:21 vmlinuz-4.9.4-040904-generic
-rw------- 1 root root 7403296 Feb  2 17:14 vmlinuz-4.9.5-040905-generic
-rw------- 1 root root 7419680 Feb 12 00:43 vmlinuz-4.9.8-040908-generic
-rw------- 1 root root 7415584 Feb 12 10:58 vmlinuz-4.9.9-040909-generic
```

For a given kernel I'd like to add up the file size to show how much space can be saved by deleting that kernel. For example **4.7.1** is ancient history in computer terms and at End of Life (EOL):

``` 
/boot$ ll *4.7.1*
-rw-r--r-- 1 root root  1238700 Aug 16  2016 abi-4.7.1-040701-generic
-rw-r--r-- 1 root root   181872 Aug 16  2016 config-4.7.1-040701-generic
-rw-r--r-- 1 root root 41705644 Feb  9 16:50 initrd.img-4.7.1-040701-generic
-rw------- 1 root root  3141159 Aug 16  2016 System.map-4.7.1-040701-generic
-rw------- 1 root root  3974752 Aug 16  2016 vmlinuz-4.7.1-040701-generic
```

What would be the best way of creating a list / array of:

``` 
Kernel Version w.x.y-zzzz - Last Access - Size
Kernel Version w.x.y-zzzz - Last Access - Size
    .     .     .      .      .     .      .
Kernel Version w.x.y-zzzz - Last Access - Size
```

The plan is to present this list using **zenity** with option to delete specific entries from the partition to save space. I install new kernels once or twice a week (they no longer come out every Sunday like they used to) so my 30 GB partition needs pruning every two or three months.
