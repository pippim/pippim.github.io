---
layout:       post
title:        The computer didn't automatically boot from USB,
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180697
type:         Answer
tags:         boot
created_date: 2019-10-13 16:47:44
edit_date:    2020-12-08 11:54:00
votes:        3
favorites:    
views:        740
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

This article has detailed steps for creating Ubuntu 18.04 Live USB and booting it:

- https://linuxconfig.org/install-ubuntu-from-usb-18-04-bionic-beaver

The part you are stuck on now is getting BIOS to boot the Live USB:

## Access Boot Menu

To access Boot Menu on your computer you will need to hit different keys (or combination of keys) depending on your computer type. Here is the list of possible keys you may have to press depending on your PC:

| Device     |  Key Combination   | Comment |
| ---------- | ------------------ |-------- |
| Acer       | Esc, F12 or F9     | F12 key most likely |
| Apple      | ⌥                           | the key is also known as Option or Alt |
| Asus       | F8 or Esc          | |
| Compaq     | Esc or F9          | |
| Dell       | F12                | |
| eMachines  | F12                | |
| Fujitsu    | F12                | |
| HP         | Esc or F9          | |
| Lenovo     | F8, F10 or F12     | Other possibilities: Novo button or Fn + F11 |
| Samsung    | Esc or F2 or F12   | For ultrabooks from Samsung disable the fast boot option in BIOS/UEFI. See next section. |
| VAIO       | Esc, F10 or F11    | Other possibilities: Assist button |
| Toshiba    | F12                | |


These are the keys to override the boot priority for a single session. There are other keys for accessing the full BIOS/UEFI menus below.


----------

## Access BIOS/UEFI

To access BIOS/UEFI on your computer you will also need to hit different keys (or combination of keys) depending on your computer type. Here is the list of possible keys you may have to press depending on your PC:

<sub>*Key combinations for accessing BIOS/UEFI Device*</sub>

| Device     |  Key Combination   | Comment |
| ---------- | ------------------ |-------- |
| Acer       | Del or F2          | F2 key most likely |
| Asus       | Delet or Del       | |
| Compaq     | F10                | |
| Dell       | F2                 | |
| eMachines  | Tab or Del         | |
| Fujitsu    | F2                 | |
| HP         | Esc, F10, F11      | Other possibilities: on Pavilion - F1 |
| Lenovo     | F1 or F2           | Other possibilities: small button next to the Power button (if laptop) |
| Samsung    | F2                 | For ultrabooks from Samsung if might be F10 |
| VAIO       | F1, F2, F3         | Other possibilities: Assist button |
| Toshiba    | F1, F2, F12 or Esc | |
