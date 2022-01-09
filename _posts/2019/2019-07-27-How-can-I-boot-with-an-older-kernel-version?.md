---
layout:       post
title:        >
    How can I boot with an older kernel version?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1161535
type:         Answer
tags:         grub2 kernel
created_date: 2019-07-27 19:31:54
edit_date:    
votes:        "4 "
favorites:    
views:        "358,038 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    true
---

[Jackkobec's Answer][1] describes a method of viewing `grub.cfg` and scrolling through source code to find a menu number. An easier way is with [this script][2]:

<pre><code>Grub Version: 2.02~beta2-36ubuntu3.22


{% include copyHeader.html %}
``` 
     ┌───────────┤ <b>Use arrow, page, home & end keys. Tab toggle option</b> ├────────────┐
     │ Menu No.     ----------- Menu Name -----------                               │ 
     │                                                                              │ 
     │  1>3  Ubuntu, with Linux 4.15.0-55-generic                                  ↑│ 
     │  1>6  Ubuntu, with Linux 4.15.0-54-generic                                  ▒│ 
     │  <b><em>1>9  Ubuntu, with Linux 4.14.134-0414134-generic                           </em></b>▒│ 
     │  1>12 Ubuntu, with Linux 4.14.120-0414120-generic                           ▮│ 
     │  1>15 Ubuntu, with Linux 4.14.114-0414114-generic                           ▒│ 
     │  1>18 Ubuntu, with Linux 4.14.110-0414110-generic                           ▒│ 
     │  1>21 Ubuntu, with Linux 4.14.98-041498-generic                             ▒│ 
     │  1>24 Ubuntu, with Linux 4.14.89-041489-generic                             ▒│ 
     │  1>27 Ubuntu, with Linux 4.14.78-041478-generic                             ▒│ 
     │  1>30 Ubuntu, with Linux 4.14.70-041470-generic                             ▒│ 
     │  1>33 Ubuntu, with Linux 4.4.0-157-generic                                  ▒│ 
     │  1>36 Ubuntu, with Linux 3.16.60-031660-generic                             ▒│ 
     │  1>36 Ubuntu, with Linux 3.16.60-031660-generic                             ▒│ 
     │  2    Ubuntu 18.04.1 LTS (18.04) (on /dev/nvme0n1p10)                       ▒│ 
     │  3    Advanced options for Ubuntu 18.04.1 LTS (18.04) (on /dev/nvme0n1p10)  ▒│ 
     │  3>0  Ubuntu (on /dev/nvme0n1p10)                                           ↓│ 
     │                                                                              │ 
     │                                                                              │ 
     │                     <b>[Display Grub Boot]            Exit</b>                      │ 
     │                                                                              │ 
     └──────────────────────────────────────────────────────────────────────────────┘ 
                                                                                      

```


</code></pre>

**Note:** In this example `grub-menu.sh short` was used to call the script. The `short` parameter suppresses these lines:

``` 
     │  1>10 Ubuntu, with Linux 4.14.134-0414134-generic (upstart)                 ▒│ 
     │  1>11 Ubuntu, with Linux 4.14.134-0414134-generic (recovery mode)           ▒│ 

```


----------

## Control keys

After scrolling through entries (you can use the mouse scroll wheel or arrow keys) press <kbd>Escape</kbd> to return to the command line.

If you press <kbd>Enter</kbd> the associate grub commands for the entry are displayed:

{% include copyHeader.html %}
``` 
menuentry 'Ubuntu, with Linux 4.14.134-0414134-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-4.14.134-0414134-generic-advanced-b40b3925-70ef-447f-923e-1b05467c00e7' {
recordfail
savedefault
load_video
gfxmode $linux_gfx_mode
insmod gzio
if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
insmod part_gpt
insmod ext2
if [ x$feature_platform_search_hint = xy ]; then
search --no-floppy --fs-uuid --set=root b40b3925-70ef-447f-923e-1b05467c00e7
else
search --no-floppy --fs-uuid --set=root b40b3925-70ef-447f-923e-1b05467c00e7
fi
echo 'Loading Linux 4.14.134-0414134-generic ...'
linux /boot/vmlinuz-4.14.134-0414134-generic root=UUID=b40b3925-70ef-447f-923e-1b05467c00e7 ro noplymouth fastboot acpiphp.disable=1 pcie_aspm=force vt.handoff=7 i915.fastboot=1 nopti nospectre_v2 nospec mem_sleep_default=deep
echo 'Loading initial ramdisk ...'
initrd /boot/initrd.img-4.14.134-0414134-generic
}
Press <Enter> to continue

```

## Updating grub to boot previous kernel

A set of grub commands exist for each menu entry. The compiled entries are all stored in `/boot/grub/grub.cfg` file.

In this example we want menu number `1>9> set as the default so we use:

``` 
sudo -H gedit /etc/default/grub

```

and find this line:

``` 
GRUB_DEFAULT=0

```

and change it to this:

``` 
GRUB_DEFAULT="1>9"

```

Then save the file and run

``` 
sudo update-grub

```

  [1]: https://askubuntu.com/a/1097697/307523
  [2]: {% post_url /2018/2018-04-07-How-to-list-GRUB's-"menuentries"-in-command-line? %}
