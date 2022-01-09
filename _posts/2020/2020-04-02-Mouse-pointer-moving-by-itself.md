---
layout:       post
title:        >
    Mouse pointer moving by itself
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1223324
type:         Answer
tags:         mouse-pointer
created_date: 2020-04-02 01:50:13
edit_date:    
votes:        "2 "
favorites:    
views:        "882 "
accepted:     
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

Most likely it's caused by the pointing stick in the middle of your keyboard. Many people have reported this problem in both Windows and Linux.

You can [disable it][1].

To summarize the link, first list your devices:

``` 
$ xinput list

⎡ Virtual core pointer                    	id=2	[master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer              	id=4	[slave  pointer  (2)]
⎜   ↳ AlpsPS/2 ALPS DualPoint TouchPad        	id=11	[slave  pointer  (2)]
⎜   ↳ USB Optical Mouse                       	id=14	[slave  pointer  (2)]
⎜   ↳ AlpsPS/2 ALPS DualPoint Stick           	id=12	[slave  pointer  (2)]
⎣ Virtual core keyboard                   	id=3	[master keyboard (2)]
    ↳ Virtual core XTEST keyboard             	id=5	[slave  keyboard (3)]
    ↳ Power Button                            	id=6	[slave  keyboard (3)]
    ↳ Video Bus                               	id=7	[slave  keyboard (3)]
    ↳ Power Button                            	id=8	[slave  keyboard (3)]
    ↳ TOSHIBA Web Camera - FHD                	id=9	[slave  keyboard (3)]
    ↳ AT Translated Set 2 keyboard            	id=10	[slave  keyboard (3)]
    ↳ Toshiba input device                    	id=13	[slave  keyboa
```

Then disable the pointing stick:

``` 
$ xinput disable 12

```

substitute `12` with your pointing stick device ID.
  [1]: https://forums.linuxmint.com/viewtopic.php?t=228860
