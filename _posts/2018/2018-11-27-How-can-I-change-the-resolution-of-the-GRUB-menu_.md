---
layout:       post
title:        >
    How can I change the resolution of the GRUB menu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1096354
type:         Answer
tags:         boot grub2 display-resolution 18.10
created_date: 2018-11-27 02:33:21
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "43,942 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-27-How-can-I-change-the-resolution-of-the-GRUB-menu_.md
toc:          false
navigation:   false
clipboard:    false
---

You can use 1920x1080 screen size but you will want to generate a larger font. Although the following GIF uses grub themes for additional graphics, generating larger 24 or 36 point fonts is the same for regular grub.

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


  [1]: https://pippim.github.io/assets/img/posts/2018/epnMf.gif
  [2]: http://blog.wxm.be/2014/08/29/increase-font-in-grub-for-high-dpi.html



