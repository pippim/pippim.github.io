---
layout:       post
title:        >
    How can I see previous history (prior to this boot) in journalctl?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1025349
type:         Answer
tags:         boot kernel systemd-journald
created_date: 2018-04-15 22:14:45
edit_date:    2018-04-15 22:23:16
votes:        "3 "
favorites:    
views:        "1,507 "
accepted:     
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## On older installs `journalctl` doesn't keep boot history

Firstly only new installs will have boot history stored by `journalctl` as per this [bug report][1]. If you installed Ubuntu on or before January 2018, you need to turn on history for boot records. See this Q&A: [Why does `journalctl --list-boots` only show the current boot?][2]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Use `--list-boots` to get boot number

`journalctl` references boot history by boot number. Use `--list-boots` parameter and then use <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>PgUp</kbd> <kbd>PgDn</kbd> or <kbd>Up</kbd>/<kbd>Down</kbd> **arrow** keys to scroll the list. When done press <kbd>Q</kbd> to quit:

{% include copyHeader.html %}
``` 
$ journalctl --list-boots
-49 14b941ea19ec411cb20d6a78d3775084 Fri 2018-03-09 04:30:01 MST—Fri 2018-03-09 04:30:38 MST
-48 0d72b55a48e64a62b6b30ccd99dbd4ce Fri 2018-03-09 04:30:58 MST—Fri 2018-03-09 04:31:13 MST
-47 9194c4e5bae34f768b674d14c15aeca4 Fri 2018-03-09 04:31:54 MST—Fri 2018-03-09 17:11:27 MST
-46 faa606cbe44745eb934ec42952221295 Fri 2018-03-09 17:11:49 MST—Fri 2018-03-09 17:13:44 MST
-45 17d844d20fa74cf9963a309b6d4b5f3f Fri 2018-03-09 17:14:07 MST—Sat 2018-03-10 17:17:16 MST
-44 1442b6ef67c7449aaabe045723bf5c56 Sat 2018-03-10 17:17:36 MST—Sat 2018-03-10 20:01:56 MST
-43 0a41b59210b443fa94a3763b68f8cfe0 Sat 2018-03-10 20:02:22 MST—Sat 2018-03-10 20:02:52 MST
-42 716ce601e74141b1855164307898caa8 Sat 2018-03-10 20:03:11 MST—Sat 2018-03-10 20:03:46 MST
-41 826cafbae53d4c8e9ac96910a50d4e20 Sat 2018-03-10 20:04:11 MST—Sat 2018-03-10 20:11:25 MST
-40 6ec8cf675f274b18a6efb108a8f4d3be Sat 2018-03-10 20:11:46 MST—Sun 2018-03-11 09:02:55 MDT
-39 a0d8ab504037414885fb77c4366882fd Sun 2018-03-11 09:03:16 MDT—Mon 2018-03-12 19:10:39 MDT
-38 237e246e00fc45f998b77b1af535c3de Mon 2018-03-12 19:10:59 MDT—Wed 2018-03-14 05:54:02 MDT
-37 c5e1fd4eb0ec44178be6c15862f59151 Wed 2018-03-14 16:20:36 MDT—Thu 2018-03-15 19:01:51 MDT
-36 55692a80f3ce49fa81b3660dfaf97d27 Thu 2018-03-15 19:02:14 MDT—Sun 2018-03-18 14:28:06 MDT
-35 42745fa105dd4f42bf6f7de09b6a7fdc Sun 2018-03-18 14:28:26 MDT—Fri 2018-03-23 05:53:43 MDT
-34 778ac520ecf147fab9d467759f8a6340 Fri 2018-03-23 16:54:18 MDT—Sun 2018-03-25 07:40:11 MDT
-33 a219488717c744b5bce07f77440fa526 Sun 2018-03-25 07:41:25 MDT—Sun 2018-03-25 08:29:42 MDT
-32 4416533bb027475e8589a57d0802aefc Sun 2018-03-25 08:30:09 MDT—Sun 2018-03-25 17:33:54 MDT
-31 d13eb5e7796540199762f71624ce86a2 Sun 2018-03-25 17:34:21 MDT—Sun 2018-03-25 18:18:46 MDT
-30 d4631088004845e893d6298e68880263 Sun 2018-03-25 18:19:09 MDT—Sun 2018-03-25 18:19:35 MDT
-29 429ba89a0b0c429eb9ff362ed633c415 Sun 2018-03-25 18:20:05 MDT—Mon 2018-03-26 07:44:35 MDT
-28 a220a9b415a64d25957cd69927dd449c Mon 2018-03-26 07:45:03 MDT—Mon 2018-03-26 07:50:03 MDT
-27 5c1df993a3b540cd911e0b5d6918e9a1 Mon 2018-03-26 07:50:30 MDT—Mon 2018-03-26 11:15:48 MDT
-26 c28ff5b2f1c3453dbb1f095f9caf2dec Mon 2018-03-26 13:14:09 MDT—Mon 2018-03-26 13:22:42 MDT
-25 737d5b753e7b4a46b132968a00e02164 Mon 2018-03-26 13:23:08 MDT—Mon 2018-03-26 22:09:41 MDT
-24 394066eb2d9a43629f7b532d4ffb7dce Tue 2018-03-27 03:54:23 MDT—Tue 2018-03-27 16:46:32 MDT
-23 e9eef9c57f3543d09223d720290e0c4b Tue 2018-03-27 16:47:13 MDT—Tue 2018-03-27 17:16:48 MDT
-22 77c66f077f0e47a5b63f96d0e26fa9da Tue 2018-03-27 17:17:52 MDT—Fri 2018-03-30 11:17:30 MDT
-21 320ccedf358b4aba8b4786a1bec35b96 Fri 2018-03-30 11:52:18 MDT—Fri 2018-03-30 16:29:28 MDT
lines 7-35/56 63%

```

