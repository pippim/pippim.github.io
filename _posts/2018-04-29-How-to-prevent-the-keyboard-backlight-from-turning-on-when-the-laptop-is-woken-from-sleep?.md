---
layout:       post
title:        How to prevent the keyboard backlight from turning on when the laptop is woken from sleep?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029549
type:         Answer
tags:         16.04 thinkpad keyboard-backlight
created_date: 2018-04-29 06:18:45
edit_date:    2020-09-14 23:22:29
votes:        2
favorites:    
views:        2,652
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

From this [reddit post](https://www.reddit.com/r/thinkpad/comments/5fgkv8/any_way_to_get_t460s_keyboard_backlight_to/) OP had opposite problem with lights always being turned off when resuming from suspend.

You can follow the same approach but change the `1` (on) to a `0` (off).

Find the folder `/etc/systemd/system/sleep.target.wants/` and create `kb_backlight_resume.service` with these contents:

``` 
[Unit]
Description=Switch on keyboard backlight after resume
After=suspend.target
After=hibernate.target
After=hybrid-sleep.target

[Service]
ExecStart=/bin/echo 0 > "/sys/devices/platform/thinkpad_acpi/leds/tpacpi::kbd_backlight/brightness"

[Install]
WantedBy=suspend.target
WantedBy=hibernate.target
WantedBy=hybrid-sleep.target

```

I don't have a Thinkpad and my Dell backlight keyboard has different directory structures. I'm unable to test this for your environment. You might have to manually tweak the code if the directory names above are off.

Don't forget to reboot before testing suspend / resume.


----------

If you have a Dell that doesn't have `/etc/systemd/system/sleep.target.wants/` it can be enabled. For example see: 

- [How to disable sleep and configure lid power settings for Ubuntu or Red Hat Enterprise Linux 7][1]


  [1]: https://www.dell.com/support/article/en-ca/how12691/how-to-disable-sleep-and-configure-lid-power-settings-for-ubuntu-or-red-hat-enterprise-linux-7?lang=en
