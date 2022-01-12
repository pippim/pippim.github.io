---
layout:       post
title:        >
    Adding a GRUB2 background image and custom font
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1071418
type:         Answer
tags:         boot grub2 customization
created_date: 2018-09-02 16:45:25
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "19,235 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

## Grub Themes

The problem may have been caused by a grub customizer bug. An alternative to grub customizer (a third party program) is to use grub-themes which comes standard on every Ubuntu installation:

[![Grub Boot][1]][1]


----------

## Make Grub fonts

Even if you are just using regular grub, if you want a different font you must use `grub-mkfont` program first. The same holds true for Grub Customizer used by OP and Grub Themes used in first section of this answer.

Here are the fonts I have made for grub to use:

``` 
$ ll /usr/share/grub/themes/Tuxkiller2/*.pf2
-rwxrwx--- 1 root root 176923 Jun  9 16:41 /usr/share/grub/themes/Tuxkiller2/dejavu_14.pf2*
-rwxrwx--- 1 root root  20041 Jun  9 16:41 /usr/share/grub/themes/Tuxkiller2/droidlogo_bold_17.pf2*
-rwxrwx--- 1 root root  23339 Jun  9 16:41 /usr/share/grub/themes/Tuxkiller2/droidlogo_bold_20.pf2*
-rwxrwx--- 1 root root  31498 Jun  9 16:41 /usr/share/grub/themes/Tuxkiller2/droidlogo_bold_26.pf2*
-rwxrwx--- 1 root root  15244 Jun  9 16:41 /usr/share/grub/themes/Tuxkiller2/droidlogo_regular_12.pf2*
-rwxrwx--- 1 root root  19148 Jun  9 16:41 /usr/share/grub/themes/Tuxkiller2/droidlogo_regular_17.pf2*
-rwxrwx--- 1 root root 113623 Jul 11 17:05 /usr/share/grub/themes/Tuxkiller2/ubuntu_bold_italic_36.pf2*
-rwxrwx--- 1 root root  45391 Jul 11 17:08 /usr/share/grub/themes/Tuxkiller2/ubuntu_light_20.pf2*
-rwxrwx--- 1 root root  41020 Jul 11 17:16 /usr/share/grub/themes/Tuxkiller2/ubuntu_regular_18.pf2*
-rwxrwx--- 1 root root  46423 Jul 11 17:16 /usr/share/grub/themes/Tuxkiller2/ubuntu_regular_20.pf2*
-rwxrwx--- 1 root root  68602 Jul 11 16:59 /usr/share/grub/themes/Tuxkiller2/ubuntu_regular_28.pf2*

```

To create a font use the `grub-mkfont` program like this guide outlines: [Increase Font in GRUB for High DPI Screens][2]:

``` 
sudo grub-mkfont --output=/boot/grub/fonts/DejaVuSansMono24.pf2 \
  --size=24 /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf

```

Then in your `/etc/default/grub` configuration file tell it to use the new `.pf2` font file:

``` 
# More readable font on high dpi screen, generated with
# sudo grub-mkfont --output=/boot/grub/fonts/DejaVuSansMono24.pf2 \
#    --size=24 /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf
GRUB_FONT=/boot/grub/fonts/DejaVuSansMono24.pf2

```

Finally run:

``` 
sudo update-grub

```


----------

**Reply to comment**: Grub themes are built into grub so use:

``` 
$ apt policy grub2-common
grub2-common:
  Installed: 2.02~beta2-36ubuntu3.18
  Candidate: 2.02~beta2-36ubuntu3.18
  Version table:
 *** 2.02~beta2-36ubuntu3.18 500
        500 http://ca.archive.ubuntu.com/ubuntu xenial-updates/main amd64 Packages
        100 /var/lib/dpkg/status
     2.02~beta2-36ubuntu3 500
        500 http://ca.archive.ubuntu.com/ubuntu xenial/main amd64 Packages

```

  [1]: https://i.stack.imgur.com/epnMf.gif
  [2]: http://blog.wxm.be/2014/08/29/increase-font-in-grub-for-high-dpi.html