On the screen we see a boot on March 27th and then one on March 30th. So the boot we want is March 27th called boot number `-22`


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## List your boot records

Today's boot is `-b`, previous boot is `-b-1`, boot before that is `-b-2`, etc. We will use `journalctl -b-22` to see the appropriate boot history:

{% include copyHeader.html %}
``` 
-- Logs begin at Mon 2018-03-05 05:53:18 MST, end at Sun 2018-04-15 16:02:56 MDT. --
Mar 27 17:17:52 alien systemd-journald[295]: Runtime journal (/run/log/journal/) is 8.0M, max 75.8M, 67.8M free.
Mar 27 17:17:52 alien kernel: Linux version 4.14.23-041423-generic (kernel@kathleen) (gcc version 7.2.0 (Ubuntu 7.2.0-8ubuntu3.2)) #201802281111 
Mar 27 17:17:52 alien kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-4.14.23-041423-generic root=UUID=f3f8e7bc-b337-4194-88b8-3a513f6be55b ro qui
Mar 27 17:17:52 alien kernel: KERNEL supported cpus:
Mar 27 17:17:52 alien kernel:   Intel GenuineIntel
Mar 27 17:17:52 alien kernel:   AMD AuthenticAMD
Mar 27 17:17:52 alien kernel:   Centaur CentaurHauls
Mar 27 17:17:52 alien kernel: x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'
Mar 27 17:17:52 alien kernel: x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'
Mar 27 17:17:52 alien kernel: x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'
Mar 27 17:17:52 alien kernel: x86/fpu: Supporting XSAVE feature 0x008: 'MPX bounds registers'
Mar 27 17:17:52 alien kernel: x86/fpu: Supporting XSAVE feature 0x010: 'MPX CSR'
Mar 27 17:17:52 alien kernel: x86/fpu: xstate_offset[2]:  576, xstate_sizes[2]:  256
Mar 27 17:17:52 alien kernel: x86/fpu: xstate_offset[3]:  832, xstate_sizes[3]:   64
Mar 27 17:17:52 alien kernel: x86/fpu: xstate_offset[4]:  896, xstate_sizes[4]:   64
Mar 27 17:17:52 alien kernel: x86/fpu: Enabled xstate features 0x1f, context size is 960 bytes, using 'compacted' format.
Mar 27 17:17:52 alien kernel: e820: BIOS-provided physical RAM map:
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000000000000-0x0000000000057fff] usable
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000000058000-0x0000000000058fff] reserved
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000000059000-0x000000000009dfff] usable
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x000000000009e000-0x000000000009ffff] reserved
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000000100000-0x0000000030a5ffff] usable
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000030a60000-0x0000000030a71fff] reserved
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000030a72000-0x0000000030a89fff] usable
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000030a8a000-0x0000000030a8afff] ACPI NVS
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000030a8b000-0x0000000030ad4fff] reserved
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000030ad5000-0x0000000030b2dfff] usable
Mar 27 17:17:52 alien kernel: BIOS-e820: [mem 0x0000000030b2e000-0x0000000031099fff] reserved
lines 1-29

```

After the first few lines we see the Kernel version that was booted is: `4.14.23-041423-generic`. When done press <kbd>Q</kbd> to quit.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## More than kernel version is available

Of course there is alot more information in the logs available to you. If you wanted to know about say `lightdm` you could use:

{% include copyHeader.html %}
``` 
$ journalctl -b-22 | grep lightdm
Mar 27 17:17:55 alien lightdm[1315]: PAM unable to dlopen(pam_kwallet.so): /lib/security/pam_kwallet.so: cannot open shared object file: No such file or directory
Mar 27 17:17:55 alien lightdm[1315]: PAM adding faulty module: pam_kwallet.so
Mar 27 17:17:55 alien lightdm[1315]: PAM unable to dlopen(pam_kwallet5.so): /lib/security/pam_kwallet5.so: cannot open shared object file: No such file or directory
Mar 27 17:17:55 alien lightdm[1315]: PAM adding faulty module: pam_kwallet5.so
Mar 27 17:17:55 alien lightdm[1315]: pam_unix(lightdm-greeter:session): session opened for user lightdm by (uid=0)
Mar 27 17:17:55 alien systemd[1]: Created slice User Slice of lightdm.
Mar 27 17:17:55 alien systemd-logind[802]: New session c1 of user lightdm.
Mar 27 17:17:55 alien systemd[1]: Started Session c1 of user lightdm.
Mar 27 17:17:55 alien systemd[1341]: pam_unix(systemd-user:session): session opened for user lightdm by (uid=0)
Mar 27 17:17:55 alien lightdm[1555]: PAM unable to dlopen(pam_kwallet.so): /lib/security/pam_kwallet.so: cannot open shared object file: No such file or directory
Mar 27 17:17:55 alien lightdm[1555]: PAM adding faulty module: pam_kwallet.so
Mar 27 17:17:55 alien lightdm[1555]: PAM unable to dlopen(pam_kwallet5.so): /lib/security/pam_kwallet5.so: cannot open shared object file: No such file or directory
Mar 27 17:17:55 alien lightdm[1555]: PAM adding faulty module: pam_kwallet5.so
Mar 27 17:17:55 alien lightdm[1555]: pam_succeed_if(lightdm:auth): requirement "user ingroup nopasswdlogin" not met by user "rick"
Mar 27 17:17:59 alien lightdm[1315]: pam_unix(lightdm-greeter:session): session closed for user lightdm
Mar 27 17:17:59 alien lightdm[1555]: pam_unix(lightdm:session): session opened for user rick by (uid=0)
Mar 27 17:19:55 alien systemd[1344]: pam_unix(systemd-user:session): session closed for user lightdm
Mar 27 17:19:55 alien systemd[1]: Removed slice User Slice of lightdm.
Mar 30 11:17:27 alien lightdm[1046]: ** (lightdm:1046): CRITICAL **: session_get_login1_session_id: assertion 'session != NULL' failed
Mar 30 11:17:28 alien lightdm[1046]: /etc/modprobe.d is not a file
Mar 30 11:17:28 alien lightdm[1046]: /etc/modprobe.d is not a file
Mar 30 11:17:28 alien lightdm[1046]: /etc/modprobe.d is not a file
Mar 30 11:17:28 alien lightdm[1046]: /etc/modprobe.d is not a file
Mar 30 11:17:28 alien lightdm[1046]: /etc/modprobe.d is not a file
Mar 30 11:17:28 alien lightdm[1046]: Error: can't open /lib/modules/4.14.23-041423-generic/updates/dkms
Mar 30 11:17:28 alien lightdm[1046]: Error: can't open /lib/modules/4.14.23-041423-generic/updates/dkms
Mar 30 11:17:28 alien lightdm[1046]: update-alternatives: error: no alternatives for x86_64-linux-gnu_gfxcore_conf

```

You might think "Mar 30" at the bottom is in error but it's a laptop that gets suspended and and still part of March 27, 2018 boot log.

  [1]: https://bugs.launchpad.net/ubuntu/+source/systemd/+bug/1618188
  [2]: {% post_url /2018/2018-02-03-Why-does-`journalctl---list-boots`-only-show-the-current-boot? %}



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a></div>

